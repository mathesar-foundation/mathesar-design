import { theme } from './themes.js';

var components = {
    createInput : function(options) {
        let input = document.createElement('input');
        input.classList.add('p-1',theme.inputBackgroundColor,'border',theme.tableBorderColor);
        input.setAttribute('placeholder', options.placeholder);
        return input;
    }
}

module.exports = { components };

