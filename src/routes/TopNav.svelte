<script>
  import { page } from "$app/stores";
  import { theme } from "$lib/themes";
  import Dropdown from "$lib/Dropdown.svelte";
  import { v4 as uuidv4 } from "uuid";
  import _ from "lodash";

  export let schema;
</script>

<div
  class="p-2 flex space-x-3 items-center border-b bg-white border-zinc-200"
>
  <a
    href="/"
    class="block bg-zinc-200 text-sm text-zinc-800 rounded px-1 text-opacity-40 border border-zinc-300"
    >Prototype</a
  >

  <div class="flex items-center mr-2 space-x-3">
    <div
      class="border text-zinc-800 border-zinc-200 rounded flex items-center space-x-1 p-1 text-sm"
    >
      {#if $page.params.schemaId}
        

        <span><i class="ri-database-2-line align-bottom"></i> My Database</span>
        <span class=text-zinc-500>/</span>
        <div
          class="bg-orange-500 text-white text-sm px-1 text-center rounded"
        >
          {_.startCase(schema.name.slice(0, 2))}
        </div>
        <a href="/schema/{schema.id}" class="font-semibold"
          >{schema.name}</a
        >
      {:else}
        <span><i class="ri-database-2-line align-bottom"></i> My Database</span>
      {/if}
      <button class="border-l w-6 text-center">
        <i class="ri-settings-line align-bottom" />
      </button>
    </div>

    <!--
        {#if $page.params.schemaId}
        <a href="/schema/{ schema.id }/{uuidv4()}" class="border border-zinc-200 py-1 px-2 rounded text-zinc-800">Data Explorer</a>
        {/if}
        -->

   
  </div>
  <Dropdown>
    <button class="border text-sm p-1 rounded border-zinc-200" slot="toggle">
        New <i class="ri-add-line align-bottom"></i>
    </button>
    <div slot="menu">
        <div class="p-2 cursor-pointer">Query</div>
        <div class="p-2 cursor-pointer">Table</div>
    </div>
  </Dropdown>
  
  <input
  type="text"
  class="py-1 px-2 border flex-grow text-sm bg-zinc-100 rounded border-zinc-300"
  placeholder="Search or Jump To…"
/>
  <div
    on:click={localStorage.clear()}
    class="cursor-pointer text-zinc-500"
  >
    Reset
  </div>
</div>
