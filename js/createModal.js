import { theme } from './themes.js';

export function createModal(content, footer) {
    let overlay = document.createElement('div');
    let modal = document.createElement('div');
    modal.style.position = 'relative';
    modal.style.minWidth = '800px';
    let modalClasses = [theme.backgroundColor, theme.textColor, 'border', 'mx-auto', theme.mediumBorderColor];
    modal.classList.add(...modalClasses);
    overlay.classList.add('bg-gray-900', 'w-full', 'h-full', 'flex', 'items-center', 'bg-opacity-70');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    let modalContent = document.createElement('div');
    modalContent.classList.add('p-3')
    modalContent.appendChild(content);
    modal.appendChild(modalContent);
    overlay.appendChild(modal);
    overlay.style.zIndex = '9999';
    let closeModalBtn = document.createElement('button');
    closeModalBtn.classList.add('px-2');
    closeModalBtn.style.position = 'absolute';
    closeModalBtn.style.right = '0',
        closeModalBtn.innerHTML = `<i class="ri-close-line"></i>`;
    closeModalBtn.addEventListener('click', function () {
        overlay.remove();
    });
    overlay.addEventListener('click', function (event) {
        //console.log(event.target);
        if (event.target == overlay) {
            overlay.remove();
        }
    });
    modalContent.prepend(closeModalBtn);
    if (footer) {
        let footerContent = footer;
        footerContent.classList.add('mt-4', 'space-x-2','p-3','flex','justify-end','border-t',theme.tableBorderColor);
        modal.appendChild(footerContent);
    }
    return overlay;
}
