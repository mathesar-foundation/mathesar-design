import * as Flatted from 'flatted';

let simpleDBKey = 'simpleDB-entities';
let startSaveId = 0;

function getFromStorage() {
  let entities = window.localStorage.getItem(simpleDBKey);

  if (entities) {
    return Flatted.parse(entities)
  } else {
    return null;
  }
}

function saveToStorage(entities) {
  window.localStorage.setItem(simpleDBKey, Flatted.stringify(entities));
}

function resetStorage() {
  window.localStorage.removeItem(simpleDBKey);
}

function isFieldId(field) {
  return field.endsWith('Id');
}

function getTargetName(field) {
  return field.substring(0, field.length - 2);
}

function getTargetList(field) {
  if (field.endsWith("y")) {
    // Handle cases like city/cities
    return field.substring(0, field.length - 1) + "ies";
  } else {
    return getTargetName(field) + 's'
  }
  // Maybe add a case for person/people?
}

function associateEntities(entitiesMap) {
  Object.entries(entitiesMap).forEach(([entityName, entities]) => {
    entities.forEach((entity) => {
      Object.keys(entity).filter(isFieldId).forEach(key => {
        let targetName = getTargetName(key);
        let targetList = getTargetList(key);
        let targetId = entity[key];
        let targetEntities = entitiesMap[targetList];
        let targetEntity = (targetEntities || []).find(target => target.id == targetId);

        if (!targetEntities) {
          // This should be *throw* instead of console.log
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

/*
Removes references derived from Id fields to avoid issues with JSON.stringify.

Creates a new copy excluding references derived from Id fields, also excluding
associated lists. If entity is a school, and students have schoolId:

entityNames = ['students', 'schools', 'directors']
entity = { id: 1, directorId: 1, director: {...}, students: [...] }

the result will be:

newEntity = { id: 1, directorId: 1 }
*/
function removeEntityRefs(entityNames, entity) {
  let entityFields = Object.keys(entity);
  let idFields = entityFields.filter(isFieldId);
  let refFields = idFields.map(getTargetName);
  let newEntity = {};

  entityFields.forEach(field => {
    if (!refFields.includes(field) && !entityNames.includes(field)) {
      newEntity[field] = entity[field];
    }
  });

  return newEntity;
}

async function loadJSON(entityName) {
  let response = await fetch(`/data/${entityName}.json`);
  let entities = await response.json();

  return [entityName, entities];
}

export async function loadEntities(...entities) {
  let savedEntities = getFromStorage();
  let postProc = function () {};
  let lastEntity = entities[entities.length - 1];

  if (typeof lastEntity == 'function') {
    postProc = lastEntity;
    entities = entities.slice(0, entities.length - 1);
  }

  if (savedEntities) {
    associateEntities(savedEntities);

    return savedEntities;
  }

  let promises = entities.map(entity => loadJSON(entity));

  return Promise.all(promises)
    .then(function (entityPairs) {
      let entitiesMap = {};

      entityPairs.forEach(function ([entityName, entities]) {
        entitiesMap[entityName] = entities;
      });

      associateEntities(entitiesMap);

      return postProc(entitiesMap);
    })
    .catch (function (e) {
      throw `Error while loading entities: ${e}`;
    });
}

export async function saveEntities(entities) {
  if (!entities) {
    return;
  }

  let startSave = ++startSaveId;

  // Since saveEntities may be triggered multiple times in a row, only save the
  // latest version for performance reasons.
  setTimeout(() => {
    if (startSave == startSaveId) {
      let newEntities = {};
      let entitiesNames = Object.keys(entities);

      //console.log(`Saving ${startSave}`);

      // Add save delay to avoid multiple updates with the same values
      entitiesNames.forEach(entityName => {
        let noRefEntities = entities[entityName]
          .map(entity => removeEntityRefs(entitiesNames, entity));

        newEntities[entityName] = noRefEntities;
      });


      saveToStorage(newEntities);
    } else {
      //console.log(`Not saving ${startSave} since ${startSaveId} is different`);
    }
  }, 200);
}

export async function deleteEntities() {
  resetStorage();
}
