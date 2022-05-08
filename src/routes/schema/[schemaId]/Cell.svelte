<script>
  import { theme } from "$lib/themes";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let cell;
  export let column;


</script>

<div
  on:click={()=> dispatch('editCell')}
  class="hover:bg-opacity-60 bg-opacity-0 bg-zinc-100 cursor-pointer p-2 border-r w-80 space-y-1 border-zinc-200 text-zinc-800"
>
  {#if column && column.aggregation}
    {#if column.aggregation == "list"}

      {#if Array.isArray(cell)}
        {#each cell as item}
          <div
            class="inline-block mr-1 px-2 rounded-xl bg-opacity-30" style="background-color: {column.source.table
              .color};"
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

    {/if}

  {:else}


    {cell}
  {/if}
</div>


