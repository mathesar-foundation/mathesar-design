<script>
  import { loadEntities } from "$lib/utils";
  import _ from "lodash";
  export let page;

  let entities;
  let table;
  let schema;

  const { schemaId } = $page.params;
  const { queryId } = $page.params;
  const { tableId } = $page.params;
  const { recordId } = $page.params;
  console.log($page.params, "page.params");

  async function loadData() {
    entities = await loadEntities();

    schema = entities.schemas.find((schema) => schema.id == schemaId);
    table = entities.tables.find((table) => table.id == tableId);
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
{#if schemaId}
  <div
    class="border-b px-2 py-1 flex items-center text-sm space-x-2"
  > 
 
    <div>
      <a href="/schema/{schemaId}" class="text-indigo-600">
        {_.startCase(schema.name)}</a
      >
    </div>
 

    {#if tableId}
      <i class="ri-arrow-right-s-line" />
      <div>
        {table?.name||"New Table"}
      </div>
    {/if}

    {#if recordId}
      <i class="ri-arrow-right-s-line" />
      <div>{recordId}</div>
    {/if}

    {#if table && table.parameters}
      RECORD
    {/if}
  </div>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
