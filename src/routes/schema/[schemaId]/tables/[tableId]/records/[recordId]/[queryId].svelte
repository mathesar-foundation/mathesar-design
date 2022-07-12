<script>
  import { afterUpdate, beforeUpdate } from "svelte";
  import SideBar from "../../../../SideBar.svelte";
  import _ from "lodash"

  import { page } from "$app/stores";
  import Editor from "../../../../Editor.svelte";

  let { schemaId, tableId, recordId, queryId } = $page.params;
  let entities;
  let schema;
  let query;
  let editMode;
  let viewCount;
  let runQuery;

  import { loadEntities, saveEntities } from "$lib/utils";

  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema) => schema.id == schemaId);
    query = entities.queries.find((query) => query.id == queryId);



    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    entities = entities;

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

  function closeQuery() {
    //let queryIdx = entities.queries.findIndex((query) => query.id == queryId);



    //entities.queries = entities.queries.splice(0,queryIdx, entities.queries[queryIdx]);



    entities = entities;

    saveEntities(entities);

    console.log(entities)

    setTimeout(() => {
      window.location = `/schema/${schemaId}/tables/${tableId}/records/${recordId}`;
    }, 400);
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div class="w-screen flex bg-zinc-100 bg-opacity-10">
    <SideBar
      {schema}
      on:openObject={(e) =>
        (window.location = `/schema/0/${e.detail.type}/${e.detail.id}`)}
    />
    <div
      class="flex overflow-hidden flex-col h-full flex-grow"
      style="height: calc(100vh - 76px);"
    >
      <div class="border-b-2 border-zinc-300 p-2 flex items-center space-x-4">
        <div class="flex-grow text-xl"><i class="ri-file-search-fill align-bottom"></i> New Embedded Query</div>
        <div>
        <button class="border p-2 rounded text-sm" on:click={closeQuery}>Save</button>
        <button class="border p-2 rounded text-sm" on:click={closeQuery}>Go Back to Record</button>
        </div>
      </div>

      <Editor {schema} bind:query={query} />
    </div>
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
