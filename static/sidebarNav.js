//import { activeSchema, activeTable } from './main';
//import { theme } from './themes.js';
//import { components } from './components.js';
//import { icon } from './iconMap';
//import { createDropdownMenu, addDropdownOutsideClickHandler } from './createDropdownMenu';

// CREATE SIDEBAR
export function sidebarNav(tables) {
    let sidebarCalcHeight = 'calc(100vh - 54px)';
    let selectedTab = localStorage.getItem('selectedTab') || 'all';

    if (activeSchema == 'album_collection') {
        tables.splice(3, 0, { name: 'ErrorView', type: 'view', id: 'error', records: [], columns: [] });//ADD ERROR TABLE
        tables.splice(3, 0, { name: 'Table with unsaved changes', type: 'table', id: 'unsaved', unsaved: true, records: [], columns: [] });//ADD ERROR TABLE
    }

    let sidebar = document.createElement('div');
    sidebar.classList.add('flex', 'flex-col', theme.darkPrimaryColor, 'bg-opacity-10', 'border-r', theme.darkBorderColor);
    sidebar.style.height = sidebarCalcHeight;

    let searchBar = document.createElement('div');
    searchBar.classList.add('flex', 'p-2','border-b','mb-2',theme.tableBorderColor,'border-opacity-60');
    let searchInput = components.createInput({ placeholder: 'Type to search' });
    searchInput.classList.add('w-full');

    searchBar.append(searchInput);

    let sidebarContent = document.createElement('div');
    sidebarContent.style.height = '200px';
    sidebarContent.classList.add('flex-grow','flex','flex-col');
    
    searchInput.addEventListener('keyup', function (e) {
        let filteredTables = tables.filter(table => table.name.toLowerCase().includes(e.target.value.toLowerCase()));
        loadNavItems(filteredTables, e.target.value);
    });

    let loadNavItems = function (tablesList, query) {
        sidebarContent.innerHTML = '';
        sidebarNav.style.display = 'flex';

        let createNavItem = function (table) {
            let tableURL = `${window.location.pathname}?activeSchema=${activeSchema}&activeTable=${table.id}`;
            let tableIcon = `<i class="${icon[table.type]} align-bottom ${table.type == 'table' ? theme.primaryTextColor : theme.contrastTextColor}"></i>${table.isMaterialized?`<span class="text-xs ml-1 align-text-bottom ${theme.mutedTextColor}">M</span>`:''}`
            let activeClasses = `${table.id == activeTable ? `${theme.primaryColor} bg-opacity-40 font-semibold` : ''}`;
      
            if (!query) {
                return `<a class="flex items-center ${table.unsaved?'bg-orange-200 bg-opacity-20 unsaved-table':''} ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}">
                <div class="mr-auto"><span class="mr-2">${tableIcon}</span>${table.name}</div>
                ${table.unsaved?`<i class="ri-checkbox-blank-circle-fill text-orange-200 text-xs"></i>`:''}
                </a>`;
            } else {
                return `<a class="block ${theme.textColor} py-1 px-2 rounded mx-1 ${activeClasses}" href="${tableURL}">
                <div class="mr-auto"><span class="mr-2">${tableIcon}</span>${table.name}</div>
                <span class="text-sm ${theme.mutedTextColor}">${table.columns.length} Columns ${table.records.length} Records</span>
                </a>`
            }
        };

        if (tablesList.length > 0) {
            const uniqueTypes = [...new Set(tablesList.map(item => item.type))].reverse();
            if (query){
                sidebarContent.innerHTML += `<div class="${theme.textColor} p-2">${tablesList.length} results for '${query}'</div>`;
            };
            uniqueTypes.forEach(type => {
                if (selectedTab == 'all') {
                    sidebarContent.innerHTML += `
                    <div class="px-2 py-1 border-b ${theme.tableBorderColor} border-opacity-60 capitalize ${theme.textColor} font-semibold text-sm">${type}s</div>
                    <div class="flex-grow" style="overflow-y:scroll">
                        ${tablesList.filter(item => item.type == type).map(item => createNavItem(item)).join('')}
                    </div>
                    `
                } else {
                    sidebarContent.innerHTML += tablesList.filter(item => item.type == type).map(item => createNavItem(item)).join('');
                }

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
    sidebarNav.classList.add('flex', 'items-center', 'px-2', theme.textColor,'mb-2');

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
    sidebarWrapper.style.height = sidebarCalcHeight;
    sidebarWrapper.style.overflowY = 'hidden';

    sidebarWrapper.innerHTML = `
    <div class="shrink-0 ${theme.mediumBackgroundColor} bg-opacity-40">
        <a href="javascript:void(0)" data-target="default" class="${theme.textColor} ${theme.darkPrimaryColor} active bg-opacity-40 sidebar-nav flex items-center" style="width:40px; height:40px"><i class="ri-menu-line text-lg mx-auto"></i></a>
        <a href="javascript:void(0)" data-target="apps" class="${theme.textColor} bg-opacity-20 sidebar-nav flex items-center" style="width:40px; height:40px"><i class="ri-function-line text-lg mx-auto"></i></a>
    </div>`;


    let appContent = document.createElement('div');
    
    let apps = [
        {'name':'Export Sheet Data','description':'Export tables as XML or JSON'},
        {'name':'ChartExpo','description':'Turn data into visual stories'},
        {'name':'API Connector','description':'Connect and import data from any API'}
    ];

    appContent.innerHTML = `
        <div class="px-2 py-1 border-b ${theme.tableBorderColor} border-opacity-60 text-sm ${theme.textColor}">Plugins</div>
        <div class="p-2 ${theme.textColor} space-y-2">
            ${apps.map(app => {
                return `
                <div class="p-2 ${theme.darkPrimaryColor} bg-opacity-30 space-y-2">
                    <h3>${app.name}</h3>
                    <p class="text-sm">${app.description}</p>
                    <button class="bg-green-500 text-sm px-2"><i class="ri-add-line align-bottom"></i> Add</button>
                </div>`
            }).join('')}          
        </div>`

    loadSidebar([searchBar, sidebarNav, sidebarContent]);

    sidebarWrapper.querySelectorAll('.sidebar-nav')[0].style.position = 'relative';

    let saveIndicator = document.createElement('div');
    saveIndicator.classList.add('bg-rose-500','bg-opacity-90','text-center','text-xs','text-white');
    saveIndicator.style.width = '16px';
    saveIndicator.style.height = '16px';
    saveIndicator.style.lineHeight = '16px';
    saveIndicator.style.borderRadius = '8px';
    saveIndicator.style.position = 'absolute';
    saveIndicator.style.right = '4px';
    saveIndicator.style.bottom = '4px';
    saveIndicator.innerHTML = `1`

    if(!!tables.find(t => t.unsaved)) {
        sidebarWrapper.querySelectorAll('.sidebar-nav')[0].append(saveIndicator);
    }

    var previousTarget = 'default';
    
    sidebarWrapper.querySelectorAll('.sidebar-nav').forEach(navItem => {
        navItem.addEventListener('click',function(){
            let target = this.getAttribute('data-target');
           
            if(target === previousTarget && sidebarWrapper.contains(sidebar)) {
                sidebarWrapper.removeChild(sidebar);
            } else {
                if (target == 'default'){
                    loadSidebar([searchBar, sidebarNav, sidebarContent]);
                } else {
                    loadSidebar([searchBar, appContent]);
                }
            }

            previousTarget = this.getAttribute('data-target');
            return false;

            
            
        });
    });

    

    function loadSidebar(selected){
        

            sidebar.innerHTML = '';
            sidebar.append(...selected);
            sidebarWrapper.append(sidebar);
        
    };    

    let sidebarNavList =  sidebarWrapper.querySelectorAll('.sidebar-nav');

    console.log(sidebarNavList)

    for (let item of sidebarNavList) {
        item.addEventListener("click", function () {
            for (let item of sidebarNavList) {
                item.classList.remove(theme.darkPrimaryColor,'active');
            }
            this.classList.add(theme.darkPrimaryColor,'active');
        });
    };

    return sidebarWrapper;
};