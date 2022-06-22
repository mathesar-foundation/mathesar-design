<script>
  import { beforeUpdate } from "svelte";
  import { page } from "$app/stores";
  import TopNav from "$lib/TopNav.svelte";
  import _ from "lodash";
  import { loadEntities, saveEntities } from "$lib/utils";
  const { schemaId } = $page.params;

  import SideBar from "./SideBar.svelte";

  let entities;
  let schema = {};

  async function loadData() {
    entities = await loadEntities();

    schema = entities.schemas.find((schema) => schema.id == schemaId);
    schema = schema;

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <TopNav {schema} />

  <div class="flex flex-grow bg-zinc-100 bg-opacity-10">
    <SideBar
      expanded={true}
      on:openObject={(e) =>
        (window.location = `/schema/0/${e.detail.type}/${e.detail.id}`)}
      {schema}
    />

    <div class="space-y-4 w-full text-zinc-800">
      <div
        class="flex items-center space-x-2 bg-opacity-10 p-8 bg-indigo-500"
      >
        <div
          class="bg-indigo-500 text-white text-2xl py-2 w-12 text-center rounded"
        >
          {_.startCase(schema.name.slice(0, 2))}
        </div>
        <div>
          <h2 class="text-xl font-semibold">{schema.name}</h2>
          <p class="text-sm text-zinc-500">
            {#if schema.tables}
              {schema.tables?.filter((t) => t.type == "table").length||0} Tables
              {schema.views?.filter((t) => t.type == "view").length||0} Views
            {/if}
          </p>
        </div>
      </div>

      <div class="px-8 space-y-4">
        <div class="border-b py-2">
        <h3 class="text-lg">Recent</h3>
        </div>

        <div class="flex space-x-4">
          {#if schema.tables}
          {#each schema.tables.slice(3) as table}
            <a class="block border-2 space-x-1 p-4 rounded w-64" href="./{schema.id}/tables/{table.id}"
              ><i
                class="ri-table-fill align-bottom"
      
              /> <span>{table.name}</span></a
            >
          {/each}
          {:else}
          <p class=text-zinc-500>No Recent</p>
          {/if}
        </div>

        <div class="border-b py-2">
            <h3 class="text-lg">Activity</h3>
            </div>
        <p class=text-zinc-500>No Activity</p>

        <div class="border-b py-2">
            <h3 class="text-lg">Get Started</h3>
            </div>
        <div>
          <button>Create a Table</button>
          <button>Create a View</button>
        </div>
      </div>
    </div>
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
