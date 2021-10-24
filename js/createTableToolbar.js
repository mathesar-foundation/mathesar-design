import { theme } from './themes.js';
import { components } from './components.js';
import { createTableOptionsMenu, linkToMultiple, savedTables } from './main';

export function createTableToolbar(obj) {

    const type = obj.type;

    let toolbar = document.createElement('div');
    toolbar.classList.add(theme.mediumBackgroundColor, 'py-1', 'px-3', 'flex', 'items-center', 'space-x-4', 'border-b', theme.tableBorderColor);
    let saveAsViewBtn = components.createButton('Save as View', { icon: 'save', style: 'link' });
    let addRecordBtn = components.createButton('Add Record', { icon: 'add', style: 'link' });
    let deleteRecordBtn = components.createButton('Delete', { icon: 'delete-bin', style: 'link' });
    
    let tableTitle = document.createElement('h2');
    tableTitle.classList.add(theme.textColor, 'text-lg', 'space-x-2');
    tableTitle.innerHTML = `${obj.name}`;
    tableTitle.append(components.createIcon('arrow-drop-down'));


    toolbar.appendChild(tableTitle);

    tableTitle.addEventListener('click', function () {
        tableTitle.appendChild(createTableOptionsMenu(obj));
    });

    let createSection = (content) => {
        let section = document.createElement('div');

        let sectionHeader = document.createElement('h4');
        sectionHeader.classList.add(theme.mutedTextColor, 'text-sm');
        sectionHeader.innerText = name;
        let sectionContent = document.createElement('div');
        sectionContent.classList.add('space-x-2');
        content.forEach(c => sectionContent.appendChild(c));
        section.appendChild(sectionHeader);
        section.appendChild(sectionContent);
        
        return section;
    };

    let filterBtn = components.createButton('Filter',{icon:'filter',style:'link'});
    let sortBtn = components.createButton('Sort',{icon:'arrow-up-down',style:'link'});
    let groupBtn = components.createButton('Group',{icon:'layout-row',style:'link'});

    let sectionDivider = function(){
        let divider = document.createElement('div');
        divider.classList.add('border-r','py-2');
        return divider;
    } 

    if (type == 'table') {
        toolbar.appendChild(createSection([addRecordBtn,deleteRecordBtn])); 
        toolbar.appendChild(sectionDivider());
        toolbar.appendChild(createSection([filterBtn,sortBtn,groupBtn]));
        toolbar.appendChild(sectionDivider());
        toolbar.appendChild(createSection([saveAsViewBtn]));
    }
    // EVENTS
    saveAsViewBtn.addEventListener('click', function () {
        let newTable = JSON.parse(JSON.stringify(obj));

        let tableId = Object.values(savedTables).flat().map(table => table.id);
        let maxId = Math.max(...tableId);
        newTable.id = maxId + 1;
        newTable.type = 'view';
        newTable.columns.forEach(col => col.referencedTable = newTable.name);
        newTable.name = `View of ${newTable.name}`;

        savedTables.push(newTable);

        sessionStorage.setItem('tables', JSON.stringify(savedTables));
        location.reload();
    });

    return toolbar;
}
