<script>
  import { page } from "$app/stores";
  import { icon } from "$lib/iconMap";
  import RecordNavigation from "./RecordNavigation.svelte";
  import { loadEntities, getRecordSummary } from "$lib/utils";
  let { schemaId, tableId, recordId } = $page.params;

  let entities;
  let record;
  let table;
  let cells;

  async function loadData() {
    entities = await loadEntities();
    table = entities.tables.find((table) => table.id == tableId);
    record = table.records[recordId];
    cells = table.rows.cells[recordId];

    console.log(table, record, cells);

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    entities = entities;

    return entities;
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <div class="border-b-2 bg-white flex items-center space-x-3">
    <div class="text-lg px-4 py-4 space-x-1 border-r space-x-2">
      <i class="{icon['record']} align-bottom"></i>
      <span>{getRecordSummary(cells[0])}</span><i
        class="ri-arrow-drop-down-line align-bottom"
      />
    </div>
    <RecordNavigation {cells} {table} />
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
<slot />
