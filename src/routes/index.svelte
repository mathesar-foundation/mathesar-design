<script>
  import TopNav from "$lib/TopNav.svelte";
  import _ from "lodash";
  import { loadEntities } from "$lib/utils";

  let entities;

  async function loadData() {
    entities = await loadEntities();

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }

  function goToSchema(schemaId) {
    window.location.href = `/schema/${schemaId}`;
  }
</script>
<div class="bg-yellow-100 fixed bottom-0 p-2 w-screen">
  <a
    href="https://jolly-phoenix-c9377f.netlify.app/?activeSchema=album_collection"
    >For Old Prototype Click Here</a
  >
</div>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div class="space-y-4 p-8 flex-grow">
    <div class="">
        <div class="text-xs font-semibold uppercase text-zinc-500">Database</div>
        <h2 class="text-zinc-800 text-3xl font-light flex-grow"><i class="ri-database-2-line align-bottom"></i> My Database</h2>
    </div>
    <div class="text-lg">Schemas ({entities.schemas.length})</div>
    <div>
      <input
        type="text"
        placeholder="Search Schemas"
        class="border p-2 rounded w-full"
      />
    </div>

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="border-2 bg-zinc-100 rounded p-4 space-y-2 flex items-center">
        <div class="mx-auto text-xl text-zinc-600">
          <i class="ri-add-line align-middle" /> New Schema
        </div>
      </div>
      {#each entities.schemas as schema, i}
        <div
            on:click={()=> goToSchema(schema.id)}
          class="border-2 rounded p-4 space-y-4 hover:bg-indigo-50 cursor-pointer hover:border-indigo-400"
        >
          <div class="flex items-start space-x-2">
            <div
              class="bg-indigo-500 text-white w-10 h-10 leading-10 text-center rounded"
            >
              {_.startCase(schema.name.slice(0, 2))}
            </div>

            <div class="leading-6 flex-grow">
              <div>{_.startCase(schema.name)} {#if schema.isLocked}<i class="ri-lock-fill align-bottom text-zinc-400"></i> {/if}</div>
              <div class="text-zinc-600 text-sm">{schema.description}</div>
            </div>
            <div><i class="ri-delete-bin-line text-zinc-800"></i></div>
          </div>
          <div class="border-t"></div>
          <div class="text-sm flex items-center space-x-2">
            <div>
              <span>{schema.tables?.length || 0}</span> <span>Tables</span>
            </div>
            <div>{schema.queries?.length || 0} Queries</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{:catch error}
  <div style="color:#FFFFFF">
    <p>{error.message}</p>
    <button on:click={localStorage.clear()}>Reset Storage</button>
  </div>
{/await}
