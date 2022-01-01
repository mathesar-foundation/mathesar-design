import { activeTable } from './main';
import { theme } from './themes.js';
import { components } from './components.js';
import { icon } from './iconMap';
import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';

// CREATE SIDEBAR
export function sidebarNav(tables) {

    //tables.splice(3,0,{name: 'ErrorTable', type:'view', id:'error', records:[],columns:[]});//ADD ERROR TABLE

    let sidebar = document.createElement('div');
    sidebar.classList.add('flex', 'flex-col',theme.darkPrimaryColor,'bg-opacity-10');
    sidebar.style.height = 'calc(100vh - 52px)';
    sidebar.style.overflowY = 'hidden';

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
    let createNavItem = function (table) {
        let tableURL = `${window.location.pathname}?activeTable=${table.id}`;
        let tableIcon = `<i class="${icon[table.type]} align-bottom mr-2 ${table.type == 'table'?theme.primaryTextColor:theme.contrastTextColor}"></i>`
    
        let activeClasses= `${table.id == activeTable?`${theme.primaryColor} bg-opacity-40 font-semibold`:''}`
        return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}">${tableIcon}${table.name}</a>`;

        //return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}"><div>${tableIcon}${table.name}</div><div class="text-sm"><span>${table.records.length} Records</span> <span>${table.columns.length} Fields</span></div></a>`;
    };
    

    searchInput.addEventListener('keyup', function (e) {
        let filteredTables = tables.filter(table => table.name.toLowerCase().includes(e.target.value.toLowerCase()));
        loadNavItems(filteredTables,e.target.value);
    });

    let loadNavItems = function(tablesList,query){

        console.log(query);
        
        sidebarContent.innerHTML = `<div class="sort-dropdown"><button class="${theme.mutedTextColor} px-2 py-2 display-options">Recently Accessed <i class="align-bottom ri-arrow-down-s-line"></i></button></div>`
            
        if (tablesList.length > 0) {
            sidebarNav.style.display = 'flex';
            sidebarContent.innerHTML += tablesList.map(item => createNavItem(item)).join('');
        }

        if (tablesList.length == 0 && query !== undefined) {
            sidebarNav.style.display = 'none';
            sidebarContent.querySelector('.sort-dropdown').style.display = 'none';
            sidebarContent.innerHTML += `<div class="${theme.textColor} p-2">
            No Results for '${query}' <a href="#" class="whitespace-nowrap ${theme.primaryTextColor}">Clear Search</a>
            </div> `;
        }

        if (tablesList.length == 0) {
            sidebarContent.innerHTML += `<div class="${theme.textColor} p-2">No Tables or Views Exist</div>`;
        }

        
        sidebarContent.querySelector('.display-options').addEventListener('click', function (e) {
            e.target.parentElement.appendChild(createTableOptionsMenu(tablesList));
        });

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
    sidebarNav.classList.add('flex','items-center','px-2','space-x-2',theme.textColor);


    let selectedTab = localStorage.getItem('selectedTab') || 'all';
    console.log(selectedTab);


    sidebarNav.innerHTML = /*HTML*/`
        <button data-filter="all" class="border rounded py-1 text-sm show-history flex-grow ${selectedTab == 'all'? theme.primaryBorderColor:theme.tableBorderColor} border-opacity-60">All (${tables.length})</button>
        <button data-filter="tables" class="border rounded py-1 text-sm show-tables flex-grow ${selectedTab == 'tables'? theme.primaryBorderColor:theme.tableBorderColor} border-opacity-60">Tables (${tables.filter(t => t.type == 'table').length})</button>
        <button data-filter="views" class="border rounded py-1 text-sm show-views flex-grow ${selectedTab == 'views'? theme.primaryBorderColor:theme.tableBorderColor} border-opacity-60">Views (${tables.filter(t => t.type == 'view').length})</button>
    `;

        

    if (selectedTab == 'tables') {
        loadNavItems(tables.filter(table => table.type == 'table'));
    } else if (selectedTab == 'views') {
        loadNavItems(tables.filter(table => table.type == 'view'));
    } else {
        loadNavItems(tables);
    }
    


    sidebarNav.querySelectorAll('button').forEach(button => {
        button.addEventListener('click',function(){
            let activeFilter = button.getAttribute('data-filter');
            localStorage.setItem('selectedTab',activeFilter);


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
                item.classList.remove(theme.primaryBorderColor);
                item.classList.add(theme.tableBorderColor);
            }
            this.classList.add(theme.primaryBorderColor);
        });
    }


    sidebar.append(searchBar,sidebarNav,sidebarContent);
    

    return sidebar;
};


function createTableOptionsMenu(table) {
    let content = document.createElement('div');
    let menu = createDropdownMenu(content);

    let createMenuItem = (label, callback) => {
        let menuItem = document.createElement('a');
        menuItem.classList.add('block', 'p-2',theme.textColor,'rounded','w-100');
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

    addDropdownOutsideClickHandler(menu, function () {});

    let navList = content.querySelectorAll('a');

    for (let item of navList) {
        item.addEventListener("mouseenter", function () {
            for (let item of navList) {
                item.classList.remove(theme.primaryColor,'bg-opacity-40');
            }
            this.classList.add(theme.primaryColor,'bg-opacity-40');
        });
    }

    return menu;
}

