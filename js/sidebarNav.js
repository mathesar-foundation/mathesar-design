import { activeTable } from './main';
import { theme } from './themes.js';
import { components } from './components.js';


// CREATE SIDEBAR
export function sidebarNav(tables) {

    let sidebar = document.createElement('div');
    sidebar.classList.add('flex','flex-col');
    sidebar.style.height = 'calc(100vh - 43px)';
    sidebar.style.overflowY = 'hidden';

    let sections = tables.map(table => table.type).filter((v, i, a) => a.indexOf(v) === i);

    let searchBar = document.createElement('div');
    searchBar.classList.add('flex','p-1');
    let searchInput = components.createInput({placeholder: 'Type to search'});
    searchInput.classList.add('w-full');
    
    let moreMenu = document.createElement('div');
    moreMenu.classList.add('py-1','px-2')
    moreMenu.innerHTML = `<i class="ri-more-2-line ${theme.textColor}"></i>`;
    searchBar.append(searchInput,moreMenu);
    sidebar.append(searchBar);


    let createNavItem = function (table) {
        let item = document.createElement('a');
        item.setAttribute('href', 'javascript:void(0)');
        item.classList.add(theme.textColor, 'py-1', 'px-2', 'block', 'rounded', 'm-1');
        let itemIcon = function(type){
            if (type == 'table') {
                return `<i class="ri-table-fill align-bottom mr-1 ${theme.primaryTextColor}"></i>`;
            } else { 
                return `<i class="ri-layout-grid-fill align-bottom mr-1 ${theme.primaryTextColor}"></i>`;
            }
        };
        item.innerHTML = `${itemIcon(table.type)} ${table.name}`;

        let hoverClasses = [theme.primaryColor, 'bg-opacity-40'];

        if (table.id == activeTable) {
            item.classList.add(...hoverClasses);
        }

        item.addEventListener('click', function () {
            let url = `${window.location.pathname}?activeTable=${table.id}`;
            location.assign(url);
        });

        item.addEventListener('mouseover', function () {
            //item.classList.add(...hoverClasses)
        });

        item.addEventListener('mouseleave', function () {
            //item.classList.remove(...hoverClasses)
        });

        return item;
    };

    let createSection = function (section) {
        let items = tables.filter(table => table.type == section);
        let sectionWrapper = document.createElement('div');
        sectionWrapper.classList.add('flex-grow','h-50',theme.backgroundColor);
        sectionWrapper.style.overflowY = 'scroll';
        let sectionHeader = document.createElement('div');
        //sectionHeader.classList.add('border-b','border-t','pl-2', theme.tableBorderColor, theme.textColor,'flex','items-center');
        sectionHeader.classList.add('px-2','py-1',theme.mutedTextColor,theme.darkBackgroundColor)
        sectionHeader.innerHTML = `<span class="uppercase text-sm mr-2">${section}s</span> <span class="${theme.mediumBackgroundColor} rounded px-1">${items.length}</span>`;
        
        let addBtn = document.createElement('button');
        addBtn.classList.add('ml-auto',theme.darkPrimaryColor,'py-1','px-2');
        addBtn.innerHTML = `<i class="ri-add-line"></i>`;
        //sectionHeader.append(addBtn);

        addBtn.addEventListener('click',function(){
            //allTables.push(addNew(section))
            //sessionStorage.setItem('tables', JSON.stringify(tables));
            //location.reload();
        });
        
        sidebar.append(sectionHeader);

        items.forEach(table => sectionWrapper.appendChild(createNavItem(table)));


        sectionWrapper.querySelectorAll('a').forEach(item => {
            item.addEventListener('mouseenter',function(){
                item.classList.add(theme.mediumBackgroundColor,'bg-opacity-80')
            });
            item.addEventListener('mouseleave',function(){
                item.classList.remove(theme.mediumBackgroundColor,'bg-opacity-80')
            });
        })


        return sectionWrapper;
    };

    sections.reverse().forEach(section => {
        sidebar.appendChild(createSection(section));
    });



    return sidebar;
};

