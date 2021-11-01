import { info } from './info.js';
import { loadedTables } from './tables.js';
import { theme } from './themes.js';
import { sidebarNav } from './sidebarNav';
import { topNav } from './topNav';
import { components } from './components.js';
import { createModal } from './createModal';
import { createTableToolbar } from './createTableToolbar';
import { createTable } from './createTable';
import { createDropdownMenu,addDropdownOutsideClickHandler } from './createDropdownMenu';

const urlParams = new URLSearchParams(window.location.search);
for (const property in theme) { applyTheme(property, theme[property]); }

function applyTheme(property, color) {
    document.querySelectorAll(`.${property}`).forEach(el => {
        el.classList.add(`${color}`);
    });
};

let schema = {
    name: 'album_collection'
}

let appWrapper = document.querySelector('body');
appWrapper.prepend(topNav(schema));
appWrapper.classList.add(theme.backgroundColor);


if (sessionStorage.getItem('tables') === null) {
    sessionStorage.setItem('tables', JSON.stringify(loadedTables));
}

export let savedTables = JSON.parse(sessionStorage.getItem('tables'));

export var activeTable = urlParams.get('activeTable');

// SELECT TABLE BY ID
export function selectTableById(id) {
    return savedTables.find(table => table.id == id);
}
// SELECT TABLE BY NAME
export function selectTableByName(name) {
    return savedTables.find(table => table.name == name);
}

//console.log(loadedTables);

document.querySelector('.sidebar-navigation').append(sidebarNav(savedTables));
document.querySelector('.table-wrapper').parentNode.prepend(createTableToolbar(selectTableById(activeTable)));
document.querySelector('.table-wrapper').prepend(createTable(selectTableById(activeTable)));


// STATUS FOR TABS
setTableStatus(selectTableById(activeTable), 'active');
setTableStatus(selectTableById(4), 'open');
setTableStatus(selectTableById(2), 'open');
//
function setTableStatus(table, status) {
    if (table.id == activeTable) {
        table.status = 'active';
    } else {
        table.status = status;
    }
}

// TABS


let openTables = [];
openTables.push(selectTableById(activeTable))
openTables.push(selectTableById(5))
document.querySelector('.table-wrapper').parentNode.prepend(createTabs(openTables));

