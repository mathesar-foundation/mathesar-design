import { theme } from './themes.js';
import { components } from './components.js';
import { createModal } from './createModal';
import { icon } from './iconMap.js';
import { createTitle, columnByName, savedTables, selectTableByName, saveTable } from './main';

export function setColumnPreferences(cell) {
    console.log(cell)
    let table = selectTableByName(cell.lookupTable);
    let content = document.createElement('div');
    let actions = document.createElement('div');
    let applyBtn = components.createButton('Apply', { style: 'primary' });
    actions.append(components.createButton('Cancel', { style: 'secondary' }), applyBtn);
    document.querySelector('body').append(createModal(content,actions));

    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid', 'gap-2', 'grid-cols-6');

    content.prepend(components.createTitle(`Table Link Preferences for column '${cell.column}'`));
    
    // GRID LAYOUT
    content.append(gridContainer);

    let list = document.createElement('div');
    list.classList.add('col-span-2', 'border', theme.tableBorderColor, 'flex', 'flex-col');

    let form = document.createElement('div');
    form.style.height = '380px';
    form.style.overflowY = 'scroll';
    form.classList.add('col-span-6', 'border', theme.tableBorderColor, theme.darkBackgroundColor, 'p-3', 'space-y-2');
    
    gridContainer.append(form);


    let searchFieldsForm = document.createElement('div');
    searchFieldsForm.classList.add('space-y-2');
    let selectedColumns = table.columns.map(col => {
        return `<div class="border flex py-1 px-2 ${theme.mediumBackgroundColor} ${theme.tableBorderColor}">
        
        <i class="ri-align-justify align-bottom mr-1 ${theme.mutedTextColor}"></i> ${col.name} <i class="ri-delete-bin-line align-bottom ml-auto"></i>
        </div>`
    }).slice(0,5).join('');

    let allColumns = table.columns.map(col => {
        return `<option>${col.name}</option>`
    }).join('');

    let recordPreviewForm = document.createElement('div');
    recordPreviewForm.classList.add('space-y-2');

    recordPreviewForm.innerHTML = `
        <div>
        <p class="${theme.mutedTextColor}">Show a preview of related fields when linking a record to this column.</p>
        </div>

        <div>
            <input type="checkbox">
            <label>Show Record Preview</label> 
        </div>
    `

    searchFieldsForm.innerHTML = `
        <div>
        <p class="${theme.mutedTextColor}">Specify the columns and the order to be used when searching records from the referenced table.</p>
        </div>



        


        
        <div class="space-y-2 ${theme.tableBorderColor}">

            <button class="py-1 px-2 border whitespace-nowrap ${theme.lightBorderColor} ${theme.textColor}">Reset to Default</button>
            
            <div>
        <h4>Select and Order Columns</h4>
        <p class="${theme.mutedTextColor} text-sm">Drag-and-drop to reorder the columns</p>
        </div>

            <div class="flex align-center space-x-2">
                <select class="py-1 px-2 w-full ${theme.inputBackgroundColor} ${theme.textColor} bg-opacity-20 border ${theme.tableBorderColor}">
                    <option>- Select Column -</option>
                    ${allColumns}
                </select>
                <button class="py-1 px-2 border ${theme.lightBorderColor} ${theme.textColor}">
                    <i class="ri ri-add-line align-bottom"></i>
                </button>
                
            </div>
            ${selectedColumns}

            
        </div>
    `;

    let createPreference = function(preference) {
        let item = document.createElement('div');

        item.classList.add('border-b','py-2',theme.tableBorderColor,'block')
        item.innerHTML = `<h3 class="text-lg">${preference.label}</h3>`;
        form.append(item);
        item.append(preference.form);
    };

    let preferences = [
        {
            label: 'Record Preview',
            form: recordPreviewForm
        },
        {
            label: 'Search Columns',
            form: searchFieldsForm
        }

    ];

    preferences.forEach(preference => createPreference(preference));
   



}
