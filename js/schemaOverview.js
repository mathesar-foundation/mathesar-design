import { theme } from './themes.js';
import { appWrapper, savedTables, activeSchema } from './main';

export function schemaOverview() {
    appWrapper.querySelector('.table-wrapper').innerHTML = '';

    let schemaList = document.createElement('div');
    schemaList.classList.add('p-8');
    let actions = ['edited','updated','deleted']

    schemaList.innerHTML = /*HTML*/ `
    
    <div class="${theme.textColor} ${theme.tableBorderColor}">
       
       <div class="flex items-center space-x-4 mb-4">
           <div class="text-4xl text-center"><i class="ri-share-line align-middle"></i></div>
           <div>
                <h2 class="text-xl font-semibold">${activeSchema}</h2>
                <p class="text-sm">${savedTables.filter(t => t.type == 'table').length} Tables ${savedTables.filter(t => t.type == 'view').length} Views</p></div>
       </div>
  
   <div>
        <h3 class="py-4 text-xl">Favorites</h3>
        ${savedTables.filter(t => t.favorite).slice(0,3).map( t => {
            return   `<div><a href="#" class="${theme.primaryTextColor}">${t.name}</a></div>`
        }).join('')||`<div class="${theme.mutedTextColor}">No Favorites</div>`}

        <h3 class="py-4 text-xl">Activity</h3>
        ${savedTables.filter(t => t.type == 'view').slice(0,3).map( (t,i) => {
            return   `<div>Username ${actions[i]} view <a href="#" class="${theme.primaryTextColor}">${t.name}</a></div>`
        }).join('')||`<div class="${theme.mutedTextColor}">No Activity</div>`}

        <h3 class="py-4 text-xl">Get Started</h3>
        <div><a href="#" class="${theme.primaryTextColor}">Create a Table</a></div>
        <div><a href="#" class="${theme.primaryTextColor}">Create a View</a></div>
       
   </div>
</div>
    
    `;



    appWrapper.querySelector('.table-wrapper').append(schemaList);
}


