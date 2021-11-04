import { theme } from './themes.js';
import { components } from './components.js';
import { createModal } from './createModal';
import { addDropdownOutsideClickHandler,removeDropdownOutsideClickHandler } from './createDropdownMenu';
import { selectTableByName, createIcon, selectTableById, activeTable, saveTable } from './main';

export function createLookupMenu(input,cell) {
    console.log(cell)

    let editedRow = selectTableByName(cell.table).records.find((record,i) => i == cell.row);

    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2','space-y-1', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';

    
    //let menuHeader = document.createElement('h4');
    //menuHeader.classList.add(theme.textColor,'text-sm');
    //menuHeader.innerHTML = `Records from <span class="${theme.primaryColor} bg-opacity-30 px-1 rounded">${table}</span>`;
    //let menuLookupField = document.createElement('div');
    //menuLookupField.classList.add(theme.mutedTextColor, 'text-sm');

    //const isLookup = (column) => column.isLookup;
    //let columnPosition = selectTableByName(table).columns.findIndex(isLookup);
    //let summaryRecords = selectTableByName(table).records.map(record => record[columnPosition]); // IF A LOOKUP FIELD IS SET
    let summaryRecords = selectTableByName(cell.lookupTable).records.map(record => record);
    //let summaryIds = selectTableByName(table).records.map(record => record[0]);
    //let columnType = selectTableByName(table).columns.map((col, i) => col.name == field ? col.type : '').join('');

    //menuLookupField.innerHTML = `Lookup field: `;
    //menuLookupField.appendChild(createIcon(columnType));
    let lookupLabel = document.createElement('span');
    lookupLabel.innerText = selectTableByName(cell.lookupTable).columns.filter(col => col.isLookup).map(col => col.name);
    //menuLookupField.appendChild(lookupLabel);
    //menu.appendChild(menuHeader);
    //menu.appendChild(menuLookupField);

    let searchRecords = components.createInput({placeholder:`Search records from '${cell.lookupTable}'`});
    searchRecords.classList.add('w-full');
    menu.appendChild(searchRecords);

    let recordsList = document.createElement('div');
    recordsList.classList.add('border',theme.tableBorderColor)
    menu.append(recordsList);


    console.log(summaryRecords);
    console.log(selectTableByName(cell.table).records);

    let setSelection = (record) => {
        editedRow.splice(cell.position,1,record);

        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectTableByName(cell.table));

    };

    
    

    let createRecords = function (records, fn) {
        let list = document.createElement('div');
        records.forEach((record) => {
            let item = document.createElement('a');
            item.setAttribute('href', 'javascript:void(0)');
            item.classList.add(theme.textColor, 'py-1', 'px-2','block','text-sm','border-b',theme.darkBorderColor);
            
            item.innerHTML = `<span class="mr-1">${record.slice(0,2).join('-')}</span>`;

            if (record[0] == input.value || records.length == 1) {
                item.classList.add(theme.primaryColor, 'bg-opacity-20');
                //item.prepend(components.createIcon('check'));
            }
            item.addEventListener('click', function () {
                //console.log(record)
                fn(record[0]);
            });
            list.appendChild(item);
        });
        return list;
    };


    

    if(input.value.length > 0){
        let filteredRecords = summaryRecords.filter(record => record.toString().match(input.value.trim()));
        recordsList.appendChild(createRecords(filteredRecords, setSelection));
        searchRecords.value = input.value;
    } else {
        recordsList.appendChild(createRecords(summaryRecords, setSelection));
    }

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



    searchRecords.addEventListener('keyup', function () {
        recordsList.innerHTML = '';
        input.value = searchRecords.value;
    
        let filteredRecords = summaryRecords.filter(record => record.toString().match(input.value.trim()));
        recordsList.appendChild(createRecords(filteredRecords, setSelection));

        if (filteredRecords.length == 0) {
            recordsList.appendChild(components.createButton('Add Record', { icon: 'add' }));
        }
        if (filteredRecords.length == 1) {

            //searchRecords.value = summaryRecords[0];
        }

    });

    
    addDropdownOutsideClickHandler(menu, function () {
        //let editedRecord = selectTableById(activeTable).records.find(record => record.includes(value));
        //let recordIndex = editedRecord.indexOf(value);
        //editedRecord[recordIndex] = input.value;
        console.log('OUTSIDE')
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectTableByName(cell.table));
    });
    return menu;
}
