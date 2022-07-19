<script>
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import { loadEntities, saveEntities, createRows, setTableSummary } from "$lib/utils";
  import { page } from "$app/stores";
  import { tableStore } from "$lib/stores/tableStore";
  import Toolbar from "../../Toolbar.svelte";
  import LinkTableWizard from "../LinkTableWizard.svelte";
  import ImportData from "../ImportData.svelte";
  import randomColor from "randomcolor";
  import { v4 as uuidv4 } from "uuid";
  import _ from "lodash";
  import LinkTableForm from "../LinkTableForm.svelte";

  import TopNav from "$lib/TopNav.svelte";
  import Inspector from "../Inspector.svelte";
  import Table from "../../Table.svelte";
  import Query from "../Query.svelte";
  import SideBar from "../../SideBar.svelte";

  let { schemaId } = $page.params;
  let { tableId } = $page.params;
  $tableStore.viewDetails = false;

  let entities = {};
  let schema = {};
  let table = {};
  let activeMode = "table";
  let inspector = {};
  let newTable;
  let showInspector;

  let openLinkOptions = false;
  let importDataModal;

  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema) => schema.id == schemaId);
    table = entities.tables.find((table) => table.id == tableId);

    if (!table) {
      table = {
        name: "New Table",
        schemaId: schemaId,
        id: tableId,
        color: randomColor({
          luminosity: "light",
          hue: "blue",
          format: "rgba",
          alpha: 0.8,
        }),
      };
    }

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

  function showMode(e) {
    let { mode } = e.detail;
    activeMode = mode;
  }

  function linkTable(e) {
    openLinkOptions = true;
  }

  function openView(view) {
    entities.queries.push(view);
    entities = entities;
    saveEntities(entities);

    setTimeout(function () {
      window.location = `/schema/${table.schema.id}/queries/${view.id}`;
    }, 200);
  }

  function deleteTable() {
    let tableIdx = entities.tables.indexOf(table);
    entities.tables.splice(tableIdx, 1);
    entities = entities;

    setTimeout(() => {
      window.location.href = `/schema/${schemaId}`;
    }, "200");
  }

  function deleteColumn(column) {
    let columnIdx = table.columns.indexOf(column);

    table.columns.splice(columnIdx, 1);

    Object.keys(table.rows.cells).forEach((r) => {
      table.rows.cells[r].splice(columnIdx, 1);
    });

    table = table;
  }

  function importData() {
    importDataModal = true;
  }

  function saveTable(e) {
    table = e.detail;
    entities.tables.push(table);
    entities = entities;
  }


  function getColumnById(columnId) {
    return table.columns.find((c) => c.id == columnId);
  }

  function selectColumn(selection) {
    inspector = {
      column: Object.keys(selection)
        .filter((sel) => selection[sel])
        .map((sel) => getColumnById(sel)),
    };

    inspector = inspector;
  }

  function extractTable(columns) {
    newTable = {
      id: uuidv4(),
      name: "New Table",
      columns: columns,
      records: [],
    };
  }

  function extractRecords(columnIndexes, table) {
    let records = table.records.map((r) => {
      return columnIndexes.map((c) => r[c]);
    });

    records.forEach((r) => {
      r.unshift(uuidv4());
    });

    return records;
  }

  function createLinkedTable(columns, table) {
    let columnIdxs = columns.map((c) => table.columns.indexOf(c));

    let idCol = {
      id: uuidv4(),
      name: "id",
      type: "text",
      db: "VARCHAR",
    };

    let linkedTable = {
      id: uuidv4(),
      name: `${columns[0].name}(${table.name})`,
      columns: [idCol, ...columns],
      schemaId: schemaId,
      schema: {
        id: schemaId
      },
      summary: [
        {
          columnName: `${columns[0].name}`,
        }
      ],
      type: "table",
      constraints: [
        {
          type: "Primary Key",
          column: "id",
        },
      ],
      color: randomColor({
        luminosity: "light",
        hue: "blue",
        format: "rgba",
        alpha: 0.8,
      }),
      records: extractRecords(columnIdxs, table),
    };

    linkedTable.rows = createRows(linkedTable);
    linkedTable.summary = setTableSummary(linkedTable);

    return linkedTable;
  }

  function createForeignKeyColumn(columns,table){
    let newColumn = {
      id: uuidv4(),
      name: `${columns[0].name} Id`,
      type: "text",
      db: "VARCHAR",
    };

    return newColumn;
  }

  function extractColumns(columns, table) {
    let foreignKeyColumn = createForeignKeyColumn(columns, table);
    let newTable = createLinkedTable(columns, table);
    let foreignKeyRecords = extractRecords([0], newTable);

    console.log(foreignKeyRecords,"foreignKeyRecords");
    

    // ADD COLUMN
    table.columns.push(foreignKeyColumn);

    table.records.forEach((record,i) => {
      record.push(foreignKeyRecords[i]);
    });

    table.constraints.push(
      {
        type: "Foreign Key",
        column: foreignKeyColumn.name,
        referenceTable: {
          ...newTable
        }
      }
    )

    
    
    // ADD NEW TABLE
    entities.tables.push(newTable);
    entities = entities;

    table.rows = createRows(table);
    columns.forEach((column) => {
      deleteColumn(column);
    });
    table = table;

    
    
  }

  function closeInspector() {
    showInspector = false;
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div class="w-screen flex bg-zinc-100 bg-opacity-10">


    <div
      class="flex overflow-hidden flex-col h-full flex-grow"
      style="height: calc(100vh - 78px);"
    >
      <Toolbar
        bind:showInspector
        on:deleteTable={deleteTable}
        on:switch={showMode}
        bind:table
        on:linkTable={linkTable}
        on:CreateView={(e) => openView(e.detail)}
      />

      {#if activeMode == "query"}
        <Query allowed={table.allowEdit} {table} />
      {/if}

      {#if table && table.columns}
        <div class="flex flex-grow">
          <Table
            on:closeInspector={closeInspector}
            on:selectColumn={(e) => selectColumn(e.detail)}
            on:deleteColumn={(e) => deleteColumn(e.detail)}
            bind:table
          />

          {#if showInspector}
            <Inspector
              on:extractColumns={(e) =>
              extractColumns(e.detail.column, e.detail.table)}
              on:extractTable={(e) => extractTable(e.detail)}
              bind:inspector
              bind:table
            />
          {/if}
        </div>
      {:else}
        <div class="p-8 flex justify-center space-x-8">
          <div
            class="cursor-pointer p-4 rounded border-2 hover:border-indigo-800 hover:shadow-md w-80 text-center"
          >
            <i class="ri-table-line text-3xl" />
            <div>Start from Scratch</div>
          </div>
          <div
            class="cursor-pointer p-4 rounded border-2 hover:border-indigo-800 hover:shadow-md w-80 text-center"
            on:click={importData}
          >
            <i class="ri-file-upload-line text-3xl" />
            <div>From Import</div>
          </div>
        </div>
        {#if table && table.type == "table"}
          <div class="p-5 text-zinc-800">Table has no columns</div>
        {/if}
      {/if}
    </div>

    {#if newTable}
      <LinkTableForm bind:table={newTable} />
    {/if}
  </div>
  <ImportData
    bind:table
    bind:showModal={importDataModal}
    on:finishImport={saveTable}
  />
  <LinkTableWizard
    {table}
    tables={entities.tables}
    showModal={openLinkOptions}
  />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
