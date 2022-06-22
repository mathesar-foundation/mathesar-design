<script>
  import { createEventDispatcher } from "svelte";
  import { theme } from "$lib/themes";
  import { icon } from "$lib/iconMap";
  import Dropdown from "$lib/Dropdown.svelte";
  import { newView } from "$lib/utils";
  import { typeOptions, conditions } from "$lib/utils";
  import _ from "lodash";

  import Modal from "$lib/Modal.svelte";


  export let table;


  table.filter = {
	  //column: table.columns[0],
	  //condition: conditions[table.columns[0].type][0],
	  //value: ''
  }


  const dispatch = createEventDispatcher();

  let showModal = false;
  const handleToggleModal = () => {
    showModal = !showModal;
  };

  function linkTable() {
    dispatch("linkTable");
  }

  let tableColors=[];

  let tableSources = table.columns?.some(c => c.source)||[];

  if (table.type == "view" && tableSources){
    tableColors = table.columns.map(c => c.source.table.color)||[];
  }

</script>

<div  style="background: linear-gradient(45deg,{tableColors.join(',')})">

<div
  class="text-zinc-800 flex items-center space-x-3 border-b bg-zinc-50 bg-opacity-80  border-zinc-200"
 
>
 
  <Dropdown>
    <button
      slot="toggle"
      class="text-lg px-2 py-3 space-x-1 border-r bg-opacity-10 hover:bg-opacity-80"
     
      >

      <div class="">
      <i class="{icon[table.type]} align-bottom" />
      <span>{table.name}</span>
      <i class="ri-arrow-drop-down-line align-bottom" />
      </div>
      
    </button
    >
    <div slot="menu">
      <div
        class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
      >
        Rename {_.startCase(table.type)}
      </div>
      <div
        class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
      >
        Duplicate {_.startCase(table.type)}
      </div>

      {#if table.type == "table"}
        <div class="border-t border-zinc-200" />
        <div
          class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
        >
          Table Constraints
        </div>
        <div
          class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
        >
          Table Preferences
        </div>
        <div
          on:click={() => dispatch("CreateView", newView(table))}
          class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
        >
          Open in Data Explorer
        </div>
      {/if}

      {#if table.type == "view"}
        <div class="border-t border-zinc-200" />
    
        <div on:click={()=>dispatch('openQuery')}
          class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
        >
        View SQL Query
        </div>

        {#if tableSources}
        <a href="/schema/{table.schemaId}/queries/{table.querieId}"
          class="px-2 block py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"
        >
        Edit Query
      </a>
        {/if}
        
      {/if}
      <div class="border-t border-zinc-200" />
      <div on:click={()=>dispatch('deleteTable')}
        class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 space-x-1 bg-zinc-200 cursor-pointer"
      >
        <i class="ri-delete-bin-line align-bottom" />
        <span>Delete {_.startCase(table.type)}</span>
      </div>
    </div>
  </Dropdown>

  <Dropdown>
    <button slot="toggle" class="border {theme.mediumBorderColor} py-1 px-2 rounded"
      ><i class="ri-filter-fill align-bottom" />
      Filter <i class="ri-arrow-drop-down-line align-bottom" /></button
    >
    <div slot="menu" class="p-2 space-y-2">
      <button
        on:click={() => dispatch("addFilter", table)}
        class="p-1 border-zinc-300 text-sm border w-full rounded"
        ><i class="ri-add-line align-bottom" /> Add Filter</button
      >

      <div class="rounded text-sm space-y-2">

        <Dropdown>
          <div
            slot="toggle"
            class="cursor-pointer bg-zinc-100  border border-zinc-300 p-2 rounded flex items-center"
          >
            <div class="flex-grow space-x-1">
              <i
                class="align-bottom border text-center {icon[
                  table.filter.column.type
                ]} rounded"
              />
              <span>{table.filter.column.name}</span>
            </div>
            <i class="ri-arrow-drop-down-line align-bottom" />
          </div>
          <div slot="menu">
            {#each table.columns as _column}
              <div
                class="hover:bg-opacity-80 bg-opacity-0 cursor-pointer bg-zinc-50 space-x-1 p-2"
                on:click={() => (table.filter.column = _column)}
              >
                <i class="{icon[_column.type]} align-bottom border rounded" />
                <span>{_column.name}</span>
              </div>
            {/each}
          </div>
        </Dropdown>

        <div class="flex items-center space-x-2">
          {#if table.filter.condition}
            <Dropdown>
              <div
                slot="toggle"
                class="cursor-pointer border bg-zinc-100 border-zinc-300 space-x-1 p-2 flex items-center whitespace-nowrap rounded"
              >
                <span>{table.filter.condition}</span>
                <i class="ri-arrow-drop-down-line align-bottom" />
              </div>
              <div slot="menu">
                {#each conditions[table.filter.column.type] as condition}
                  <div
                    class="hover:bg-opacity-80 bg-opacity-0 cursor-pointer bg-zinc-50 space-x-1 p-2"
                    on:click={() => (table.filter.condition = condition)}
                  >
                    <span>{condition}</span>
                  </div>
                {/each}
              </div>
            </Dropdown>
          {/if}
          {#if table.filter.value !== undefined}
            <input
              class="bg-zinc-100 border border-zinc-300 p-2 rounded w-full"
              type="text"
              bind:value={table.filter.value}
            />
          {/if}
        </div>
      </div>
    </div>
  </Dropdown>
  <button class="py-1 px-2 border border-zinc-300 rounded">
    <i class="ri-layout-2-line align-bottom"></i> Group <i class="ri-arrow-drop-down-line align-bottom" />
  </button>
  <button class="py-1 px-2 border border-zinc-300 rounded">
    <i class="ri-arrow-up-down-line align-bottom"></i> Sort <i class="ri-arrow-drop-down-line align-bottom" />
  </button>


</div>
</div>
<!--
<div class="text-zinc-800 flex items-center space-x-3 px-2 border-b border-zinc-200">
	<div class="flex-grow flex items-center space-x-3">
		<Dropdown>
			<button slot="toggle" class="text-xl"
				><i style="color:{table.color}" class="ri-table-fill align-bottom" />
				{table.name} <i class="ri-arrow-drop-down-line align-bottom" /></button
			>
			<div slot="menu">
				<div class="px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer">
					Table Constraints
				</div>
				<div class="px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer">
					Table Preferences
				</div>
				<div class="px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer">
					Delete Table
				</div>
			</div>
		</Dropdown>

		<Filter {table} />
		<button class="border rounded py-1 px-2 border-zinc-200"
			><i class="ri-arrow-up-down-fill align-bottom {theme.primaryTextColor}" /> Sort</button
		>
		<button class="border rounded py-1 px-2 border-zinc-200"
			><i class="ri-layout-row-fill align-bottom {theme.primaryTextColor}" /> Group</button
		>
	</div>

	{#if table.type == 'view'}
		<div class="border-l flex items-center p-2 space-x-2 border-zinc-200">
			<div>Query</div>
			<a
				class="border rounded p-1 w-32 text-center {theme.mediumBorderColor}"
				href="/schema/{table.schema.id}/{table.id}">Edit</a
			>
			<a
				class="border rounded p-1 w-32 text-center {theme.mediumBorderColor}"
				href="/schema/{table.schema.id}/{table.id}">View SQL</a
			>
		</div>
		
	{/if}

	{#if table.type == 'table'}
		<Dropdown>
			<button slot="toggle" class="border rounded py-1 px-2 border-zinc-200"
				><i class="ri-add-line align-bottom" /> New View from Table</button
			>
			<div slot="menu">
				<div
					on:click={() => dispatch('CreateView', newView(table))}
					class="px-2 py-1 p-2 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer"
				>
					<div>All Records</div>
					<div class="text-sm text-zinc-500">
						Create a view with all records from this table
					</div>
				</div>
				<div
					class="px-2 py-1 p-2 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer"
				>
					<div>Filtered Only</div>
					<div class="text-sm text-zinc-500">
						Create a view based on your current filter options
					</div>
				</div>
				<div
					class="px-2 py-1 p-2 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer"
					on:click={() => handleToggleModal()}
				>
					<div>Duplicates Only</div>
					<div class="text-sm text-zinc-500">Create a view containing duplicates only</div>
				</div>
			</div>
		</Dropdown>

		<button on:click={linkTable} class="border rounded py-1 px-2 border-zinc-200"
			><i class="ri-links-fill align-bottom" /> Link Table</button
		>
	{/if}
</div>
-->
<!--

<button
      
      class="menu focus:outline-none focus:shadow-solid text-xl"
    >
        {#if icon }
        <i class="{icon} align-bottom mr-1" style="color:{ iconColor }"></i>
        {/if}

        {#if label }
      { label }
         {/if}
      <i class="ri-arrow-drop-down-line align-bottom"></i>
    </button>-->
