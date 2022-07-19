<script>
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { v4 as uuidv4 } from "uuid";
    const dispatch = createEventDispatcher();
    import Table from "../../../../Table.svelte";
    export let table;
    export let link;
    export let queries;
    export let recordId;
    export let cells;


  function newQuery(_table) {
    let query = {
      id: uuidv4(),
      name: "New Query",
      baseTable: _table,
      link,
      cells,
      type: "query",
      schemaId: _table.schema.id,
      constraints: [],
      columns: [],
      parameters: {
        "record-id": {
            value:"Active Record"
        }
      },
      steps: {
      },
    };

    dispatch('save',query)
  }

</script>


<div class="flex items-center space-x-2">

    <button
      class="border rounded px-1 bg-zinc-100"
      on:click={() => newQuery(table)}
      ><i class="ri-add-line align-bottom" /> Add</button
    >
  </div>

  {#if queries.length > 0}
    {#each queries as query}
      
      <div class="border w-full">
        <div class="flex items-center p-2 space-x-2">
          
          {#if query && query.id}
          <input
            type="text"
            class="border p-1 rounded font-semibold"
            bind:value={query.name}
          />
          <a
            class="border rounded py-1 px-2 bg-zinc-100"
            href="/schema/{table.schema.id}/tables/{table.id}/records/{recordId}/{query.id}">Edit</a
          >
          {/if}
          <div class="flex items-center border-l pl-2 space-x-2">
            <button class="py-1 px-2 rounded bg-zinc-600 text-white"><i class="ri-table-line align-bottom"></i></button>
            <button class="border py-1 px-2 rounded"><i class="ri-line-chart-line align-bottom"></i></button>
          </div>
        </div>
        <div class="border w-full">
          <Table bind:table={query} />
        </div>
      </div>
    {/each}
  {:else}
    <div class="border p-2 rounded">
      <span class="text-zinc-600">No Embedded Queries</span>
    </div>
  {/if}