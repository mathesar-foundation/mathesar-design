import { theme } from './themes.js';
import { components } from './components.js';
import { getColumnType, saveTable, removeDropdownOutsideClickHandler, selectTableByName, createRecordListMenu, createEditRecordMenu, selectTableById, activeTable, columnByName } from './main';
import { createLookupMenu } from "./createLookupMenu";
import { addDropdownOutsideClickHandler } from './createDropdownMenu';
import { icon } from './iconMap.js';
import { setTableConstraints } from './setTableConstraints.js';
import { active } from 'd3-transition';
import { createModal } from './createModal.js';


if (sessionStorage.getItem('recordPreview') === null) {
    sessionStorage.setItem('recordPreview', false);
}

//CREATE TABLE
export function createTable(obj) {

    let rowClasses = ['t-row', 'border-b', theme.tableBorderColor];
    let rowHeaderClasses = ['t-row-header', 'p-3', theme.mutedTextColor, 'border-r', theme.tableBorderColor, 'text-xs'];
    let cellClasses = ['t-cell', 'border-r', theme.tableBorderColor, 'editable-cell'];

    let createHeader = (col, i) => {

        col.table = obj.name;
        let header = document.createElement('div');
        header.style.width = '240px';
        header.style.position = 'relative';
        header.style.cursor = 'pointer';
        header.classList.add('t-cell', 'p-2', theme.textColor, 'border-r', theme.tableBorderColor, 'flex', 'items-center');

        let headerIcon = components.createIcon(icon[col.type], { style: 'type' });

        header.innerHTML = `
        <div>
            <div>${headerIcon.outerHTML} ${col.name}</div>
        </div>
        `;

        let columnConstraints = obj.constraints.find(constraint => constraint.columns.includes(col.name));

        if (columnConstraints !== undefined && columnConstraints.type == 'Foreign Key') {

            let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
            headerIcon = components.createIcon(icon[linkedColumnType], { style: 'type' })
            header.innerHTML = `
            <div>
                <div>${headerIcon.outerHTML} ${col.name}</div>
                <div class="text-xs ${theme.mutedTextColor}"></div>
            </div>`;

            let referenceColor = selectTableByName(col.lookupTable).color;

            let foreignKeyReference = document.createElement('span');
            foreignKeyReference.classList.add('text-sm', theme.mutedTextColor, 'block');
            foreignKeyReference.style.position = 'relative';
            foreignKeyReference.innerHTML = `<span class=""><i class="ri-key-fill align-bottom text-${referenceColor}-600"></i></span> ${col.lookupTable}.${col.lookupField}`;
            header.childNodes[1].append(foreignKeyReference);

            let info = document.createElement('div');
            info.classList.add('border', 'p-2', theme.tableBorderColor, theme.darkBackgroundColor, 'whitespace-nowrap');
            info.style.position = 'absolute';
            info.innerHTML = `
            <h5>Referenced Table</h5>
            <div><span class="${theme.textColor}">${col.lookupTable}</span> <a href="#" class="${theme.primaryTextColor}">Open</a></div>
            <h5>Referenced Column(s)</h5>
            
            <div><a href="javascript:void(0)" class="${theme.textColor}">${columnConstraints.columns.join(',')}</a></div>
            `;
        }

        let headerMenuToggle = document.createElement('button');
        headerMenuToggle.innerHTML = `<i class="ri-arrow-down-s-line align-bottom"></i>`;
        headerMenuToggle.classList.add('ml-auto');
        header.appendChild(headerMenuToggle);

        header.addEventListener('click', openColumnMenu);

        let createMenuItem = function (label, fn, options) {
            let menuItem = document.createElement('a');
            menuItem.classList.add('block', 'm-1', 'py-1', 'px-2');
            menuItem.setAttribute('href', 'javascript:void(0)');
            menuItem.innerText = label;
            let hoverClasses = [theme.primaryColor, 'bg-opacity-30', 'rounded'];
            menuItem.addEventListener('click', function () {
                fn(col);
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
            menu.style.top = '56px';
            menu.style.left = '0';
            menu.style.position = 'absolute';

            // CREATE MENU ITEMS
            let dataTypeOption = document.createElement('a');
            dataTypeOption.setAttribute('href', 'javascript:void(0)');
            dataTypeOption.classList.add('m-1', 'items-center', 'block');
            let dataTypeLabel = document.createElement('div');
            dataTypeLabel.classList.add('text-base', 'p-1');
            dataTypeOption.appendChild(dataTypeLabel);

            let columnTypeIcon = components.createIcon(icon[col.type], { style: 'type' });
            dataTypeLabel.innerHTML = `${columnTypeIcon.outerHTML} ${col.type}`;

            //dataTypeOption.addEventListener('click', openDataTypeMenu);

            console.log(columnConstraints);

            if (col.type == 'fk') {
                let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
                let columnTypeIcon = components.createIcon(icon[linkedColumnType], { style: 'type' });
                //dataTypeIcon.classList.add('border', 'align-bottom', 'border-gray-500', 'rounded', 'mr-2');
                dataTypeLabel.innerHTML = `
                <div class="p-1">${columnTypeIcon.outerHTML} ${linkedColumnType}</div>
                <div class="text-sm">
                <div class="mx-1 ${theme.mutedTextColor}">Linked to <i class="ri ri-table-line align-bottom"></i> ${columnConstraints.referenceTable}</div>
                </div>`;
                //<a href="javascript:void(0)" class="${theme.primaryTextColor}">FK_${col.name}</a>
                //<div><i class="ri-layout-column-line align-bottom"></i> ${columnConstraints.referenceColumns.map(col => col).join('-')}</div>
            }



            //ADD MENU ITEMS
            let menuItems = [
                dataTypeOption,
                createMenuDivider(),
                //createMenuItem('Link to Another Table', linkToTable, { icon: 'key' }),
                createMenuItem('Insert New Column'),
                createMenuItem('Rename Column'),
                createMenuItem('Duplicate Column'),
                createMenuItem('Filter Column'),
                createMenuItem('Sort Column'),
                createMenuItem('Group Column'),
                createMenuDivider(),
                createMenuItem('Show Record Preview', setRecordPreview),
                createMenuDivider(),
                createMenuItem('Delete Column', menuAction, { icon: 'delete-bin' })
            ];

            if (col.showPreview) {
                menuItems.splice(9, 1, createMenuItem(`Hide Record Preview`, setRecordPreview));
            }

            if (col.type == 'fk') {
                menuItems.splice(1, 0, createMenuItem(`Edit Foreign Key Constraint`, function(){
                    setTableConstraints(obj)
                }));
            }

            menuItems.forEach(item => menu.appendChild(item));
            return menu;
        };

        let removeLink = function () {
        };

        function menuAction(menu) {
            return function () {
                menu.parentElement.removeChild(menu);
                removeDropdownOutsideClickHandler(menu);
            };
        }

        function openColumnMenu(e) {
            let menu = createHeaderMenu(col);
            header.appendChild(menu);
            addDropdownOutsideClickHandler(menu, () => console.log("Clicked outside when openColumnMenu was open"));
        }

        return header;
    };

    let getColumnByPosition = (position) => obj.columns[position];

    let createCell = (cell) => {
        let cellElement = document.createElement('div');
        cellElement.classList.add(...cellClasses);
        cellElement.style.width = '240px';
        let renderedCell = document.createElement('div');
        renderedCell.classList.add(theme.textColor, 'p-2', 'rendered-cell', 'h-full', 'space-y-1', 'border', 'border-opacity-0');
        renderedCell.style.cursor = 'pointer';
        renderedCell.tabIndex = 0;

        let cellInput = components.createInput({ value: cell.value });
        cellInput.classList.add('p-2', 'w-full');
        cellInput.classList.remove('border');
        cellInput.autocomplete = 'off';

        renderedCell.innerHTML = cell.value;

        if (cell.type == 'fk') {
            if (cell.value == '') {
                renderedCell.innerHTML = `<i class="ri-search-line text-xs ${theme.mediumBackgroundColor} p-1 rounded"></i>`;
            } else {
                if (columnByName(cell.column).showPreview) {
                    renderedCell.innerHTML = '';
                    renderedCell.appendChild(createRecordSummary(cell));
                } else {
                    renderedCell.innerHTML = '';
                    renderedCell.appendChild(createRecordLink(cell));
                }
            }
        }

        if (cell.type == 'date') {
            cellInput.placeholder = 'YYYY-MM-DD';
            renderedCell.innerHTML = cell.value;
        }



        if (cell.type == 'boolean') {
            renderedCell.innerHTML = '';

            let createCheckbox = function (value) {
                let booleanInput = document.createElement('input');
                booleanInput.type = 'checkbox';

                if (value === true) {
                    booleanInput.checked = true;
                    return booleanInput
                } else if (value === false) {
                    booleanInput.checked = false;
                    return booleanInput
                } else {
                    booleanInput.indeterminate = true;
                    renderedCell.classList.add(theme.lightBackgroundColor, 'bg-opacity-20');
                    return booleanInput
                }
            }

            renderedCell.append(createCheckbox(cell.value))

            renderedCell.querySelector('input').addEventListener('change', function (event) {
                renderedCell.classList.remove(theme.lightBackgroundColor, 'bg-opacity-20');
            });

        }

        // EMPTY VALUES
        if (cell.value === '') {
            renderedCell.innerHTML = 'NULL'
            renderedCell.classList.replace(theme.textColor, theme.mutedTextColor);
            renderedCell.classList.add('italic', theme.lightBackgroundColor, 'bg-opacity-20');
        }



        renderedCell.addEventListener('click', function () {
            if (cell.type == 'fk') {
                cellElement.appendChild(createLookupMenu(cell));
            } else {

                renderedCell.addEventListener('keydown', deleteCell);

                addCellOutsideClickHandler(renderedCell, function () {
                    console.log('test');
                });

                //cellSelection(cell);
                //cellElement.classList.add('cell-selected');
                renderedCell.classList.add(theme.primaryBorderColor);
                renderedCell.classList.replace('border-opacity-0', 'border-opacity-100');
                renderedCell.setAttribute('selected', true);
            }
        });

        renderedCell.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            cellElement.appendChild(createCellMenu(cell));
            return false;
        }, false);

        renderedCell.addEventListener('dblclick', function () {
            if (cell.type !== 'fk') {
                renderedCell.remove();
                cellElement.append(cellInput);
                cellInput.focus();
            }
        });

        cellInput.addEventListener('blur', function () {
            document.querySelector('.table-wrapper').innerHTML = '';
            obj.records[cell.row].splice(cell.position, 1, cellInput.value);
            saveTable(obj);
        });

        let cellConstraints = obj.constraints.find(constraint => constraint.columns.includes(cell.column));

        function deleteCell(event) {
            if (event.key === "Backspace" && event.target.getAttribute('selected')) {

                if (cellConstraints && cellConstraints.type == 'Not Null') {
                    let warningContent = document.createElement('div');
                    warningContent.innerHTML = `
                    <h3 class="text-lg">Can't Delete Value</h3>
                    <p>Cannot insert the value NULL into column <span>${cell.column}</span>. The column does not allow nulls.</p>
                    <div class="mt-2 text-right">
                    ${components.createButton('Ok', { style: 'primary' }).outerHTML}
                    </div>
                    `


                    document.querySelector('body').append(createModal(warningContent))
                    console.log(cellConstraints.type, cell.position);
                } else {
                    document.querySelector('.table-wrapper').innerHTML = '';
                    obj.records[cell.row].splice(cell.position, 1, '');
                    saveTable(obj);
                }

            }
        }


        cellElement.append(renderedCell);
        //
        return cellElement;
    };

    let createRow = (record, index) => {
        let rowCount = index + 1;
        let row = document.createElement('div');
        row.classList.add(...rowClasses);
        let rowNumber = document.createElement('div');
        rowNumber.classList.add(...rowHeaderClasses);
        rowNumber.style.width = '40px';
        rowNumber.innerHTML = `${rowCount}`;
        row.appendChild(rowNumber);
        record.forEach((cell, i) => {
            row.appendChild(createCell({
                value: cell,
                column: getColumnByPosition(i).name,
                lookupTable: getColumnByPosition(i).lookupTable,
                lookupField: getColumnByPosition(i).lookupField,
                row: index,
                type: getColumnByPosition(i).type,
                table: obj.name,
                position: i
            }))
        });
        return row;
    };


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
        };

        columns.forEach(function (col, i) {
            let cell = document.createElement('div');
            cell.classList.add(...cellClasses);
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

                }
            });
        });
        return row;
    };

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
    //headerRow.style.borderBottomWidth = '4px';
    headerRow.appendChild(headerRowSelect);
    headerWrapper.appendChild(headerRow);
    headerWrapper.classList.add('t-head', 'row-wrapper');

    obj.columns.forEach((col, i) => headerRow.appendChild(createHeader(col, i)));
    obj.records.forEach((record, i) => rowWrapper.appendChild(createRow(record, i)));
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
    tableWrapper.classList.add('flex', 'items-start');
    tableWrapper.appendChild(table);

    let addColumnBtn = document.createElement('button');
    addColumnBtn.classList.add(theme.darkPrimaryColor, theme.textColor);
    addColumnBtn.style.height = '40px';
    addColumnBtn.style.width = '40px';
    addColumnBtn.innerHTML = `<i class="ri-add-line align-middle text-xl"></i>`;
    tableWrapper.appendChild(addColumnBtn);

    let newColumnMenu = document.createElement('div');
    newColumnMenu.classList.add('border', 'p-2', theme.mediumBackgroundColor);
    newColumnMenu.innerHTML = `
    Column Types
    <div>
    Types Selector
    <ul class="border border-gray-600">
    <li>Reference Type</li>
    </ul>
    </div>
    Column from Another Table
    `;

    //tableWrapper.appendChild(newColumnMenu);
    addColumnBtn.addEventListener('click', function () {
        tableWrapper.innerHTML = '';
        obj.columns.push({ name: 'Column', type: 'text' });
        obj.records.forEach(record => record.push(''));
        saveTable(obj);
    });


    return tableWrapper;
};

