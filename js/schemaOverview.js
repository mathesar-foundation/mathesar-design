import { theme } from './themes.js';
import { topNav } from './topNav';
import { appWrapper, schema, savedTables, errorStatus } from './main';
import { loadedTables } from './tables.js';

export function schemaOverview() {
    appWrapper.innerHTML = '';

    let schemaList = document.createElement('div');
    schemaList.innerHTML = /*HTML*/ `
    <div class="${theme.textColor} p-4 border-b ${theme.tableBorderColor}">
        <div class="container mx-auto">
            <div class="flex items-center space-x-4">
                <div class="${theme.primaryColor} rounded p-2 text-2xl text-center" style="width:48px;height:48px">M</div>
                <div>
                    <h2 class="text-2xl">${schema.name}</h2>
                    <p class="text-sm">${savedTables.length} Tables and Views</p>
                </div>
            </div>
        </div>
        
    </div>
    
    <div>
        <div class="container mx-auto">

            <div class="py-4 space-y-4">
                <div>
                    <input type="text" class="${theme.inputBackgroundColor} p-2 bg-opacity-60 w-full" placeholder="Search Tables and Views">
                </div>
                <div class="list-wrapper">

                </div>
                <div class="${theme.textColor} flex items-center space-x-1 justify-center">
                    <a href="#" class="border py-1 px-2 text-xs ${theme.primaryColor} ${theme.primaryBorderColor}">1</a>
                    <a href="#" class="border py-1 px-2 text-xs ${theme.mediumBorderColor}">2</a>
                    <a href="#" class="border py-1 px-2 text-xs ${theme.mediumBorderColor}">3</a>
                </div>
            </div>
        </div>
    </div>`;

    let createNavItem = function (table) {
        let item = document.createElement('a');
        item.href = 'javascript:void(0)';
        item.classList.add(theme.textColor, 'py-1', 'px-2', 'block', 'rounded', 'flex', 'items-center');

        let itemIcon = function (type) {
            if (type == 'table') {
                return `<i class="ri-table-fill align-bottom mr-1 ${theme.primaryTextColor}"></i>`;
            } else {
                return `<i class="ri-layout-grid-fill align-bottom mr-1 ${theme.primaryTextColor}"></i>`;
            }
        };

        item.innerHTML = `<div>${itemIcon(table.type)} ${table.name}</div> <div class="text-sm ml-auto ${theme.mutedTextColor}">Last Accessed ${table.lastUpdated}</div>`;

        item.addEventListener('click', function () {
            let url = `${window.location.pathname}?activeTable=${table.id}`;
            location.assign(url);
        });

        return item;
    };

   

    loadedTables.forEach(table =>{
        schemaList.querySelector('.list-wrapper').appendChild(createNavItem(table));
    })
    

    if (errorStatus) {
        schemaList.querySelector('.list-wrapper').innerHTML = `
        <div class="bg-red-300 p-4 ${theme.textColor} bg-opacity-40 text-opacity-80 space-y-2">
        <div>
        <h3 class="text-lg"><i class="ri-error-warning-fill align-bottom text-red-400"></i> Failed to load tables and views from the server.</h3>
        <p>The server responded with a status of 500 (Internal Server Error).</p>
        </div>
        <a href="#" class="border ${theme.lightBorderColor} inline-block rounded py-1 px-2"><i class="ri-refresh-line align-bottom"></i> Retry</a>
        </div>
        `;
    }


    appWrapper.append(topNav(schema), schemaList);
}
