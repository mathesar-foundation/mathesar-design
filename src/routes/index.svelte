<script>
  import TopNav from "$lib/TopNav.svelte";
  import _ from "lodash";
  import { loadEntities } from "$lib/utils";
  import SchemaCard from "./SchemaCard.svelte";

  let entities;

  async function loadData() {
    entities = await loadEntities();

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }

  

  function newSchema() {
    window.location.href = "/schema/new";
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
  <div class="flex h-screen">
    <div class="bg-indigo-700 w-96 p-8 space-y-6 text-white flex flex-col">
      <h2 class="text-3xl font-light">Welcome</h2>
      <!--
      <p>Mathesar makes it possible for anyone to manage a PostgreSQL database without writing a single line of SQL code. </p>
      -->
      <p class="text-lg text-zinc-100 font-light">
        With Mathesar, you can build complex relational databases, define
        queries, and transform your data in any way you need.
      </p>
      <div class="space-y-2 bg-indigo-800 p-6">
        <h3 class="text-lg font-semibold">
          Create your first schema <i
            class="ri-arrow-right-line align-bottom"
          />
        </h3>
        <p class="text-zinc-100">
          You can think of schemas as the containers in which your data is
          stored.
        </p>
        <p>
          They make it easy to organize tables and queries and to keep track of
          table relationships.
        </p>
      </div>
      <p class="text-sm border-l-2 text-zinc-200 pl-4 border-zinc-100">
        <span class="font-semibold">Note:</span> PostgreSQL comes with a pre-installed
        public schema. This schema cannot be deleted. We recommend you define all
        new tables under a new schema.
      </p>
    </div>
    <div class="space-y-4 p-8 flex-grow">
      <div class="">
        <div class="text-xs font-semibold uppercase text-zinc-500">
          Database
        </div>
        <h2 class="text-zinc-800 text-3xl font-light flex-grow">
          <i class="ri-database-2-line align-bottom" /> My Database
        </h2>
      </div>
      <div class="text-lg">Schemas ({entities.schemas.length})</div>
      <div>
        <input
          type="text"
          placeholder="Search Schemas"
          class="border p-2 bg-zinc-50 rounded w-full"
        />
      </div>

      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          on:click={newSchema}
          class="border-2 bg-zinc-100 rounded p-4 space-y-2 flex items-center cursor-pointer border-2 hover:border-indigo-400"
        >
          <div class="mx-auto text-xl text-zinc-600">
            <i class="ri-add-line align-middle" /> New Schema
          </div>
        </div>
        {#each entities.schemas as schema, i}
          <SchemaCard {schema} />
          
        {/each}
      </div>
    </div>
  </div>
{:catch error}
  <div style="color:#FFFFFF">
    <p>{error.message}</p>
    <button on:click={localStorage.clear()}>Reset Storage</button>
  </div>
{/await}
