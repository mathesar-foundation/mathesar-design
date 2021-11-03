import { theme } from './themes.js';
import { components } from './components.js';
import { createModal } from './createModal';
import { addDropdownOutsideClickHandler } from './createDropdownMenu';
import { selectTableByName, createIcon, selectTableById, activeTable, saveTable } from './main';


export function createLookupMenu(input, table, field, value) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-1', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';
    let menuHeader = document.createElement('h4');
    menuHeader.classList.add(theme.textColor);
    menuHeader.innerHTML = `Select records from <span class="${theme.primaryColor} bg-opacity-30 px-1 rounded">${table}</span>`;
    let menuLookupField = document.createElement('div');
    menuLookupField.classList.add(theme.mutedTextColor, 'text-sm');

    const isLookup = (column) => column.isLookup;
    let columnPosition = selectTableByName(table).columns.findIndex(isLookup);

    //let summaryRecords = selectTableByName(table).records.map(record => record[columnPosition]);
    let summaryRecords = selectTableByName(table).records.map(record => record);
    //let summaryIds = selectTableByName(table).records.map(record => record[0]);
    let columnType = selectTableByName(table).columns.map((col, i) => col.name == field ? col.type : '').join('');

    //menuLookupField.innerHTML = `Lookup field: `;
    //menuLookupField.appendChild(createIcon(columnType));
    let lookupLabel = document.createElement('span');
    lookupLabel.innerText = selectTableByName(table).columns.filter(col => col.isLookup).map(col => col.name);
    menuLookupField.appendChild(lookupLabel);
    menu.appendChild(menuHeader);
    //menu.appendChild(menuLookupField);

    let recordsList = document.createElement('div');
    menu.append(recordsList);


    let setSelection = function (record) {
        input.value = record[0];
        recordsList.innerHTML = '';
    };

    let createRecords = function (records, fn) {
        let list = document.createElement('div');
        list.classList.add('space-y-1');
        records.forEach((record, i) => {
            let item = document.createElement('a');
            item.setAttribute('href', 'javascript:void(0)');
            item.classList.add(theme.textColor, 'py-1', 'px-2', theme.primaryColor, 'bg-opacity-50', 'block', 'rounded', 'text-sm');
            item.innerHTML = `<span class="mr-1">${record}</span>`;
            if (record == input.value) {
                item.classList.replace('bg-opacity-50', 'bg-opacity-80');
                //item.prepend(components.createIcon('check'));
            }
            item.addEventListener('click', function () {
                fn(record);
            });
            list.appendChild(item);
        });
        return list;
    };


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

    let filteredRecords = summaryRecords.filter(record => record.toString().match(input.value.trim()));
    console.log(filteredRecords);

    input.addEventListener('keyup', function () {

        recordsList.innerHTML = '';
        console.log(summaryRecords);
        let filteredRecords = summaryRecords.filter(record => record.toString().match(input.value.trim()));
        console.log(filteredRecords);
        recordsList.appendChild(createRecords(filteredRecords, setSelection));
//
        if (filteredRecords.length == 0) {
            recordsList.appendChild(components.createButton('Add Record', { icon: 'add' }));
        }
        if (filteredRecords.length == 1) {
            //input.value = filteredRecords[0];
        }

    });

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
