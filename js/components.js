import { theme } from './themes.js';

var components = {
    createInput : function(options) {
        let input = document.createElement('input');
        input.classList.add('p-1',theme.inputBackgroundColor,'border',theme.darkBorderColor,theme.textColor);
        input.setAttribute('type','text');
        if (options.placeholder) {
            input.setAttribute('placeholder', options.placeholder);
        }
        if (options.value) {
            input.setAttribute('value', options.value);
        }
        return input;
    }
}

module.exports = { components };

