import { theme, setNextTheme } from './themes.js';
import { components } from './components.js';
import { loadedTables } from './tables.js';
import { activeSchema } from './main';
import { addDropdownOutsideClickHandler } from './createDropdownMenu';

export function topNav() {
    let topNav = document.createElement('div');
    topNav.classList.add('p-2', theme.tableBorderColor, 'flex', 'space-x-3', 'items-center', theme.backgroundColor, 'border-b');

    let brand = document.createElement('a');
    brand.href = 'javascript:void(0)';
    brand.classList.add('block', theme.mediumBackgroundColor, 'text-sm', theme.textColor, 'rounded', 'px-1', 'text-opacity-40', 'border', theme.lightBorderColor)
    brand.innerHTML = `Prototype`;

    let schemaName = document.createElement('div');
    schemaName.style.cursor = 'pointer';
    schemaName.style.position = 'relative';
    schemaName.classList.add('flex', 'items-center', 'mr-2', 'rounded');

    if (activeSchema !== null) {

        schemaName.innerHTML = /*HTML*/
            `<div class="${theme.primaryColor} ${theme.inverseTextColor} text-sm px-1 rounded mr-2">D</div>
    <div class="${theme.textColor} space-x-2">
        <span>database</span>
        <span class="${theme.mutedTextColor}">/</span>
        <span class="font-semibold">
            <i class="ri-share-line align-bottom"></i> ${activeSchema}
        </span>
    </div>`;

    } else {
        schemaName.innerHTML = /*HTML*/
            `<div class="${theme.primaryColor} ${theme.inverseTextColor} text-sm px-1 rounded mr-2">M</div>
    <div class="${theme.textColor} space-x-2">
        <span>music_database</span>
       
    </div>`;
    }

    let searchBar = document.createElement('div');
    searchBar.classList.add('flex-grow');
    let searchInput = components.createInput({ placeholder: 'Search or Jump To…' });
    searchInput.classList.add('w-full');
    searchBar.append(searchInput);

    let accountSelector = document.createElement('div');
    accountSelector.classList.add('p-1');
    accountSelector.innerHTML = `<i class="ri-user-fill align-bottom ${theme.textColor}"></i> <i class="ri-more-2-line align-bottom ${theme.textColor}"></i>`;


    let newTableBtn = components.createButton('New Table', { style: 'secondary', icon: 'add' });

    let changeThemeBtn = components.createButton('Change Theme', { style: 'secondary', icon: 'palette' });

    changeThemeBtn.addEventListener('click', function () {
        setNextTheme();
    });

    if (activeSchema !== null) {
        topNav.append(brand, schemaName, newTableBtn, searchBar, changeThemeBtn, accountSelector);
    } else {
        topNav.append(brand, schemaName, searchBar, changeThemeBtn, accountSelector);
    }

    schemaName.addEventListener('click', function () {
        schemaName.append(createSchemaDropdown());
        //let url = `${window.location.pathname}`;
        //location.assign(url);
        //schemaOverview();
    });

    return topNav;
}

function createSchemaDropdown() {
    let menu = document.createElement('div');

    menu.classList.add(theme.backgroundColor, theme.textColor, 'p-2', 'rounded')
    menu.style.position = 'absolute';
    menu.style.top = '40px';
    menu.style.left = '0';

    let listSchemas = function (_schemas) {
        let item = _schemas.map(schema => {
            return `<div class="p-1 border ${theme.tableBorderColor}"><a class="${theme.primaryTextColor}" href="?activeSchema=${schema.name}">${schema.name}</a></div>`
        }).join('');
        return `${item}`
    }

    menu.innerHTML = `
        <div class="space-y-2">
            
            <h4>Schemas (${loadedTables.length})</h4>
            ${listSchemas(loadedTables)}

            <a href="/" class="block ${theme.primaryTextColor}">All Schemas</a>
        </div>
    `;

    menu.querySelectorAll('.schema-link').forEach(element => {

        element.addEventListener('click', function () {

        });

    })

    addDropdownOutsideClickHandler(menu, () => console.log("Clicked outside when openColumnMenu was open"));

    return menu;
}