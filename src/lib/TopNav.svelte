<script>
  import { page } from "$app/stores";
  import { icon } from "$lib/iconMap";
  import Breadcrumb from "$lib/Breadcrumb.svelte";
  import { loadEntities } from "$lib/utils";
  import Dropdown from "$lib/Dropdown.svelte";
  import highlightWords from "highlight-words";
  import { v4 as uuidv4 } from "uuid";
  import _ from "lodash";

  let entities;
  let schema;
  let searchTerm;

  const { schemaId } = $page.params;
  const { tableId } = $page.params;

  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema) => schema.id == schemaId);
  }

  function filterByName(schema, searchTerm) {
    let filteredTables = [];
    let tables = [];

    if (schema && schema.tables) {
      tables = _.concat(schema.tables, schema.queries);
      tables = _.orderBy(tables, ['name'], ['desc']);
    }

    if (searchTerm) {
      filteredTables = tables
        .filter((t) => {
          return t.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((t) => {
          return {
            id: t.id,
            type: t.type,
            name: highlightWords({ text: t.name, query: searchTerm }),
          };
        });
    } else {
      filteredTables = tables.slice(0, 5);
    }

    return filteredTables;
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div
    class="flex items-center px-2 bg-white border-zinc-200 space-x-4 "
  >
    <a
      class:flex-grow={!schemaId}
      href="/"
      class="flex items-center space-x-2 text-zinc-900 rounded leading-8 font-semibold"
      ><img src="/logo.svg" alt="" class="h-5" /> <span>Mathesar</span>
    </a>

    {#if schemaId}
      <div class="flex items-center flex-grow">
        <Dropdown>
          <button class="py-1 px-2 border-l border-zinc-300" slot="toggle">
            <i class="ri-add-line align-bottom font-semibold" />
            New 
          </button>

          <input
            type="text"
            class="bg-zinc-100 bg-opacity-40 flex-grow p-1"
            placeholder="Search or Jump To…"
          />
          <div slot="menu" class="overflow-hidden">
            <a
              href="/schema/{schemaId}/queries/{uuidv4()}"
              target="_self"
              class="p-1 cursor-pointer block hover:bg-indigo-100">Query</a
            >
            <a
              href="/schema/{schemaId}/tables/{uuidv4()}"
              target="_self"
              class="p-1 hover:bg-indigo-100 cursor-pointer block">Table</a
            >
          </div>
        </Dropdown>

        <Dropdown closeOnClick={true} full={true}>
          <div
            slot="toggle"
            class="flex items-center flex-grow border-zinc-300 bg-zinc-100 overflow-hidden"
          >
            <i class="ri-search-line align-bottom p-1 text-zinc-500 " />
            <input
              type="text"
              bind:value={searchTerm}
              class="bg-zinc-200 bg-opacity-40 flex-grow p-1"
              placeholder="Search or Jump To…"
            />
          </div>
          <div slot="menu" class="w-80">
            {#if searchTerm}
            <div class="border-b-2 flex items-center p-1 space-x-2 bg-zinc-50">
              <div class="font-semibold ">
                All Results
                {filterByName(schema, searchTerm).length}
              </div>
              <div class=" px-1">
                Tables
                {filterByName(schema, searchTerm).filter(
                  (t) => t.type == "table"
                ).length}
              </div>
              <div class=" px-1">
                Queries {filterByName(schema, searchTerm).filter(
                  (t) => t.type == "query"
                ).length}
              </div>
            </div>
            {:else}
            <div class="p-1 flex items-center">
            <h4 class="text-zinc-700 flex-grow">Recent</h4>
            <a class="text-indigo-800" href="/schema/{schemaId}">View All</a>
            </div>
            {/if}
            {#each filterByName(schema, searchTerm) as table}
              <div class="hover:bg-indigo-100">
                <a
                  target="_self"
                  href="/schema/{schemaId}/{table.type == 'table'
                    ? 'tables'
                    : 'queries'}/{table.id}"
                  class="p-1 block cursor-pointer"
                >
                  <i class="{icon[table.type]} align-bottom" />
                  {#if searchTerm}
                    {#each table.name as chunk}
                      <span
                        class:bg-yellow-100={chunk.match}
                        class:font-semibold={chunk.match}>{chunk.text}</span
                      >
                    {/each}
                  {:else}
                    {table.name}
                  {/if}
                </a>
              </div>
            {/each}
            
          </div>
        </Dropdown>
      </div>
    {/if}
    <div class="justify-end flex items-center ml-auto space-x-2">
      <div class="bg-indigo-500 w-6 h-6 rounded flex items-center">
        <i class="ri-user-line text-white mx-auto" />
      </div>
      <div>
        <i class="ri-settings-line align-bottom" />
      </div>
    </div>
  </div>

  <Breadcrumb {page} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
