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

  console.log(column,table, "COLUMN");
</script>


  <div class="p-1 cursor-pointer hover:bg-indigo-100 flex items-center space-x-1 border rounded bg-white" on:click={()=>showOptions = !showOptions}>

    
   
    {#if !column.referenceTable}
      <i
      class="{icon[column.type]} align-bottom rounded px-1"
      style="background-color: {baseTable.color};"
    />
      <span class="border px-1 text-sm rounded">{baseTable.name}</span> 
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
      <span class="border px-1 text-sm rounded">{table.name}</span>
      <span class="flex-grow">{column.column}</span>
     
    {/if}

    <i class="ri-arrow-drop-down-line"></i>
    
    

  
    
  </div>

  {#if showOptions}
  <div class="ml-4 space-y-1">
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
