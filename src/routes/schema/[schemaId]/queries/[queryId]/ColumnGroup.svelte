<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import Column from "./Column.svelte";
  import { isForeignKey } from "$lib/utils";
  import { icon } from "$lib/iconMap";
  export let column;
  export let table;
  export let baseTable;
  let showOptions;
</script>

<!--
<span class="border px-1 text-sm rounded">{baseTable.name}</span> 
-->
<div class="">
  <div class="bg-zinc-200 text-sm w-max px-2 rounded-t">
    <i class="ri-table-line align-bottom" />
    {table.name}
  </div>

  <div class="bg-zinc-200 p-1 rounded-b rounded-r">

    <div
    class="p-1 cursor-pointer hover:bg-indigo-100 flex items-center space-x-1 border rounded bg-white"
    on:click={() => (showOptions = !showOptions)}
  >
    {#if !column.referenceTable}
      <i
        class="{icon[column.type]} align-bottom rounded px-1"
        style="background-color: {baseTable.color};"
      />
      <!--
      
    -->
      <span class="flex-grow">{column.name}</span>
      <!--
      <span class="font-semibold text-xs">FK</span>
      -->
    {/if}
    {#if column.referenceTable}
      <i
        class="{icon.number} align-bottom rounded px-1"
        style="background-color: {table.color};"
      />
      <!--
      
      -->
      <span class="flex-grow">{column.column}</span>
    {/if}

    <i class="ri-arrow-drop-down-line" />
  </div>

  {#if showOptions}
    <div class="ml-4">
      {#each table.columns as col}
        {#if !isForeignKey(table, col)}
          <Column
            baseTable={table}
            sourceTable={table}
            sourceColumn={column}
            column={col}
            on:addColumn
          />
        {/if}
      {/each}
    </div>
  {/if}

  </div>
 

  
</div>
