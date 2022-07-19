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

export function getLinkedTable(table, column) {
    return table.constraints.find(c => c.type == "Foreign Key" && c.column == column.name).referenceTable;
}

export function linksToTable(base, table) {
    return table.constraints.filter(c => c.type == "Foreign Key").map(c => c.referenceTable.id).includes(base.id);
}

export function getForeignKeyColumn(table, link) {
    return table.constraints.find(c => c.type == "Foreign Key" && c.referenceTable.id == link.id)
}

export function getColumnIndex(table, column) {
    return table.columns.indexOf(table.columns.find((col) => col == column));
}

export function getTableQueries(table) {
    let queries = [];
    if (table.schema.queries) {
        queries = table.schema.queries.filter(q => q.baseTable.id == table.id)
        return queries;
    } else {
        return null;
    }

}

function isLink(table, record, idx) {
    if (table.constraints) {
        return table.constraints.find(c => c.type == "Foreign Key" && c.column == table.columns[idx].name)
    }
}

function isKey(table, record, idx) {
    if (table.constraints) {
        return table.constraints.find(c => c.type == "Primary Key" && c.column == table.columns[idx].name)
    }
}

function getColumnIndexByName(table, name) {
    return table.columns.findIndex(c => c.name == name)
}

export function getSummary(table, record, idx) {
    if (table.summary) {
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

export function createRows(table) {
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

export function setTableSummary(table) {
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
            table.color = randomColor({ luminosity: 'light', hue: 'blue', format: 'rgba', alpha: 0.7 });
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
    "filter": {},
    "sort": {},
    "summarize": {},
    "deduplicate": {},
    "limit": {},
    "offset": {}
}


export function getRecordSummary(cell) {

    if (cell.table.summary) {
        console.log("ITEM")
        return cell.table.summary.map(item => {

            if (item.text) {

                return item.text;
            }
            if (!item.isLink) {

                return cell.table.records[cell.record][item.columnIdx];
            }
            if (item.isLink) {

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


export function applySteps(table) {



    let newRecords = Flatted.parse(Flatted.stringify(table.records));


    newRecords = flattenRecords(newRecords);

    resetColumnTypes(table);

    if (table.steps) {
        Object.keys(table.steps).forEach((step) => {
            let column = table.steps[step].column;

            if (
                table.steps[step].type == "filter" &&
                !table.steps[step].hidden
            ) {
                newRecords = setFilter(table, column, table.steps[step], newRecords);
            }

            if (
                table.steps[step].type == "summarize" &&
                !table.steps[step].hidden
            ) {
                newRecords = setSummarization(table, column, step, newRecords);
            }
        });
    }

    return newRecords;
}

export function flattenRecords(records) {
    return records.map((r) => {
        return r.map((item) => {
            if (Array.isArray(item)) {
                return _.concat(_.flattenDeep(item));
            } else {
                return item;
            }
        });
    });
}

export function resetColumnTypes(table) {
    table.columns.forEach((col, i) => {
        if (!col.source.table.id == table.baseTable.id) {
            col.aggregation = col.aggregation;
        } else {
            col.aggregation = null;
        }
    });
}

export function previewSteps(table, step) {
    let stepIdx = Object.keys(table.steps).indexOf(step);

    Object.keys(table.steps).forEach((_step, i) => {
        if (i > stepIdx) {
            table.steps[_step].hidden = !table.steps[_step].hidden;
        }
    });

    applySteps(table);
}


export function getColumnNameIndex(table, column) {
    return table.columns.indexOf(
        table.columns.find((col) => col.name == column.name)
    );
}

export function getColumnRecords(table) {

    if(table.link){
    let foreignKeyColumnIdx = getColumnIndexByName(table.baseTable, table.link.column)

    if (foreignKeyColumnIdx !== -1) {
        table.baseTable.records = table.baseTable.records.filter(r => r[foreignKeyColumnIdx] == 41)
    }
    }
    

    let records = table.columns.map((c) => {
    let columnIdx = getColumnNameIndex(c.source.table, c);

        if (c.source.link.column.name == c.name) {
            if (!!getMapTable(c.source.link.table, table.baseTable)) {
                let fkIdx = c.source.table.columns.indexOf(
                    c.source.table.columns.find(
                        (col) =>
                            col.name ==
                            getMapTable(c.source.link.table, table.baseTable).column
                    )
                );
                let recordMap = c.source.table.records.map((r) => [
                    r[fkIdx],
                    r[columnIdx],
                ]);

                let mergedRecord = c.source.table.records
                    .map((r) => r[0])
                    .reduce((acc, list) => {
                        acc[list] = recordMap
                            .filter((r) => r[0] == list)
                            .map((r) => r[1]);

                        return acc;
                    }, []);

                return mergedRecord;
            } else {
                return c.source.table.records.map((r) => r[columnIdx]);
            }
        } else {
            columnIdx = getColumnNameIndex(
                c.source.link.table,
                c.source.link.column
            );
            let recordId = c.source.link.table.records.map((r) => r[columnIdx]);

            let mergedRecord = recordId
                .map((rId) => {
                    return c.source.table.records.find((r) => r[0] == rId);
                })
                .map((r) => r[getColumnNameIndex(c.source.table, c)]);

            return mergedRecord;
        }
    });
    let mergedRecords = records.reduce((acc, item) => {
        item.forEach((record, i) => {
            acc[i] = records.map((r) => r[i]);
        });
        return acc;
    }, []);
    //

    // HIDE NULL or EMPTY
    let filteredRecords = mergedRecords.filter((record) => {
        if (mergedRecords.some((r) => r.length > 1)) {
            return !record.some((r) => r == undefined);
        } else {
            return !record.some((r) => r == undefined || r == "");
        }
    });

    // RETURN COUNT AGGREGATION
    table.columns.forEach((col, i) => {
        if (col.aggregation && col.aggregation == "Count") {
            filteredRecords.forEach((r) => {
                r[i] = _.flattenDeep(r[i]).length;
            });
        }
    });

    return filteredRecords;
}


function getMapTable(sourceTable, baseTable) {
    return sourceTable.constraints.find(
        (c) => c.referenceTable && c.referenceTable.id == baseTable.id
    );
}


function setFilter(table, column, step, records) {
    let columnIdx = table.columns.indexOf(column);
    let condition = step.condition;

    // Change condition based on data type
    if (!conditions[column.type].includes(condition) && !column.aggregation) {
        step.condition = conditions[column.type][0];
    }

    let value = step.value;

    if (condition == "contains" || condition == "includes") {
        return records.filter(
            (r) => r[columnIdx] && _.toString(r).includes(value)
        );
    }

    return records;
}


function setSummarization(table, column, step, records) {
    //console.log(column, selectedView.steps[step], records,"SUMMARIZE")

    let columnIdx = table.columns.indexOf(column);

    let groupedRecords = _.groupBy(records, function (n) {
        return n[columnIdx];
    });

    if (table.steps[step].summaryCondition == "range") {
        groupedRecords = setRange(
            groupedRecords,
            table.steps[step].rangeSize
        );
    }

    let aggregatedRecords = Object.keys(groupedRecords).map((group) => {
        return aggregate(groupedRecords[group], columnIdx);
    });

    table.steps[step].aggregations.splice(
        0,
        table.steps[step].aggregations.length,
        table.columns.map((c) => {
            return typeOptions[c.type].aggregations[0];
        })
    );

    changeColumnType(table, columnIdx, step);

    return flattenRecords(aggregatedRecords);
}

function changeColumnType(view, idx, step) {
    let columns = view.columns;

    columns.forEach((col, i) => {
        if (i !== idx && !col.source.table.id == view.baseTable.id) {
        } //

        if (i !== idx) {
            col.aggregation = view.steps[step].aggregations.map((a) => a[i]);
        }

        if (i == idx) {
            col.aggregation = null;

            if (view.steps[step].summaryCondition == "range") {
                col.aggregation = "range";
            }
        }
    });
}

function aggregate(items, idx) {
    let result = items.reduce(function (a, b) {
        return a.map(function (v, i) {
            if (v == b[i]) {
                return v;
            } else {
                return [v, b[i]];
            }
        });
    });

    return result;
}

function setRange(records, size) {
    let range = _.chunk(Object.keys(records), size);

    let groupedRange = range.reduce((acc, curr) => {
        let rangeDescription = `${curr[0]}-${curr[curr.length - 1]}`;

        acc[rangeDescription] = _.flatten(curr.map((c) => records[c]));

        return acc;
    }, {});

    return groupedRange;
}

export async function saveSchema(schema) {
    let entities = await loadEntities();
    entities.schemas.push(schema);

    saveEntities(entities);
    console.log(entities)
}


export function newEmptyRecord(table) {
    return table.columns.map((c, i) => {
        if (i == 0) {
            return uuidv4();
        } else {
            return "NULL";
        }

    });
}
