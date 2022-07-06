<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { icon } from "$lib/iconMap";
  import Dropdown from "$lib/Dropdown.svelte";
  import DataType from "./DataType.svelte";
  export let column;
  export let table;
  export let columnSelection;
  let editDataType;

  function setDataType() {
    setTimeout(function () {
      editDataType = !editDataType;
    }, 100);
  }

  function setColumnSelection(column) {
    columnSelection[column.id] = !columnSelection[column.id];
    dispatch("selectColumn", columnSelection);
  }

  function getTableColor(column){
    if(column.source){
      return column.source.color;
    } else {
      return ``;
    }
  }
</script>
<div
  class="border-r space-x-2 bg-zinc-50 flex items-center cursor-pointer whitespace-nowrap p-2 border-zinc-300 text-zinc-800 w-64 shrink-0"
  on:click={() => setColumnSelection(column)}
  class:bg-indigo-200={columnSelection[column.id]}

  
>
  <div
    class="px-1 text-sm rounded text-center"
    style="background-color:{getTableColor(column)}"
  >
    <i class={icon[column.type]} />
    {#if column.aggregation}
      <i class={icon[column.aggregation]} />
    {/if}
  </div>

  <div class="w-full overflow-hidden" class:font-semibold={columnSelection[column.id]}>{column?.alias || column.name}</div>
  <Dropdown full={true} closeOnClick={false}>
    <div class="cursor-pointer space-x-2 flex items-center" slot="toggle">
      <i class="ri-arrow-drop-down-line align-bottom border rounded px-1" class:border-indigo-300={columnSelection[column.id]} />
    </div>

    <div slot="menu" class="text-sm py-2">
      {#if editDataType}
        <DataType bind:column on:save={setDataType} />
      {:else}
        <div class="space-y-2">
          <div class="border-b space-y-2 px-2 pb-2 border-zinc-200">
            <div class="text-zinc-500 text-xs">Data Type</div>

            <div
              class="space-x-2 w-full cursor-pointer flex items-center"
              on:click={setDataType}
            >
              <i
                class="rounded border align-bottom {icon[column.type]}"
                style="background-color: {getTableColor(column)};"
              />
              <span class="capitalize">{column.type}</span>
              <span
                class="text-sm align-bottom font-mono bg-zinc-200 px-1 rounded text-zinc-500"
                >{column.db}</span
              >
              <div class="flex-grow" />
              <i class="ri-arrow-right-s-line align-bottom" />
            </div>

            {#if column.source}
              <div class="space-y-1 grid">
                <h4 class="text-zinc-500 text-xs">Source</h4>
                <!--
							<div class="border border-zinc-200 rounded p-2 space-y-2">
								<div class="grid grid-cols-3">
									<div class="col-span-1">Column</div>

									<div class="col-span-2">
										<i class="{icon[column.type]} align-bottom" />{column.name}
									</div>
								</div>

								<div class="grid grid-cols-3">
									<div class="col-span-1">Table</div>
									<div class="col-span-2">
										<i class="ri-table-line align-bottom" />
										{column.source.table.name}
									</div>
								</div>

								<div class="grid grid-cols-3">
									<div class="col-span-1">Link</div>
									<div class="col-span-2">
										<span
											><i class="ri-table-line align-bottom" />
											{column.source.link.table.name}</span
										>
										<span
											><i class="ri-key-line align-bottom" /> {column.source.link.column.name}</span
										>
									</div>
								</div>
							</div>
							-->
              </div>
            {:else if table.type == "view"}
              <div class="border rounded p-2">
                This view's source cannot be located. Some features may be
                limited.
              </div>
            {/if}
          </div>

          <div class="text-zinc-500 text-xs mb-1 px-2">Operations</div>

          {#if table.type == "table"}
            <div
              class="px-2 py-1 hover:bg-zinc-100 cursor-pointer"
              on:click={() => dispatch("extractToTable", column)}
            >
              <i class="ri-bring-forward align-bottom" /> Extract to Table
            </div>
          {/if}

          <div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer">
            <i class="ri-sort-asc align-bottom" /> Sort Ascending
          </div>
          <div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer">
            <i class="ri-sort-desc align-bottom" /> Sort Descending
          </div>
          <div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer">
            <i class="ri-layout-row-fill align-bottom" /> Group by Column
          </div>
          {#if table.type == "table"}
            <div
              class="px-2 py-1 hover:bg-zinc-100 cursor-pointer"
              on:click={() => dispatch("deleteColumn", column)}
            >
              <i class="ri-delete-bin-line align-bottom" /> Delete Column
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </Dropdown>
</div>

<!--
    style="background-color: {$colorsStore[column.source.tableId].hex.value};"
-->
