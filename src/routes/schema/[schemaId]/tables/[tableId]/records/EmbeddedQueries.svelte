<script>
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { v4 as uuidv4 } from "uuid";
    const dispatch = createEventDispatcher();
    import Table from "../../../Table.svelte";
    export let table;
    export let link;
    export let queries;

   console.log(link,"COLUMN")

  function newQuery(table) {
    let query = {
      id: uuidv4(),
      name: "New Query2",
      baseTable: table,
      type: "query",
      schemaId: table.schema.id,
      constraints: [],
      columns: [],
      parameters: {
        "record-id": {
            value:"Active Record"
        }
      },
      steps: {
        "filter-1":{
            column: {
                ...table.columns[0],
                alias: `${link.referenceTable.name}_${table.columns[0].name}`
            },
            condition: "is equal to",
            value: `{record-id}`,

        }
      },
    };

    dispatch('save',query)
  }

</script>

<div class="flex items-center space-x-2">
    <h4 class="font-semibold">
      Embedded Queries ({queries.length})
    </h4>
    <button
      class="border rounded px-1 bg-zinc-100"
      on:click={() => newQuery(table)}
      ><i class="ri-add-line align-bottom" /></button
    >
  </div>

  {#if queries.length > 0}
    {#each queries as query}
      <div class="border">
        <div class="flex items-center p-2 space-x-2">
          <input
            type="text"
            class="border p-1 rounded font-semibold"
            bind:value={query.name}
          />
          <a
            class="border rounded py-1 px-2 bg-zinc-100"
            href="/schema/{table.schema.id}/queries/{query.id}">Edit</a
          >
          <div class="flex items-center border-l pl-2 space-x-2">
            <button class="py-1 px-2 rounded bg-zinc-600 text-white"><i class="ri-table-line align-bottom"></i></button>
            <button class="border py-1 px-2 rounded"><i class="ri-line-chart-line align-bottom"></i></button>
          </div>
        </div>
        <div class="border">
          <Table bind:table={query} />
        </div>
      </div>
    {/each}
  {:else}
    <div class="border p-2 rounded">
      <span class="text-zinc-600">No Embedded Queries</span>
    </div>
  {/if}