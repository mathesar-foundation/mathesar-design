<script>
  import { afterUpdate, beforeUpdate } from "svelte";
  import TopNav from "$lib/TopNav.svelte";
  import Breadcrumb from "$lib/Breadcrumb.svelte";
  import RecordNavigation from "../RecordNavigation.svelte";
  import { page } from "$app/stores";
  import { icon } from "$lib/iconMap";

  import Dropdown from "$lib/Dropdown.svelte";
  import SideBar from "../../../../SideBar.svelte";
  import EmbeddedQueries from "./EmbeddedQueries.svelte";

  import _ from "lodash";
  let { schemaId, tableId, recordId } = $page.params;

  import {
    loadEntities,
    saveEntities,
    getRecordSummary,
    createRows,
  } from "$lib/utils";

  let entities;
  let record;
  let table;
  let linkedTables;
  let cells;
  let schema;
  let activeView = "links";

  async function loadData() {
    entities = await loadEntities();
    table = entities.tables.find((table) => table.id == tableId);
    schema = entities.schemas.find((schema) => schema.id == schemaId);
    record = table.records[recordId];
    cells = table.rows.cells[recordId];

    linkedTables = getLinkedTables(entities.tables);

    console.log(table, record, cells);

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    entities = entities;

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

  afterUpdate(() => {});

  function getLinkedTables(tables) {
    return tables.filter((t) => {
      let valid = false;

      if (
        t.constraints.some(
          (c) => c.referenceTable && c.referenceTable.id == table.id
        )
      ) {
        valid = true;
      }

      return valid;
    });
  }

  function getLinkColumn(table, linkedTable) {
    return linkedTable.constraints.find(
      (c) => c.referenceTable && c.referenceTable.id == table.id
    );
  }

  function getLinkedRecords(table, linkedTable, cells) {
    let linkedPrimaryKey = cells.find((c) => c.primary);

    let linkColumn = getLinkColumn(table, linkedTable);

    let linkedRecords = Object.keys(linkedTable.rows.cells).reduce(
      (acc, key) => {
        let linkedCell = linkedTable.rows.cells[key];
        if (
          linkedCell.find(
            (c) =>
              c.column.name == linkColumn.column &&
              c.content == linkedPrimaryKey.content
          )
        ) {
          acc.push(linkedCell[0]);
        }
        return acc;
      },
      []
    );

    return linkedRecords;
  }

  function saveQuery(query) {
    entities.queries.push(query);

    entities = entities;

    saveEntities(entities);

    setTimeout(() => {
      window.location.href = `/schema/${schemaId}/tables/${tableId}/records/${recordId}/${query.id}`;
    }, 400);
  }

  function getTableQueries(table) {
    let queries = entities.queries.filter((q) => q.baseTable.id == table.id);

    let queryTables = queries.map((query) => {
      if (query.records) {
        return {
          ...query,
          constraints: [],
          rows: createRows(query),
        };
      }
    });

    return queryTables;
  }
</script>

<div class="bg-zinc-100 h-full">
  {#await loadData()}
    <div>Loading (can be removed)</div>
  {:then entities}
    <div class="w-screen flex bg-zinc-100 bg-opacity-10">
      <div
        class="flex overflow-hidden flex-col h-full flex-grow"
        style="height: calc(100vh - 130px);"
      >
        <div class="h-full bg-white overflow-y-scroll">
          <div class="grid grid-cols-3 gap-4 p-4 bg-zinc-50 border-b">
            {#each cells as cell}
              {#if !cell.link}
                <div class="space-y-1">
                  <div class="flex items-center space-x-1">
                    <i
                      class="{icon[
                        cell.column.type
                      ]} align-bottom px-1 rounded bg-zinc-100 text-sm"
                    />
                    <div class="font-semibold">
                      {_.startCase(cell.column.name)}
                    </div>
                  </div>

                  {#if !_.isArray(cell.content)}
                    <div class="flex-grow">
                      <input
                        readonly={cell.primary}
                        type="text"
                        class="border border-zinc-300 w-full rounded p-2 focus:border-indigo-500"
                        bind:value={cell.content}
                      />
                    </div>
                  {:else}
                    <div class="flex items-center space-x-2">
                      {#each cell.content as item}
                        <div class="bg-indigo-100 rounded-xl px-2">
                          {item}
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}

              {#if cell.link}
                <div class="space-y-1">
                  <div class="flex items-center space-x-1">
                    <i
                      class="{icon[
                        cell.column.type
                      ]} align-bottom px-1 rounded bg-zinc-100 text-sm"
                    />
                    <div class="font-semibold">
                      {_.startCase(cell.link.column)}
                    </div>
                    <span>linked from</span>
                    <a href="/" target="_self" class="text-indigo-700"
                      ><i class="ri-table-line align-bottom" />
                      {cell.link.referenceTable.name}</a
                    >
                  </div>

                  <div
                    class="border border-zinc-300 bg-white rounded p-2 cursor-pointer hover:border-indigo-500 space-y-2"
                  >
                    <a
                      href="/schema/{schemaId}/tables/{cell.link.referenceTable
                        .id}/records/{cell.record}"
                      target="_self"
                      class="px-2 inline-block rounded-xl"
                      style="background-color: {cell.link.referenceTable
                        ?.color};"
                    >
                      {cell.link.referenceTable.rows.summaries[cell.record]}
                    </a>
                    <!--
                  <div class="border font-semibold">
                  {getCellByIdx(cell.link.referenceTable,cell.content)[0].table.summary.join(' ')}
                  </div>
                  -->
                    <!--
                  {#each getCellByIdx(cell.link.referenceTable,cell.content) as cell,i}
                     
                      
                      
                      {#if cell.link}
                          
                      <div class="bg-indigo-200">
                          {cell.column.name}: {getCellByIdx(cell.link.referenceTable,cell.content)[4].content}
                      </div>
                      {/if}
                      {#if !cell.primary && !cell.link}
                          <div>{_.startCase(cell.column.name)}: {cell.content}</div>
                      {/if}
                  {/each}
                  -->
                  </div>
                </div>
              {/if}
            {/each}
          </div>
          <div class="space-y-4 p-4">
            <div class="flex items-center space-x-4">
              <div
                class="cursor-pointer"
                class:font-semibold={activeView == "links"}
                on:click={() => (activeView = "links")}
              >
                Links to Record ({linkedTables.length})
              </div>
              <div
                class="cursor-pointer"
                class:font-semibold={activeView == "queries"}
                on:click={() => (activeView = "queries")}
              >
                Embedded Queries ({linkedTables.map((l) => getTableQueries(l).length).reduce((a, b) => a + b, 0)})
              </div>
            </div>

            {#if activeView == "links"}
              {#each linkedTables as linkedTable}
                <div class="">
                  <div
                    class="flex items-center space-x-4 bg-zinc-200 rounded-t w-max"
                  >
                    <div class="font-semibold leading-6 py-1 px-2">
                      <i class="ri-table-line align-bottom" />
                      {linkedTable.name}
                    </div>
                  </div>
                  <div
                    class="border-2 rounded-b rounded-r bg-white border-zinc-200 space-x-2 flex items-center"
                  >
                    <div class="border-r p-2">
                      <i
                        class="ri-key-line bg-zinc-100 p-1 rounded align-bottom"
                      />
                      <span>{getLinkColumn(table, linkedTable).column}</span>
                    </div>
                    {#each getLinkedRecords(table, linkedTable, cells) as cell}
                      <a
                        href="/schema/{schemaId}/tables/{linkedTable.id}/records/{cell.record}"
                        target="_self"
                        class="rounded-full px-2 cursor-pointer"
                        style="background-color: {cell.table.color}"
                        >{getRecordSummary(cell)}</a
                      >
                    {/each}
                    <button
                      class="border text-sm px-1 rounded border-zinc-300 bg-zinc-100"
                    >
                      <i class="ri-add-line align-bottom" /></button
                    >
                  </div>
                </div>
              {/each}
            {/if}

            {#if activeView == "queries"}
              {#each linkedTables as linkedTable}
                <EmbeddedQueries
                  {cells}
                  {recordId}
                  queries={getTableQueries(linkedTable)}
                  on:save={(e) => saveQuery(e.detail)}
                  link={getLinkColumn(table, linkedTable)}
                  bind:table={linkedTable}
                />
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
