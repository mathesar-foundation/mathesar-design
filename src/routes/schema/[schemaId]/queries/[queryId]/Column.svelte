<script>
  import { createEventDispatcher } from "svelte";
  import { icon } from "$lib/iconMap";
  export let baseTable;
  export let sourceColumn;
  export let sourceTable;
  export let column;

  function isPrimaryKey(table, column) {
    return table.constraints.find(
      (c) => c.type == "Primary Key" && c.column == column.name
    );
  }

  const dispatch = createEventDispatcher();
</script>

<div    
    on:click={() => dispatch("addColumn", { baseTable, sourceColumn, column })}
    class="p-1 cursor-pointer hover:bg-indigo-100 flex items-center space-x-1 border rounded bg-white"
>

<i
    class="{icon[column.type]} align-bottom rounded  px-1"
    style="background-color: {sourceTable.color};"
  />

<span class="border rounded px-1 text-sm">{sourceTable.name}</span>
  
  

  <span>{column.name}</span>
  <!--
  {#if sourceColumn}<span class="text-sm">{sourceColumn.name}</span>{/if}


  {#if isPrimaryKey(baseTable,column)}<span class="font-semibold text-xs">PK</span>{/if}
    -->
</div>
