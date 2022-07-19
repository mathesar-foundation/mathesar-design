<script>
  import { beforeUpdate } from "svelte";
  import { page } from "$app/stores";
  import Modal from "$lib/Modal.svelte";
  import RecordSelector from "$lib/RecordSelector.svelte";
  import _ from "lodash";
  import { v4 as uuidv4 } from "uuid";
  import {
    loadEntities,
    saveEntities,
    newEmptyRecord,
    createRows,
  } from "$lib/utils";
  const { schemaId } = $page.params;


  let entities;
  let schema = {};
  let selectedTable;

  async function loadData() {
    entities = await loadEntities();

    schema = entities.schemas.find((schema) => schema.id == schemaId);
    schema = schema;

    //selectedTable = schema.tables[0];

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

  function uploadFile() {
    console.log("uploadFile");
  }

  function openTable(table) {
    window.location.href = `/schema/${schemaId}/tables/${table.id}`;
  }

  function newRecord(table) {
    let newRecord = newEmptyRecord(table);
    let tableIdx = _.indexOf(entities.tables, table);

    table.records.push(newRecord);
    table.rows = createRows(table);

    entities.tables[tableIdx] = table;
    entities = entities;
    saveEntities(entities);
    console.log(newRecord, "NEW RECORD");
    setTimeout(() => {
      window.location.href = `/schema/${schemaId}/tables/${table.id}/records/${
        table.records.length - 1
      }`;
    }, 400);
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div class="flex flex-grow bg-zinc-100 bg-opacity-10">
    <!--
    <SideBar
      expanded={schema.tables}
      on:openObject={(e) =>
        (window.location = `/schema/0/${e.detail.type}/${e.detail.id}`)}
      {schema}
    />
-->

    <div class="w-full flex flex-col">
      <div class="border-b-2 border-zinc-300 p-4 flex items-center space-x-2">
        <div
          class="bg-indigo-500 text-white text-2xl py-2 w-12 text-center rounded"
        >
          {_.startCase(schema.name.slice(0, 2))}
        </div>
        <div>
          <h2 class="text-zinc-800 text-xl leading-8">
            {schema.name}
          </h2>
          <p class="text-zinc-600 text-base">{schema.description}</p>
        </div>
      </div>

      <!--
      {#if schema.tables && !schema.queries}
        <div class="space-y-1 p-4 bg-indigo-100">
          <h2 class="text-zinc-800 text-2xl font-light">Create a Query</h2>
          <p class="text-lg text-zinc-600">
            Now that we have data, it's time to dig into it
          </p>
        </div>
      {/if}
      -->
      {#if schema.tables}
        <div class="space-y-4 p-4 border-b bg-white flex-grow">
          <div>
            <h2 class="font-semibold">Tables ({schema.tables.length})</h2>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              class="border-2 rounded bg-zinc-100 p-2 space-y-2 hover:border-indigo-600 cursor-pointer flex items-center"
            >
              <div class="mx-auto text-lg text-zinc-600">
                <i class="ri-add-line align-bottom" /> New Table
              </div>
            </div>
            {#each schema.tables as table}
              <div class="bg-zinc-100 rounded">
                <div class="flex items-center">
                  <div
                    class="bg-zinc-200 px-2 py-1 w-max rounded-t cursor-pointer flex-grow text-lg"
                    on:click={() => openTable(table)}
                  >
                    <i
                      class="ri-table-line align-bottom font-semibold text-zinc-600"
                    />
                    <span>{table.name}</span>
                  </div>
                  <div class="flex items-center leading-8">
                    <button
                      class="px-2"
                      on:click={() => (selectedTable = table)}
                    >
                      <i class="ri-search-line align-bottom" />
                    </button>
                    <button class="px-2" on:click={() => newRecord(table)}>
                      <i class="ri-add-line align-bottom" /> Record</button
                    >
                  </div>
                </div>

                <div
                  class="text-zinc-600 bg-zinc-200 space-y-2 p-2 text-sm rounded-r rounded-b"
                >
                  <div>{table?.description || "No Description"}</div>
                  <div>
                    <span>{table.columns.length} Columns</span>
                    <span>{table.records.length} Records</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="border">Pagination</div>
      {/if}

      {#if !schema.tables}
        <div class="space-y-2 p-8">
          <h2 class="text-zinc-800 text-3xl font-light">Let's add some data</h2>
          <p class="text-lg text-zinc-600">How would you like to begin?</p>
        </div>

        <div class="bg-zinc-50 p-8 flex-grow space-y-2">
          <div class="p-4 space-y-2 bg-zinc-100 rounded">
            <h4 class="font-semibold">Upload</h4>
            <input
              type="text"
              class="border border-zinc-300 rounded p-2 bg-white w-96"
              placeholder="Select a file"
            />
            <button on:click={uploadFile} class="p-2 border rounded"
              >Upload</button
            >
          </div>
          <div class="p-4 space-y-2 bg-zinc-100 rounded">
            <h4 class="font-semibold">Copy and Paste</h4>
            <textarea
              placeholder="Paste CSV here"
              class="border border-zinc-300 rounded p-2 w-96 h-20"
            />
          </div>
          <div class="p-4 space-y-2 bg-zinc-100 rounded">
            <h4 class="font-semibold">Start from Scratch</h4>

            <button class="border-2 border-zinc-300 p-2 rounded"
              ><i class="ri-add-line align-bottom" /> New Table</button
            >
          </div>
        </div>
      {/if}
    </div>

    <!--
    <div class="space-y-4 w-full text-zinc-800">
      <div class="flex items-center space-x-2 bg-opacity-10 p-8 bg-indigo-500">
        <div
          class="bg-indigo-500 text-white text-2xl py-2 w-12 text-center rounded"
        >
          {_.startCase(schema.name.slice(0, 2))}
        </div>
        <div>
          <h2 class="text-xl font-semibold">{schema.name}</h2>
          <p class="text-sm text-zinc-500">
            {#if schema.tables}
              {schema.tables?.filter((t) => t.type == "table").length || 0} Tables
              {schema.views?.filter((t) => t.type == "view").length || 0} Views
            {/if}
          </p>
        </div>
      </div>

      <div class="px-8 space-y-4">
        <div class="border-b py-2">
          <h3 class="text-lg">Recent</h3>
        </div>

        <div class="flex space-x-4">
          {#if schema.tables}
            {#each schema.tables.slice(3) as table}
              <a
                class="block border-2 space-x-1 p-4 rounded w-64"
                href="./{schema.id}/tables/{table.id}"
                ><i class="ri-table-fill align-bottom" />
                <span>{table.name}</span></a
              >
            {/each}
          {:else}
            <p class="text-zinc-500">No Recent</p>
          {/if}
        </div>

        <div class="border-b py-2">
          <h3 class="text-lg">Activity</h3>
        </div>
        <p class="text-zinc-500">No Activity</p>

        <div class="border-b py-2">
          <h3 class="text-lg">Get Started</h3>
        </div>
        <div>
          <button>Create a Table</button>
          <button>Create a View</button>
        </div>
      </div>
    </div>
    -->
  </div>

  {#if selectedTable}
    <Modal
      on:close={() => (selectedTable = null)}
      title="Locate or Create {selectedTable.name} Record"
      open={selectedTable}
    >
      <div slot="body">
        <RecordSelector bind:table={selectedTable} />
      </div>
    </Modal>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
