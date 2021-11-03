import { theme } from './themes.js';

export function createDropdownMenu(content) {
    let menu = document.createElement('div');
    menu.classList.add('edit-dropdown', 'shadow-md', theme.backgroundColor, 'p-2', 'space-y-2', 'border', theme.tableBorderColor);
    menu.style.position = 'absolute';
    menu.style.minWidth = '240px';
    menu.style.zIndex = '999';

    menu.appendChild(content);

    return menu;
}

function removeDropdownOutsideClickHandler(menu) {
    if (menu.outsideClickHandler) {
        document.removeEventListener('click', menu.outsideClickHandler);
    }
}

export function addDropdownOutsideClickHandler(menu, fn) {
    function handler(event) {
        console.log(event.target.tagName);
        var isClickInsideElement = isNodeChildOf(event.target, menu) || event.target.tagName === 'INPUT';
        if (!isClickInsideElement) {
            fn(menu);
            menu.remove();
            document.removeEventListener('click', handler);
            menu.outsideClickHandler = null;
        }
    }

    removeDropdownOutsideClickHandler(menu);

    setTimeout(function () {
        document.addEventListener('click', handler);
        menu.outsideClickHandler = handler;
    }, 0);
}

function isNodeChildOf(obj, parentObj) {
    while (obj != undefined && obj != null && obj.tagName.toLowerCase() != 'body') {
        if (obj == parentObj) {
            return true;
        }
        obj = obj.parentNode;
    }
    return false;
}