function createTabs(openTables) {
    let tabs = document.createElement('div');
    tabs.classList.add('flex');

    let createTab = function (table) {
        let tab = document.createElement('div');
        tab.classList.add('py-2', 'px-3', theme.textColor, 'border-r', theme.tableBorderColor, 'text-sm', 'space-x-2');
        tab.innerHTML = `<i class="ri-table-fill align-bottom"></i> ${table.name}`;


        let closeTabBtn = document.createElement('button');
        closeTabBtn.append(components.createIcon('close'));

        tab.append(closeTabBtn);

        if (table.id == activeTable) {
            tab.classList.add(theme.mediumBackgroundColor);
        }

        return tab;
    };

    openTables.forEach(function (table) {
        tabs.appendChild(createTab(table));
    });

    return tabs;
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

//sessionStorage.clear();

function saveAsView(e) {
    let selTable = e.target.table;
    let table = { ...selTable };
    let tableId = Object.values(savedTables).flat().map(table => table.id);
    let maxId = Math.max(...tableId);
    table.id = maxId + 1;
    table.columns.forEach(col => col.referencedTable = table.name);
    table.name = `View of ${table.name}`

    savedTables.views.push(table);
    sessionStorage.setItem('tables', JSON.stringify(savedTables));
    location.reload();
    //document.querySelector('.table-wrapper').appendChild(createTable(table));
}

//console.log(savedTables.tables);

// SET ICONS
export function typeIcon(type) {
    if (type == 'text') {
        return 'text';
    } else if (type == 'number') {
        return 'hashtag';
    } else if (type == 'duration') {
        return 'time-line';
    } else if (type == 'fk') {
        return 'key-fill';
    } else if (type == 'lookup') {
        return 'search-line';
    } else {
        return 'question-mark';
    }
}

export function getColumnType(table, column) {
    console.log(table,column)
    let columnType = selectTableByName(table).columns.find(col => col.name == column).type;
    return columnType;
}

export function saveTable(table) {
    document.querySelector('.table-wrapper').appendChild(createTable(table));
}

function addColumn(table) {
    table.columns.push({ name: 'Column', type: 'text' });
    table.records.forEach(record => record.push(''));
    saveTable(table);
}


//openInfoModal('tableRelationships')
function openInfoModal(name) {
    let modalContent = document.createElement('div');

    modalContent.innerHTML = info[name].content;
    modalContent.prepend(createTitle(info[name].title));

    let modal = createModal(modalContent);
    document.querySelector('body').appendChild(modal);
}


export function createTitle(title, subtitle, options) {
    let titleWrapper = document.createElement('div');
    let mainTitle = document.createElement('h2');
    mainTitle.classList.add('text-lg');
    mainTitle.innerText = title;
    titleWrapper.appendChild(mainTitle);
    titleWrapper.classList.add('mb-2');

    let subTitle = document.createElement('h3');
    if (subtitle) {
        subTitle.innerText = subtitle;
        subTitle.classList.add(theme.mutedTextColor);
        titleWrapper.appendChild(subTitle);
    }
    if (options) {
        if (options.tooltip) {
            subTitle.appendChild(createTooltip(options.tooltip));
        }
    }

    return titleWrapper;
}

function createNote(content) {
    let note = document.createElement('div');
    note.classList.add('text-sm', theme.mutedTextColor, 'my-2')
    note.innerHTML = content;
    note.querySelectorAll('[data-modal]').forEach((modalToggle) => {
        modalToggle.addEventListener('click', function () {
            openInfoModal(modalToggle.getAttribute('data-modal'));
        });

    });
    return note;
}

function createColumnSelector(table, fn, options) {

    let selector = document.createElement('div');
    let searchInput = components.createInput({ placeholder: `Search columns in '${table.name}'` });
    searchInput.classList.add('w-full');
    selector.appendChild(searchInput);

    let selectorList = document.createElement('div');
    selector.classList.add('border', theme.tableBorderColor, theme.mediumBackgroundColor);

    let selectorItem = (col, i) => {
        let item = document.createElement('div');
        item.classList.add('p-1', 'block');
        let input = document.createElement('input');
        input.classList.add('mr-1');
        input.setAttribute('type', 'radio');
        input.setAttribute('value', col.name);
        input.setAttribute('name', 'columnSelector');
        item.appendChild(input);

        let valueSample = savedTables.find(table => table.columns.includes(col)).records.map(record => record[i]).splice(0, 2).join(',');
        //console.log(valueSample);

        let label = document.createElement('label');
        label.innerHTML = `${col.name} <span class="text-xs ${theme.mutedTextColor}">(Example values: ${valueSample})</span>`;
        let iconType = createIcon(col.type);
        iconType.classList.add('mr-2');

        item.append(label);
        item.insertBefore(iconType, label);

        if (i == 0) {
            input.setAttribute('checked', true);
        }

        if (options) {
            if (options.selected) {
                if (i == options.selected) {
                    input.setAttribute('checked', true);
                }
            }
        }

        if (col.isLookup) {
            let lookupIcon = components.createIcon('search');
            lookupIcon.classList.add('text-sm', 'mr-1')
            item.insertBefore(lookupIcon, label)
        }


        item.addEventListener('click', function () {
            input.setAttribute('checked', true);
            let selectedColumn = input.getAttribute('value');
            fn(selectedColumn, table.name);
        });

        return item;
    }

    table.columns.forEach((col, i) => {
        selectorList.appendChild(selectorItem(col, i));
    });

    selector.appendChild(selectorList);

    return selector;
}

//linkToTable({ name: 'trackLength', type: 'duration' })

export function linkToTable(col) {
    let linkTablegridContainer = document.createElement('div');
    let linkTableActions = document.createElement('div');
    let modal = createModal(linkTablegridContainer, linkTableActions);
    document.querySelector('body').appendChild(modal);

    let foreignKeyInfo = `A foreign key links a column from this table to a column in another table and ensures that entered values already exist in the other column.`

    linkTablegridContainer.appendChild(createTitle(
        'Create Relationship',
        'Link this column to records from another table',
        { tooltip: foreignKeyInfo }
    ));

    let tableSelector = document.createElement('div');
    tableSelector.classList.add('border', theme.tableBorderColor, theme.mediumBackgroundColor);
    let selectorHeader = document.createElement('h4');
    selectorHeader.classList.add('my-2');
    selectorHeader.innerHTML = `<h4>Select a Table</h4>`;

    let searchInput = components.createInput({ placeholder: `Search tables in 'album-collection'` });
    searchInput.classList.remove('border');
    searchInput.classList.add('w-full');

    let columnSelector = document.createElement('div');

    tableSelector.appendChild(searchInput);
    linkTablegridContainer.append(selectorHeader, tableSelector, columnSelector);

    //ADD ITEMS
    savedTables.filter(table => table.id != activeTable && table.type == 'table').forEach((table) => {
        let item = document.createElement('div');
        item.classList.add('p-1', 'block');
        let input = document.createElement('input');
        input.classList.add('mr-1');
        input.setAttribute('type', 'radio');
        input.setAttribute('value', table.id);
        input.setAttribute('name', 'tableSelection');
        item.appendChild(input);
        let label = document.createElement('label');
        item.appendChild(label);
        label.innerHTML = `<i class="ri-table-fill align-bottom mr-1"></i> ${table.name}`;


        item.addEventListener('click', function () {

            input.setAttribute('checked', true);
            let selectedTableId = input.getAttribute('value');
            let activeTableName = selectTableById(activeTable).name;

            // APPEND COLUMN SELECTOR
            columnSelector.innerHTML = '';

            let selectorHeader = document.createElement('h4');
            selectorHeader.classList.add('my-2');
            selectorHeader.innerHTML = `<h4>Select a Column To Link To</h4>`
            columnSelector.appendChild(selectorHeader);

            columnSelector.prepend(createNote(`Note: You can only link a single record from the <span class="${theme.mediumBackgroundColor} ${theme.textColor} px-1 rounded">${table.name}</span> table to each <span class="${theme.mediumBackgroundColor} ${theme.textColor} px-1 rounded">${activeTableName}</span> record. If you need to link multiple <span class="${theme.mediumBackgroundColor} ${theme.textColor} px-1 rounded">${activeTableName}</span> records to each <span class="${theme.mediumBackgroundColor} ${theme.textColor} px-1 rounded">${table.name}</span> record you need to set a different relationship. <a href="javascript:void(0)" data-modal="tableRelationships" class="${theme.primaryTextColor}">Click here to learn more about table relationships.</a>`));
            columnSelector.appendChild(createColumnSelector(selectTableById(selectedTableId), showLinkOptions));

            columnSelector.appendChild(createNote(`Note: We recommend that you select a column that has unique values. We've pre-selected a column for you if we've found one.`));
        });



        tableSelector.appendChild(item);
    });

    let addLinkBtn = components.createButton(`Add Link`, { style: 'primary' });
    linkTableActions.appendChild(components.createButton('Cancel', { style: 'secondary' }));
    linkTableActions.appendChild(addLinkBtn);

    let showLinkOptions = (colName, tableName) => {
        addLinkBtn.addEventListener('click', function () {
            col.type = 'fk';
            col.lookupField = colName;
            col.lookupTable = tableName;
            col.referencedTable = '';
            document.querySelector('.table-wrapper').innerHTML = '';
            saveTable(selectTableById(activeTable));
            modal.remove();
        });
    }

    return linkTablegridContainer;
}

//setLookupColumn(selectTableById(2))

function setLookupColumn(table) {
    let gridContainer = document.createElement('div');
    let actions = document.createElement('div');
    gridContainer.classList.add('space-y-2');
    let modal = createModal(gridContainer, actions);
    document.querySelector('body').appendChild(modal);

    gridContainer.appendChild(createTitle(
        'Set Lookup Column',
        'Lookup columns are used to identify records with a more user-friendly value when retrieving them from another table'
    ));

    let columnSelector = document.createElement('div');
    gridContainer.appendChild(columnSelector);

    let selectorHeader = document.createElement('h4');
    selectorHeader.classList.add('my-2');
    selectorHeader.innerHTML = `<h4>Select a Column</h4>`
    columnSelector.appendChild(selectorHeader);

    let setLookup = function (columnName, tableName) {
        let newTable = JSON.parse(JSON.stringify(selectTableByName(tableName)));
        let newColumns = newTable.columns.map((col, i) => col.name == columnName ? ({ ...col, isLookup: true }) : ({ ...col, isLookup: false }));
        newTable.columns = newColumns;
        //console.log(newTable);
        let index = savedTables.indexOf(selectTableByName(tableName));
        savedTables[index] = { ...newTable };
        sessionStorage.setItem('tables', JSON.stringify(savedTables));
    }

    columnSelector.appendChild(createColumnSelector(table, setLookup, { selected: 1 }));

    let confirmBtn = components.createButton(`Set Lookup Column`, { style: 'primary' });

    confirmBtn.addEventListener('click', function () {
        modal.remove();
        location.reload();
    });

    actions.appendChild(components.createButton('Cancel', { style: 'secondary' }));
    actions.appendChild(confirmBtn);

}


export function linkToMultiple(table) {
    let gridContainer = document.createElement('div');
    gridContainer.innerHTML = `
      <h4 class="text-lg mb-2">Link Multiple Records to '${table.name}'</h4>
      <p class="mb-2">You need to create a view to link this table records to multiple records from another table.</p>
      <p>Select the table from which you want to link the records from:</p>
      `;
    document.querySelector('body').appendChild(createModal(gridContainer));

    let tableSelector = document.createElement('div');
    gridContainer.appendChild(tableSelector);
    savedTables.tables.filter(table => table.id != activeTable).forEach(function (table) {
        let item = document.createElement('a');
        item.setAttribute('href', 'javascript:void(0)')
        item.classList.add('border', theme.lightBorderColor, 'p-1', 'block');
        item.innerHTML = `${table.name} <span class="${theme.mutedTextColor}">${table.columns[1].name}</span>`;
        item.addEventListener('click', function () {
            selectedTable.push(table);
            item.classList.add(theme.mediumBackgroundColor);
        });
        tableSelector.appendChild(item);
    });

    selectedTable = [];

    let gridContainerActions = document.createElement('div');
    gridContainerActions.classList.add('mt-2');
    let createViewBtn = components.createButton('Create View', { style: 'primary' });

    gridContainerActions.appendChild(components.createButton('Cancel', { style: 'secondary' }));
    gridContainerActions.appendChild(createViewBtn);
    createViewBtn.addEventListener('click', function () {

        let tableId = Object.values(savedTables).flat().map(table => table.id);
        let maxId = Math.max(...tableId);
        let sourceTable = JSON.parse(JSON.stringify(table));
        let newView = {
            name: `${selectedTable[0].name} by ${sourceTable.name}`,
            id: maxId + 1,
            columns: sourceTable.columns,
            records: sourceTable.records,
            color: 'purple'
        };

        newView.columns.push({
            name: selectedTable[0].name + 'Summary', type: 'summary', summaryOf: selectedTable[0].columns[1].name, referencedTable: selectedTable[0].name
        });

        newView.records.forEach(record => record.push(''));


        savedTables.views.push(newView);
        sessionStorage.setItem('tables', JSON.stringify(savedTables));

        gridContainer.parentNode.parentNode.parentNode.remove();
        location.reload();
    });



    let warning = document.createElement('div');
    warning.innerHTML = `<div class="mt-2 text-sm ${theme.mutedTextColor}">A junction table will be created in order to establish a many-to-many relationship between the current and the selected table.</div>`;

    gridContainer.appendChild(warning);
    gridContainer.appendChild(gridContainerActions);

}

function createIcon(type) {
    let icon = document.createElement('i');
    icon.classList.add('ri-' + typeIcon(type), 'align-bottom', 'border', theme.lightBorderColor, 'rounded', 'mr-1');
    return icon;
}

function createTooltip(content) {
    let tooltip = document.createElement('a');
    tooltip.style.position = 'relative';
    tooltip.setAttribute('href', 'javascript:void(0)');
    tooltip.classList.add('ml-1');
    tooltip.innerHTML = `<i class="ri-question-line align-bottom"></i>`;
    let tooltipWrapper = document.createElement('div');
    tooltipWrapper.classList.add('p-2', theme.textColor, 'text-xs', theme.backgroundColor, 'bg-opacity-80', 'border', theme.mediumBorderColor)
    tooltipWrapper.innerHTML = content;
    tooltipWrapper.style.position = 'absolute';
    tooltipWrapper.style.minWidth = '200px';
    tooltipWrapper.style.left = '0';
    tooltip.addEventListener('mouseover', function () {
        tooltip.appendChild(tooltipWrapper);
    });
    tooltip.addEventListener('mouseleave', function () {
        tooltip.removeChild(tooltipWrapper);
    });
    return tooltip;
}



export function columnByName(colName) {
    let columns = savedTables.reduce((a, b) => {
        b.columns.forEach(col => a.push(col))
        return a;
    }, []);
    return columns.find(col => col.name == colName);
};


export function createEditRecordMenu(input, table, value) {
    let content = document.createElement('div');
    let header = document.createElement('h4');
    header.innerHTML = `Edit record in '${table}'`;
    header.classList.add(theme.textColor);
    content.appendChild(header);
    let menu = createDropdownMenu(content);

    let records = selectTableByName(table).records.find(record => record.includes(value));

    let creategridContainerGroup = (field, i) => {
        let gridContainerGroup = document.createElement('div');
        let control = document.createElement('input');
        control.classList.add(theme.inputBackgroundColor, theme.textColor, 'p-2', 'w-full');
        let label = document.createElement('label');
        label.classList.add(theme.textColor, 'block');
        label.innerHTML = `${field.name}`;
        label.prepend(createIcon(field.type));
        if (records) { control.setAttribute('value', records[i]); }
        gridContainerGroup.append(label, control);

        if (i == 1) {
            label.classList.add('font-semibold');
            label.prepend(createIcon('lookup'));
            control.addEventListener('keyup', function () {
                let newValue = control.value;
                input.setAttribute('value', newValue);
            });
        }

        return gridContainerGroup;
    }

    selectTableByName(table).columns.forEach((field, i) => content.appendChild(creategridContainerGroup(field, i)));

    addDropdownOutsideClickHandler(menu, function () {
        let selectedTable = selectTableById(activeTable);
        let editedRecord = selectedTable.records.find(record => record.includes(value));
        let recordIndex = editedRecord.indexOf(value);
        editedRecord[recordIndex] = input.value;
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectedTable);
    });

    let deleteRecordBtn = components.createButton('Delete Record', { icon: 'delete-bin' });

    content.appendChild(deleteRecordBtn);

    return menu;
}

