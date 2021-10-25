import { theme, themes, setNextTheme } from './themes.js';
import { components } from './components.js';
 
export function topNav(schema) {
    let topNav = document.createElement('div');
    topNav.classList.add('py-1','px-2','border-b',theme.tableBorderColor,'flex','space-x-2','items-center');
    let schemaName = document.createElement('div');
    schemaName.innerHTML = `<div class="flex space-x-2 items-center mr-2">
    <div class="${theme.primaryColor} ${theme.inverseTextColor} text-sm px-1 rounded">M</div>
    <div class="${theme.textColor}">${schema.name}</div>
    </div>`

    let searchBar = document.createElement('div');
    searchBar.classList.add('flex-grow');
    let searchInput = components.createInput({placeholder: 'Search or Jump To…'});
    searchInput.classList.add('w-full');
    searchBar.append(searchInput);

    let accountSelector = document.createElement('div');
    accountSelector.classList.add('p-1');
    accountSelector.innerHTML = `<i class="ri-user-fill align-bottom ${theme.textColor}"></i> <i class="ri-more-2-line align-bottom ${theme.textColor}"></i>`;

    let changeThemeBtn = components.createButton('Change Theme');

    changeThemeBtn.addEventListener('click',function(){
        setNextTheme();
        
    });  

    topNav.append(schemaName,searchBar,changeThemeBtn,accountSelector);
    return topNav;
}