function getRecordByValue(table, column, value) {
    //console.log(table,column,value);
    let lookupTable = selectTableByName(table);
    let columns = selectTableByName(table).columns;

    const isColumn = (col) => col.name == column;

    let columnPosition = columns.findIndex(isColumn);
    //console.log(columnPosition)
    let records = lookupTable.records.find(r => r.includes(value));

    //console.log(records)
    if (records !== undefined) {
        return records[columnPosition];
    } else {
        return '';
    }
    ////console.log(lookupTable.records.map(record => record[columnPosition]));
}

function createRecordLink(cell) {
    let renderedValue = getRecordByValue(cell.lookupTable, cell.lookupField, cell.value);
    let link = document.createElement('div');
    link.classList.add('bg-' + selectTableByName(cell.lookupTable).color + '-600', 'rounded', 'px-1', 'inline-block', 'bg-opacity-50', 'mr-1');
    link.innerHTML = renderedValue;
    return link;
}

function createRecordSummary(cell) {
    let referencedTable = selectTableByName(cell.lookupTable);
    let summary = referencedTable.columns.map(col => `<span class="${theme.mutedTextColor}">${col.name}:</span> ${getRecordByValue(cell.lookupTable, col.name, cell.value)}`).slice(0, 5).join(' ');
    let link = document.createElement('div');
    link.classList.add('bg-' + selectTableByName(cell.lookupTable).color + '-600', 'rounded', 'p-1', 'bg-opacity-20', 'mr-1', 'text-sm');
    link.innerHTML = summary;
    return link;
}

