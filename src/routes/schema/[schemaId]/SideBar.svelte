<script>
  import { createEventDispatcher } from "svelte";
  import { page } from "$app/stores";
  import { theme } from "$lib/themes";
  import { v4 as uuidv4 } from "uuid";
  import { icon } from "$lib/iconMap";

  export let schema;
  export let expanded;

  const dispatch = createEventDispatcher();

  function addNew() {
    dispatch("addNew", {
      type: "view",
    });
  }
</script>

<div class="flex shrink-0">
  <div class="{theme.mediumBackgroundColor} bg-opacity-30">
    <div
      class="w-12 h-12 {theme.textColor} cursor-pointer hover:bg-opacity-80 bg-opacity-0 {theme.darkPrimaryColor} flex"
      on:click={() => (expanded = !expanded)}
    >
      <i class="ri-menu-line text-lg m-auto" />
    </div>
    <div class="w-12 h-12 {theme.textColor} flex">
      <i class="ri-function-line text-lg m-auto" />
    </div>
  </div>

  {#if expanded}
    <div
      class="flex flex-grow flex-col border-r {theme.tableBorderColor} h-full bg-opacity-10"
    >
      <input
        type="text"
        class="{theme.inputBackgroundColor} bg-opacity-40 p-2"
        placeholder="Type to Search"
      />

      <div>
        <div
          class="flex text-sm {theme.textColor} p-2 space-x-4 border-b leading-6 {theme.tableBorderColor}"
        >
          <button class="font-semibold {theme.lightBackgroundColor} rounded px-1">All ({schema.tables.length|0})</button>
          <button>Queries ({schema.queries?.length|0})</button>
          <button>Views ({schema.views?.length|0})</button>
          <button>Tables ({schema.tables?.length|0})</button>
          
        </div>

        <div>
          <div class="p-2 border-b flex items-center {theme.tableBorderColor}">
            <h4 class="{theme.textColor} font-semibold text-sm">Queries</h4>
            <a
              href="http://{$page.url.host}/schema/{schema.id}/{uuidv4()}"
              class="ml-auto {theme.mediumBackgroundColor} px-1 text-center rounded {theme.textColor} text-sm"
              ><i class="ri-add-line align-bottom" /></a
            >
          </div>
          {#if schema.queries}
          {#each schema.queries as table, i}
            <a href="http://{$page.url.host}/schema/{schema.id}/{table.id}"
              class="{theme.textColor} p-2 border-b block {theme.tableBorderColor} cursor-pointer space-x-1"
              
            >
              <i class="{icon[table.type]} align-bottom" />
              <span>{table.name}</span>
          </a>
          {/each}
          {:else}
          <div class="p-2 {theme.mutedTextColor} text-sm">You have no queries</div>
          {/if}
        </div>

        <div>
          <div class="p-2 border-b flex items-center {theme.tableBorderColor}">
            <h4 class="{theme.textColor} font-semibold text-sm">Views</h4>
            <a
              href="http://{$page.url.host}/schema/{schema.id}/{uuidv4()}"
              class="ml-auto {theme.mediumBackgroundColor} px-1 text-center rounded {theme.textColor} text-sm"
              ><i class="ri-add-line align-bottom" /></a
            >
          </div>
          {#if schema.views}
          {#each schema.views as table, i}
            <div
              class="{theme.textColor} p-2 border-b {theme.tableBorderColor} cursor-pointer space-x-1"
              on:click={() => dispatch("openObject", table)}
            >
              <i class="{icon[table.type]} align-bottom" />
              <span>{table.name}</span>
            </div>
          {/each}
          {:else}
            <div class="p-2 {theme.mutedTextColor} text-sm">You have no views</div>
          {/if}

        </div>

        <div>
          <div class="p-2 border-b flex items-center {theme.tableBorderColor}">
            <h4 class="{theme.textColor} font-semibold text-sm">Tables</h4>
            <a
              href="http://{$page.url.host}/schema/{schema.id}/{uuidv4()}"
              class="ml-auto {theme.mediumBackgroundColor} px-1 text-center rounded {theme.textColor} text-sm"
              ><i class="ri-add-line align-bottom" /></a
            >
          </div>
          {#each schema.tables as table, i}
            <div
              class="{theme.textColor} p-2 border-b {theme.tableBorderColor} cursor-pointer space-x-1"
              on:click={() => dispatch("openObject", table)}
            >
              <i class="{icon[table.type]} align-bottom" />
              <span>{table.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
