import { theme } from './themes.js';
import { appWrapper, savedTables, activeSchema } from './main';

export function schemaOverview() {
    appWrapper.querySelector('.table-wrapper').innerHTML = '';

    let schemaList = document.createElement('div');
    schemaList.classList.add('p-8');
    schemaList.innerHTML = /*HTML*/ `
    
    <div class="${theme.textColor} ${theme.tableBorderColor}">
       
       <div class="flex items-center space-x-4 mb-4">
           <div class="text-4xl text-center"><i class="ri-share-line align-middle"></i></div>
           <div>
               <h2 class="text-xl font-semibold">${activeSchema}</h2>
               <p class="text-sm">${savedTables.length} Tables and Views</p>
           </div>
       </div>
  
   <div>
       <h3 class="py-4 text-xl">Recent Views</h3>
        Recent views go here
       
   </div>
</div>
    
    `;



    appWrapper.querySelector('.table-wrapper').append(schemaList);
}


