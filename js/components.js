import { theme } from './themes.js';

var components = {
    createInput: function (options) {
        let input = document.createElement('input');
        input.classList.add('p-1', theme.inputBackgroundColor, theme.textColor, 'bg-opacity-20', 'border', theme.tableBorderColor);
        input.setAttribute('type', 'text');
        if (options) {
            if (options.placeholder) {
                input.setAttribute('placeholder', options.placeholder);
            }
            if (options.value) {
                input.setAttribute('value', options.value);
            }
        }
        return input;
    },
    createRadioInput: function (options) {
        let formGroup = document.createElement('div');
        formGroup.classList.add('space-x-2')
        let input = document.createElement('input');
        input.type = 'radio';
        input.setAttribute('value', options.value);
        input.setAttribute('name', options.name);
        let label = document.createElement('label');
        label.innerHTML = options.label;
        formGroup.append(input, label);

        label.addEventListener('click', function () {
            if (input.checked) {
                input.checked = false;
            } else {
                input.checked = true;
            }
        });

        return formGroup;
    }, createCheckInput: function (options) {
        let formGroup = document.createElement('div');
        formGroup.classList.add('space-x-3')
        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', options.value);
        input.setAttribute('name', options.name);
        let label = document.createElement('label');
        label.innerHTML = options.label;

        if (options.position == 'right') {
            formGroup.append(label, input);
        } else {
            formGroup.append(input, label);
        }

        label.addEventListener('click', function () {
            if (input.checked) {
                input.checked = false;
            } else {
                input.checked = true;
            }
        });


        return formGroup;
    },
    createSelectInput: function (list, options) {
        let formGroup = document.createElement('div');
        let input = document.createElement('select');
        input.classList.add('p-1', theme.inputBackgroundColor, theme.textColor, 'bg-opacity-20', 'border', theme.tableBorderColor, 'w-full');

        let blankOption = document.createElement('option');
        blankOption.innerText = `Select`;
        blankOption.selected = true;
        blankOption.disabled = true;
        input.prepend(blankOption);

        list.forEach(item => {
            let option = document.createElement('option');
            option.innerText = item;
            option.setAttribute('value', item);
            if (item == options.selected) {
                option.setAttribute('selected', true);
            }
            input.append(option);
        });

        let label = document.createElement('label');
        label.classList.add('block');
        label.innerHTML = options.label;
        formGroup.append(label, input);

        return formGroup;
    },
    createFormGroup: function (input, label) {
        let formGroup = document.createElement('div');
        let formControl = input;
        let controlLabel = document.createElement('label');
        controlLabel.classList.add('block');
        controlLabel.innerHTML = label;
        formGroup.append(controlLabel, formControl)
        return formGroup;
    },
    createButton: function (value, options) {
        let btn = document.createElement('button');
        btn.classList.add('px-2', 'py-1', theme.textColor, 'space-x-2');
        btn.innerHTML = `${value}`;

        if (options) {
            if (options.noLabel) {
                btn.innerHTML = ``;
            }
            if (options.icon) {
                let btnIcon = document.createElement('i');
                btnIcon.classList.add(`ri-${options.icon}-line`, 'align-bottom', theme.primaryTextColor, 'mr-1');
                btn.prepend(btnIcon);
            }
            if (options.style) {
                if (options.style == 'primary') {
                    btn.classList.add(theme.darkPrimaryColor);
                }
                if (options.style == 'secondary') {
                    btn.classList.add('border', theme.lightBorderColor);
                }
                if (options.style == 'link') {
                    btn.classList.add('border', 'border-opacity-0');
                }
            }
        }
        return btn;
    },
    createIcon: function (name, options) {
        let icon = document.createElement('i');
        icon.classList.add(name, 'align-bottom');

        if (options) {
            if (options.style) {
                if (options.style == 'type') {
                    icon.classList.add(theme.primaryColor, 'rounded', 'mr-1');
                    icon.style.padding = '1px'
                }
            }
        }

        return icon;
    },
    createTitle: function (title,subtitle,options) {
        let titleWrapper = document.createElement('div');
        let mainTitle = document.createElement('h2');
        mainTitle.classList.add('text-lg');
        mainTitle.innerText = title;
        titleWrapper.appendChild(mainTitle);
        titleWrapper.classList.add('mb-3');

        let subTitle = document.createElement('h3');
        if (subtitle) {
            subTitle.innerText = subtitle;
            subTitle.classList.add(theme.mutedTextColor);
            titleWrapper.appendChild(subTitle);
        }
        if (options) {
            if (options.tooltip) {
                subTitle.appendChild(createTooltip(options.tooltip));
            }
        }

        return titleWrapper;
    }
}

module.exports = { components };

