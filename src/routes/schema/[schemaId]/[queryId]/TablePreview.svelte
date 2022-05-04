<script>
  import { theme } from "$lib/themes";
  import { icon } from "$lib/iconMap";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { getColumnIndex } from "$lib/utils";

  import _ from "lodash";
  
  export let selectedView;
  export let inspector;
  export let records;

  console.log(records,"TEST")

  function formatRange(cell){
    if(Array.isArray(cell)){
      return `${cell[0]}-${cell[cell.length-1]}`
    } else {
      return cell;
    }
   
  }
</script>

<div
on:click|self={() => (inspector = { action: "Query Details" })}
  class="overflow-scroll border-t flex-grow bg-zinc-50 bg-opacity-10 border-zinc-200"
>
  <div class="flex w-max items-stretch">
    {#each selectedView.columns as column}
      <div class="border-r w-64 border-zinc-200">
        <div
          on:click={() => (inspector = { action: "Column", column: column })}
          class="{inspector.column == column
            ? theme.lightBackgroundColor
            : theme.mediumBackgroundColor} whitespace-nowrap cursor-pointer h-full p-2 space-x-1"
        >
          <span
            class="leading-4 px-1 inline-block text-center rounded text-xs" style="background-color: {column.source.table.color} ;"
          >
            
            <i class={icon[column.type]} />
            <i class={icon[column.aggregation]} />
          </span>

          <span>{column.alias}</span>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex w-max items-stretch">
    <div>
      {#each records as record, j}

        <div class="flex border-b border-zinc-200">
          {#each record as cell, i}
            <div
              class="w-64 border-r space-y-1 border-zinc-200 p-2 {getColumnIndex(
                selectedView,
                inspector.column
              ) == i
                ? theme.darkBackgroundColor
                : ''}"
            >
              {#if selectedView.columns[i].aggregation == "List"}
                {#if Array.isArray(cell)}
                
                  {#each cell as item}
                    <div
                      class="inline-block mr-1 px-2 rounded-xl bg-opacity-30" style="background-color: {selectedView
                        .columns[i].source.table.color}"
                    >
                      {item}
                    </div>
                  {/each}
                {:else}
                  <div
                    class="inline-block mr-1 px-2 rounded-xl bg-opacity-30" style="background-color: {selectedView
                      .columns[i].source.table.color};"
                  >
                    {cell}
                  </div>
                {/if}
              {:else if selectedView.columns[i].aggregation == "range"}
                {formatRange(cell)}
              {:else}
                {cell}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  
</div>
<div class="border-zinc-200 border-t p-2 bg-zinc-50">
	{selectedView.records?.length || 0} Records
</div>