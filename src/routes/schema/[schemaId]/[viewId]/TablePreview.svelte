<script>
  import { theme } from "$lib/themes";
  import { icon } from "$lib/iconMap";
  import { afterUpdate, createEventDispatcher } from "svelte";

  import { getColumnIndex } from "$lib/utils";

  import _ from "lodash";
  const dispatch = createEventDispatcher();
  export let selectedView;
  export let inspector;
  export let records;
</script>

<div
on:click|self={() => (inspector = { action: "Query Details" })}
  class="overflow-scroll border-t flex-grow {theme.darkBackgroundColor} bg-opacity-10 {theme.tableBorderColor}"
>
  <div class="flex w-max items-stretch">
    {#each selectedView.columns as column}
      <div class="border-r w-64 {theme.tableBorderColor}">
        <div
          on:click={() => (inspector = { action: "Column", column: column })}
          class="{inspector.column == column
            ? theme.lightBackgroundColor
            : theme.mediumBackgroundColor} whitespace-nowrap cursor-pointer h-full p-2 space-x-1"
        >
          <span
            class="{column.source.table
              .color} leading-4 px-1 inline-block text-center rounded text-xs"
          >
            <i class={icon[column.aggregation]} />
            <i class={icon[column.type]} />
          </span>

          <span>{column.alias}</span>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex w-max items-stretch">
    <div>
      {#each records as record, j}

        <div class="flex border-b {theme.tableBorderColor}">
          {#each record as cell, i}
            <div
              class="w-64 border-r space-y-1 {theme.tableBorderColor} p-2 {getColumnIndex(
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
                      class="inline-block mr-1 px-2 rounded-xl {selectedView
                        .columns[i].source.table.color} bg-opacity-30"
                    >
                      {item}
                    </div>
                  {/each}
                {:else}
                  <div
                    class="inline-block mr-1 px-2 rounded-xl {selectedView
                      .columns[i].source.table.color} bg-opacity-30"
                  >
                    {cell}
                  </div>
                {/if}
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
<div class="{theme.tableBorderColor} border-t p-2 {theme.darkBackgroundColor}">
	{selectedView.records?.length || 0} Records
</div>