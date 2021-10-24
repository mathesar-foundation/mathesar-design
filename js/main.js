import { info } from './info.js';
import { loadedTables } from './tables.js';
import { theme } from './themes.js';
import { sidebarNav } from './sidebarNav';
import { topNav } from './topNav';
import { components } from './components.js';
import { createModal } from './createModal';

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

let savedTables = JSON.parse(sessionStorage.getItem('tables'));

export var activeTable = urlParams.get('activeTable');

document.querySelector('.sidebar-navigation').append(sidebarNav(savedTables));
document.querySelector('.table-wrapper').parentNode.prepend(createTableToolbar(selectTableById(activeTable)));
document.querySelector('.table-wrapper').prepend(createTable(selectTableById(activeTable)));

// SELECT TABLE BY ID
function selectTableById(id) {
    return Object.values(savedTables).flat().find(table => table.id == id);
}
// SELECT TABLE BY NAME
function selectTableByName(name) {
    return Object.values(savedTables).flat().find(table => table.name == name);
}

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
document.querySelector('.table-wrapper').parentNode.prepend(createTabs(openTables));

function createTabs(openTables) {
    let tabs = document.createElement('div');
    tabs.classList.add('flex');

    let createTab = function (table) {
        let tab = document.createElement('div');
        tab.classList.add('py-2', 'px-3', theme.textColor, 'border-r', theme.darkBorderColor, 'text-sm', 'space-x-2');
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

    //let openTables = Object.values(tables).flat().filter(table => table.status);
    //
    //let createTab = table => `<div class="py-2 px-3 ${theme.textColor} ${table.status == 'active' ? theme.accentBackgroundColor : theme.backgroundColor}">${table.name}</div>`;
    //
    //let tab = openTables.map(table => createTab(table)).join('');
    //
    //let tabs = document.createElement('div');
    //tabs.innerHTML = `<div class="flex items-center">${tab}</div>`

    return tabs;
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function createTableToolbar(obj) {

    const type = obj.type;

    let toolbar = document.createElement('div');
    toolbar.classList.add(theme.mediumBackgroundColor, 'py-2', 'px-3', 'flex', 'items-center', 'space-x-4', 'border-b', theme.tableBorderColor);
    let saveAsViewBtn = components.createButton('Save as View', { icon: 'save', style:'secondary' });
    let addRecordBtn = components.createButton('Add', { icon: 'add', style:'secondary' })
    let LinkRecordsBtn = components.createButton('Link to Multiple');
    let tableTitle = document.createElement('h2');
    tableTitle.classList.add(theme.textColor, 'text-lg','space-x-2');
    tableTitle.innerHTML = `${obj.name}`;
    tableTitle.append(components.createIcon('arrow-drop-down'));
    toolbar.appendChild(tableTitle);

    tableTitle.addEventListener('click', function () {
        tableTitle.appendChild(createTableOptionsMenu(obj));
    });

    let createSection = (name, content) => {
        let section = document.createElement('div');
        let sectionHeader = document.createElement('h4');
        sectionHeader.classList.add(theme.mutedTextColor, 'text-sm');
        sectionHeader.innerText = name;
        let sectionContent = document.createElement('div');
        sectionContent.classList.add('space-x-2');
        content.forEach(c => sectionContent.appendChild(c));
        //section.appendChild(sectionHeader);
        section.appendChild(sectionContent);
        return section;
    }

    let recordsContent = [addRecordBtn];
    let viewsContent = [saveAsViewBtn];

    if (type == 'table') {
        toolbar.appendChild(createSection('Records', recordsContent));

        LinkRecordsBtn.addEventListener('click', function () {
            linkToMultiple(obj);
        });
        toolbar.appendChild(createSection('Views', viewsContent));
    }
    // EVENTS
    saveAsViewBtn.addEventListener('click', function () {
        let newTable = JSON.parse(JSON.stringify(obj));

        let tableId = Object.values(savedTables).flat().map(table => table.id);
        let maxId = Math.max(...tableId);
        newTable.id = maxId + 1;
        newTable.type = 'view';
        newTable.columns.forEach(col => col.referencedTable = newTable.name);
        newTable.name = `View of ${newTable.name}`

        savedTables.push(newTable);

        sessionStorage.setItem('tables', JSON.stringify(savedTables));
        location.reload();
    });

    return toolbar;
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
function typeIcon(type) {
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

function getColumnType(table, column) {
    console.log(table, column)
    let columnType = selectTableByName(table).columns.find(col => col.name == column).type;
    return columnType;
}

//CREATE TABLE
function createTable(obj) {

    let recordTable = obj.columns.reduce(function (a, b) {
        a.push(b.referencedTable)
        return a;
    }, []);

    let summaryOf = obj.columns.reduce(function (a, b) {
        a.push(b.summaryOf)
        return a;
    }, []);

    let lookupField = obj.columns.reduce(function (a, b) {
        a.push(b.lookupField)
        return a;
    }, []);

    let lookupTable = obj.columns.reduce(function (a, b) {
        a.push(b.lookupTable)
        return a;
    }, []);

    let rowClasses = ['t-row', 'border-b', theme.tableBorderColor];
    let rowHeaderClasses = ['t-row-header', 'p-3', theme.mutedTextColor, 'border-r', theme.tableBorderColor, 'text-xs']
    let cellClasses = ['t-cell', 'border-r', theme.tableBorderColor, 'editable-cell'];

    let createHeader = (col) => {
        let header = document.createElement('div');
        header.style.width = '240px';
        header.style.position = 'relative';
        header.classList.add('t-cell', 'p-2', theme.textColor, 'border-r', theme.tableBorderColor, 'flex', 'items-center');
        let headerLabel = document.createElement('div');
        let headerIcon = document.createElement('i');
        headerIcon.classList.add('ri-' + typeIcon(col.type), 'align-bottom', 'rounded', 'mr-2', theme.primaryColor, 'bg-opacity-60');
        headerIcon.style.padding = '2px'

        let headerColumnName = document.createElement('span');
        headerColumnName.innerHTML = col.name;
        header.appendChild(headerLabel);
        headerLabel.appendChild(headerIcon);
        headerLabel.appendChild(headerColumnName);

        if (col.type == 'fk') {
            let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
            headerIcon.classList.add('ri-' + typeIcon(linkedColumnType));
            let foreignKeyIcon = document.createElement('i');
            foreignKeyIcon.classList.add('ri-key-fill', 'mr-1', 'text-xs');
            headerLabel.insertBefore(foreignKeyIcon, headerColumnName);
        }

        //RENAME HEADER
        headerLabel.addEventListener('click', function () {
            headerLabel.remove();
            let renameInput = components.createInput({ value: col.name });
            renameInput.classList.add(theme.inputBackgroundColor, 'px-1');
            renameInput.classList.remove('p-1', 'border');
            let headerForm = document.createElement('div');
            header.prepend(headerForm);
            headerForm.appendChild(renameInput);
            headerForm.prepend(headerIcon);
            renameInput.focus();
            renameInput.addEventListener('blur', function () {
                col.name = renameInput.value;
                tableWrapper.remove();
                saveTable(obj);
            });
        });

        let headerMenuToggle = document.createElement('button');
        headerMenuToggle.innerHTML = `<i class="ri-arrow-down-s-line align-bottom"></i>`;
        headerMenuToggle.classList.add('ml-auto');
        header.appendChild(headerMenuToggle);
        headerMenuToggle.addEventListener('click', openColumnMenu);



        let createMenuItem = function (label, callback, options) {
            let menuItem = document.createElement('a');
            menuItem.classList.add('block', 'm-1', 'py-1', 'px-2');
            menuItem.setAttribute('href', 'javascript:void(0)');
            menuItem.innerText = label;
            let hoverClasses = [theme.primaryColor, 'bg-opacity-30', 'rounded'];
            menuItem.addEventListener('click', function () {
                callback(col);
            }, false);
            menuItem.addEventListener('mouseover', function () {
                menuItem.classList.add(...hoverClasses);
            });
            menuItem.addEventListener('mouseleave', function () {
                menuItem.classList.remove(...hoverClasses);
            });
            if (options) {
                if (options.icon) {
                    let icon = document.createElement('i');
                    icon.classList.add(`ri-${options.icon}-line`, 'align-bottom', 'mr-1');
                    menuItem.prepend(icon);
                }
            }

            return menuItem;
        };

        let createMenuDivider = function () {
            let divider = document.createElement('div');
            divider.classList.add('border-b', theme.tableBorderColor, 'mx-2');
            return divider;
        };


        let createHeaderMenu = function (col) {

            let menu = document.createElement('div');
            menu.classList.add(theme.backgroundColor, theme.mediumBorderColor, 'border', 'w-full', 'shadow-md', 'text-sm', 'column-menu');
            menu.style.top = '40px';
            menu.style.left = '0';
            menu.style.position = 'absolute';

            // CREATE MENU ITEMS
            let dataTypeOption = document.createElement('a');
            dataTypeOption.setAttribute('href', 'javascript:void(0)');
            dataTypeOption.classList.add('m-1', 'py-1', 'px-2', 'flex', 'items-center', 'block');
            let dataTypeLabel = document.createElement('div');
            dataTypeLabel.classList.add('text-base');
            dataTypeOption.appendChild(dataTypeLabel);
            let dataTypeIcon = document.createElement('i');
            dataTypeIcon.classList.add('ri-' + typeIcon(col.type), 'border', 'align-bottom', 'border-gray-500', 'rounded', 'mr-2');
            dataTypeLabel.innerHTML = col.type;

            dataTypeOption.addEventListener('click', openDataTypeMenu);

            if (col.type == 'fk') {
                let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
                dataTypeIcon.classList.add('ri-' + typeIcon(linkedColumnType), 'border', 'align-bottom', 'border-gray-500', 'rounded', 'mr-2');
                dataTypeLabel.innerHTML = linkedColumnType;
            }

            dataTypeLabel.prepend(dataTypeIcon);

            //ADD MENU ITEMS
            let menuItems = [
                dataTypeOption,
                createMenuDivider(),
                createMenuItem('Link to Another Table', linkToTable, { icon: 'key' }),
                createMenuItem('Insert New Column'),
                createMenuItem('Rename Column'),
                createMenuItem('Duplicate Column'),
                createMenuItem('Filter Column'),
                createMenuItem('Sort Column'),
                createMenuItem('Group Column'),
                createMenuDivider(),
                createMenuItem('Delete Column', menuAction, { icon: 'delete-bin' })
            ];

            if (col.type == 'fk') {
                menuItems.splice(2, 3, createMenuItem(`Remove '${col.lookupTable}' Link`, removeLink, { icon: 'close' }));
            }

            menuItems.forEach(item => menu.appendChild(item));
            return menu;
        };

        let removeLink = function () {
        };


        function menuAction(menu) {
            return function () {
                console.log("Clicked on createHeaderMenu -> menuAction item");
                menu.parentElement.removeChild(menu);
                removeDropdownOutsideClickHandler(menu);
            };
        }

        function openColumnMenu(e) {
            let menu = createHeaderMenu(col);
            header.appendChild(menu);
            addDropdownOutsideClickHandler(menu, () => console.log("Clicked outside when openColumnMenu was open"));
        }

        function openDataTypeMenu(e) {
        }

        return header;
    };

    let getColumnByPosition = function (int) {
        return obj.columns[int];
    }

    let createCell = function (cell, i) {
        let cellElement = document.createElement('div');
        cellElement.classList.add(...cellClasses);
        cellElement.style.width = '240px';
        let cellType = getColumnByPosition(i).type;
        let renderedCell = document.createElement('div');
        renderedCell.classList.add(theme.textColor, 'p-2', 'rendered-cell', 'h-full', 'space-y-1');
        renderedCell.style.cursor = 'pointer';

        let createRecordLink = function (cell) {
            let link = document.createElement('div');
            link.classList.add(theme.primaryColor, 'rounded', 'px-1', 'inline-block', 'bg-opacity-50', 'mr-1');
            link.innerHTML = cell;
            return link;
        }

        if (cellType == 'fk') {
            renderedCell.appendChild(createRecordLink(cell));
        } else if (cellType == 'summary') {
            cell.split(',').forEach(c => renderedCell.appendChild(createRecordLink(c)))
        }
        else {
            renderedCell.innerHTML = cell;
        }

        let cellInput = components.createInput({ value: cell });
        cellInput.classList.add('p-2', 'w-full', 'hidden');
        cellInput.classList.remove('border');


        if (summaryOf[i] && recordTable[i]) {
            renderedCell.addEventListener('dblclick', function () {
                cellInput.classList.remove('hidden');
                cellInput.focus();
                renderedCell.classList.add('hidden');
                cellElement.appendChild(createRecordListMenu(cellInput, recordTable[i], summaryOf[i], cell));
            });
        } else if (recordTable[i]) {
            renderedCell.addEventListener('dblclick', function () {
                cellInput.classList.remove('hidden');
                cellInput.focus();
                renderedCell.classList.add('hidden');
                cellElement.appendChild(createEditRecordMenu(cellInput, recordTable[i], cell));
            });
        } else if (lookupTable[i]) {
            renderedCell.addEventListener('dblclick', function () {
                cellInput.classList.remove('hidden');
                cellInput.focus();
                renderedCell.classList.add('hidden');
                cellElement.appendChild(createLookupMenu(cellInput, lookupTable[i], lookupField[i], cell));
            });
        } else {
            renderedCell.addEventListener('dblclick', function () {
                cellInput.classList.remove('hidden');
                cellInput.focus();
                renderedCell.classList.add('hidden');
                cellInput.addEventListener('blur', function () {
                    renderedCell.innerHTML = cellInput.value;
                    cellInput.classList.add('hidden');
                    renderedCell.classList.remove('hidden');
                    let editedRecord = obj.records.find(record => record.includes(cell));
                    let recordIndex = editedRecord.indexOf(cell);
                    editedRecord[recordIndex] = cellInput.value;
                    document.querySelector('.table-wrapper').innerHTML = '';
                    saveTable(obj);
                })
            });
        }

        cellElement.appendChild(cellInput);
        cellElement.appendChild(renderedCell);

        return cellElement;
    }

    let createRow = function (record, i) {
        let rowCount = i + 1;
        let row = document.createElement('div');
        row.classList.add(...rowClasses);
        let rowNumber = document.createElement('div');
        rowNumber.classList.add(...rowHeaderClasses);
        rowNumber.style.width = '40px';
        rowNumber.innerHTML = `${rowCount}`;
        record.forEach((cell, i) => row.appendChild(rowNumber));
        record.forEach((cell, i) => row.appendChild(createCell(cell, i)));
        return row;
    }


    let createNewRow = function (columns) {

        let row = document.createElement('div');
        row.classList.add(...rowClasses);

        let rowNumber = document.createElement('div');
        rowNumber.classList.add(...rowHeaderClasses);
        rowNumber.innerHTML = `*`;
        rowNumber.style.width = '40px';
        row.appendChild(rowNumber);

        let placeholderValue = (col) => {
            if (col.referencedTable) {
                return `Add Record to '${col.referencedTable}'`;
            } else if (col.type == 'fk') {
                return `Search from '${col.lookupField}'`;
            } else {
                return `Add Record`;
            }
        }

        columns.forEach(function (col, i) {
            let cell = document.createElement('div');
            cell.classList.add(...cellClasses)
            cell.style.width = '240px';
            let cellInput = components.createInput({ placeholder: placeholderValue(col) });
            cellInput.classList.add('p-2', 'w-full');
            cellInput.classList.remove('border');
            cell.appendChild(cellInput);
            row.appendChild(cell);
            cellInput.addEventListener('keydown', function () {
                if (!row.newRowCreated) {
                    row.newRowCreated = true;
                    newRowWrapper.prepend(repositionWarning);
                    newRowWrapper.appendChild(createNewRow(obj.columns));
                    if (recordTable[i]) {
                        console.log('table', recordTable[i])
                        cellInput.parentNode.appendChild(createEditRecordMenu(cellInput, recordTable[i], ''))
                    }
                }
            });
        });
        return row;
    }

    let table = document.createElement('div');
    let tableClasses = ['t-table', theme.backgroundColor];
    table.classList.add(...tableClasses);
    let rowWrapper = document.createElement('div');
    rowWrapper.classList.add('t-body', 'row-wrapper');
    let headerWrapper = document.createElement('div');
    let headerRow = document.createElement('div');

    let headerRowSelect = document.createElement('div');
    headerRowSelect.classList.add('t-row-header', 'p-2');
    headerRowSelect.style.width = '40px';
    headerRow.classList.add('t-row', 'border-b', theme.tableBorderColor);
    headerRow.appendChild(headerRowSelect);
    headerWrapper.appendChild(headerRow);
    headerWrapper.classList.add('t-head', 'row-wrapper');

    obj.columns.forEach(col => headerRow.appendChild(createHeader(col)));
    obj.records.forEach((record, index) => rowWrapper.appendChild(createRow(record, index)));
    table.appendChild(headerWrapper);
    table.appendChild(rowWrapper);

    let newRowWrapper = document.createElement('div');
    newRowWrapper.classList.add('t-body', 'row-wrapper');
    table.appendChild(newRowWrapper);
    newRowWrapper.appendChild(createNewRow(obj.columns));

    let repositionWarning = document.createElement('div');
    repositionWarning.classList.add('p-1', theme.textColor, 'bg-green-700', 'text-sm');
    repositionWarning.innerHTML = `New records will be repositioned on refresh`;

    let tableWrapper = document.createElement('div');
    tableWrapper.classList.add('flex', 'items-start')
    tableWrapper.appendChild(table)

    let addColumnBtn = document.createElement('button');
    addColumnBtn.classList.add(theme.darkPrimaryColor, theme.textColor);
    addColumnBtn.style.height = '40px';
    addColumnBtn.style.width = '40px';
    addColumnBtn.innerHTML = `<i class="ri-add-line align-middle text-xl"></i>`;
    tableWrapper.appendChild(addColumnBtn);

    addColumnBtn.addEventListener('click', function () {
        tableWrapper.remove();
        addColumn(obj);
    });


    return tableWrapper;
}

function saveTable(table) {
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


function createTitle(title, subtitle, options) {
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

function createColumnSelector(table, fn) {

    let selector = document.createElement('div');

    let searchInput = components.createInput({ placeholder: `Search columns in '${table.name}'` });
    searchInput.classList.add('w-full');
    selector.appendChild(searchInput);

    let selectorList = document.createElement('div');
    selectorList.classList.add('border', theme.tableBorderColor, theme.mediumBackgroundColor);

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
        console.log(valueSample);

        let label = document.createElement('label');
        label.innerHTML = `${col.name} <span class="text-xs ${theme.mutedTextColor}">(Example values: ${valueSample})</span>`;
        label.prepend(createIcon(col.type));
        item.appendChild(label);


        if (i == 0) {
            input.setAttribute('checked', true);
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

function linkToTable(col) {
    let linkTableForm = document.createElement('div');
    let linkTableActions = document.createElement('div');
    let modal = createModal(linkTableForm, linkTableActions);
    document.querySelector('body').appendChild(modal);

    let foreignKeyInfo = `A foreign key links a column from this table to a column in another table and ensures that entered values already exist in the other column.`

    linkTableForm.appendChild(createTitle(
        'Create Relationship',
        'Link this column to records from another table',
        { tooltip: foreignKeyInfo }
    ));

    let tableSelector = document.createElement('div');
    let selectorHeader = document.createElement('h4');
    selectorHeader.classList.add('my-2');
    selectorHeader.innerHTML = `<h4>Select a Table</h4>`;

    let searchInput = components.createInput({ placeholder: `Search tables in 'album-collection'` });
    searchInput.classList.remove('border');
    searchInput.classList.add(theme.inputBackgroundColor, 'p-1', 'border-b', theme.tableBorderColor, 'w-full');
    tableSelector.appendChild(searchInput);

    tableSelector.classList.add('border', theme.tableBorderColor, theme.mediumBackgroundColor);
    linkTableForm.appendChild(selectorHeader);
    linkTableForm.appendChild(tableSelector);

    let columnSelector = document.createElement('div');
    linkTableForm.appendChild(columnSelector);
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

    return linkTableForm;
}


function linkToMultiple(table) {
    let form = document.createElement('div');
    form.innerHTML = `
      <h4 class="text-lg mb-2">Link Multiple Records to '${table.name}'</h4>
      <p class="mb-2">You need to create a view to link this table records to multiple records from another table.</p>
      <p>Select the table from which you want to link the records from:</p>
      `;
    document.querySelector('body').appendChild(createModal(form));

    let tableSelector = document.createElement('div');
    form.appendChild(tableSelector);
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

    let formActions = document.createElement('div');
    formActions.classList.add('mt-2');
    let createViewBtn = components.createButton('Create View',{style:'primary'});

    formActions.appendChild(components.createButton('Cancel',{style:'secondary'}));
    formActions.appendChild(createViewBtn);
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

        form.parentNode.parentNode.parentNode.remove();
        location.reload();
    });



    let warning = document.createElement('div');
    warning.innerHTML = `<div class="mt-2 text-sm ${theme.mutedTextColor}">A junction table will be created in order to establish a many-to-many relationship between the current and the selected table.</div>`;

    form.appendChild(warning);
    form.appendChild(formActions);

}

function createIcon(type) {
    let icon = document.createElement('i');
    icon.classList.add('ri-' + typeIcon(type), 'align-bottom', 'border', theme.lightBorderColor, 'rounded', 'mr-1');
    return icon;
}

function createDropdownMenu(content) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-2', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '240px';
    menu.style.zIndex = '999';

    menu.appendChild(content);

    return menu;
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

//setTableConstraints(selectTableById(0));

function setTableConstraints(table) {
    let constraintsForm = document.createElement('div');
    constraintsForm.classList.add('space-y-2');
    let modal = createModal(constraintsForm);
    document.querySelector('body').appendChild(modal);

    constraintsForm.appendChild(createTitle(
        'Table Constraints',
        'Constraints limit the type of data that can go into this table',
        { tooltip: 'test' }
    ));

    let newConstraint = document.createElement('div');
    newConstraint.classList.add('flex', 'items-center', 'space-x-2');

    let newConstraintColumn = document.createElement('input');
    newConstraintColumn.classList.add(theme.inputBackgroundColor, 'p-1', 'flex-grow', 'border', theme.darkBorderColor)
    newConstraintColumn.setAttribute('placeholder', 'Select Column');

    let newConstraintType = document.createElement('input');
    newConstraintType.classList.add(theme.inputBackgroundColor, 'p-1', 'flex-grow', 'border', theme.darkBorderColor)
    newConstraintType.setAttribute('placeholder', 'Constraint Type');

    newConstraint.append(newConstraintColumn, newConstraintType, components.createButton('Add Constraint', { icon: 'add',style:'primary' }))
    constraintsForm.appendChild(newConstraint);

    let createConstraintItem = (column, type) => {
        let item = document.createElement('div');
        item.classList.add('border', theme.tableBorderColor, theme.mediumBackgroundColor, 'p-2', 'my-1', 'flex', 'items-center');

        let labelWrapper = document.createElement('div');

        let itemLabel = document.createElement('h4');
        itemLabel.classList.add('mr-2');
        itemLabel.innerHTML = `${column.name}_${type.match(/[A-Z]+/g).join("")}`;

        let itemReferences = document.createElement('div');
        console.log(column);

        itemReferences.innerHTML = `<span class="text-sm">${column.name}</span> <span class="text-xs ${theme.mutedTextColor}">from '${table.name}'</span>`;

        if (column.lookupTable) {
            itemReferences.innerHTML = `<span class="text-sm">${column.lookupField}</span> <span class="text-xs ${theme.mutedTextColor}">from '${column.lookupTable}'</span> <i class="ri-arrow-right-line align-bottom text-sm mr-1 ${theme.mutedTextColor}"></i> <span class="text-sm">${column.name}</span> <span class="text-xs ${theme.mutedTextColor}">from '${table.name}'</span>`;
        }

        let itemDescription = document.createElement('p');
        itemDescription.classList.add('text-sm', theme.mutedTextColor);
        itemDescription.innerText = type;
        //itemDescription.appendChild(createTooltip('Enforces Child Relationship With a Parent Table'));
        labelWrapper.append(itemLabel, itemDescription, itemReferences);

        let deleteBtn = components.createButton('Delete', { icon: 'delete-bin', style:'secondary' });
        deleteBtn.classList.add('ml-auto');
        item.append(labelWrapper, deleteBtn);
        return item;
    }

    let pkConstraints = table.columns.filter(column => column.readOnly);
    pkConstraints.forEach(item => constraintsForm.appendChild(createConstraintItem(item, 'Primary Key')))

    let fkConstraints = table.columns.filter(column => column.type == 'fk');
    fkConstraints.forEach(item => constraintsForm.appendChild(createConstraintItem(item, 'Foreign Key')))

    let closeModal = constraintsForm.appendChild(components.createButton('Close',{style:'secondary'}));
    closeModal.addEventListener('click', function () {
        modal.remove();
    });
}

//setLookupColumn(selectTableById(1))

function setLookupColumn(table) {
    let form = document.createElement('div');
    let actions = document.createElement('div');
    form.classList.add('space-y-2');
    let modal = createModal(form, actions);
    document.querySelector('body').appendChild(modal);

    form.appendChild(createTitle(
        'Set Lookup Column',
        'Lookup columns are used to identify records with a more user-friendly value when retrieving them from another table'
    ));

    let columnSelector = document.createElement('div');
    form.appendChild(columnSelector);

    let selectorHeader = document.createElement('h4');
    selectorHeader.classList.add('my-2');
    selectorHeader.innerHTML = `<h4>Select a Column</h4>`
    columnSelector.appendChild(selectorHeader);

    columnSelector.appendChild(createColumnSelector(table));

    let confirmBtn = components.createButton(`Set Lookup Column`,{style:'primary'});
    actions.appendChild(components.createButton('Cancel',{style:'secondary'}));
    actions.appendChild(confirmBtn);

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
        createMenuItem('Set Lookup Column', setLookupColumn),
        createMenuItem('Delete Table')
    ];

    menuItems.forEach(item => content.appendChild(item));

    addDropdownOutsideClickHandler(menu, function () {

    });

    return menu;
}

function createEditRecordMenu(input, table, value) {
    let content = document.createElement('div');
    let header = document.createElement('h4');
    header.innerHTML = `Edit record in '${table}'`;
    header.classList.add(theme.textColor);
    content.appendChild(header);
    let menu = createDropdownMenu(content);

    let records = selectTableByName(table).records.find(record => record.includes(value));

    let createFormGroup = (field, i) => {
        let formGroup = document.createElement('div');
        let control = document.createElement('input');
        control.classList.add(theme.inputBackgroundColor, theme.textColor, 'p-2', 'w-full');
        let label = document.createElement('label');
        label.classList.add(theme.textColor, 'block');
        label.innerHTML = `${field.name}`;
        label.prepend(createIcon(field.type));
        if (records) { control.setAttribute('value', records[i]); }
        formGroup.append(label, control);

        if (i == 1) {
            label.classList.add('font-semibold');
            label.prepend(createIcon('lookup'));
            control.addEventListener('keyup', function () {
                let newValue = control.value;
                input.setAttribute('value', newValue);
            });
        }

        return formGroup;
    }

    selectTableByName(table).columns.forEach((field, i) => content.appendChild(createFormGroup(field, i)));

    addDropdownOutsideClickHandler(menu, function () {
        let selectedTable = selectTableById(activeTable);
        let editedRecord = selectedTable.records.find(record => record.includes(value));
        let recordIndex = editedRecord.indexOf(value);
        editedRecord[recordIndex] = input.value;
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectedTable);
    });

    let deleteRecordBtn = components.createButton('Delete Record', { icon: 'delete-bin' });
    let goToTableBtn = components.createButton('Go to Table', { icon: 'table' });

    content.appendChild(deleteRecordBtn);

    return menu;
}

function createRecordListMenu(input, table, field, cell) {
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
            recordsList.classList.add(theme.primaryColor, 'bg-opacity-70', theme.textColor, 'flex', 'p-1', 'rounded', 'items-center');
            recordsList.addEventListener('click', function () {
                input.setAttribute('value', input.value.split(',').map(v => v !== record[columnPosition] ? v : '').filter(v => v.length > 0).join(','));
                menu.remove();
                input.parentNode.append(createRecordListMenu(input, table, field, input.value));
            });
        } else {
            recordsList.classList.add(theme.primaryColor, 'bg-opacity-20', theme.textColor, 'flex', 'p-1', 'rounded', 'items-center');
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
    listWrapper.classList.add('border', 'space-y-2', 'p-1', theme.mediumBorderColor);
    menu.appendChild(listWrapper);

    let newRecordButton = components.createButton('New Record', { icon: 'add' });
    menu.appendChild(newRecordButton);

    let createList = (records) => {
        records.forEach((summaryValue) => {
            selectTableByName(table).records.filter(record => record.includes(summaryValue)).forEach((record, i) => listWrapper.appendChild(createRecordsList(record, i)));;
        });

    }

    createList(summaryRecords);



    addDropdownOutsideClickHandler(menu, function () {
        //console.log(menu);
        let selectedTable = selectTableById(activeTable);
        let editedRecord = selectedTable.records.find(record => record.includes(cell));
        let recordIndex = editedRecord.indexOf(cell);
        editedRecord[recordIndex] = input.value;
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectedTable);
    });



    return menu;
}

function createLookupMenu(input, table, field, value) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-1', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';
    let menuHeader = document.createElement('h4');
    menuHeader.classList.add(theme.textColor);
    menuHeader.innerHTML = `Lookup records in '${table}'`;
    let menuLookupField = document.createElement('div');
    menuLookupField.classList.add(theme.mutedTextColor, 'text-sm')


    let columnPosition = selectTableByName(table).columns.map((col, i) => col.name == field ? i : '').join('');
    let summaryRecords = selectTableByName(table).records.map(record => record[columnPosition]);
    let summaryIds = selectTableByName(table).records.map(record => record[0]);
    let columnType = selectTableByName(table).columns.map((col, i) => col.name == field ? col.type : '').join('');

    menuLookupField.innerHTML = `Lookup field:`;
    menuLookupField.appendChild(createIcon(columnType));
    let lookupLabel = document.createElement('span');
    lookupLabel.innerText = field;
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

function isNodeChildOf(obj, parentObj) {
    while (obj != undefined && obj != null && obj.tagName.toLowerCase() != 'body') {
        if (obj == parentObj) {
            return true;
        }
        obj = obj.parentNode;
    }
    return false;
}

function removeDropdownOutsideClickHandler(menu) {
    if (menu.outsideClickHandler) {
        document.removeEventListener('click', menu.outsideClickHandler);
    }
}

function addDropdownOutsideClickHandler(menu, callback) {
    function handler(event) {
        var isClickInsideElement = isNodeChildOf(event.target, menu);
        if (!isClickInsideElement) {
            callback(menu);
            menu.remove();
            document.removeEventListener('click', handler);
            menu.outsideClickHandler = null;
        }
    }

    removeDropdownOutsideClickHandler(menu);

    setTimeout(function () {
        document.addEventListener('click', handler);
        menu.outsideClickHandler = handler;
    }, 0);
}


var doubleClickEvent = document.createEvent('MouseEvents');
doubleClickEvent.initEvent('dblclick', true, true);

//document.querySelectorAll('.rendered-cell')[1].dispatchEvent(doubleClickEvent);





