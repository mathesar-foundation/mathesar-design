import { theme } from './themes.js';
import { components } from './components.js';
import { activeTable, savedTables, selectTableById, createTitle, selectTableByName } from './main';
import { createModal } from './createModal.js';
import { createTable } from './createTable';
import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';
import { setTableConstraints } from './setTableConstraints';



export function createTableToolbar(obj) {

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


    let referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Table to Link to' });


    let questionsWrapper = document.createElement('div');


    let applyBtn = components.createButton('Apply', { style: 'primary' });


    referencedTable.addEventListener('change', function () {
        questionsWrapper.innerHTML = '';
        let _table = referencedTable.childNodes[1].value;

        let questionsList = [
            `Can ${obj.name} have more than one ${_table}?`,
            `Can ${_table} have more than one ${obj.name}?`
        ];

        let createQuestions = (question) => {
            let item = components.createCheckInput({ name: 'fkSetup', label: question });
            item.addEventListener('click', function () {
                if (item.querySelector('input').checked === false) {
                    item.querySelector('input').checked == true;
                } else {
                    item.querySelector('input').checked == false;
                }
            });
            return item;
        };

        questionsList.forEach(question => {
            questionsWrapper.append(createQuestions(question));
        });

        questionsWrapper.addEventListener('change',function(){
            let answers = [...questionsWrapper.querySelectorAll('input')].map(input => input.checked);
            if (answers.every(answer => answer === true)){
                console.log('add to new mapping table');                
                applyBtn.addEventListener('click', function () {
                    let newMapTable = {
                        id: 20,
                        name: `${_table}_${obj.name}`,
                        type: 'table',
                        
                        columns: [
                            {
                                name:`Id`,
                                readOnly: true,
                                type: 'number'
                            },
                            {
                                name:`${_table}Id`,
                                type: 'fk',
                                lookupField: `${selectTableByName(_table).columns[0].name}`,
                                lookupTable: `${_table}`
                            },
                            {
                                name:`${obj.name}Id`,
                                type: 'fk',
                                lookupField: `${obj.columns[0].name}`,
                                lookupTable: `${obj.name}`
                            }
                        ],
                        records: [
                            ['','','']
                        ]
                    };
                    savedTables.push(newMapTable);
                    //sessionStorage.setItem('tables', JSON.stringify(savedTables));
                    setTableConstraints(newMapTable);
                });

            } else {
                if (answers[0] == true) {
                    console.log('map other table');
                    applyBtn.addEventListener('click', function () {
                        selectTableByName(_table).columns.push({
                            name: `${obj.name}Id`,
                            type: 'fk',
                            lookupTable: `${obj.name}`,
                            lookupField: `${obj.columns[0].name}`
                            
                        });
                        selectTableByName(_table).records.forEach(record => {record.push('')});
                
                        setTableConstraints(selectTableByName(_table));
                    });
                    
                    
                } else {
                    console.log('map this table');
                    applyBtn.addEventListener('click', function () {
                        
                        obj.columns.push({
                            name: `${_table}Id`,
                            type: 'fk',
                            lookupTable: `${selectTableByName(_table).name}`,
                            lookupField: `${selectTableByName(_table).columns[0].name}`
                        });
                        obj.records.forEach(record => {record.push('')});
                
                        setTableConstraints(obj);
                    });
                    
                }
                
            }
        });

        

    });

    form.append(referencedTable, questionsWrapper, applyBtn);

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


