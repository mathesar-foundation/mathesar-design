<script>
 import { afterUpdate, createEventDispatcher, onMount } from "svelte";
const dispatch = createEventDispatcher();
import Toggle from "$lib/Toggle.svelte";
export let column;
export let table;



let keepColumns;
</script>

<div class="p-2 bg-zinc-300">
    <h3 class="font-semibold text-sm">Selection Actions</h3>
  </div>

<div class="p-2 space-y-2 border-y flex-grow">
    <h4 class="text-sm font-semibold">New Table From Columns</h4>
    <p class="text-sm text-zinc-600">Extract columns into a new table and insert a link to its records.</p>

    <Toggle
      type="checkbox"
      bind:checked={keepColumns}
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
      <span class="text-sm">Keep Extracted Columns</span>
    </Toggle>
    <button
      on:click={()=> dispatch('extractColumns', { table, column })}
      class="border border-zinc-300 p-1 text-sm rounded w-full"
    >
    Extract Columns
    </button>
</div>