export function createRecordListMenu(input, table, field, cell) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-2', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';
    let menuHeader = document.createElement('h4');
    menuHeader.classList.add(theme.textColor);
    menuHeader.innerHTML = `Edit records in '${table}'`;
    menu.appendChild(menuHeader);

    let columnPosition = selectTableByName(table).columns.map((col, i) => col.name == field ? i : '').join('');
    let summaryRecords = selectTableByName(table).records.map(record => record[columnPosition]);
    let activeRecords = input.value.split(',');

    let createRecordsList = (record, i) => {
        let recordsList = document.createElement('a');
        recordsList.setAttribute('href', 'javascript:void(0)');
        recordsList.innerHTML = record.map(item => `<div class="mr-2">${item}</div>`).join('');
        let removeRecord = document.createElement('button');
        removeRecord.classList.add('border', theme.lightBorderColor, 'rounded', 'px-1', 'ml-auto');
        removeRecord.innerHTML = `<i class="ri-delete-bin-line align-bottom"></i>`;

        if (activeRecords.includes(record[columnPosition])) {
            recordsList.classList.add(theme.primaryColor, 'bg-opacity-70', theme.textColor, 'flex', 'py-1', 'px-2', 'rounded', 'items-center', 'text-sm');
            recordsList.addEventListener('click', function () {
                input.setAttribute('value', input.value.split(',').map(v => v !== record[columnPosition] ? v : '').filter(v => v.length > 0).join(','));
                menu.remove();
                input.parentNode.append(createRecordListMenu(input, table, field, input.value));
            });
        } else {
            recordsList.classList.add(theme.primaryColor, 'bg-opacity-20', theme.textColor, 'flex', 'py-1', 'px-2', 'rounded', 'items-center', 'text-sm');
            recordsList.addEventListener('click', function () {
                if (input.value.length > 0) {
                    input.setAttribute('value', input.value + ',' + record[columnPosition]);
                } else {
                    input.setAttribute('value', record[columnPosition]);
                }
                menu.remove();
                input.parentNode.append(createRecordListMenu(input, table, field, input.value));
            });
        }

        //recordsList.appendChild(removeRecord);
        return recordsList;
    }

    let searchRecords = document.createElement('input');
    searchRecords.classList.add(theme.inputBackgroundColor, 'p-2', 'w-full')
    menu.appendChild(searchRecords);
    let listWrapper = document.createElement('div');
    listWrapper.classList.add('border', 'space-y-1', 'p-1', theme.mediumBorderColor);
    menu.appendChild(listWrapper);

    let newRecordButton = components.createButton('New Record', { icon: 'add', style: 'secondary' });
    menu.appendChild(newRecordButton);

    let createList = (records) => {
        records.forEach((summaryValue) => {
            selectTableByName(table).records.filter(record => record.includes(summaryValue)).forEach((record, i) => listWrapper.appendChild(createRecordsList(record, i)));;
        });

    }

    createList(summaryRecords);

    addDropdownOutsideClickHandler(menu, function () {
        let selectedTable = selectTableById(activeTable);
        let editedRecord = selectedTable.records.find(record => record.includes(cell));
        let recordIndex = editedRecord.indexOf(cell);
        editedRecord[recordIndex] = input.value;
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectedTable);
    });

    return menu;
}

