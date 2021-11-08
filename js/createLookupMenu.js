import { theme } from './themes.js';
import { components } from './components.js';
import { createModal } from './createModal';
import { addDropdownOutsideClickHandler } from './createDropdownMenu';
import { selectTableByName, saveTable, columnByName } from './main';

export function createLookupMenu(cell) {
    console.log(cell);

    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-1', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '280px';


    let summaryRecords = selectTableByName(cell.lookupTable).records.map(record => record);


    let lookupLabel = document.createElement('span');
    lookupLabel.innerText = selectTableByName(cell.lookupTable).columns.filter(col => col.isLookup).map(col => col.name);

    let searchRecords = components.createInput({ placeholder: `Search records from '${cell.lookupTable}'` });
    searchRecords.classList.add('w-full');
    menu.appendChild(searchRecords);

    let recordsList = document.createElement('div');
    recordsList.classList.add('border', theme.tableBorderColor)
    menu.append(recordsList);

    let setSelection = (record) => {
        let editedRow = selectTableByName(cell.table).records.find((_record, i) => i == cell.row);
        editedRow.splice(cell.position, 1, record);

        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectTableByName(cell.table));

    };




    let createRecords = function (records, fn) {
        let list = document.createElement('div');
        list.classList.add('space-y-1','p-1')
        list.style.maxHeight = '200px';
        list.style.overflowY = 'scroll';
        
        records.forEach((record) => {
            let columns = selectTableByName(cell.lookupTable).columns.map(col => col.name);
            let item = document.createElement('a');
            item.setAttribute('href', 'javascript:void(0)');
            item.classList.add(theme.textColor, 'block', 'text-sm','space-y-1','p-2',theme.darkBackgroundColor);

            function zipRecords(record) {
                return record.map((r,i)=> [r,i]);
            }

            let colMatches = function(col,match){
                return String(col).toLowerCase().indexOf(match.toLowerCase())>=0;
             };

            let searchTerm = searchRecords.value.trim();

            let matchingCols = zipRecords(record)
            .filter(([r,i]) => i==0 || colMatches(r,searchTerm));
             

            let recordLabel = matchingCols
                .map(([r, i]) => `<div class="flex space-x-2"><div class="${theme.mutedTextColor}">${columns[i]}</div><div>${r}</div></div>`).join('');
            
            
            item.innerHTML = recordLabel;
            //item.innerHTML = `<span class="mr-1">${record.slice(0, 2).join('-')}</span>`;

            if (record[0] == searchRecords.value || records.length == 1) {
                item.classList.add(theme.primaryColor, 'bg-opacity-20');
            }
            item.addEventListener('click', function () {
                fn(record[0]);
            });

            if (matchingCols.length > 1 || colMatches(record[0],searchTerm)) {
                list.appendChild(item);
            } 
        });
        return list;
    };


    if (cell.value.length > 0) {
        let filteredRecords = summaryRecords.filter(record => record.toString().match(cell.value.trim()));
        recordsList.appendChild(createRecords(filteredRecords, setSelection));
        searchRecords.value = cell.value;
    } else {
        recordsList.appendChild(createRecords(summaryRecords, setSelection));
    }

    let allowMultiple = components.createButton('Add Multiple', { icon: 'add' });
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

        let filteredRecords = summaryRecords.filter(record => record.toString().match(searchRecords.value.trim()));
        recordsList.appendChild(createRecords(filteredRecords, setSelection));

        if (filteredRecords.length == 0) {
            recordsList.appendChild(components.createButton('Add Record', { icon: 'add' }));
        }
        if (filteredRecords.length == 1) {

        }

    });

    addDropdownOutsideClickHandler(menu, function () {
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectTableByName(cell.table));
    });
    return menu;
}
