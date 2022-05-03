<script>
  import { page } from "$app/stores";
  import { theme } from "$lib/themes";
  import Dropdown from "$lib/Dropdown.svelte";
  import { v4 as uuidv4 } from "uuid";
  import _ from "lodash";

  export let schema;
</script>

<div
  class="p-2 flex space-x-3 items-center border-b {theme.backgroundColor} {theme.tableBorderColor}"
>
  <a
    href="/"
    class="block {theme.mediumBackgroundColor} text-sm {theme.textColor} rounded px-1 text-opacity-40 border {theme.lightBorderColor}"
    >Prototype</a
  >

  <div class="flex items-center mr-2 space-x-3">
    <div
      class="border {theme.textColor} {theme.tableBorderColor} rounded flex items-center space-x-1 p-1 text-sm"
    >
      {#if $page.params.schemaId}
        

        <span><i class="ri-database-2-line align-bottom"></i> My Database</span>
        <span class={theme.mutedTextColor}>/</span>
        <div
          class="{theme.primaryColor} {theme.inverseTextColor} text-sm px-1 text-center rounded"
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
        <a href="/schema/{ schema.id }/{uuidv4()}" class="border {theme.tableBorderColor} py-1 px-2 rounded {theme.textColor}">Data Explorer</a>
        {/if}
        -->

   
  </div>
  <Dropdown>
    <button class="border text-sm p-1 rounded {theme.tableBorderColor}" slot="toggle">
        New <i class="ri-add-line align-bottom"></i>
    </button>
    <div slot="menu">
        <div class="p-2 cursor-pointer">Query</div>
        <div class="p-2 cursor-pointer">Table</div>
    </div>
  </Dropdown>
  
  <input
  type="text"
  class="py-1 px-2 border flex-grow text-sm {theme.inputBackgroundColor} rounded {theme.lightBorderColor}"
  placeholder="Search or Jump To…"
/>
  <div
    on:click={localStorage.clear()}
    class="cursor-pointer {theme.mutedTextColor}"
  >
    Reset
  </div>
</div>
