import { theme } from './themes.js';
import { components } from './components.js';
import { getColumnType, saveTable, selectTableByName, createRecordListMenu, createEditRecordMenu, selectTableById, activeTable, columnByName } from './main';
import { createLookupMenu } from "./createLookupMenu";
import { addDropdownOutsideClickHandler, removeDropdownOutsideClickHandler } from './createDropdownMenu';
import { icon } from './iconMap.js';
import { createModal } from './createModal.js';
import { setColumnPreferences } from './setColumnPreferences.js';


//if (sessionStorage.getItem('recordPreview') === null) { sessionStorage.setItem('recordPreview', false); }

//CREATE TABLE
export function createTable(obj) {

    let rowClasses = ['t-row', 'border-b', theme.tableBorderColor];
    let rowHeaderClasses = ['t-row-header', 'p-3', theme.mutedTextColor, 'border-r', theme.tableBorderColor, 'text-xs', theme.primaryTextColor];
    let cellClasses = ['t-cell', 'border-r', theme.tableBorderColor, 'editable-cell'];

    let createHeader = (col, i) => {

        let header = document.createElement('div');
        header.style.width = '200px';
        header.style.position = 'relative';
        header.style.cursor = 'pointer';
        header.classList.add('t-cell', 'p-2', theme.textColor, 'border-r', theme.tableBorderColor, 'flex', 'items-center');

        let headerIcon = components.createIcon(icon[col.type], { style: 'type' });

        header.innerHTML = `<div><div>${headerIcon.outerHTML} ${col.name}</div></div>`;

        if (obj.type == 'table') {
            let columnConstraints = obj.constraints.find(constraint => constraint.columns.includes(col.name));

            if (columnConstraints !== undefined && columnConstraints.type == 'Foreign Key') {

                let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
                headerIcon = components.createIcon(icon[linkedColumnType], { style: 'type' })
                header.innerHTML = `
                <div>
                    <div>${headerIcon.outerHTML} ${col.name}</div>
                    <div class="text-xs $text-zinc-500"></div>
                </div>`;

                let referenceColor = selectTableByName(col.lookupTable).color;

                let foreignKeyReference = document.createElement('span');
                foreignKeyReference.classList.add('text-sm', theme.mutedTextColor, 'block');
                foreignKeyReference.style.position = 'relative';
                foreignKeyReference.innerHTML = `<span class=""><i class="ri-key-fill align-bottom text-${referenceColor}-600"></i></span> ${col.lookupTable}.${col.lookupField}`;
                header.childNodes[1].append(foreignKeyReference);
            }

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

            if (col.type == 'fk') {
                let columnConstraints = obj.constraints.find(constraint => constraint.columns.includes(col.name));
                let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
                let columnTypeIcon = components.createIcon(icon[linkedColumnType], { style: 'type' });
                dataTypeLabel.innerHTML = `
                <div class="p-1">${columnTypeIcon.outerHTML} ${linkedColumnType}</div>
                <div class="text-sm">
                <div class="mx-1 $text-zinc-500">Linked to <i class="ri ri-table-line align-bottom"></i> ${columnConstraints.referenceTable}</div>
                </div>`;
            }

            //ADD MENU ITEMS
            let menuItems = [
                dataTypeOption,
                createMenuDivider(),
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
                menuItems.splice(1, 0, createMenuItem(`Table Link Preferences`, function () {
                    setColumnPreferences(
                        {
                            column: getColumnByPosition(i).name,
                            lookupTable: getColumnByPosition(i).lookupTable,
                            lookupField: getColumnByPosition(i).lookupField,
                            type: getColumnByPosition(i).type,
                            table: obj.name,
                        }
                    )
                }));

                menuItems.splice(2, 0, createMenuItem(`Remove Table Link`, function () {

                }));


            }

            menuItems.forEach(item => menu.appendChild(item));
            return menu;
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
        cellElement.style.width = '200px';

        let renderedCell = document.createElement('div');
        renderedCell.classList.add(theme.textColor, 'p-2', 'rendered-cell', 'space-y-1', 'border', 'border-opacity-0','flex','items-center');

        renderedCell.tabIndex = 0;

        let cellInput = components.createInput({ value: cell.value });
        cellInput.classList.add('p-2', 'w-full','h-full');
        cellInput.classList.remove('border');
        cellInput.autocomplete = 'off';
        cellInput.style.borderWidth = '2px';

        renderedCell.innerHTML = cell.value;

        let dropdownToggle = document.createElement('div');
        dropdownToggle.classList.add('ml-auto', 'dropdown-toggle', 'rounded', theme.mediumBackgroundColor);
        dropdownToggle.innerHTML = `<i class="ri-arrow-down-s-fill block" style="line-height:16px"></i>`;

        dropdownToggle.addEventListener('mouseenter', function () {
            dropdownToggle.classList.replace(theme.mediumBackgroundColor, theme.primaryColor);
        });

        dropdownToggle.addEventListener('mouseleave', function () {
            dropdownToggle.classList.replace(theme.primaryColor, theme.mediumBackgroundColor);
        });

        dropdownToggle.addEventListener('click', function () {
            cellElement.appendChild(createLookupMenu(cell));
        });



        if (cell.type == 'fk') {

            if (columnByName(cell.column).showPreview) {
                renderedCell.innerHTML = '';
                renderedCell.appendChild(createRecordSummary(cell));
            } else {
                renderedCell.innerHTML = '';
                renderedCell.appendChild(createRecordLink(cell));
            }

            renderedCell.append(dropdownToggle);


        }

        if (cell.type == 'date') {
            cellInput.placeholder = 'YYYY-MM-DD';
            renderedCell.innerHTML = cell.value;
        }

        if (cell.value == '') {
            cellInput.placeholder = 'NULL';
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
                    booleanInput.title = 'NULL';
                    renderedCell.classList.add(theme.lightBackgroundColor, 'bg-opacity-20','h-full');

                    cellElement.append(components.createTooltip(cellElement, 'NULL'));



                    return booleanInput;
                }
            }

            renderedCell.append(createCheckbox(cell.value))

            renderedCell.querySelector('input').addEventListener('change', function (event) {
                renderedCell.classList.remove(theme.lightBackgroundColor, 'bg-opacity-20');
            });

        }

        // EMPTY VALUES
        if (cell.value === '') {
            renderedCell.innerHTML = 'NULL';

            renderedCell.classList.replace(theme.textColor, theme.mutedTextColor);
            renderedCell.classList.add('italic', theme.lightBackgroundColor, 'bg-opacity-20');

            if (cell.type == 'fk') {
                renderedCell.append(dropdownToggle);
            }
        }



        renderedCell.addEventListener('click', function () {



            addCellOutsideClickHandler(renderedCell, function () {
                console.log('test');
            });

            //cellSelection(cell);
            //cellElement.classList.add('cell-selected');
            renderedCell.classList.add(theme.primaryBorderColor);
            renderedCell.classList.replace('border-opacity-0', 'border-opacity-100');
            renderedCell.setAttribute('selected', true);

            if (cell.type == 'fk') {

            }

        });

        renderedCell.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            cellElement.appendChild(createCellMenu(cell));
            return false;
        }, false);

        renderedCell.addEventListener('dblclick', function () {
            if (cell.type == 'fk') {
                cellElement.appendChild(createLookupMenu(cell));



            } else {
                renderedCell.remove();

                cellElement.append(cellInput);
                cellInput.focus();
            }
        });

        cellInput.addEventListener('focus', function () {
            cellInput.classList.add('border', theme.primaryBorderColor);
            cellInput.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.5)';
            cellInput.style.outline = 'none';
            cellInput.style.margin = '-2px';
            cellInput.selectionStart = cellInput.selectionEnd = cellInput.value.length;
        });

        cellInput.addEventListener('keydown', function () {
            cellInput.placeholder = '';
        });

        cellInput.addEventListener('blur', function () {
            document.querySelector('.table-wrapper').innerHTML = '';
            obj.records[cell.row].splice(cell.position, 1, cellInput.value);
            saveTable(obj);
        });

        if (obj.type == 'table') {
            let cellConstraints = obj.constraints.find(constraint => constraint.columns.includes(cell.column));

            renderedCell.addEventListener('keydown', deleteCell);

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
                    } else {
                        document.querySelector('.table-wrapper').innerHTML = '';
                        obj.records[cell.row].splice(cell.position, 1, '');
                        saveTable(obj);
                    }

                }
            }
        }

        cellElement.append(renderedCell);
        //cellElement.append(cellInput);
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
            cell.style.width = '200px';
            let cellInput = components.createInput({ placeholder: placeholderValue(col) });
            cellInput.classList.add('p-2', 'w-full','h-full');
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
    table.classList.add(theme.backgroundColor, 'bg-opacity-60');
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
    tableWrapper.classList.add('flex', 'grow');
    tableWrapper.style.overflowX = 'scroll';
    tableWrapper.appendChild(table);

    let addColumnBtn = document.createElement('button');
    addColumnBtn.classList.add(theme.darkPrimaryColor, theme.textColor, 'flex-shrink-0');
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

    addColumnBtn.addEventListener('click', function () {
        tableWrapper.innerHTML = '';
        obj.columns.push({ name: 'Column', type: 'text' });
        obj.records.forEach(record => record.push(''));
        saveTable(obj);
    });

    let tableFooter = document.createElement('div');
    tableFooter.classList.add('mt-auto', 'p-2', theme.textColor, 'w-full')

    document.querySelector('.table-wrapper').innerHTML += `<div class="mt-auto $text-zinc-800 p-2">${obj.records.length} Records</div>`;

    return tableWrapper;
};

function getRecordByValue(table, column, value) {

    let lookupTable = selectTableByName(table);
    let columns = selectTableByName(table).columns;

    const isColumn = (col) => col.name == column;

    let columnPosition = columns.findIndex(isColumn);
    let records = lookupTable.records.find(r => r.includes(value));

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
    let summary = referencedTable.columns.map(col => `<span class="$text-zinc-500">${col.name}:</span> ${getRecordByValue(cell.lookupTable, col.name, cell.value)}`).slice(0, 5).join(' ');
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

            var toggle = menu.querySelector('.dropdown-toggle');
            if (toggle) {
                //toggle.parentNode.removeChild(toggle);
            }
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
        item.innerHTML = `<i class="${option.icon} $text-zinc-500 mr-1 align-bottom"></i> ${option.label}`;
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
