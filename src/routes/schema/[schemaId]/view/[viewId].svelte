<script>
  import { beforeUpdate } from "svelte";
  import { theme } from "$lib/themes";
  import { page } from "$app/stores";

  import TopNav from "../../../TopNav.svelte";

  import { loadEntities, saveEntities } from "$lib/utils";
  const { schemaId } = $page.params;
  const { viewId } = $page.params;

  import Tabs from "../Tabs.svelte";
  import Toolbar from "../Toolbar.svelte";
  import Table from "../Table.svelte";

  import SideBar from "../SideBar.svelte";

  let activeEdit;

  let schema = {};
  let view = {};
  let entities;

  async function loadData() {
    entities = await loadEntities();

    schema = entities.schemas.find((schema) => schema.id == schemaId);
    view = entities.views.find((v) => v.id == viewId);




    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

  function openDataExplorer(view) {
    setTimeout(function () {
      window.location = `/schema/${view.schema.id}/${view.id}`;
    }, 200);
  }

  function showForm(columnIdx, recordIdx) {
    activeEdit = {
      column: view.columns[columnIdx],
	    table: view.columns[columnIdx].source.link.table,
      sourceColumn: view.columns[columnIdx].source.link.column,
      cell: view.records[recordIdx][columnIdx],
      recordIdx,
	    columnIdx,
    };

    console.log(activeEdit,"ACTIVE EDIT")
  }

  function updateCell(e){

	  
	  let sourceTable = entities.tables.find(t => t.id == activeEdit.column.source.link.table.id);
	  let sourceColumn = sourceTable.columns.find(c => c.id == activeEdit.column.source.link.column.id)
	  let columnIdx = sourceTable.columns.indexOf(sourceColumn)
	  let tableIdx = entities.tables.indexOf(sourceTable);


	  //entities.tables[tableIdx].records[activeEdit.recordIdx].splice(columnIdx,1,e.target.value)
	  //view.records[activeEdit.recordIdx].splice(activeEdit.columnIdx,1,e.target.value)
	  //view = view;

	//console.log(e.target.value,editedRecord)
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <TopNav {schema} />
  <div class="w-screen flex {theme.darkPrimaryColor} bg-opacity-10">
    <SideBar
      {schema}
      on:openObject={(e) =>
        (window.location = `/schema/0/${e.detail.type}/${e.detail.id}`)}
    />

    <div
      class="flex overflow-hidden flex-col h-full flex-grow"
      style="height: calc(100vh - 52px);"
    >
      <Tabs />

      <Toolbar on:openView={(e) => openDataExplorer(e.detail)} table={view} />

      {#if activeEdit}
        <div class="p-2">
			{activeEdit.column.source.table.name}
          	{activeEdit.column.name}
			<input class="border rounded p-2" on:keyup={updateCell} type="text" bind:value={activeEdit.cell}>
        </div>
      {/if}

      <Table
        on:editCell={(e) => showForm(e.detail.columnIdx, e.detail.recordIdx)}
        table={view}
      />
    </div>
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