function setRecordPreview(column) {
    if (column.showPreview) {
        selectTableByName(column.table).columns.find(col => col == column).showPreview = false;
    } else {
        selectTableByName(column.table).columns.find(col => col == column).showPreview = true;
    }
    document.querySelector('.table-wrapper').innerHTML = '';
    saveTable(selectTableByName(column.table));
    //sessionStorage.setItem('recordPreview', true);
    //.filter(col => col == column).recordPreview = true;
    //console.log(selectTableByName(column.table))
    //saveTable(selectTableByName(column.table));
}

function cellSelection(cell) {
    console.log(cell);
}



function removeCellOutsideClickHandler(menu) {
    if (menu.outsideClickHandler) {
        document.removeEventListener('click', menu.outsideClickHandler);
    }
}

function addCellOutsideClickHandler(menu, fn) {

    function handler(event) {
        var isClickInsideElement = isNodeChildOf(event.target, menu); //|| event.target.tagName === 'INPUT';
        if (!isClickInsideElement) {
            fn();
            document.removeEventListener('click', handler);
            menu.outsideClickHandler = null;
            menu.classList.replace('border-opacity-100', 'border-opacity-0');
            menu.setAttribute('selected', false);
        }
    }

    removeCellOutsideClickHandler(menu);

    setTimeout(function () {
        document.addEventListener('click', handler);
        menu.outsideClickHandler = handler;
    }, 0);
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

function createCellMenu(cell) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-1', 'border', theme.lightBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';

    let createItem = function (option) {
        let item = document.createElement('a');
        item.href = 'javascript:void(0)';
        item.classList.add('p-1', theme.textColor, 'block')
        item.innerHTML = `<i class="${option.icon} ${theme.mutedTextColor} mr-1 align-bottom"></i> ${option.label}`;
        return item;

    }

    let options = [
        {
            label: 'Set Value as NULL',
            icon: 'ri-forbid-line'
        }, {
            label: 'Cut',
            icon: 'ri-scissors-cut-line'
        }, {
            label: 'Copy',
            icon: 'ri-clipboard-line'
        }, {
            label: 'Paste'
        }];

    options.forEach(option => {
        menu.append(createItem(option));
    });

    addDropdownOutsideClickHandler(menu, function () {

    });

    return menu;
}
