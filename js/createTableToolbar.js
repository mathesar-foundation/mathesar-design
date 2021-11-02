import { theme } from './themes.js';
import { components } from './components.js';
import { activeTable, savedTables, createTitle, selectTableByName } from './main';
import { createModal } from './createModal.js';
import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';
import { setTableConstraints } from './setTableConstraints';


export function createTableToolbar(obj) {
    console.log(savedTables)
    const type = obj.type;

    let toolbar = document.createElement('div');
    toolbar.classList.add(theme.mediumBackgroundColor, 'py-1', 'px-3', 'flex', 'items-center', 'space-x-4', 'border-b', theme.tableBorderColor);
    let saveAsViewBtn = components.createButton('Save as View', { icon: 'save', style: 'link' });
    let addRecordBtn = components.createButton('Add Record', { icon: 'add', style: 'link' });
    let deleteRecordBtn = components.createButton('Delete', { icon: 'delete-bin', style: 'link' });

    let tableTitle = document.createElement('h2');
    tableTitle.classList.add(theme.textColor, 'text-lg', 'space-x-2');
    tableTitle.innerHTML = `${obj.name}`;
    tableTitle.append(components.createIcon('ri-arrow-drop-down-line'));


    toolbar.appendChild(tableTitle);

    tableTitle.addEventListener('click', function () {
        tableTitle.appendChild(createTableOptionsMenu(obj));
    });

    let createSection = (content) => {
        let section = document.createElement('div');

        let sectionHeader = document.createElement('h4');
        sectionHeader.classList.add(theme.mutedTextColor, 'text-sm');
        sectionHeader.innerText = name;
        let sectionContent = document.createElement('div');
        sectionContent.classList.add('space-x-2');
        content.forEach(c => sectionContent.appendChild(c));
        section.appendChild(sectionHeader);
        section.appendChild(sectionContent);

        return section;
    };

    let filterBtn = components.createButton('Filter', { icon: 'filter', style: 'link' });
    let sortBtn = components.createButton('Sort', { icon: 'arrow-up-down', style: 'link' });
    let groupBtn = components.createButton('Group', { icon: 'layout-row', style: 'link' });

    let sectionDivider = function () {
        let divider = document.createElement('div');
        divider.classList.add('border-r', 'py-2', theme.lightBorderColor);
        return divider;
    }

    let manageRelationshipsBtn = components.createButton('Link Table', { icon: 'links', style: 'link' });

    if (type == 'table') {
        toolbar.appendChild(createSection([addRecordBtn, deleteRecordBtn]));
        toolbar.appendChild(sectionDivider());
        toolbar.appendChild(createSection([filterBtn, sortBtn, groupBtn]));
        toolbar.appendChild(sectionDivider());
        toolbar.appendChild(createSection([saveAsViewBtn]));
        toolbar.appendChild(sectionDivider());
        toolbar.appendChild(createSection([manageRelationshipsBtn]));
    }
    // EVENTS
    saveAsViewBtn.addEventListener('click', function () {
        let newTable = JSON.parse(JSON.stringify(obj));
        let tableId = savedTables.map(table => table.id);
        let maxId = Math.max(...tableId);
        newTable.id = maxId + 1;
        newTable.type = 'view';
        newTable.columns.forEach(col => col.referencedTable = newTable.name);
        newTable.name = `View of ${newTable.name}`;
        savedTables.push(newTable);
        sessionStorage.setItem('tables', JSON.stringify(savedTables));
        location.reload();
    });

    //document.querySelector('body').append(createModal(linkTableWizard(obj)));
    manageRelationshipsBtn.addEventListener('click', function () {
        document.querySelector('body').append(createModal(linkTableWizard(obj)));
    });

    return toolbar;
}


