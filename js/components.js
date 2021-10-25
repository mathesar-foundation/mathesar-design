import { theme } from './themes.js';

var components = {
    createInput : function(options) {
        let input = document.createElement('input');
        input.classList.add('p-1',theme.inputBackgroundColor,theme.textColor);
        input.setAttribute('type','text');
        if (options.placeholder) {
            input.setAttribute('placeholder', options.placeholder);
        }
        if (options.value) {
            input.setAttribute('value', options.value);
        }
        return input;
    },
    createButton : function(value, options) {
        let btn = document.createElement('button');
        btn.classList.add('px-2', 'py-1',theme.textColor);
        btn.innerHTML = `${value}`;
    
        if (options) {
            if (options.icon) {
                let btnIcon = document.createElement('i');
                btnIcon.classList.add(`ri-${options.icon}-line`, 'align-bottom', 'mr-2');
                btn.prepend(btnIcon);
            }
            if (options.style) {
                if (options.style == 'primary') {
                    btn.classList.add(theme.darkPrimaryColor);
                }
                if (options.style == 'secondary') {
                    btn.classList.add('border',theme.lightBorderColor);
                } 
                if (options.style == 'link') {
                    btn.classList.add('border','border-opacity-0');
                }    
            }
        }
        return btn;
    },
    createIcon : function(name) {
        let icon = document.createElement('i');
        icon.classList.add(`ri-${name}-line`,'align-bottom');
        return icon;
    } 
}

module.exports = { components };

