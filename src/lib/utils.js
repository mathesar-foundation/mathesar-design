import * as simpleDB from '$lib/simpleDB';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import * as Flatted from 'flatted';
import randomColor from 'randomcolor';

export let activeSchema = 'album_collection';

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function isColumn(column) {
    return !!column?.source?.tableId;
}

export function isFormula(column) {
    return !!column?.source?.formula;
}

export function isForeignKey(table, column) {
    return table.constraints.filter(c => c.type == "Foreign Key").map(c => c.column).includes(column.name);
}

export function getLinkedTable(table,column){
    return table.constraints.find(c => c.type == "Foreign Key" && c.column == column.name).referenceTable;
}

export function linksToTable(base, table) {
    return table.constraints.filter(c => c.type == "Foreign Key").map(c => c.referenceTable.id).includes(base.id);
}

export function getColumnIndex(table, column) {
    return table.columns.indexOf(table.columns.find((col) => col == column));
}

function isLink(table, record, idx) {
    console.log(table,record,idx,"TEST REOCRD")
    if(table.constraints){
        return table.constraints.find(c => c.type == "Foreign Key" && c.column == table.columns[idx].name)
    }
}

function isKey(table, record, idx) {
    if(table.constraints){
    return table.constraints.find(c => c.type == "Primary Key" && c.column == table.columns[idx].name)
    }
}

function getColumnIndexByName(table, name) {
    return table.columns.findIndex(c => c.name == name)
}

function getSummary(table, record, idx) {
    if(table.summary){
        return table.summary.map(item => {
            if (item.text) {
                return item.text
            } else {
                return record[getColumnIndexByName(table, item.columnName)]
            }

        }).join('')
    }
}

function isColumnForeignKey(table, columnName) {
    return table.constraints.find(c => c.type == "Foreign Key" && c.column == columnName)
}

export function createRows(table){
    return {
        summaries: table.records.map((r) => getSummary(table, r)),
        cells: table.records.reduce((acc, record, i) => {

            acc[i] = record.map((r, idx) => {
                return ({
                    content: r,
                    table: table,
                    column: table.columns[idx],
                    record: i,
                    link: isLink(table, record, idx),
                    primary: isKey(table, record, idx),
                    edit: false
                })
            });

            return acc;
        }, {})
    }
}

export function setTableSummary(table){
    table.summary.forEach(item => {
        if (item.columnName) {
            item.columnIdx = getColumnIndexByName(table, item.columnName),
            item.isLink = isColumnForeignKey(table, item.columnName)
        }
    })

    return table.summary
}

export async function loadEntities() {


    function addExtraReferences(entities) {

        entities.tables.forEach(table => {
            table.color = randomColor({ luminosity: 'light', hue: 'blue', format: 'rgba', alpha: 0.8 });
            table.columns.forEach(col => {
                col.id = uuidv4();
            });


            if (table.summary) {
                table.summary = setTableSummary(table)
            } else {
                table.summary = [{
                    columnName: table.columns[0].name
                }]
            }

            table.rows = createRows(table)
        });



        entities.tables.forEach(table => {
            table.constraints.forEach((constraint, i) => {
                if (constraint.type == "Foreign Key") {
                    let referenceTable = entities.tables.find(t => t.id == constraint.referenceTable.tableId);
                    constraint.referenceTable = { ...referenceTable }
                }
            });
        });


        entities.views.forEach(view => {
            let baseTable = entities.tables.find(table => table.id == view.baseTable.tableId);
            view.baseTable = { ...baseTable }
        });


        return entities;
    }

    return await simpleDB.loadEntities("schemas", "tables", "views", "queries", addExtraReferences);
    //return await simpleDB.loadEntities("schemas", "tables", "views", "queries");
}

export async function saveEntities(entities) {
    simpleDB.saveEntities(entities);
}

export let conditions = {
    "text": [
        'is equal to',
        'contains'
    ],
    "list": [
        'includes',
        'exclude',
        'length equal to',
        'length less than',
        'lenght greater than'
    ],
    "number": [
        'is equal to',
        'greater than',
        'less than'
    ],
    "range": [
        'contains value',
        'lower bound less than',
        'lower bound greater than',
        'upper bound less than',
        'upper bound greater than'
    ]
}

export let summarizations = {
    "text": [
        'value',
        'first letter'
    ],
    "list": [
        'value'
    ],
    "number": [
        'value',
        'range'
    ],
    "array": [
        'value'
    ]
}

export let rangeOptions = {
    "number": [
        'Auto',
        'Size',
        'Groups'
    ]
}

export let aggregations = {
    "list": {
        type: "text"
    },
    "count": {
        type: "number"
    },
    "sum": {
        type: "number",
        restrict: ["number"]
    },
    "avg": {
        type: "number",
        restrict: ["number"]
    }
}


export let typeOptions = {
    text: {
        aggregations: ['list', 'count']
    },
    number: {
        aggregations: ['count', 'sum', 'avg', 'max', 'min', 'list']
    },
    array: {
        aggregations: ['list', 'count']
    }
}

export function newView(table) {

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
    "text": {},
    "number": {},
    "boolean": {},
    "money": {},
    "duration": {},
    "date": {},
    "array": {}
}

export let stepOptions = {
    "filter":{},
    "sort":{},
    "summarize":{},
    "deduplicate":{},
    "limit":{},
    "offset":{}
}


export function getRecordSummary(cell) {
    
    if (cell.table.summary){
        console.log("ITEM")
    return cell.table.summary.map(item => {
    
      if(item.text){
        
        return item.text;
      }
      if(!item.isLink){
        
        return cell.table.records[cell.record][item.columnIdx];
      }
      if(item.isLink){
        
        return item.isLink.referenceTable.rows.cells[cell.record][item.columnIdx].content;
      }
      
    }).join('')
    } else {
        
        return cell.table.records[cell.record][0];
    }
  }


export function getReferenceTable(table, column) {
    return table.constraints.find(
      (c) => c.type == "Foreign Key" && c.column == column.name
    ).referenceTable;
  }
