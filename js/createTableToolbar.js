import { theme } from './themes.js';
import { components } from './components.js';
import { savedTables, createTitle, selectTableByName} from './main';
import { createModal } from './createModal.js';
import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';
import { setTableConstraints } from './setTableConstraints';
import { setTablePreferences } from './setTablePreferences';
import * as d3 from "d3";
import { icon } from './iconMap';


export function createTableToolbar(obj) {

    const type = obj.type;

    let toolbar = document.createElement('div');
    toolbar.classList.add(theme.backgroundColor, 'p-2', 'flex', 'items-center', 'space-x-4', 'border-b', theme.tableBorderColor);
    let saveAsViewBtn = components.createButton('Save as View', { icon: 'save', style: 'link' });
    let addRecordBtn = components.createButton('Add Record', { icon: 'add', style: 'link' });
    let deleteRecordBtn = components.createButton('Delete', { icon: 'delete-bin', style: 'link' });

    let tableTitle = document.createElement('h2');
    tableTitle.classList.add(theme.textColor, 'text-lg', 'space-x-1');
    tableTitle.innerHTML = `<i class="${icon[obj.type]} align-bottom"></i><span>${obj.name}</span>`;
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

    if (type == 'view') {
        toolbar.appendChild(createSection([filterBtn, sortBtn, groupBtn]));
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

    form.append(createTitle(
        'Link Table',
        'Link data from another table by setting up foreign key constraints'
    ));

    let linkToConstraints = document.createElement('div');
    linkToConstraints.classList.add('text-sm')
    linkToConstraints.innerHTML = `If you prefer to configure this manually go to <a href="#" class="${theme.primaryTextColor}">constraints settings</a>`

    let actionsWrapper = document.createElement('div');
    actionsWrapper.classList.add('space-x-2', 'flex', 'justify-end');

    let cancelBtn = components.createButton('Cancel', { style: 'secondary' });
    let applyBtn = components.createButton('Create Link', { style: 'primary' });

    actionsWrapper.append(cancelBtn, applyBtn)

    //CHANGE QUESTIONS
    let referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Select Table to Link to' });

    let questionsWrapper = document.createElement('div');
    questionsWrapper.classList.add('flex', 'space-x-2');

    let summary = document.createElement('div');
    summary.classList.add('px-2', theme.primaryBorderColor, 'border-l');
    summary.style.borderLeftWidth = `2px`

    referencedTable.addEventListener('change', function () {

        questionsWrapper.innerHTML = ''; // CLEAR QUESTIONS
        let _table = referencedTable.childNodes[1].value;


        let questions = document.createElement('div');
        questions.classList.add('space-y-2')
        questionsWrapper.append(questions);

        let diagram = document.createElement('div');
        diagram.classList.add('border',theme.tableBorderColor,theme.darkBackgroundColor);
        diagram.style.width = '140px';
        diagram.style.height = '140px';
        questionsWrapper.append(diagram);

        let questionsList = [
            `<div>Can a single <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${obj.name}</span> record be linked to more than one <span class="px-1 ${theme.primaryColor} bg-opacity-20 rounded">${_table}</span> record?</div>`,
            `<div>Can a single <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${_table}</span> record be linked to more than one <span class="px-1 ${theme.primaryColor} bg-opacity-20 rounded">${obj.name}</span> record?</div>`
        ];

        // createQuestions
        let createQuestions = (question, i) => {
            let item = document.createElement('div');
            item.innerHTML = question;
            item.classList.add('border', 'p-2', theme.tableBorderColor, theme.darkBackgroundColor, 'flex', 'justify-between', 'items-center','space-x-4');
            let optionsWrapper = document.createElement('div');
            optionsWrapper.classList.add('flex', 'items-center', 'space-x-4','whitespace-nowrap')
            let options = ['yes', 'no'];
            options.forEach(option => optionsWrapper.append(components.createRadioInput({ name: `fkSetup${i}`, value: option, label: option })))
            item.append(optionsWrapper)
            return item;
        };

        questionsList.forEach((question, i) => {
            questions.append(createQuestions(question, i));
        });

        //////

        

        questionsWrapper.addEventListener('change', function () {
            let answers = [...questionsWrapper.querySelectorAll('input:checked')].map(input => input.value);

            if (answers.length > 1) {

                if (answers.every(answer => answer == 'yes')) {

                    diagram.innerHTML = createDiagram(3,3).outerHTML;

                    summary.innerHTML = `
                    <h4>Under the hood</h4>
                    <p class="${theme.mutedTextColor}">We will create a new table to map records from <span class="${theme.primaryColor} ${theme.textColor} bg-opacity-20 rounded px-1">${obj.name}</span> to records from <span class="${theme.primaryColor} ${theme.textColor} bg-opacity-20 rounded px-1">${_table}</span></p>
                    <div class="my-1">
                    <label class="block">New Table Name</label>
                    <input type="text" class="${theme.inputBackgroundColor} bg-opacity-20 ${theme.tableBorderColor} border p-1" value="${_table}_mapping_${obj.name}">
                    </div>`;

                   
                } else {
                    if (answers[0] == 'yes') {

                        diagram.innerHTML = createDiagram(1,3).outerHTML;
                        

                        let existingColumns = selectTableByName(_table).columns.filter(col => col.lookupTable == obj.name);

                        //if (existingColumns.length > 0) {
                        // summary.innerHTML = `Column(s) ${existingColumns.map(col => col.name)} already exists in ${_table}.`
                        //} else {
                        summary.innerHTML = `
                    <h4>Under the hood</h4>
                    <p class="${theme.mutedTextColor}">We will create a new column in the <span class="${theme.primaryColor} ${theme.textColor} bg-opacity-20 rounded px-1">${_table}</span> table and set up a foreign key constraint to the <span class="${theme.primaryColor} ${theme.textColor} bg-opacity-20 rounded px-1">${_table}</span> table.</p>
                    <div class="my-1">
                    <label class="block">New Column Name</label>
                    <input type="text" class="${theme.inputBackgroundColor} bg-opacity-20 ${theme.tableBorderColor} border p-1" value="${obj.name}Id">
                    </div>
                    `;
                        // }
                    } else if (answers[1] == 'yes') {

                        diagram.innerHTML = createDiagram(3,1).outerHTML;

                        let existingColumns = obj.columns.filter(col => col.lookupTable == _table);
                        //if (existingColumns.length > 0) {
                        //    summary.innerHTML = `Column(s) ${existingColumns.map(col => col.name)} already exists in ${obj.name}.`
                        //} else {
                        summary.innerHTML = `
                    <h4>Under the hood</h4>
                    <p class="${theme.mutedTextColor}">We will create a new column in the <span class="${theme.primaryColor} ${theme.textColor} bg-opacity-20 rounded px-1">${obj.name}</span> table and set up a foreign key constraint to the <span class="${theme.primaryColor} ${theme.textColor} bg-opacity-20 rounded px-1">${obj.name}</span> table.</p>
                    <div class="my-1">
                    <label class="block">New Column Name</label>
                    <input type="text" class="${theme.inputBackgroundColor} bg-opacity-20 ${theme.tableBorderColor} border p-1" value="${_table}Id">
                    </div>
                    `;
                        // }
                    } else {
                        diagram.innerHTML = createDiagram(1,1).outerHTML;
                        summary.innerHTML = `
                    <h4>Under the hood</h4>
                    <p class="text-sm">We will create a new column named <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${_table}Id</span> in the <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${obj.name}</span> table and set up a unique and foreign key constraint to the <span class="${theme.primaryColor} bg-opacity-20 rounded px-1">${obj.name}</span> table.</p>
                    `;

                    }
                }
            }
        });

        


        applyBtn.addEventListener('click', function () {

            let answers = [...questionsWrapper.querySelectorAll('input:checked')].map(input => input.value);
            console.log(answers);
            if (answers.every(answer => answer == 'yes')) {
                let newMapTable = createMapTable(selectTableByName(_table), obj);
                
                savedTables.push(newMapTable);
                sessionStorage.setItem('tables', JSON.stringify(savedTables));
                location.reload();
                //setTableConstraints(newMapTable);    


            } else {
                if (answers[0] == 'yes') {
                    let newColumn = createReferenceColumn(obj);
                    
                    obj.constraints.push({
                        type:'Foreign Key',
                        columns:[newColumn.name],
                        referenceTable:newColumn.lookupTable,
                        referenceColumns:[newColumn.lookupField]
                    });

                    selectTableByName(_table).columns.push(newColumn);
                    selectTableByName(_table).records.forEach(record => { record.push('') });
                    sessionStorage.setItem('tables', JSON.stringify(savedTables));
                    location.reload();
                    //setTableConstraints(selectTableByName(_table));  



                } else {

                    let newColumn = createReferenceColumn(selectTableByName(_table));

                    obj.constraints.push({
                        type:'Foreign Key',
                        columns:[newColumn.name],
                        referenceTable:newColumn.lookupTable,
                        referenceColumns:[newColumn.lookupField]
                    });

                    obj.columns.push(newColumn);
                    obj.records.forEach(record => { record.push('') });
                    sessionStorage.setItem('tables', JSON.stringify(savedTables));
                    location.reload();
                    //setTableConstraints(obj);    


                }
            }

        })




    });


    


    form.append(linkToConstraints, referencedTable, questionsWrapper,summary, actionsWrapper);
  

    return form;
}

function createDiagram(top,bottom) {
    console.log(top,bottom)
    let diagram = document.createElement('div');
    var width = 140;
    var height = 140;
    var svg = d3.select(diagram)
        .append("svg").attr("width", width).attr("height", height);
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", 'none')
        .style("stroke", 'rgb(165,180,252)')
        .style("stroke-width", 1);
    
    if (top == 1) {
    svg.append("rect")
        .attr("x", 60)
        .attr("y", 40)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", 'rgb(165,180,252)');
    }
    
    if (bottom == 1) {
    svg.append("rect")
        .attr("x", 60)
        .attr("y", 80)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", '#FFF');
    }

    if (bottom > 1) {
        
        svg.append("rect")
            .attr("x", 60)
            .attr("y", 80)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", '#FFF');
            svg.append("rect")
            .attr("x", 20)
            .attr("y", 80)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", '#FFF');
            svg.append("rect")
            .attr("x", 100)
            .attr("y", 80)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", '#FFF');
    }

    if (top > 1) {
        
        svg.append("rect")
            .attr("x", 60)
            .attr("y", 40)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", 'rgb(165,180,252)');
            svg.append("rect")
            .attr("x", 20)
            .attr("y", 40)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", 'rgb(165,180,252)');
            svg.append("rect")
            .attr("x", 100)
            .attr("y", 40)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", 'rgb(165,180,252)');
    }


    //svg.append("rect")
    //    .attr("x", 100)
    //    .attr("y", 40)
    //    .attr("width", 20)
    //    .attr("height", 20)
    //    .attr("fill", 'rgb(165,180,252)');
    //svg.append("rect")
    //    .attr("x", 20)
    //    .attr("y", 40)
    //    .attr("width", 20)
    //    .attr("height", 20)
    //    .attr("fill", 'rgb(165,180,252)');

    return diagram;

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
        createMenuItem('Table Preferences', setTablePreferences),
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

        constraints : [
            {type:'Primary Key', columns:['id']},
            {type:'Foreign Key', columns:[`${tableA.name}Id`], referenceTable:`${tableA.name}`, referenceColumns:[`${tableA.columns[0].name}`]},
            {type:'Foreign Key', columns:[`${tableB.name}Id`], referenceTable:`${tableB.name}`, referenceColumns:[`${tableB.columns[0].name}`]},
        ],

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

