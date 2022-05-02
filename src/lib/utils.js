import jsonata from "jsonata";
import * as simpleDB from  '$lib/simpleDB';
import { bgColor200 } from "tailwind-dynamic-classes";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import * as Flatted from 'flatted';

const colors = [
    "red", "orange", "yellow",
    "green", "blue", "purple"
];

export let activeSchema = 'album_collection';

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function getRecords(data,expression){
    return jsonata(expression).evaluate(data);
}

export function hexToRGB(hex, alpha) {
    if (!hex || hex.trim()) {
        return "";
    }

    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export function isColumn(column) {
    return !!column?.source?.tableId;
}

export function isFormula(column) {
    return !!column?.source?.formula;
}

export function isForeignKey(table,column) {
    return table.constraints.filter(c => c.type == "Foreign Key").map(c => c.column).includes(column.name);
}

export function linksToTable(base,table) {
    return table.constraints.filter(c => c.type == "Foreign Key").map(c => c.referenceTable.id).includes(base.id);
}

export function getColumnIndex(table, column) {
    return table.columns.indexOf(table.columns.find((col) => col == column));
}

export async function loadEntities(){
    function addExtraReferences(entities) {
        entities.tables.forEach(table => {
            table.color = Object.values(bgColor200)[_.random(0,Object.values(bgColor200).length)];
            table.columns.forEach(col => {
                col.id = uuidv4();
            });
        });

        console.log(entities.tables)


        entities.tables.forEach(table => {
            table.constraints.forEach((constraint,i) => {
                if(constraint.type == "Foreign Key"){
                    let referenceTable = entities.tables.find(t => t.id == constraint.referenceTable.tableId);
                    constraint.referenceTable = {...referenceTable}
                }
            });

            
        })

        entities.views.forEach(view => {
            let baseTable = entities.tables.find(table => table.id == view.baseTable.tableId);
            view.baseTable = {...baseTable}
        });

        return entities;
    }

    return await simpleDB.loadEntities("schemas", "tables", "views", "queries", addExtraReferences);
}

export async function saveEntities(entities){
    simpleDB.saveEntities(entities);
}

export let conditions = {
    "text":[
        'contains',
    ],
    "list":[
        'includes'
    ],
    "number":[
        'equals',
        'greater than',
        'less than'
    ]
}

export let summarizations = {
    "text":[
        'value',
        'first letter'
    ],
    "list":[
        'value'
    ],
    "number":[
        'value',
        'range'
    ]
}

export let aggregations = {
    "List":{
        type: "text"
    },
    "Count":{
        type: "number"
    },
    "Sum":{
        type: "number",
        restrict: ["number"]
    },
    "Avg":{
        type: "number",
        restrict: ["number"]
    }
}


export let typeOptions = {
    text: {
        aggregations: ['List','Count']
    },
    number: {
        aggregations: ['Count','Sum','Avg','Max','Min','List']
    }
}

export function newView(table){

    let newTable = Flatted.parse(Flatted.stringify(table));

        let view = {
            id: uuidv4(),
            name: `Query of ${newTable.name}`,
            type: 'query',
            baseTable: newTable,
            columns: newTable.columns,
            records: newTable.records,
            schemaId: newTable.schema.id,
            steps: {}
        }

        view.columns.forEach(c => {
            c.alias = c.name;
            c.source = {
                link: {
                    column: c,
                    table: newTable
                },
                table: newTable
            }
        })

        let newView = Flatted.parse(Flatted.stringify(view));

        return newView;

}
