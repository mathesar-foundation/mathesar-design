<script>
  import { theme } from "$lib/themes";
  import { afterUpdate, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { getRecordSummary } from "$lib/utils";
  import _ from "lodash";
import BaseTableSelector from "./queries/[queryId]/BaseTableSelector.svelte";

  export let selectedCell;

  export let cell;
  let column = cell.column;
  export let columnSelection;

  function formatType(cell, aggregation) {
    if (aggregation == "list") {
      return _.flatten([cell]);
    }
    return cell;
  }

  function editCell() {
    dispatch("editCell", cell);
  }
  function selectCell (cell) {
    dispatch("selectCell", cell);
  }
</script>

<div
  on:click={()=>selectCell(cell)}
  class:bg-indigo-200={selectedCell == cell}
  class:bg-zinc-50={cell.primary}
  class="border-b bg-white cursor-pointer border-r w-80 space-y-1 relative border-zinc-200 text-zinc-800 w-64 shrink-0"
  class:bg-indigo-50={columnSelection[column.id]}
>
  <div  class="border-2 border-transparent p-2 rounded top-0 left-0 w-full h-full" class:border-indigo-400={selectedCell == cell}>
    {#if column && column.aggregation}
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
    {:else if cell.primary}
      <div class="space-x-1">
        <a
          class="text-indigo-600 font-semibold"
          href="/schema/{cell.table.schema.id}/tables/{cell.table
            .id}/records/{cell.record}">{cell.content}</a
        >
        <span class="opacity-80 italic text-sm">
          ({getRecordSummary(cell)})
        </span>
      </div>
    {:else if cell.link}
      <a
        target="_self"
        href="/schema/{cell.link.referenceTable.schema.id}/tables/{cell.link
          .referenceTable.id}"
        class="px-2 inline-block rounded-xl"
        style="background-color: {cell.link.referenceTable?.color};"
      >
        {cell.link.referenceTable.rows.summaries[cell.record]}
        {#if selectedCell == cell}
          <button><i class="ri-close-line align-bottom font-semibold"></i></button>
        {/if}
      </a>

      {#if selectedCell == cell}
        <button></button>
      {/if}
    {:else}
      <input type="text" class="bg-transparent" bind:value={cell.content} />
    {/if}
  </div>
</div>