export function createLookupMenu(input, table, field, value) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-1', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';
    let menuHeader = document.createElement('h4');
    menuHeader.classList.add(theme.textColor);
    menuHeader.innerHTML = `Lookup records in <span class="${theme.mediumBackgroundColor} px-1 rounded"><i class="ri-table-fill text-xs"></i> ${table}</span>`;
    let menuLookupField = document.createElement('div');
    menuLookupField.classList.add(theme.mutedTextColor, 'text-sm')

    const isLookup = (column) => column.isLookup;
    let columnPosition = selectTableByName(table).columns.findIndex(isLookup);

    let summaryRecords = selectTableByName(table).records.map(record => record[columnPosition]);
    let summaryIds = selectTableByName(table).records.map(record => record[0]);
    let columnType = selectTableByName(table).columns.map((col, i) => col.name == field ? col.type : '').join('');

    menuLookupField.innerHTML = `Lookup field: `;
    menuLookupField.appendChild(createIcon(columnType));
    let lookupLabel = document.createElement('span');
    lookupLabel.innerText = selectTableByName(table).columns.filter(col => col.isLookup).map(col => col.name);
    menuLookupField.appendChild(lookupLabel);
    menu.appendChild(menuHeader);
    menu.appendChild(menuLookupField);

    let recordsList = document.createElement('div');
    menu.append(recordsList);


    let setSelection = function (record) {
        input.value = record;
        recordsList.innerHTML = '';
    }

    let createRecords = function (records, callback) {
        let list = document.createElement('div');
        list.classList.add('space-y-1')
        records.forEach((record, i) => {
            let item = document.createElement('a');
            item.setAttribute('href', 'javascript:void(0)');
            item.classList.add(theme.textColor, 'py-1', 'px-2', theme.primaryColor, 'bg-opacity-50', 'block', 'rounded', 'text-sm');
            item.innerHTML = `<span class="mr-1">${record}</span> <span class="text-xs font-light">id: ${summaryIds[i]}</span>`;
            if (record == input.value) {
                item.classList.replace('bg-opacity-50', 'bg-opacity-80');
                //item.prepend(components.createIcon('check'));
            }
            item.addEventListener('click', function () {
                callback(record);
            });
            list.appendChild(item);
        });
        return list;
    }


    recordsList.appendChild(createRecords(summaryRecords, setSelection));




    let allowMultiple = components.createButton('Add Multiple', { icon: 'add' });
    //menu.appendChild(allowMultiple);

    allowMultiple.addEventListener('click', function () {
        let warning = document.createElement('div');
        warning.innerHTML = `<div class="mb-2">A junction table will be created in order to establish a many-to-many relationship between the current and the selected table.</div>`;
        let warningActions = document.createElement('div');
        warning.appendChild(warningActions);
        warningActions.classList.add('space-x-2');
        warningActions.appendChild(components.createButton('Cancel'));
        warningActions.appendChild(components.createButton('Create Table'));

        document.querySelector('body').appendChild(createModal(warning));
    });



    input.addEventListener('keyup', function () {

        recordsList.innerHTML = '';
        let filteredRecords = summaryRecords.filter(record => record.match(input.value.trim()));
        recordsList.appendChild(createRecords(filteredRecords, setSelection))

        if (filteredRecords.length == 0) {
            recordsList.appendChild(components.createButton('Add Record', { icon: 'add' }))
        }
        if (filteredRecords.length == 1) {
            //input.value = filteredRecords[0];
        }

    })

    addDropdownOutsideClickHandler(menu, function () {
        let selectedTable = selectTableById(activeTable);
        let editedRecord = selectedTable.records.find(record => record.includes(value));
        let recordIndex = editedRecord.indexOf(value);
        editedRecord[recordIndex] = input.value;
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectedTable);
    });

    return menu;
}


var doubleClickEvent = document.createEvent('MouseEvents');
doubleClickEvent.initEvent('dblclick', true, true);

//document.querySelectorAll('.rendered-cell')[1].dispatchEvent(doubleClickEvent);



//setTableConstraints(selectTableById(3));
