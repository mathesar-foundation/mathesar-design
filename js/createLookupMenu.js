import { theme } from './themes.js';
import { components } from './components.js';
import { createModal } from './createModal';
import { addDropdownOutsideClickHandler } from './createDropdownMenu';
import { selectTableByName, saveTable, columnByName } from './main';
import { setTablePreferences } from './setTablePreferences';

export function createLookupMenu(cell) {

    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-2', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.width = '280px';

    //menu.innerHTML = `<div class="${theme.textColor} text-lg">Search Records</div>`

    let summaryRecords = selectTableByName(cell.lookupTable).records.map(record => record);

    let lookupLabel = document.createElement('span');
    lookupLabel.innerText = selectTableByName(cell.lookupTable).columns.filter(col => col.isLookup).map(col => col.name);

    let searchRecords = components.createInput({ placeholder: `Search records from '${cell.lookupTable}'` });
    searchRecords.classList.add('w-full');

    let searchOptions = document.createElement('div');
    //searchOptions.innerHTML = `<div>My Columns</div>`;
    searchOptions.classList.add(theme.textColor)

    menu.append(searchRecords, searchOptions);

    let recordsList = document.createElement('div');
    recordsList.classList.add('border', theme.tableBorderColor);

    menu.append(recordsList);

    let setSelection = (record) => {
        let editedRow = selectTableByName(cell.table).records.find((_record, i) => i == cell.row);
        editedRow.splice(cell.position, 1, record);
        document.querySelector('.table-wrapper').innerHTML = '';
        saveTable(selectTableByName(cell.table));
    };

    let createRecords = function (records, fn) {
        console.log(records.length);
        let list = document.createElement('div');
        list.classList.add('space-y-1','p-1', theme.darkBackgroundColor,'bg-opacity-50')
        list.style.maxHeight = '200px';
        list.style.overflowY = 'scroll';


        recordsList.innerHTML =
            `<div class="${theme.textColor} text-sm py-1 px-2 border-b flex align-center ${theme.tableBorderColor}">
                <div>${records.length} Records</div>
                <a href="javascript:void(0)" id="selectColumns" class="ml-auto ${theme.primaryTextColor}">Search Columns</a> 
            </div>`;
        
        recordsList.querySelector('#selectColumns').addEventListener('click',function(){
            setTablePreferences(selectTableByName(cell.lookupTable));
        });

        records.forEach((record) => {
            let columns = selectTableByName(cell.lookupTable).columns.map(col => col.name);
            let item = document.createElement('a');
            item.setAttribute('href', 'javascript:void(0)');
            item.classList.add(theme.textColor, 'block', 'text-sm', 'space-y-1', 'p-2', theme.mediumBackgroundColor, 'border', theme.lightBorderColor, 'bg-opacity-50');

            function zipRecords(record) {
                return record.map((r, i) => [r, i]);
            }

            let colMatches = function (col, match) {
                return String(col).toLowerCase().indexOf(match.toLowerCase()) >= 0;
            };

            let searchTerm = searchRecords.value.trim();

            let matchingCols = zipRecords(record)
                .filter(([r, i]) => i == 0 || colMatches(r, searchTerm));


            let recordLabel = matchingCols
                .map(([r, i]) => {
                    console.log(r);
                    if (r.length > 0) {
                        return `<div class="flex space-x-2"><div class="${theme.mutedTextColor}">${columns[i]}:</div><div>${r}</div></div>`
                    } else {
                        return `<div class="flex space-x-2"><div class="${theme.mutedTextColor}">${columns[i]}:</div><div class="italic ${theme.mutedTextColor}">NULL</div></div>`
                    }

                }).join('');

            item.innerHTML = recordLabel;
            //item.innerHTML = `<span class="mr-1">${record.slice(0, 2).join('-')}</span>`;

            if (record[0] == searchRecords.value || records.length == 1) {
                item.classList.add(theme.primaryColor, 'bg-opacity-20');
            }
            item.addEventListener('click', function () {
                fn(record[0]);
            });

            if (matchingCols.length > 1 || colMatches(record[0], searchTerm)) {
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
            //recordsList.innerHTML = filteredRecords.length;
            recordsList.childNodes[1].innerHTML += `
            <div class="p-1 ${theme.textColor}">
            <h4>No results found for '${searchRecords.value}'.</h4>
            <div class="text-sm ${theme.mutedTextColor}">Try changing the search columns for the '${cell.lookupTable}' table or add a new record for '${searchRecords.value}'.</div>
            </div>
            `;
            recordsList.childNodes[1].append(
                
                components.createButton('Add Record', { icon: 'add', style: 'secondary' }),
            );
        }

    });

    addDropdownOutsideClickHandler(menu, function () {

        //document.querySelector('.table-wrapper').innerHTML = '';
        //saveTable(selectTableByName(cell.table));
    });
    return menu;
}

function columnSelectionModal(){
    let content = document.createElement('div');
    content.innerHTML = `test`;
    document.querySelector('body').append(createModal(content));
}
