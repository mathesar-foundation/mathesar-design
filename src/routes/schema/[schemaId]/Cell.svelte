<script>
  import { theme } from "$lib/themes";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let cell;
  export let column;


</script>

<div
  on:click={()=> dispatch('editCell')}
  class="hover:bg-opacity-60 bg-opacity-0 {theme.darkPrimaryColor} cursor-pointer p-2 border-r w-80 space-y-1 {theme.tableBorderColor} {theme.textColor}"
>
  {#if column.aggregation == "List"}
    {#if Array.isArray(cell)}
      {#each cell as item}
        <div
          class="inline-block mr-1 px-2 rounded-xl {column.source.table
            .color} bg-opacity-30"
        >
          {item}
        </div>
      {/each}
    {:else}
      <div
        class="inline-block mr-1 px-2 rounded-xl {column.source.table
          .color} bg-opacity-30"
      >
        {cell}
      </div>
    {/if}
  {:else}
    {cell}
  {/if}
</div>