function linkTableWizard(obj) {
    let form = document.createElement('div');
    form.classList.add('space-y-4')

    form.prepend(createTitle(
        'Link to Table',
        'Set relationships between tables'
    ));

    let actionsWrapper = document.createElement('div');
    actionsWrapper.classList.add('space-x-2', 'flex', 'justify-end');

    let cancelBtn = components.createButton('Cancel', { style: 'secondary' });
    let applyBtn = components.createButton('Apply', { style: 'primary' });

    actionsWrapper.append(cancelBtn, applyBtn)

    //CHANGE QUESTIONS
    let referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Select Table to Link to' });

    let questionsWrapper = document.createElement('div');
    questionsWrapper.classList.add('space-y-2')


    referencedTable.addEventListener('change', function () {

        questionsWrapper.innerHTML = ''; // CLEAR QUESTIONS
        let _table = referencedTable.childNodes[1].value;

        let questionsList = [
            `<div>Can a single <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${obj.name}</span> record be linked to more than one <span class="px-1 ${theme.primaryColor} bg-opacity-20 rounded">${_table}</span> record?</div>`,
            `<div>Can a single <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${_table}</span> record be linked to more than one <span class="px-1 ${theme.primaryColor} bg-opacity-20 rounded">${obj.name}</span> record?</div>`
        ];

        let createQuestions = (question, i) => {
            let item = document.createElement('div');
            item.innerHTML = question;
            item.classList.add('border', 'p-2', theme.tableBorderColor, theme.darkBackgroundColor, 'flex', 'justify-between', 'items-center');

            let optionsWrapper = document.createElement('div');
            optionsWrapper.classList.add('flex', 'items-center', 'space-x-4')

            let options = ['yes', 'no'];

            options.forEach(option => optionsWrapper.append(components.createRadioInput({ name: `fkSetup${i}`, value: option, label: option })))


            item.append(optionsWrapper)

            return item;
        };

        questionsList.forEach((question, i) => {
            questionsWrapper.append(createQuestions(question, i));
        });


        

        applyBtn.addEventListener('click', function () {

            let answers = [...questionsWrapper.querySelectorAll('input:checked')].map(input => input.value);
            console.log(answers);
            if (answers.every(answer => answer == 'yes')) {

            
                let newMapTable = createMapTable(selectTableByName(_table), obj);
                ///
                savedTables.push(newMapTable);
                sessionStorage.setItem('tables', JSON.stringify(savedTables));
                location.reload();
                //setTableConstraints(newMapTable);    
       

        } else {
            if (answers[0] == 'yes') {


                    let newColumn = createReferenceColumn(obj)
                    selectTableByName(_table).columns.push(newColumn);
                    selectTableByName(_table).records.forEach(record => { record.push('') });
                    sessionStorage.setItem('tables', JSON.stringify(savedTables));

                    location.reload();
                    //setTableConstraints(selectTableByName(_table));  
           

            } else {

                    let newColumn = createReferenceColumn(selectTableByName(_table))
                    obj.columns.push(newColumn);
                    obj.records.forEach(record => { record.push('') });
                    sessionStorage.setItem('tables', JSON.stringify(savedTables));
                    location.reload();
                    //setTableConstraints(obj);    
              

            }
        }
        
        })

        


    });






    let test = document.createElement('div');
    test.innerHTML = 'We will create new table and fk';

    let test2 = document.createElement('div');
    test2.innerHTML = 'We will create fk column in selected table';

    let test3 = document.createElement('div');
    test3.innerHTML = 'We will create fk column on this table';



    form.append(referencedTable, questionsWrapper, actionsWrapper);

    return form;
}


function createTableOptionsMenu(table) {
    let content = document.createElement('div');
    let menu = createDropdownMenu(content);

    let createMenuItem = (label, callback) => {
        let menuItem = document.createElement('a');
        menuItem.classList.add('block', 'text-sm', 'p-2');
        menuItem.setAttribute('href', 'javascript:void(0)');
        menuItem.innerText = label;
        menuItem.addEventListener('click', function () {
            callback(table);
        }, false);
        return menuItem;
    }

    let menuItems = [
        createMenuItem('Table Constraints', setTableConstraints),
        createMenuItem('Set Lookup Column'),
        createMenuItem('Delete Table')
    ];

    menuItems.forEach(item => content.appendChild(item));

    addDropdownOutsideClickHandler(menu, function () {

    });

    return menu;
}



function createMapTable(tableA, tableB) {
    let maxId = Math.max(...savedTables.map(table => table.id));

    let newTable = {
        name: `${tableA.name}_${tableB.name}`,
        type: 'table',
        id: maxId + 1,

        columns: [
            {
                name: `id`,
                readOnly: true,
                type: 'number'
            },
            {
                name: `${tableA.name}Id`,
                type: 'fk',
                lookupField: `${tableA.columns[0].name}`,
                lookupTable: `${tableA.name}`
            },
            {
                name: `${tableB.name}Id`,
                type: 'fk',
                lookupField: `${tableB.columns[0].name}`,
                lookupTable: `${tableB.name}`
            }
        ],
        records: [
            ['', '', '']
        ]
    };
    return newTable;
}

function createReferenceColumn(table) {
    let newColumn = {
        name: `${table.name}Id`,
        type: 'fk',
        lookupTable: `${table.name}`,
        lookupField: `${table.columns[0].name}`
    };
    return newColumn;
}
