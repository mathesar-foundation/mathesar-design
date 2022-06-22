import jsonata from "jsonata";
import * as simpleDB from  '$lib/simpleDB';
import { bgColor300 } from "tailwind-dynamic-classes";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import * as Flatted from 'flatted';
import randomColor from 'randomcolor';


export let activeSchema = 'album_collection';

let shades = ['purple','blue','teal']

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

function isLink(table,record,idx){
        
    return table.constraints.find(c => c.type == "Foreign Key" && c.column == table.columns[idx].name)
}

function isKey(table,record,idx){
    
    return table.constraints.find(c => c.type == "Primary Key" && c.column == table.columns[idx].name)
}

function getSummary(table,record,idx){
    if (isLink(table,record,idx)) {
        return isLink(table,record,idx).referenceTable
    }

    return null;
}

export async function loadEntities(){
    function addExtraReferences(entities) {
        entities.tables.forEach(table => {
            table.color = randomColor({ luminosity: 'light', hue: 'blue', format: 'rgba', alpha: 0.8 });
            table.columns.forEach(col => {
                col.id = uuidv4();
            });


            table.summary = [1,2]

            table.cells = table.records.reduce((acc,record,i) => {
                console.log(record[0])
                acc[i] = record.map((r,idx) => {
              
                    return ({
                        content: r,
                        
                        table: table,
                        column: table.columns[idx],
                        record: i,
                        link: isLink(table,record,idx),
                        primary: isKey(table,record,idx),
                        edit: false
                    })
                });
    
            
              return acc;
            },{});

            

            
        });



        entities.tables.forEach(table => {
            table.constraints.forEach((constraint,i) => {
                if(constraint.type == "Foreign Key"){
                    let referenceTable = entities.tables.find(t => t.id == constraint.referenceTable.tableId);
                    constraint.referenceTable = {...referenceTable}
                }
            });

            console.log(_.flatten(Object.values(table.cells)),"CELLS")

            //table.cells.forEach(cell => {
                //if(cell.link){
                    //cell.summary = cell.link.referenceTable.records.find(r => r[0] == cell.content).map(r => r[1])
               // }
                
            //});

            Object.keys(table.cells).forEach(row => {
                console.log(table.cells[row],"Tesitng cell")
                table.cells[row].forEach(cell => {
                    if(cell.link){
                        cell.summary = cell.link.referenceTable.records.filter(r => r[0] == cell.content).map(r => `${r[1]} ${r[2]}`)
                    }
                })
            })

            
        })

        console.log(entities)

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
        'includes',
        'exclude',
        'length equal to',
        'length less than',
        'lenght greater than'
    ],
    "number":[
        'equals',
        'greater than',
        'less than'
    ],
    "range":[
        'contains value',
        'lower bound less than',
        'lower bound greater than',
        'upper bound less than',
        'upper bound greater than'
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
    ],
    "array":[
        'value'
    ]
}

export let rangeOptions = {
    "number":[
        'Auto',
        'Size',
        'Groups'
    ]
}

export let aggregations = {
    "list":{
        type: "text"
    },
    "count":{
        type: "number"
    },
    "sum":{
        type: "number",
        restrict: ["number"]
    },
    "avg":{
        type: "number",
        restrict: ["number"]
    }
}


export let typeOptions = {
    text: {
        aggregations: ['list','count']
    },
    number: {
        aggregations: ['count','sum','avg','max','min','list']
    },
    array: {
        aggregations: ['list','count']
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

export let dataTypes = {
    "text":{},
    "number":{},
    "boolean":{},
    "money":{},
    "duration":{},
    "date":{},
    "array":{}
}
