<script>
  import { beforeUpdate, onMount } from "svelte";
  import { page } from "$app/stores";
  import Table from "../../Table.svelte";

  import { icon } from "$lib/iconMap";
  import Dropdown from "$lib/Dropdown.svelte";
  import Breadcrumb from "$lib/Breadcrumb.svelte";
  import Editor from "../../Editor.svelte";

  import {
    clone,
    loadEntities,
    saveEntities,
    conditions,
    aggregations,
    typeOptions,
    setTableSummary,
    createRows,
    applySteps,
    getColumnNameIndex,
    getColumnRecords,
  } from "$lib/utils";

  import { v4 as uuidv4 } from "uuid";
  import _ from "lodash";
  import { notifications } from "$lib/notifications.js";
  import Toast from "$lib/Toast.svelte";
  import SideBar from "./../../SideBar.svelte";

  const { schemaId } = $page.params;
  const { queryId } = $page.params;

  let columns = [];
  let schema = {};
  let missingTables = {};
  let missingColumns = {};

  let showFormulaModal = false;
  let activeFormula = {};

  let selectedView;
  let runQuery;
  let editMode = true;

  let entities;

  let newView = {
    id: uuidv4(),
    type: "query",
    name: "New Query",
    columns: [],
  };

  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema) => schema.id == schemaId);
    selectedView = entities.queries.find((view) => view.id == queryId);

    let viewCount = entities.queries.filter((v) =>
      v.name.startsWith("New Query")
    ).length;

    if (!selectedView) {
      editMode = true;
      selectedView = {
        id: queryId,
        schemaId: _.toNumber(schemaId),
        type: "query",
        name: `New Query (${viewCount})`,
        columns: [],
        steps: {},
      };

      runQuery = false;
    }

    if (selectedView) {
      selectedView.columns
        .map((c) => c.source.table.id)
        .forEach((t) => {
          if (!entities.tables.find((table) => table.id == t)) {
            missingTables[t] = true;
          }
        });

      let allColumns = _.flattenDeep(
        entities.tables.map((t) => t.columns.map((c) => c.id))
      );

      selectedView.columns
        .map((c, i) => c.source.link.column.id)
        .forEach((id) => {
          if (!allColumns.includes(id)) {
            missingColumns[id] = true;
          }
        });
    }

    //getColumnRecords(selectedView);

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

 

  function getReferenceTable(table, column) {
    return table.constraints.find(
      (c) => c.type == "Foreign Key" && c.column == column.name
    ).referenceTable;
  }

  function addColumn(table, column, _column) {
    console.log(table, "TABLE 1");
    let newColumn = createNewColumn(table, column, _column);

    selectedView.columns.push(newColumn);
    //inspector = { action: "Column", column: newColumn };
    selectedView.records = getColumnRecords(selectedView);
    selectedView = selectedView;
    applySteps(selectedView);
  }

  function resetPreview() {
    Object.keys(selectedView.steps).forEach((_step) => {
      selectedView.steps[_step].hidden = false;
    });
  }

  function saveQuery() {
    console.log("SAVE QUERY");
    resetPreview();
    selectedView.records = applySteps(selectedView);

    if (!entities.queries.find((v) => v.id == queryId)) {
      entities.queries.push(selectedView);
      notifications.info("New Query Saved", 3000);
    } else {
      notifications.info("Changes Saved", 3000);
    }

    runQuery = false;
    selectedView = selectedView;
    entities = entities;
  }

  function saveView() {
    resetPreview();

    newView = {
      ...selectedView,
      id: uuidv4(),
      name: `View of ${selectedView.name}`,
      querieId: queryId,
      type: "view",
    };

    entities.views.push(newView);
    notifications.info(`New View '${newView.name}' Saved`, 3000);

    //selectedView = selectedView;
    entities = entities;
  }

  function updateAggregation(aggregation, column, columnIdx) {
    let newColumn = column;

    newColumn.aggregation = aggregation;

    newColumn.type = aggregations[aggregation].type;

    selectedView.columns.splice(columnIdx, 1, newColumn);

    selectedView.records = getColumnRecords(selectedView);
    selectedView = selectedView;
  }

  function addColumnFilter(column) {
    let columnIdx = selectedView.columns.indexOf(column);

    column.source.filter = {
      column: column,
      condition: conditions[column.type][0],
      value: "",
    };

    selectedView.columns[columnIdx] = column;
  }

  function deleteColumnFilter(column) {
    let columnIdx = selectedView.columns.indexOf(column);

    column.source.filter = {};

    selectedView.columns[columnIdx] = column;
  }

  function selectBaseTable(table) {
    selectedView.baseTable = table;
    //inspector.action = "Add Column";
  }

  function generateTable(table) {
    if (table.columns.length > 0) {
      table.records = getColumnRecords(table);
      //table.summary = setTableSummary(table);
      table.rows = createRows(table);
    } else {
      table.records = [];
      table.summary = [];
      table.rows = [];
    }

    return table;
  }

  function toggleEditMode() {
    editMode = true;
  }

  function leaveEditMode() {
    editMode = false;
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}



  <div class="w-screen flex bg-zinc-100 bg-opacity-10">
    <div
      class="flex overflow-hidden flex-col h-full flex-grow"
      style="height: calc(100vh - 76px);"
    >
      <div class="border-b-2 border-zinc-300 flex items-center space-x-4 pr-2">
        <div
          class="text-lg px-2 py-3 space-x-1 border-r bg-opacity-10 hover:bg-opacity-80 flex items-center"
        >
          <i class="{icon[selectedView.type]} align-bottom text-xl" />
          <input
            class="hover:bg-indigo-100 p-1 rounded"
            type="text"
            bind:value={selectedView.name}
          />

          <Dropdown>
            <button slot="toggle" class="">
              <i class="ri-arrow-drop-down-line align-bottom" />
            </button>
            <div slot="menu">
              <div
                class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
              >
                View SQL Query
              </div>
              <div
                class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
              >
                Publish as View
              </div>
            </div>
          </Dropdown>
        </div>

        <div class="flex flex-grow justify-end items-center space-x-2">
          {#if !editMode}
            <button
              class="border border-zinc-300 text-zinc-800 p-2 text-sm rounded"
              on:click={toggleEditMode}>Edit</button
            >
          {:else}
            {#if entities.queries.find((v) => v.id == selectedView.id)}
              <button
                on:click={saveQuery}
                disabled={!selectedView.baseTable}
                class:opacity-60={!selectedView.baseTable}
                class="border border-zinc-300 text-zinc-800 p-2 text-sm rounded"
                >Save</button
              >
            {:else}
              <button
                on:click={saveQuery}
                disabled={!selectedView.baseTable}
                class:opacity-60={!selectedView.baseTable}
                class="border border-zinc-300 text-zinc-800 p-2 text-sm rounded"
                >Save</button
              >
            {/if}
            <button
              on:click={leaveEditMode}
              class="block text-center border border-zinc-300 bg-zinc-50 text-zinc-800 p-2 text-sm rounded"
              >Close without Saving</button
            >
          {/if}
        </div>
      </div>

      <div class="flex-grow">
        {#if !editMode}
          <Table table={generateTable(selectedView)} />
        {:else}
          <Editor {schema} bind:query={selectedView} />
        {/if}
      </div>

      <Toast />
    </div>
  </div>

{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
