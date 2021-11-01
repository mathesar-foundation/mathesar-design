import { theme } from './themes.js';
import { components } from './components.js';
import { createModal } from './createModal';
import { icon } from './iconMap.js';
import { createTitle, columnByName, savedTables, selectTableByName, saveTable } from './main';


function typeIcon(column) {
    let selectedColumn = columnByName(column);
    if (selectedColumn) {
        return components.createIcon(icon[selectedColumn.type], { style: 'type' });
    } else {
        return '';
    }
}

function createConstraintItem(column, type, fn) {
    let item = document.createElement('a');
    item.href = 'javascript:void(0)';
    item.classList.add('border-b', theme.tableBorderColor, 'p-2', 'flex', 'items-center', 'space-x-1');

    let labelWrapper = document.createElement('div');
    labelWrapper.classList.add('mr-auto', 'space-y-1');
    let itemLabel = document.createElement('div');
    itemLabel.classList.add('mr-2');

    let itemReferences = document.createElement('div');
    itemReferences.classList.add('text-sm');

    let constraintName = '';

    if (!column) {
        item.innerHTML = `New Constraint`;
    } else {
        constraintName = `${type.match(/[A-Z]+/g).join("")}_${column.name}`;
        itemLabel.innerHTML = `${constraintName} <span class="text-sm">(${type})</span>`;
        if (column.lookupField) {
            itemReferences.innerHTML = `${typeIcon(column.lookupField).outerHTML} ${column.name} <i class="ri-arrow-right-line align-bottom"></i> ${column.lookupTable} ${typeIcon(column.lookupField).outerHTML} <span class=""> ${column.lookupField}</span>`;
        } else {
            itemReferences.innerHTML = `${typeIcon(column.name).outerHTML} <span class=""> ${column.name}</span>`;
        }
    }

    let itemForm = { name: constraintName, type: type, reference: column.lookupTable, columns: [column.name], referenceColumns: [column.lookupField] }


    item.addEventListener('click', function () {
        fn(itemForm);
    });

    labelWrapper.append(itemLabel);
    //labelWrapper.append(itemLabel, itemReferences);
    item.append(labelWrapper);

    return item;
}

function columnSelector(columns, selected) {
    let selector = document.createElement('div');
    selector.classList.add('border', theme.tableBorderColor);
    columns.forEach(col => {
        let inputGroup = components.createCheckInput({ value: col.name, label: col.name, name: 'colSelector' });
        inputGroup.classList.add('p-1');

        if (col.lookupField) {
            inputGroup.querySelector('label').prepend(typeIcon(col.lookupField));
        } else {
            inputGroup.querySelector('label').prepend(typeIcon(col.name));
        }
        if (selected && selected.includes(col.name)) {
            inputGroup.querySelector('input').setAttribute('checked', true);
        }
        selector.append(inputGroup);
    });
    return selector;
}



