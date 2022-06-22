<script>
  import { theme } from "$lib/themes";
  import { afterUpdate, createEventDispatcher } from "svelte";
  import _ from "lodash";
  const dispatch = createEventDispatcher();
  export let cell;
  export let column;


  function formatType(cell, aggregation) {
    if (aggregation == "list") {
      return _.flatten([cell]);
    }
    return cell;
  }

  function editCell() {
    dispatch('editCell',cell)
  }
</script>

<div
  on:click={editCell}
  class:bg-indigo-200={cell.edit}
  class:bg-indigo-50={cell.primary}
  class="border-b bg-white cursor-pointer p-2 border-r w-80 space-y-1 border-zinc-200 text-zinc-800 w-48 shrink-0"
>
  {#if column && column.aggregation}
    <!--
  {#each formatType(cell,column.type) as item}

          <div
            class="inline-block mr-1 px-2 bg-zinc-200 rounded-xl bg-opacity-30" style="background-color: {column.source?.table
              .color};"
          >
            {item}
          </div>
        {/each}
 -->
    
    {#if Array.isArray(formatType(cell.content, column.aggregation))}
      {#each formatType(cell.content, column.aggregation) as item}
        <div
          class="inline-block mr-1 px-2 bg-zinc-200 rounded-xl bg-opacity-30"
          style="background-color: {column.source?.table.color};"
        >
          {item}
        </div>
      {/each}
    {:else}
      <div
        class="inline-block mr-1 px-2 rounded-xl {column.source.table
          .color} bg-opacity-30"
      >
        {cell.content}
      </div>
    {/if}
  {:else}
    
    {#if cell.primary}
      <a class="text-indigo-600 font-semibold" href="/schema/{cell.table.schema.id}/tables/{cell.table.id}/records/{cell.record}">{cell.content}</a>
    {:else if cell.link}
      <div class="px-2 inline-block rounded-xl" style="background-color: {cell.link.referenceTable?.color};">{cell.summary}</div>
    {:else}
      <input type="text" bind:value={cell.content}>
    {/if}
  {/if}
</div>
