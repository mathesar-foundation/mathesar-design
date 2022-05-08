<script>
  import { createEventDispatcher } from "svelte";
  import { page } from "$app/stores";
  import { theme } from "$lib/themes";
  import { v4 as uuidv4 } from "uuid";
  import { icon } from "$lib/iconMap";
  import _ from "lodash";

  export let schema;
  export let expanded;
  const dispatch = createEventDispatcher();

  let types = ["views", "tables", "queries"];

  function getTypes(arr) {
    let types = arr.reduce((acc, curr) => {
      acc[curr] = schema[curr];
      return acc;
    }, {});

    return types;
  }

  function filterByType(type) {
    types = [type];
  }
</script>

<div class="flex shrink-0 bg-zinc-600">
  <div class="bg-indigo-300 bg-opacity-20">
    <div
      class="w-12 h-12 text-zinc-100 cursor-pointer hover:bg-opacity-80 bg-opacity-0 bg-zinc-100 flex"
      on:click={() => (expanded = !expanded)}
    >
      <i class="ri-menu-line text-lg m-auto" />
    </div>
    <div class="w-12 h-12 text-zinc-100 flex">
      <i class="ri-function-line text-lg m-auto" />
    </div>
  </div>

  {#if expanded}
    <div
      class="flex flex-grow flex-col border-r border-zinc-200 bg-white h-full"
    >
      <div class="border flex items-center border rounded overflow-hidden m-2">
        <i class="ri-search-line align-bottom px-1 text-zinc-500" />
        <input
          type="text"
          class="bg-zinc-100 bg-opacity-40 flex-grow p-1 text-sm"
          placeholder="Type to Search"
        />
      </div>

      <div
        class="flex text-sm text-zinc-800 p-2 space-x-4 border-b leading-6 border-zinc-200"
      >
        <button class="font-semibold bg-zinc-50 rounded px-1"
          >All ({schema.tables.length | 0})</button
        >
        {#each Object.keys(getTypes(types)) as type}
          <button on:click={() => filterByType(type)}
            >{_.startCase(type)} ({getTypes(types)[type]?.length | 0})</button
          >
        {/each}
      </div>

      <div>
        {#each Object.keys(getTypes(types)) as type}
          <div class="p-2 border-b flex items-center border-zinc-200">
            <h4 class="text-zinc-800 font-semibold text-sm">
              {_.startCase(type)}
            </h4>
            <a
              href="http://{$page.url.host}/schema/{schema.id}/{type}/{uuidv4()}"
              class="ml-auto bg-zinc-200 px-1 text-center rounded text-zinc-800 text-sm"
              ><i class="ri-add-line align-bottom" /></a
            >
          </div>
          {#if getTypes(types)[type]?.length > 0}
            {#each getTypes(types)[type] as item}
              <a
                href="http://{$page.url
                  .host}/schema/{schema.id}/{type}/{item.id}"
                class="text-zinc-800 p-2 border-b block border-zinc-200 cursor-pointer space-x-1 hover:bg-zinc-200"
              >
                <i class="{icon[item.type]} align-bottom" />
                <span>{item.name}</span>
              </a>
            {/each}
          {:else}
            <div class="text-zinc-500 p-2">No {type}</div> 
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
