import "jsonata";
import * as Flatted from "flatted";
import { v4 } from "uuid";
import "lodash";
import randomColor from "randomcolor";
let simpleDBKey = "simpleDB-entities";
function getFromStorage() {
  let entities = window.localStorage.getItem(simpleDBKey);
  if (entities) {
    return Flatted.parse(entities);
  } else {
    return null;
  }
}
function isFieldId(field) {
  return field.endsWith("Id");
}
function getTargetName(field) {
  return field.substring(0, field.length - 2);
}
function getTargetList(field) {
  if (field.endsWith("y")) {
    return field.substring(0, field.length - 1) + "ies";
  } else {
    return getTargetName(field) + "s";
  }
}
function associateEntities(entitiesMap) {
  Object.entries(entitiesMap).forEach(([entityName, entities]) => {
    entities.forEach((entity) => {
      Object.keys(entity).filter(isFieldId).forEach((key) => {
        let targetName = getTargetName(key);
        let targetList = getTargetList(key);
        let targetId = entity[key];
        let targetEntities = entitiesMap[targetList];
        let targetEntity = (targetEntities || []).find((target) => target.id == targetId);
        if (!targetEntities) {
          console.log(`The entity '${targetName}' mentioned in the entity '${entityName}' with id ${entity.id} does not exist`);
        } else if (!targetEntity) {
          throw `The id ${targetId} does not exist in ${targetName}`;
        } else {
          if (!targetEntity[entityName]) {
            targetEntity[entityName] = [];
          }
          entity[targetName] = targetEntity;
          targetEntity[entityName].push(entity);
        }
      });
    });
  });
}
async function loadJSON(entityName) {
  let response = await fetch(`/data/${entityName}.json`);
  let entities = await response.json();
  return [entityName, entities];
}
async function loadEntities$1(...entities) {
  let savedEntities = getFromStorage();
  let postProc = function() {
  };
  let lastEntity = entities[entities.length - 1];
  if (typeof lastEntity == "function") {
    postProc = lastEntity;
    entities = entities.slice(0, entities.length - 1);
  }
  if (savedEntities) {
    associateEntities(savedEntities);
    return savedEntities;
  }
  let promises = entities.map((entity) => loadJSON(entity));
  return Promise.all(promises).then(function(entityPairs) {
    let entitiesMap = {};
    entityPairs.forEach(function([entityName, entities2]) {
      entitiesMap[entityName] = entities2;
    });
    associateEntities(entitiesMap);
    return postProc(entitiesMap);
  }).catch(function(e) {
    throw `Error while loading entities: ${e}`;
  });
}
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isForeignKey(table, column) {
  return table.constraints.filter((c) => c.type == "Foreign Key").map((c) => c.column).includes(column.name);
}
function linksToTable(base, table) {
  return table.constraints.filter((c) => c.type == "Foreign Key").map((c) => c.referenceTable.id).includes(base.id);
}
function getColumnIndex(table, column) {
  return table.columns.indexOf(table.columns.find((col) => col == column));
}
async function loadEntities() {
  function addExtraReferences(entities) {
    entities.tables.forEach((table) => {
      table.color = randomColor({ luminosity: "light" });
      table.columns.forEach((col) => {
        col.id = v4();
      });
    });
    console.log(entities.tables);
    entities.tables.forEach((table) => {
      table.constraints.forEach((constraint, i) => {
        if (constraint.type == "Foreign Key") {
          let referenceTable = entities.tables.find((t) => t.id == constraint.referenceTable.tableId);
          constraint.referenceTable = { ...referenceTable };
        }
      });
    });
    entities.views.forEach((view) => {
      let baseTable = entities.tables.find((table) => table.id == view.baseTable.tableId);
      view.baseTable = { ...baseTable };
    });
    return entities;
  }
  return await loadEntities$1("schemas", "tables", "views", "queries", addExtraReferences);
}
let conditions = {
  "text": [
    "contains"
  ],
  "list": [
    "includes"
  ],
  "number": [
    "equals",
    "greater than",
    "less than"
  ]
};
let summarizations = {
  "text": [
    "value",
    "first letter"
  ],
  "list": [
    "value"
  ],
  "number": [
    "value",
    "range"
  ]
};
let typeOptions = {
  text: {
    aggregations: ["List", "Count"]
  },
  number: {
    aggregations: ["Count", "Sum", "Avg", "Max", "Min", "List"]
  }
};
export { clone as a, linksToTable as b, conditions as c, getColumnIndex as g, isForeignKey as i, loadEntities as l, summarizations as s, typeOptions as t };
