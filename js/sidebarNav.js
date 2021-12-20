import { activeTable } from './main';
import { theme } from './themes.js';
import { components } from './components.js';
import { icon } from './iconMap';
import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';

// CREATE SIDEBAR
export function sidebarNav(tables) {

    tables.splice(3,0,{name: 'ErrorTable', type:'view', id:'error'})

    let sidebar = document.createElement('div');
    sidebar.classList.add('flex', 'flex-col');
    sidebar.style.height = 'calc(100vh - 43px)';
    sidebar.style.overflowY = 'hidden';

    let searchBar = document.createElement('div');
    searchBar.classList.add('flex', 'p-2');
    let searchInput = components.createInput({ placeholder: 'Type to search' });
    searchInput.classList.add('w-full');

    let moreMenu = document.createElement('div');
    moreMenu.classList.add('py-1', 'px-2')
    moreMenu.innerHTML = `<i class="ri-more-2-line ${theme.textColor}"></i>`;
    searchBar.append(searchInput, moreMenu);
    sidebar.append(searchBar);

    let sidebarNav = document.createElement('div');
    sidebarNav.classList.add('flex','items-center','px-2','space-x-2',theme.textColor)
    sidebarNav.innerHTML = /*HTML*/`
        <button class="border rounded show-history flex-grow ${theme.primaryBorderColor} border-opacity-60">All</button>
        <button class="border rounded show-tables flex-grow ${theme.tableBorderColor} border-opacity-60">Tables</button>
        <button class="border rounded show-views flex-grow ${theme.tableBorderColor} border-opacity-60">Views</button>
    `;

    sidebar.append(sidebarNav);

    let sidebarContent = document.createElement('div');
    
    sidebar.append(sidebarContent);

    

    //sidebar.innerHTML += `history schema`


    let createNavItem = function (table) {
        let tableURL = `${window.location.pathname}?activeTable=${table.id}`;
        let tableIcon = `<i class="${icon[table.type]} align-bottom mr-2 ${theme.primaryTextColor}"></i>`
        let activeClasses= `${table.id == activeTable?`${theme.primaryColor} bg-opacity-40`:``}`
        return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}">${tableIcon}${table.name}</a>`;
    };
    

    searchInput.addEventListener('keyup', function (e) {
        
        if (e.target.value.length == 0) {
            sidebarNav.style.display = 'flex';
        } else {
            sidebarNav.style.display = 'none';
        }

        let filteredTables = tables.filter(table => table.name.toLowerCase().includes(e.target.value.toLowerCase()));

        loadNavItems(filteredTables);
    });

    let loadNavItems = function(tablesList){

        sidebarContent.innerHTML = `<div><button class="${theme.mutedTextColor} px-2 py-2 display-options">Recently Accessed <i class="align-bottom ri-arrow-down-s-line"></i></button></div>`

        if (tablesList.length > 0) {
            sidebarContent.innerHTML += tablesList.map(item => createNavItem(item)).join('');
        } else {
            sidebarContent.innerHTML += `<div class="${theme.mutedTextColor} p-2">No Results</div>`;
        }

        sidebarContent.querySelectorAll('a').forEach(item => {
            item.addEventListener('mouseenter', function () {
                item.classList.add(theme.mediumBackgroundColor, 'bg-opacity-80')
            });
            item.addEventListener('mouseleave', function () {
                item.classList.remove(theme.mediumBackgroundColor, 'bg-opacity-80')
            });
        });

        sidebarContent.querySelector('.display-options').addEventListener('click', function (e) {
            e.target.parentElement.appendChild(createTableOptionsMenu(tablesList));
        });
    }

    

    loadNavItems(tables);

    sidebarNav.querySelector('.show-history').addEventListener('click',function(){
        loadNavItems(tables);
    });
    
    
    sidebarNav.querySelector('.show-tables').addEventListener('click',function(){
        loadNavItems(tables.filter(table => table.type == 'table'));
    });

    sidebarNav.querySelector('.show-views').addEventListener('click',function(){
        loadNavItems(tables.filter(table => table.type == 'view'));
    });

    const navList = sidebarNav.querySelectorAll('button');

    for (let item of navList) {
        item.addEventListener("click", function () {
            for (let item of navList) {
                item.classList.remove(theme.primaryBorderColor);
                item.classList.add(theme.tableBorderColor);
            }
            this.classList.add(theme.primaryBorderColor);
        });
    }


    

    return sidebar;
};


function createTableOptionsMenu(table) {
    let content = document.createElement('div');
    let menu = createDropdownMenu(content);

    let createMenuItem = (label, callback) => {
        let menuItem = document.createElement('a');
        menuItem.classList.add('block', 'text-sm', 'p-2',theme.textColor,'border');
        menuItem.setAttribute('href', 'javascript:void(0)');
        menuItem.innerText = label;
        menuItem.addEventListener('click', function () {
            callback(table);
        }, false);
        return menuItem;
    }

    let menuItems = [
        //createMenuItem('Table Constraints', setTableConstraints),
        //createMenuItem('Table Preferences', setTablePreferences),
        createMenuItem('Recently Accesssed'),
        createMenuItem('By Name')
    ];

    menuItems.forEach(item => content.appendChild(item));

    addDropdownOutsideClickHandler(menu, function () {

    });

    return menu;
}

