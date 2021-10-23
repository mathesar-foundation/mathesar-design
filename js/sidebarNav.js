import { activeTable } from './main';
import { theme } from './themes.js';


// CREATE SIDEBAR
export function sidebarNav(tables) {

    let sidebar = document.createElement('div');
    let sections = tables.map(table => table.type).filter((v, i, a) => a.indexOf(v) === i);

    let createNavItem = function (table) {
        let item = document.createElement('a');
        item.setAttribute('href', 'javascript:void(0)');
        item.classList.add(theme.textColor, 'py-1', 'px-2', 'block', 'rounded', 'm-1');
        item.innerHTML = `<i class="ri-table-fill align-bottom mr-1"></i> ${table.name}`;

        let hoverClasses = [theme.darkPrimaryColor, 'bg-opacity-40'];

        if (table.id == activeTable) {
            item.classList.add(...hoverClasses);
        }

        item.addEventListener('click', function () {
            let url = `${window.location.pathname}?activeTable=${table.id}`;
            console.log(url);
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
        let sectionHeader = document.createElement('div');
        sectionHeader.classList.add('border-b','border-t', 'p-2', theme.tableBorderColor, theme.textColor);
        sectionHeader.innerHTML = `<span class="capitalize">${section}s</span> <span class="${theme.mediumBackgroundColor} rounded text-sm px-1">${items.length}</span>`;
        sectionWrapper.append(sectionHeader);

        items.forEach(table => sectionWrapper.appendChild(createNavItem(table)));
        return sectionWrapper;
    };

    sections.reverse().forEach(section => {
        sidebar.appendChild(createSection(section));
    });

    return sidebar;
};