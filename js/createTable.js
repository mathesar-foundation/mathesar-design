import { theme } from './themes.js';
import { components } from './components.js';
import { getColumnType, saveTable, removeDropdownOutsideClickHandler, selectTableByName, createRecordListMenu, createEditRecordMenu } from './main';
import { createLookupMenu } from "./createLookupMenu";
import { addDropdownOutsideClickHandler } from './createDropdownMenu';
import { icon } from './iconMap.js';
import { setTableConstraints } from './setTableConstraints.js';


//CREATE TABLE
export function createTable(obj) {

    let recordTable = obj.columns.reduce(function (a, b) {
        a.push(b.referencedTable);
        return a;
    }, []);

    let summaryOf = obj.columns.reduce(function (a, b) {
        a.push(b.summaryOf);
        return a;
    }, []);

    let lookupField = obj.columns.reduce(function (a, b) {
        a.push(b.lookupField);
        return a;
    }, []);

    let lookupTable = obj.columns.reduce(function (a, b) {
        a.push(b.lookupTable);
        return a;
    }, []);

    let rowClasses = ['t-row', 'border-b', theme.tableBorderColor];
    let rowHeaderClasses = ['t-row-header', 'p-3', theme.mutedTextColor, 'border-r', theme.tableBorderColor, 'text-xs'];
    let cellClasses = ['t-cell', 'border-r', theme.tableBorderColor, 'editable-cell'];

    let createHeader = (col) => {
        //console.log(col)
        let header = document.createElement('div');
        header.style.width = '240px';
        header.style.position = 'relative';
        header.classList.add('t-cell', 'p-2', theme.textColor, 'border-r', theme.tableBorderColor, 'flex', 'items-center');
        
        let headerIcon = components.createIcon(icon[col.type], { style: 'type' });

        header.innerHTML = `
        <div>
            <div>${headerIcon.outerHTML} ${col.name}</div>
        </div>
        `;

        if (col.type == 'fk') {
            let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
            headerIcon = components.createIcon(icon[linkedColumnType], { style: 'type' })
            header.innerHTML = `
            <div>
                <div>${headerIcon.outerHTML} ${col.name}</div>
                <div class="text-xs ${theme.mutedTextColor}"></div>
            </div>`;

            let referenceColor = selectTableByName(col.lookupTable).color;
            //console.log(referenceColor)

            let foreignKeyReference = document.createElement('a');
            foreignKeyReference.href = 'javascript:void(0)'
            foreignKeyReference.classList.add('text-sm',theme.mutedTextColor,'block');
            foreignKeyReference.style.position = 'relative';
            foreignKeyReference.innerHTML = `<span class=""><i class="ri-key-fill align-bottom text-${referenceColor}-600"></i></span> ${col.lookupTable}.${col.lookupField}`;
            header.childNodes[1].append(foreignKeyReference);

            let info = document.createElement('div');
            info.classList.add('border','p-2',theme.tableBorderColor,theme.darkBackgroundColor,'whitespace-nowrap');
            info.style.position = 'absolute';
            info.innerHTML = `
            <h5>Referenced Table</h5>
            <div><span class="${theme.textColor}">${col.lookupTable}</span> <a href="#" class="${theme.primaryTextColor}">Open</a></div>
            <h5>Referenced Column(s)</h5>
            <div><a href="#" class="${theme.textColor}">${col.lookupField}</a></div>
            `;
            


            foreignKeyReference.addEventListener('click',function(){
                setTableConstraints(obj);
            });

            foreignKeyReference.addEventListener('mouseenter',function(){
                foreignKeyReference.append(info);
                console.log('test')
            });

            foreignKeyReference.addEventListener('mouseleave',function(){
                foreignKeyReference.removeChild(info);
                console.log('test')
            });
        }

        //let headerLabel = document.createElement('div');
        //let headerIcon = components.createIcon(icon[col.type], { style: 'type' });
        //if (col.type == 'fk') {
        //    let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
        //    headerIcon = components.createIcon(icon[linkedColumnType], { style: 'type' });
        //}
        //let headerColumnName = document.createElement('span');
        //headerColumnName.innerHTML = col.name;
        //header.append(headerLabel);
        //headerLabel.append(headerIcon,headerColumnName);
//
//        //if (col.type == 'fk') {
//        //    let foreignKeyIcon = document.createElement('i');
//        //    foreignKeyIcon.classList.add('ri-key-fill', 'mr-1', 'text-xs');
//        //    headerLabel.insertBefore(foreignKeyIcon, headerColumnName);
//        //}
//
//        //if (col.isLookup) {
//        //    let lookupIcon = components.createIcon('search');
//        //    lookupIcon.classList.add('ml-2', 'text-sm');
//        //    headerLabel.append(lookupIcon);
//        //}
//
//        ////RENAME HEADER
//        //headerLabel.addEventListener('click', function () {
//        //    headerLabel.innerHTML = '';
//        //    let renameInput = components.createInput({ value: col.name });
//        //    renameInput.classList.add(theme.inputBackgroundColor, 'px-1');
//        //    renameInput.classList.remove('p-1');
//        //    headerLabel.append(renameInput);
//        //    renameInput.focus();
//        //    renameInput.addEventListener('blur', function () {
        //        col.name = renameInput.value;
        //        tableWrapper.remove();
        //        saveTable(obj);
        //    });
        //});

        let headerMenuToggle = document.createElement('button');
        headerMenuToggle.innerHTML = `<i class="ri-arrow-down-s-line align-bottom"></i>`;
        headerMenuToggle.classList.add('ml-auto');
        header.appendChild(headerMenuToggle);
        headerMenuToggle.addEventListener('click', openColumnMenu);

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
            dataTypeOption.classList.add('m-1', 'py-1', 'px-2', 'flex', 'items-center', 'block');
            let dataTypeLabel = document.createElement('div');
            dataTypeLabel.classList.add('text-base');
            dataTypeOption.appendChild(dataTypeLabel);
            let dataTypeIcon = document.createElement('i');
            dataTypeIcon.classList.add('border', 'align-bottom', 'border-gray-500', 'rounded', 'mr-2');
            dataTypeLabel.innerHTML = col.type;

            //dataTypeOption.addEventListener('click', openDataTypeMenu);

            if (col.type == 'fk') {
                let linkedColumnType = getColumnType(col.lookupTable, col.lookupField);
                dataTypeIcon.classList.add('border', 'align-bottom', 'border-gray-500', 'rounded', 'mr-2');
                dataTypeLabel.innerHTML = linkedColumnType;
            }

            dataTypeLabel.prepend(dataTypeIcon);

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
                createMenuItem('Delete Column', menuAction, { icon: 'delete-bin' })
            ];

            if (col.type == 'fk') {
                //menuItems.splice(2, 3, createMenuItem(`Remove '${col.lookupTable}' Link`, removeLink, { icon: 'close' }));
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

    let getRecordByValue = (table, column, value) => {
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
    };

    let createCell = (cell) => {
        let cellElement = document.createElement('div');
        cellElement.classList.add(...cellClasses);
        cellElement.style.width = '240px';
        let renderedCell = document.createElement('div');
        renderedCell.classList.add(theme.textColor, 'p-2', 'rendered-cell', 'h-full', 'space-y-1', 'border', 'border-opacity-0');

        renderedCell.style.cursor = 'pointer';

        let createRecordLink = function (_value) {
            let link = document.createElement('div');
            link.classList.add(theme.primaryColor, 'rounded', 'px-1', 'inline-block', 'bg-opacity-50', 'mr-1');
            link.innerHTML = _value;
            return link;
        };

        let cellInput = components.createInput({ value: cell.value });
        cellInput.classList.add('p-2', 'w-full', 'hidden');
        cellInput.classList.remove('border');

        if (cell.type == 'fk') {
            if (cell.value == '') {
                renderedCell.innerHTML = `<i class="ri-search-line text-xs ${theme.mediumBackgroundColor} p-1 rounded"></i>`;
            } else {
                let renderedValue = getRecordByValue(cell.lookupTable, cell.lookupField, cell.value);
                renderedCell.appendChild(createRecordLink(renderedValue));
            }
            //renderedCell.appendChild(createRecordLink(cell));
        } else {
            renderedCell.innerHTML = cell.value;
        }

        renderedCell.addEventListener('click', function () {
            if (cell.type == 'fk') {
                cellElement.appendChild(createLookupMenu(cell));
            }
        });


        //if (summaryOf[i] && recordTable[i]) {
        //    renderedCell.addEventListener('dblclick', function () {
        //        cellInput.classList.remove('hidden');
        //        cellInput.focus();
        //        renderedCell.classList.add('hidden');
        //        cellElement.appendChild(createRecordListMenu(cellInput, recordTable[i], summaryOf[i], cell));
        //    });
        //} else if (recordTable[i]) {
        //    renderedCell.addEventListener('dblclick', function () {
        //        cellInput.classList.remove('hidden');
        //        cellInput.focus();
        //        renderedCell.classList.add('hidden');
        //        cellElement.appendChild(createEditRecordMenu(cellInput, recordTable[i], cell));
        //    });
        //} else if (lookupTable[i]) {
        //    renderedCell.addEventListener('click', function () {
        //        //cellInput.classList.remove('hidden');
        //        //cellInput.focus();
        //        
        //        //renderedCell.style.borderColor = 'red';
        //        //renderedCell.classList.replace('border-opacity-0',theme.primaryBorderColor);
        //        cellElement.appendChild(createLookupMenu(cellInput, lookupTable[i], lookupField[i], cell));
        //    });
        //    //renderedCell.addEventListener('dblclick', function () {
        //    //    cellInput.classList.remove('hidden');
        //    //    cellInput.focus();
        //    //    renderedCell.classList.add('hidden');
        //    //    cellElement.appendChild(createLookupMenu(cellInput, lookupTable[i], lookupField[i], cell));
        //    //});
        //} else {
        //    renderedCell.addEventListener('dblclick', function () {
        //        cellInput.classList.remove('hidden');
        //        cellInput.focus();
        //        renderedCell.classList.add('hidden');
        //        cellInput.addEventListener('blur', function () {
        //            renderedCell.innerHTML = cellInput.value;
        //            cellInput.classList.add('hidden');
        //            renderedCell.classList.remove('hidden');
        //            let editedRecord = obj.records.find(record => record.includes(cell));
        //            let recordIndex = editedRecord.indexOf(cell);
        //            editedRecord[recordIndex] = cellInput.value;
        //            document.querySelector('.table-wrapper').innerHTML = '';
        //            saveTable(obj);
        //        });
        //    });
        //}
        //
        cellElement.append(cellInput, renderedCell);
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
                    if (recordTable[i]) {
                        cellInput.parentNode.appendChild(createEditRecordMenu(cellInput, recordTable[i], ''));
                    }
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





