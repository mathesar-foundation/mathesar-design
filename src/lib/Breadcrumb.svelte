<script>
  import { loadEntities, getSummary } from "$lib/utils";
  import _ from "lodash";
  import { beforeUpdate } from "svelte";
  export let page;

  let entities;
  let table;
  let schema;
  let record;
  let summary;

  const { schemaId, tableId, recordId } = $page.params;

  console.log($page.params, "page.params");

  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema) => schema.id == schemaId);
    table = entities.tables.find((table) => table.id == tableId);
    if (recordId) {
      record = table.records[recordId];
      summary = getSummary(table, record, recordId);
    }

    return entities;
  }

  beforeUpdate(() => {
    table = table;
    record = record;
  });
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div
    class="border-y border-zinc-300 px-2 py-1 flex items-center text-sm space-x-2 bg-zinc-200"
  >
    <div>My Database</div>
    {#if schemaId}
      <i class="ri-arrow-right-s-line" />
      <div>
        <a href="/schema/{schemaId}" class="text-indigo-600">
          {_.startCase(schema.name)}</a
        >
      </div>
    {/if}

    {#if tableId}
      <i class="ri-arrow-right-s-line" />
      <div>
        <a
          href="/schema/{schemaId}/tables/{table?.id || 'new'}"
          class="text-indigo-600"
        >
          {table?.name || "New Table"}</a
        >
      </div>
    {/if}

    {#if recordId}
      <i class="ri-arrow-right-s-line" />
      <div>{summary || recordId}</div>
    {/if}

    {#if table && table.parameters}
      RECORD
    {/if}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
