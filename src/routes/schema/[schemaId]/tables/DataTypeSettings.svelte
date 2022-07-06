<script>
  import { icon } from "$lib/iconMap";
  import { dataTypes, isForeignKey } from "$lib/utils.js";
  import Toggle from "$lib/Toggle.svelte";
  import Dropdown from "$lib/Dropdown.svelte";
  import _ from "lodash";
  export let column;
  export let table;
  let showOptions;
</script>


{#if !isForeignKey(table, column)}
  <h4 class="font-semibold text-sm">Data Type</h4>
  <Dropdown full={true} closeOnClick={true}>
    <div
      slot="toggle"
      class="border rounded py-1 px-2 bg-zinc-50 border-zinc-300 cursor-pointer flex items-center space-x-1"
    >
      <span class="flex-grow"
        ><i
          class="{icon[column.type]} align-bottom rounded"
          style="background-color: {table.color}"
        /> <span>{_.startCase(column.type)}</span></span
      >
      <i class="ri-arrow-drop-down-line align-bottom" />
    </div>
    <div slot="menu" class="p-2">
      {#each Object.keys(dataTypes) as type}
        <div class="hover:bg-indigo-100 p-1 rounded cursor-pointer space-x-1">
          <i class="{icon[type]} align-bottom border rounded" />
          <span>{_.startCase(type)}</span>
        </div>
      {/each}
    </div>
  </Dropdown>

  <Toggle
    type="checkbox"
    bind:checked={column.sizeLimit}
    value={"Use Custom Record Summary"}
    let:checked
  >
    <div
      class="rounded-full cursor-pointer mr-1 {checked
        ? 'bg-indigo-400 pl-4'
        : 'bg-zinc-400 pr-4'}"
    >
      <div
        class="h-4 w-4 border-2 {checked
          ? 'border-indigo-500'
          : 'border-zinc-500'} rounded-full bg-white"
      />
    </div>
    <span class="text-sm">Set Size Limit</span>
  </Toggle>

  <Toggle
    type="checkbox"
    bind:checked={column.defaultValue}
    value={"Use Custom Record Summary"}
    let:checked
  >
    <div
      class="rounded-full cursor-pointer mr-1 {checked
        ? 'bg-indigo-400 pl-4'
        : 'bg-zinc-400 pr-4'}"
    >
      <div
        class="h-4 w-4 border-2 {checked
          ? 'border-indigo-500'
          : 'border-zinc-500'} rounded-full bg-white"
      />
    </div>
    <span class="text-sm">Set Default Value</span>
  </Toggle>

  
  <div class="flex items-center  border-t py-2 leading-4">
    <i class="ri-arrow-right-s-line align-bottom"></i>

    <h4 class="font-semibold text-sm">{_.startCase(column.type)} Type Options</h4>
  </div>

  {#if showOptions}
  <div
    class="border border-zinc-300 text-sm rounded grid grid-cols-2 gap-0 overflow-hidden"
  >
    <button class="font-semibold bg-zinc-200 p-1">Database</button>
    <button>Display</button>
  </div>
  {#if column.type == "number"}
    <div class="bg-zinc-50 p-2 space-y-2 border rounded">
      <div class="space-y-1">
        <label class="text-sm" for="">Number Type</label>
        <Dropdown full={true} closeOnClick={true}>
          <div
            slot="toggle"
            class="border bg-white rounded py-1 px-2 bg-zinc-50 border-zinc-300 cursor-pointer flex items-center space-x-1"
          >
            <span class="flex-grow">
              <span>Decimal</span>
            </span>
            <i class="ri-arrow-drop-down-line align-bottom" />
          </div>
          <div slot="menu" class="p-2" />
        </Dropdown>
      </div>

      <div class="space-y-1">
        <label class="text-sm" for="">Decimal Places</label>
        <input type="text" class="border border-zinc-300 rounded p-1 w-full" />
      </div>
    </div>
    
  {/if}
  {#if column.type == "text"}
    <div class="bg-zinc-50 p-2 space-y-2 border rounded">
    </div>
  {/if}
  {/if}
{/if}
