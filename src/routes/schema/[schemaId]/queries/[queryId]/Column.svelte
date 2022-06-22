<script>
  import { theme } from "$lib/themes";
  import { createEventDispatcher } from "svelte";
  import { icon } from "$lib/iconMap";
  export let baseTable;
  export let sourceColumn;
  export let sourceTable;
  export let column;

  const dispatch = createEventDispatcher();
</script>

<div
draggable={true}
    on:dragstart={() => dispatch("dragColumn", { baseTable, sourceColumn, column })}
    on:dragend={()=> dispatch("dropColumn")}
    
    on:click={() => dispatch("addColumn", { baseTable, sourceColumn, column })}
    class="p-1 cursor-pointer hover:bg-indigo-100  border rounded bg-white"
>
  <i
    class="{icon[column.type]} align-bottom rounded mr-1"
    style="background-color: {sourceTable.color};"
  />
  {column.name}
</div>
