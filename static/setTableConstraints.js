//import { theme } from './themes.js';
//import { components } from './components.js';
//import { createModal } from './createModal';
//import { icon } from './iconMap.js';
//import { createTitle, columnByName, savedTables, selectTableByName, saveTable } from './main';


function typeIcon(column) {
    let selectedColumn = columnByName(column);
    if (selectedColumn) {
        return components.createIcon(icon[selectedColumn.type], { style: 'type' });
    } else {
        return '';
    }
}

function columnSelector(obj) {
    let selectorWrapper = document.createElement('div');

    selectorWrapper.innerHTML = `<h4>${obj.title}</h4>`
    let selector = document.createElement('div');
    selector.classList.add('border', theme.tableBorderColor, 'space-y-2', 'p-2');
    obj.columns.forEach(col => {
        let inputGroup = components.createCheckInput({ value: col.name, label: col.name, name: 'colSelector' });
        inputGroup.classList.add('p-1', theme.mediumBackgroundColor);

        if (col.lookupField) {
            inputGroup.querySelector('label').prepend(typeIcon(col.lookupField));
        } else {
            inputGroup.querySelector('label').prepend(typeIcon(col.name));
        }
        if (obj.selected.includes(col.name)) {
            inputGroup.querySelector('input').setAttribute('checked', true);
        }
        selector.append(inputGroup);
    });
    selectorWrapper.append(selector);
    return selectorWrapper;
}

export function setTableConstraints(table) {

    let constraintList = table.constraints;

    constraintList.forEach(constraint => constraint.table = table.name);

    let actions = document.createElement('div');
    let applyBtn = components.createButton('Apply', { style: 'primary' });
    actions.append(components.createButton('Cancel', { style: 'secondary' }), applyBtn);

    let content = document.createElement('div');

    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid', 'gap-2', 'grid-cols-6');

    let modal = createModal(content, actions);
    document.querySelector('body').appendChild(modal);

    content.prepend(components.createTitle(
        `Table Constraints for '${table.name}'`,
        `Constraints limit the type of data that can go into this table`
    ));

    content.append(gridContainer);

    let list = document.createElement('div');
    list.classList.add('col-span-2', 'border', theme.tableBorderColor, 'flex', 'flex-col');

    let addBtn = components.createButton('Add', { style: 'secondary', icon: 'add' });
    addBtn.classList.add('w-full');
    let deleteBtn = components.createButton('Delete', { style: 'secondary', icon: 'delete-bin' });
    deleteBtn.classList.add('w-full');

    let form = document.createElement('div');
    form.style.height = '380px';
    form.style.overflowY = 'scroll';
    form.classList.add('col-span-4', 'border', theme.tableBorderColor, theme.darkBackgroundColor, 'p-3', 'space-y-2');


    function createConstraintItem(constraint) {

        let item = document.createElement('a');
        item.href = 'javascript:void(0)';
        item.classList.add('border-b', theme.tableBorderColor, 'p-2', 'flex', 'items-center', 'space-x-1');

        let labelWrapper = document.createElement('div');
        labelWrapper.classList.add('mr-auto', 'space-y-1');
        let itemLabel = document.createElement('div');
        itemLabel.classList.add('mr-2');

        let itemReferences = document.createElement('div');
        itemReferences.classList.add('text-sm');

        let constraintName = `${constraint.type.match(/[A-Z]+/g).join("")}_${constraint.columns.join('_')}`;
        itemLabel.innerHTML = `${constraintName}`;


        constraint.name = constraintName;

        item.addEventListener('click', function () {
            form.innerHTML = '';
            if (constraint.status == 'new') {
                form.append(newConstraint(constraint));
            } else {
                form.append(showForm(constraint));
            }
        });

        form.addEventListener('change', function () {
            form.innerHTML = '';
            if (constraint.status == 'new') {
                form.append(newConstraint(constraint));
            } else {
                form.append(showForm(constraint));
            }
        });

    

        labelWrapper.append(itemLabel);
        //labelWrapper.append(itemLabel, itemReferences);
        item.append(labelWrapper);

        return item;
    }


    let buildList = (constraints) => {

        constraints.forEach(constraint => {
            list.append(createConstraintItem(constraint))
        })

        const navList = list.querySelectorAll('a');

        for (let item of navList) {
            item.addEventListener("click", function () {
                for (let item of navList) { item.classList.remove(theme.darkPrimaryColor, 'bg-opacity-40'); }
                this.classList.add(theme.darkPrimaryColor, 'bg-opacity-40');
            });
        }

        navList[(navList.length) - 1].click();

        let formActions = document.createElement('div');
        formActions.classList.add('p-1', 'space-x-1', 'flex', 'mt-auto', theme.mediumBackgroundColor);
        list.append(formActions);
        formActions.append(addBtn, deleteBtn);

        addBtn.addEventListener('click', function () {
            list.innerHTML = '';
            constraintList.push({
                columns: [],
                type: 'Foreign Key',
                table: table.name,
                referenceColumns: [],
                status: 'new'
            });
            buildList(constraintList);
        });
    }

    buildList(constraintList);

    gridContainer.append(list, form);
}

