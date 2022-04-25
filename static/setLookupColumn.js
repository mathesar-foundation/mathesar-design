import { components } from './components.js';
import { createModal } from './createModal';
import { createTitle, selectTableByName, savedTables, createColumnSelector } from './main';

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
    selectorHeader.innerHTML = `<h4>Select a Column</h4>`;
    columnSelector.appendChild(selectorHeader);

    let setLookup = function (columnName, tableName) {
        let newTable = JSON.parse(JSON.stringify(selectTableByName(tableName)));
        let newColumns = newTable.columns.map((col, i) => col.name == columnName ? ({ ...col, isLookup: true }) : ({ ...col, isLookup: false }));
        newTable.columns = newColumns;
        //console.log(newTable);
        let index = savedTables.indexOf(selectTableByName(tableName));
        savedTables[index] = { ...newTable };
        sessionStorage.setItem('tables', JSON.stringify(savedTables));
    };

    columnSelector.appendChild(createColumnSelector(table, setLookup, { selected: 1 }));

    let confirmBtn = components.createButton(`Set Lookup Column`, { style: 'primary' });

    confirmBtn.addEventListener('click', function () {
        modal.remove();
        location.reload();
    });

    actions.appendChild(components.createButton('Cancel', { style: 'secondary' }));
    actions.appendChild(confirmBtn);

}
