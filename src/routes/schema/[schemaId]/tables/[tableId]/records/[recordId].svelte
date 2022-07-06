<script>
  import { afterUpdate, beforeUpdate } from "svelte";
  import TopNav from "$lib/TopNav.svelte";
  import { page } from "$app/stores";
  import { icon } from "$lib/iconMap";
  
  import Dropdown from "$lib/Dropdown.svelte";
  import SideBar from "../../../SideBar.svelte";
  import EmbeddedQueries from "./EmbeddedQueries.svelte";
 
  import _ from "lodash";
  let { schemaId } = $page.params;
  let { tableId } = $page.params;
  let { recordId } = $page.params;

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

  async function loadData() {
    console.log(tableId);
    entities = await loadEntities();
    table = entities.tables.find((table) => table.id == tableId);
    schema = entities.schemas.find((schema) => schema.id == schemaId);
    record = table.records[recordId];
    cells = table.rows.cells[recordId];

    linkedTables = entities.tables.filter((t) => {
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


    let foreignKeyCells = Object.values(linkedTable.rows.cells)
      .flat()
      .filter((c) => c.link && c.content == linkedPrimaryKey.content);

    return linkedRecords;
  }

  function saveQuery(query){
    entities.queries.push(query);

    entities = entities;

    console.log(query, entities.queries);
    saveEntities(entities);

    setTimeout(() => {
      window.location.href = `/schema/${schemaId}/queries/${query.id}`;
    }, 400);
  }

  function getTableQueries(table) {
    let queries = entities.queries.filter((q) => q.baseTable.id == table.id);

    console.log(queries,"QUERIES")

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

  function lighter(rgba){
    let [r, g, b, a] = rgba.split(",");
    return `${r}, ${g}, ${b}, 0.2)`;
  }
  
</script>

<div class="bg-zinc-100 h-full">
  {#await loadData()}
    <div>Loading (can be removed)</div>
  {:then entities}
    <TopNav schema={table.schema} />

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
        <div class="py-1 px-3  space-x-2 border-b">

          <span class="text-indigo-800"><i class="ri-table-line align-bottom"></i> <span>{table.name}</span></span>
          <span><i class="ri-arrow-right-s-line align-bottom"></i></span>
          <span class="text-indigo-800">{getRecordSummary(cells[0])}</span>
        </div>

        <div class="p-8 bg-white h-full space-y-4 overflow-y-scroll">
          <div class="space-y-1">
            <h3 class="text-2xl font-semibold">
              {getRecordSummary(cells[0])}
            </h3>
            <div class="">
              Record in <a href="/" class="text-indigo-700"
                ><i class="ri-table-line align-bottom" /> {table.name}</a
              >
            </div>
          </div>

          <div class="space-y-4">
            {#each cells as cell}
              <div class="space-y-1">
                {#if !cell.primary && !cell.link}
                <div class="flex items-center space-x-1">
                <i
                    class="{icon[
                      cell.column.type
                    ]} align-bottom px-1 rounded"
                    style="background-color: {cell.table.color}"
                  />
                  <h4 class="font-semibold">{_.startCase(cell.column.name)}</h4>
                </div>

                
                    
                    
                    {#if !_.isArray(cell.content)}
                      <div class="flex-grow">
                        <input
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

                
                {/if}

                {#if cell.link}
                <div class="flex items-center space-x-1">
                  <i
                      class="{icon[
                        cell.column.type
                      ]} align-bottom px-1 rounded"
                      style="background-color: {cell.table.color}"
                    />
                    <h4 class="font-semibold">{_.startCase(cell.link.column)}</h4>
                  </div>
                  <div class="">
                    Record Linked from <a href="/" class="text-indigo-700"
                      ><i class="ri-table-line align-bottom" />
                      {cell.link.referenceTable.name}</a
                    >
                  </div>

                  <div
                    class="border border-zinc-300 rounded p-2 cursor-pointer hover:border-indigo-500 space-y-2"
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
                {/if}
              </div>
            {/each}
          </div>

          <hr />

          {#each linkedTables as linkedTable}
            <div class="space-y-1">
              <div class="flex items-center space-x-4">
                <div>
                  <h3 class="text-lg font-semibold leading-6">
                    {linkedTable.name}
                  </h3>
                  <p>
                    Linked via <span class="font-semibold"
                      >{getLinkColumn(table, linkedTable).column}</span
                    >
                    in
                    <a href="/" class="text-indigo-700"
                      ><i class="ri-table-line align-bottom" />
                      {linkedTable.name}</a
                    >
                  </p>
                </div>
              </div>

              <div class="border rounded p-2 border-zinc-300 space-x-2">
                {#each getLinkedRecords(table, linkedTable, cells) as cell}
                  <a
                    href="/schema/{schemaId}/tables/{linkedTable.id}/records/{cell.record}"
                    target="_self"
                    class="py-1 rounded-full px-2 cursor-pointer"
                    style="background-color: {cell.table.color}"
                    >{getRecordSummary(cell)}</a
                  >
                  <button
                    class="border px-1 rounded border-zinc-300 bg-zinc-100"
                  >
                    <i class="ri-add-line align-bottom" /></button
                  >
                {/each}
              </div>
            </div>


            <EmbeddedQueries queries={getTableQueries(linkedTable)} on:save={(e)=>saveQuery(e.detail)} link={getLinkColumn(table, linkedTable)} bind:table={linkedTable} />

            
          {/each}
        </div>
      </div>
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
