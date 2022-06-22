<script>
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import { loadEntities, saveEntities } from "$lib/utils";
  import { page } from "$app/stores";
  import { tableStore } from "$lib/stores/tableStore";
  import Toolbar from "../../Toolbar.svelte";
  import LinkTableWizard from "../LinkTableWizard.svelte";
  import ImportData from "../ImportData.svelte";
  import randomColor from "randomcolor";
  import { v4 as uuidv4 } from "uuid";
  import _ from "lodash";
  import LinkTableForm from "../LinkTableForm.svelte";
  import LeaderLine from "leader-line";

  import TopNav from "$lib/TopNav.svelte";
  import Inspector from "../Inspector.svelte";
  import Table from "../../Table.svelte";
  import Query from "../Query.svelte";
  import Design from "../Design.svelte";
  import SideBar from "../../SideBar.svelte";
  import Tabs from "../../Tabs.svelte";

  let { schemaId } = $page.params;
  let { tableId } = $page.params;
  $tableStore.viewDetails = false;

  let entities = {};
  let schema = {};
  let table = {};
  let activeMode = "table";
  let inspector = {};
  let newTable;

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

  let start, end;
  onMount(() => {
    //new LeaderLine(start, end);
  });

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

    table.records.forEach((r) => {
      r.splice(columnIdx, 1);
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

  function extractToTable(column) {
    let columnIdx = table.columns.indexOf(column);

    let newTable = {
      id: uuidv4(),
      name: `${column.name}(${table.name})`,
      schemaId: schemaId,
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
      columns: [
        {
          id: uuidv4(),
          name: "id",
          type: "text",
          db: "VARCHAR",
        },
        { ...column },
      ],
      records: _.uniq(table.records.map((r) => r[columnIdx])).map((r) => [
        uuidv4(),
        r,
      ]),
    };

    table.constraints.push({
      type: "Foreign Key",
      column: column.name,
      referenceTable: {
        tableId: newTable.id,
      },
    });

    table.records.forEach((r) => {
      let foreignKey = newTable.records.find((record) =>
        record.includes(r[columnIdx])
      );
      r.splice(columnIdx, 1, foreignKey[0]);
    });

    table = table;

    entities.tables.push(newTable);
    entities = entities;

    setTimeout(() => {
      window.location.href = `/schema/${schemaId}/tables/${newTable.id}`;
    }, "300");
  }

  function getColumnById(columnId) {
    return table.columns.find((c) => c.id == columnId);
  }

  function selectColumn(selection) {
    console.log(selection, "test col");

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
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <TopNav {schema} />
  <div class="w-screen flex bg-zinc-100 bg-opacity-10">
    <SideBar
      {schema}
      on:openObject={(e) =>
        (window.location = `/schema/0/${e.detail.type}/${e.detail.id}`)}
    />

    <div
      class="flex overflow-hidden flex-col h-full flex-grow"
      style="height: calc(100vh - 52px);"
    >
      <Tabs />
      <Toolbar
        on:deleteTable={deleteTable}
        on:switch={showMode}
        bind:table
        on:linkTable={linkTable}
        on:CreateView={(e) => openView(e.detail)}
      />

      {#if activeMode == "edit"}
        <Design {table} />
      {/if}

      {#if activeMode == "query"}
        <Query allowed={table.allowEdit} {table} />
      {/if}

      {#if table && table.columns}
        <Table
          on:selectColumn={(e) => selectColumn(e.detail)}
          on:extractToTable={(e) => extractToTable(e.detail)}
          on:deleteColumn={(e) => deleteColumn(e.detail)}
          bind:table
        />
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

    <Inspector
      on:extractTable={(e) => extractTable(e.detail)}
      bind:inspector
      bind:table
    />

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
