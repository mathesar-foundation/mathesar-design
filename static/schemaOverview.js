import { theme } from './themes.js';
import { appWrapper, activeSchema } from './main';
import { icon } from './iconMap.js';

export function schemaOverview(tables) {

    appWrapper.querySelector('.table-wrapper').innerHTML = '';

    let schemaList = document.createElement('div');
    schemaList.classList.add('p-8');
    let actions = ['edited','updated','deleted']

    schemaList.innerHTML = /*HTML*/ `
    <div class="$text-zinc-800 $border-zinc-200">    
        <div class="flex items-center space-x-4 mb-4">
            <div class="text-4xl text-center"><i class="ri-share-line align-middle"></i></div>
        <div>
                <h2 class="text-xl font-semibold">${activeSchema}</h2>
                <p class="text-sm">${tables.filter(t => t.type == 'table').length} Tables ${tables.filter(t => t.type == 'view').length} Views</p>
        </div>
    </div>
    <div>
        <h3 class="py-4 text-xl">Recent</h3>
        ${tables.filter(t => t.favorite).slice(0,3).map( t => {
            return   `<div><a href="#" class="block"><i class="${icon[t.type]} ${theme.primaryTextColor} align-bottom mr-2"></i><span>${t.name}</span></a></div>`
        }).join('')||`<div class="$text-zinc-500">Find your most recent tables and views here.</div>`}

        <h3 class="py-4 text-xl">Activity</h3>
        ${tables.filter(t => t.type == 'view').slice(0,3).map( (t,i) => {
            return   `<div>Username ${actions[i]} view <a href="#" class="${theme.primaryTextColor}">${t.name}</a></div>`
        }).join('')||`<div class="$text-zinc-500">Find your most recent activity here.</div>`}

        <h3 class="py-4 text-xl">Get Started</h3>
        <div class="grid grid-cols-4 gap-2">
            <div class="$bg-zinc-100 bg-opacity-40 p-2 space-y-2">
                <div class="$bg-indigo-500 py-1 px-2 bg-opacity-20 rounded flex items-center space-x-2">
                    <i class="${icon['table']} text-xl $text-zinc-800"></i>
                    <span>Create a Table</span>
                </div>
                <div>
                
                <p class="mb-1">Use tables to store your data and create links to other tables.</p>
                <a href="#" class="${theme.primaryTextColor}"><i class="ri-add-line align-bottom"></i> New Table</a>
                </div>
            </div>
            <div class="$bg-zinc-100 bg-opacity-40 p-2 space-y-2">
                <div class="$bg-indigo-500 py-1 px-2 bg-opacity-20 rounded flex items-center space-x-2">
                    <i class="${icon['view']} text-xl $text-zinc-800"></i>
                    <span>Create a View</span>
                </div>
                <div>
                <p class="mb-1">Use views to save subsets of data from one or more tables and fields.</p>
                <a href="#" class="${theme.primaryTextColor}"><i class="ri-add-line align-bottom"></i> New View</a>
                </div>
            </div>
        </div>
       
    </div>
    </div>`;

    if (activeSchema == 'loading_error_schema') {
        schemaList.innerHTML = `<div class="$text-zinc-800 $border-zinc-200">
       
        <div class="flex items-center space-x-4 mb-4">
            <div class="text-4xl text-center"><i class="ri-share-line align-middle"></i></div>
            <div>
                 <h2 class="text-xl font-semibold">${activeSchema}</h2>
                 <p class="text-sm text-red-400"><i class="ri-error-warning-fill align-bottom text-red-400"></i> Failed to Load</div>
        </div>
   
     <div>`
    }

    appWrapper.querySelector('.table-wrapper').append(schemaList);
}