export function setTableConstraints(table) {

    let constraintList = {
        pkConstraints: {
            type: 'Primary Key',
            columns: table.columns.filter(column => column.readOnly)
        },
        fkConstraints: {
            type: 'Foreign Key',
            columns: table.columns.filter(column => column.type == 'fk')
        }
    };

    let actions = document.createElement('div');
    let applyBtn = components.createButton('Apply', { style: 'primary' });
    actions.append(components.createButton('Cancel', { style: 'secondary' }), applyBtn);

    let content = document.createElement('div');

    let gridContainer = document.createElement('div');

    gridContainer.classList.add('grid', 'gap-2', 'grid-cols-6');

    let modal = createModal(content, actions);
    document.querySelector('body').appendChild(modal);

    content.prepend(createTitle(
        'Table Constraints',
        'Constraints limit the type of data that can go into this table'
    ));

    content.append(gridContainer);

    let list = document.createElement('div');
    list.classList.add('col-span-2', 'border', theme.tableBorderColor, 'flex', 'flex-col');

    let addBtn = components.createButton('Add', { style: 'secondary', icon: 'add' });
    let deleteBtn = components.createButton('Delete', { style: 'secondary', icon: 'delete-bin' });

    let form = document.createElement('div');
    form.style.height = '380px';
    form.style.overflowY = 'scroll';
    form.classList.add('col-span-4', 'border', theme.tableBorderColor, theme.darkBackgroundColor, 'p-2', 'space-y-2');

    let constraints = ['Unique', 'Primary Key', 'Foreign Key', 'Not Null'];


    function showForm(_form) {

        form.innerHTML = '';
        let constraintType = components.createSelectInput(constraints, { label: 'Constraint Type', selected: _form.type });
        let referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Referenced Table' });
        let columns = columnSelector(table.columns, _form.columns);


        if (!_form.name) {
            _form.name = 'FK_';
        }

        // REMOVE THIS FIX
        if (_form.columns.includes(undefined)) {
            _form.columns = [];
        }


        form.append(
            components.createFormGroup(components.createInput({ value: _form.name }), 'Constraint Name'),
            constraintType,
            columns
        );

        if (_form.type == 'Foreign Key' && !_form.reference) {
            form.append(
                referencedTable
            );
        }

        if (_form.reference) {
            var referenceColumns = columnSelector(selectTableByName(_form.reference).columns, _form.referenceColumns);
            form.append(
                referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Referenced Table', selected: _form.reference }),
                referenceColumns
            );

            referenceColumns.querySelectorAll('input').forEach(input => {
                input.addEventListener('change', function () {
                    console.log(input.checked);
                    if (input.checked == true) {
                        _form.referenceColumns.push(input.value);
                    } else {
                        const index = _form.referenceColumns.indexOf(input.value);
                        if (index > -1) { _form.referenceColumns.splice(index, 1); }
                    }
                    showForm(_form);
                });
            });


        }


        columns.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', function () {
                console.log(input.checked);
                if (input.checked == true) {
                    _form.columns.push(input.value);
                } else {
                    const index = _form.columns.indexOf(input.value);
                    if (index > -1) { _form.columns.splice(index, 1); }
                }
                showForm(_form);
            });
        });



        constraintType.addEventListener('change', function () {
            let setType = constraintType.childNodes[1].value;
            _form.type = setType;
            if (setType == 'Foreign Key') {
                _form.name = 'FK_';
                showForm(_form);
            } else if (setType == 'Primary Key') {
                _form.name = 'PK_';
            } else if (setType == 'Not Null') {
                _form.name = 'NOTNULL_';
            } else {
                _form.name = 'UNIQUE_';
            }
            showForm(_form);
        });

        referencedTable.addEventListener('change', function () {
            _form.reference = referencedTable.childNodes[1].value;
            _form.referenceColumns = [];
            showForm(_form);
        });


        applyBtn.addEventListener('click', function () {

            let _column = table.columns.find(column => _form.columns.includes(column.name));
            //console.log(_column);
            if (_form.reference) {
                _column.type = 'fk';
                _column.lookupTable = _form.reference;
                _column.lookupField = _form.referenceColumns[0];
            }

            document.querySelector('.table-wrapper').innerHTML = '';
            saveTable(table);
            sessionStorage.setItem('tables', JSON.stringify(savedTables));
            modal.remove();
            location.reload();
        });
    }

    

    let buildList = (obj) => {
        for (const prop in obj) {
            obj[prop].columns.forEach(item => list.append(createConstraintItem(item, obj[prop].type, showForm)));
        }
        const navList = list.querySelectorAll('a');
        for (let item of navList) {
            item.addEventListener("click", function () {
                for (let item of navList) { item.classList.remove(theme.darkPrimaryColor, 'bg-opacity-40'); }
                this.classList.add(theme.darkPrimaryColor, 'bg-opacity-40');
            });
        }

    

        navList[(navList.length)-1].click();


        let formActions = document.createElement('div');
        formActions.classList.add('p-1', 'space-x-1', 'flex', 'mt-auto', theme.mediumBackgroundColor);
        list.append(formActions);
        formActions.append(addBtn, deleteBtn);

        addBtn.addEventListener('click', function () {
            list.innerHTML = '';
            constraintList['New'] = { type: 'Foreign Key', columns: [''] };
            buildList(constraintList);
        });
    }

    

    buildList(constraintList);

    gridContainer.append(list, form);
}

