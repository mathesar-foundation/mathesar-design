import { activeSchema, activeTable } from './main';
import { theme } from './themes.js';
import { components } from './components.js';
import { icon } from './iconMap';
import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';

// CREATE SIDEBAR
export function sidebarNav(tables) {

    let selectedTab = localStorage.getItem('selectedTab') || 'all';

    if (activeSchema == 'album_collection') {
        tables.splice(3, 0, { name: 'ErrorView', type: 'view', id: 'error', records: [], columns: [] });//ADD ERROR TABLE
    }

    let sidebar = document.createElement('div');
    sidebar.classList.add('flex', 'flex-col', theme.darkPrimaryColor, 'bg-opacity-10', 'border-r', theme.darkBorderColor);
    

    let searchBar = document.createElement('div');
    searchBar.classList.add('flex', 'p-2');
    let searchInput = components.createInput({ placeholder: 'Type to search' });
    searchInput.classList.add('w-full');

    let moreMenu = document.createElement('div');
    moreMenu.classList.add('py-1', 'px-2')
    moreMenu.innerHTML = `<i class="ri-more-2-line ${theme.textColor}"></i>`;
    searchBar.append(searchInput, moreMenu);



    let sidebarContent = document.createElement('div');
    sidebarContent.style.overflowY = 'scroll';


    //sidebar.innerHTML += `history schema`
    


    searchInput.addEventListener('keyup', function (e) {
        let filteredTables = tables.filter(table => table.name.toLowerCase().includes(e.target.value.toLowerCase()));
        loadNavItems(filteredTables, e.target.value);
    });

    let loadNavItems = function (tablesList, query) {

        sidebarContent.innerHTML = '';

        //sidebarContent.innerHTML = `<div class="sort-dropdown"><button class="${theme.mutedTextColor} px-2 py-2 display-options">Recently Accessed <i class="align-bottom ri-arrow-down-s-line"></i></button></div>`
        sidebarNav.style.display = 'flex';

        let createNavItem = function (table) {
            let tableURL = `${window.location.pathname}?activeSchema=${activeSchema}&activeTable=${table.id}`;
            let tableIcon = `<i class="${icon[table.type]} align-bottom mr-2 ${table.type == 'table' ? theme.primaryTextColor : theme.contrastTextColor}"></i>`
            let activeClasses = `${table.id == activeTable ? `${theme.primaryColor} bg-opacity-40 font-semibold` : ''}`

            if (!query) {
            return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}"><div>${tableIcon}${table.name}</div></a> `;
            } else {
            return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}"><div>${tableIcon}${table.name}</div> <span class="text-sm ${theme.mutedTextColor}">${table.columns.length} Columns ${table.records.length} Records</span></a>`
            }
            //return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}"><div>${tableIcon}${table.name}</div><div class="text-sm"><span>${table.records.length} Records</span> <span>${table.columns.length} Fields</span></div></a>`;
        };

        if (tablesList.length > 0) {
            

            const uniqueTypes = [...new Set(tablesList.map(item => item.type))].reverse();

            if (query){
                sidebarContent.innerHTML += `<div class="${theme.textColor} p-2">${tablesList.length} results for '${query}'</div>`;
            } 

            uniqueTypes.forEach(type => {
                
                sidebarContent.innerHTML += `${selectedTab == 'all' ? `<div class="p-2 capitalize ${theme.textColor} font-semibold text-sm">${type}s</div>` : ``}`
                sidebarContent.innerHTML += tablesList.filter(item => item.type == type).map(item => createNavItem(item)).join('');
            });
        };

        let emptyState = `<div class="${theme.mutedTextColor} ${theme.primaryBorderColor}">No ${selectedTab} available</div>`
        let emptyStateAll = `<div class="${theme.mutedTextColor} ${theme.primaryBorderColor} ">No tables or views available</div>`

        if (tablesList.length == 0 && query !== undefined) {
            sidebarNav.style.display = 'none';
            sidebarContent.innerHTML += `<div class="${theme.textColor} p-2">No Results for '${query}' <a href="#" class="whitespace-nowrap ${theme.primaryTextColor}">Clear Search</a></div>`;
        }

        if (tablesList.length == 0 && query == undefined) {
            sidebarContent.innerHTML += `<div class="${theme.textColor} p-2">${selectedTab == 'all' ? emptyStateAll : emptyState} </div>`;
        }

    


        //sidebarContent.querySelector('.display-options').addEventListener('click', function (e) {
        //    e.target.parentElement.appendChild(createTableOptionsMenu(tablesList));
        //});

        sidebarContent.querySelectorAll('a').forEach(item => {
            item.addEventListener('mouseenter', function () {
                item.classList.add(theme.darkPrimaryColor, 'bg-opacity-30');

            });
            item.addEventListener('mouseleave', function () {
                item.classList.remove(theme.darkPrimaryColor, 'bg-opacity-30')
            });
        });


    }


    let sidebarNav = document.createElement('div');
    sidebarNav.classList.add('flex', 'items-center', 'px-2', 'mb-2', theme.textColor);

    sidebarNav.innerHTML = /*HTML*/`
        <button data-filter="all" class="rounded py-1 text-sm show-history flex-grow ${selectedTab == 'all' ? theme.mediumBackgroundColor : ''} border-opacity-80">All (${tables.length})</button>
        <button data-filter="tables" class="rounded py-1 text-sm show-tables flex-grow ${selectedTab == 'tables' ? theme.mediumBackgroundColor : ''} border-opacity-80">Tables (${tables.filter(t => t.type == 'table').length})</button>
        <button data-filter="views" class="rounded py-1 text-sm show-views flex-grow ${selectedTab == 'views' ? theme.mediumBackgroundColor : ''} border-opacity-80">Views (${tables.filter(t => t.type == 'view').length})</button>
    `;

    if (selectedTab == 'tables') {
        loadNavItems(tables.filter(table => table.type == 'table'));
    } else if (selectedTab == 'views') {
        loadNavItems(tables.filter(table => table.type == 'view'));
    } else {
        loadNavItems(tables);
    }

    sidebarNav.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function () {
            let activeFilter = button.getAttribute('data-filter');
            selectedTab = activeFilter;
            localStorage.setItem('selectedTab', activeFilter);

            if (activeFilter == 'tables') {
                loadNavItems(tables.filter(table => table.type == 'table'));
            } else if (activeFilter == 'views') {
                loadNavItems(tables.filter(table => table.type == 'view'));
            } else {
                loadNavItems(tables);
            }


        });
    })

    const navList = sidebarNav.querySelectorAll('button');

    for (let item of navList) {
        console.log(item)

        item.addEventListener("click", function () {
            for (let item of navList) {
                item.classList.remove(theme.mediumBackgroundColor);
                item.classList.add();
            }
            this.classList.add(theme.mediumBackgroundColor);
        });
    }


    sidebar.append(searchBar, sidebarNav, sidebarContent);

    if (activeSchema == 'loading_error_schema') {
        let error = document.createElement('div');
        error.classList.add(theme.textColor, 'bg-red-300', 'p-4', 'm-2', 'bg-opacity-40', 'text-opacity-80')
        error.innerHTML = `
        <h3 class="text-lg"><i class="ri-error-warning-fill align-bottom text-red-400"></i> Failed to load</h3>
        <p>We encountered an error while loading data for the current schema. Try refreshing this page.</p>
        `
        sidebarContent.innerHTML = ``
        sidebarContent.append(error);
    }

    let sidebarWrapper = document.createElement('div');
    sidebarWrapper.classList.add('flex');
    sidebar.style.width = '320px';
    sidebarWrapper.style.height = 'calc(100vh - 52px)';
    sidebarWrapper.style.overflowY = 'hidden';

    sidebarWrapper.innerHTML = `
    <div class="shrink-0 ${theme.mediumBackgroundColor} bg-opacity-40">
        <a href="javascript:void(0)" class="${theme.textColor} block ${theme.mediumBackgroundColor} flex items-center" style="width:40px; height:40px"><i class="ri-list-unordered text-lg mx-auto"></i></a>
        <a href="javascript:void(0)" class="${theme.textColor} block flex items-center" style="width:40px; height:40px"><i class="ri-table-line text-lg mx-auto"></i></a>
    </div>`

    
    
    sidebarWrapper.append(sidebar);

    return sidebarWrapper;
    //return sidebar;
};


function createTableOptionsMenu(table) {
    let content = document.createElement('div');
    let menu = createDropdownMenu(content);

    let createMenuItem = (label, callback) => {
        let menuItem = document.createElement('a');
        menuItem.classList.add('block', 'p-2', theme.textColor, 'rounded', 'w-100');
        menuItem.setAttribute('href', 'javascript:void(0)');
        menuItem.innerText = label;
        menuItem.addEventListener('click', function () {
            callback(table);
        }, false);
        return menuItem;
    }

    let menuItems = [
        createMenuItem('Recently Accesssed'),
        createMenuItem('By Name')
    ];

    menuItems.forEach(item => content.appendChild(item));

    addDropdownOutsideClickHandler(menu, function () { });

    let navList = content.querySelectorAll('a');

    for (let item of navList) {
        item.addEventListener("mouseenter", function () {
            for (let item of navList) {
                item.classList.remove(theme.primaryColor, 'bg-opacity-40');
            }
            this.classList.add(theme.primaryColor, 'bg-opacity-40');
        });
    }

    return menu;
}