function showForm(constraint) {

    let form = document.createElement('div');
    form.classList.add('space-y-2')

    form.innerHTML = `
        <div>
            <h5 class="text-sm ${theme.mutedTextColor}">Constraint Name</h5>
            ${constraint.name}
        </div>
        <div>
            <h5 class="text-sm ${theme.mutedTextColor}">Constraint Type</h5>
            ${constraint.type}
        </div>
        <div>
            <h5 class="text-sm ${theme.mutedTextColor}">Columns</h5>
            ${constraint.columns.map(col => col).join('')}
        </div>
        
    `;

    if (constraint.type == 'Foreign Key') {
        form.innerHTML += `
        <div>
            <h5 class="text-sm ${theme.mutedTextColor}">Referenced Table</h5>
            ${constraint.referenceTable}
        </div>
        <div>
            <h5 class="text-sm ${theme.mutedTextColor}">On Update</h5>
            <div>No Action</div>
        </div>
        <div>
            <h5 class="text-sm ${theme.mutedTextColor}">On Delete</h5>
            <div>No Action</div>
        </div>
        `
    }

    return form;

}

function newConstraint(constraint) {

    let table = selectTableByName(constraint.table);
    
    let form = document.createElement('div');
    form.classList.add('space-y-2');
    let constraints = ['Unique', 'Primary Key', 'Foreign Key', 'Not Null'];
    //form.innerHTML = `<h3 class="text-lg">Edit Constraint</h3>`
    
    let constraintType = components.createSelectInput(constraints, { label: 'Constraint Type', selected: constraint.type });
    let referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Referenced Table' });
    let columns = columnSelector({
        title: 'Select Columns',
        columns: table.columns,
        selected: constraint.columns
    });
    
    form.append(
        components.createFormGroup(components.createInput({ value: constraint.name }), 'Constraint Name'),
        constraintType,
        columns
    );
    
    if (constraint.type == 'Foreign Key' && !constraint.referenceTable) {
        form.append(referencedTable);
    }
    
    if (constraint.referenceTable) {
        let _columns = columnSelector({
            title: 'Select Reference Columns',
            columns: selectTableByName(constraint.referenceTable).columns,
            selected: constraint.referenceColumns
        });
        referencedTable = components.createSelectInput(savedTables.map(table => table.name), { label: 'Referenced Table', selected: constraint.referenceTable });
        form.append(referencedTable, _columns);
    
        _columns.querySelectorAll('input').forEach(input => {
    
            input.addEventListener('change', function () {
                if (input.checked == true) {
                    constraint.referenceColumns.push(input.value);
                } else {
                    const index = constraint.referenceColumns.indexOf(input.value);
                    if (index > -1) { constraint.referenceColumns.splice(index, 1); }
                }
                newConstraint(constraint);
            });
        });
    }
    
    columns.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', function () {
            if (input.checked == true) {
                constraint.columns.push(input.value);
            } else {
                const index = constraint.columns.indexOf(input.value);
                if (index > -1) { constraint.columns.splice(index, 1); }
            }
            newConstraint(constraint);
        });
    });
    
    constraintType.addEventListener('change', function () {
        let setType = constraintType.childNodes[1].value;
        constraint.type = setType;
        if (setType == 'Foreign Key') {
            constraint.name = 'FK_';
            newConstraint(constraint);
        } else if (setType == 'Primary Key') {
            constraint.name = 'PK_';
        } else if (setType == 'Not Null') {
            constraint.name = 'NOTNULL_';
        } else {
            constraint.name = 'UNIQUE_';
        }
        newConstraint(constraint);
    });
    
    referencedTable.addEventListener('change', function () {
        constraint.referenceTable = referencedTable.childNodes[1].value;
        newConstraint(constraint);
    });
    
    let updateOptions = [
        'No Action',
        'Cascade',
        'Set Null',
        'Set Default'
    ];
    
    form.append(
        components.createSelectInput(updateOptions.map(opt => opt), { label: 'On Update', selected: 'No Action' }),
        components.createSelectInput(updateOptions.map(opt => opt), { label: 'On Delete', selected: 'No Action' })
    )
    
    return form;
};