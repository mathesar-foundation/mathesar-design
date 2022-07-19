<script>
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  import { icon } from "$lib/iconMap";
  import Toggle from "$lib/Toggle.svelte";
  import Dropdown from "$lib/Dropdown.svelte";
  import { dataTypes, isForeignKey, getLinkedTable, linksToTable, getForeignKeyColumn, getTableQueries } from "$lib/utils.js";
  import DataTypeSettings from "./DataTypeSettings.svelte";
  import SelectionActions from "./SelectionActions.svelte";
  import _ from "lodash";
  import Cell from "../Cell.svelte";
  
  export let table;
  export let inspector;

  let summaryTerm;
  let summaryInput;
  let key;
  let keyCode;
  let isCustomSummary = false;
  let selectedCheckbox = [];
  let selectedRadio;
  let keepColumns;

  onMount(() => {
    //inspector.column = [table.columns[2],table.columns[3]];
  });

  afterUpdate(() => {
    console.log(inspector, "INSPECTOR");
  });

  function getLinks(table) {
    return table.constraints.filter((c) => c.type == "Foreign Key");
  }

  function getSummaryColumnByName(table, name) {
    return table.columns.find((c) => c.name == name);
  }

  function handleKeyDown(event) {
    console.log(event, "e");

    key = event.key;
    keyCode = event.keyCode;

    if (keyCode == 32) {
      addTextToSummary(summaryTerm);
      summaryTerm = null;
    }
  }

  function addTextToSummary(term) {
    table.summary.push({
      text: term,
    });
    table = table;
  }

  function addColumnToSummary(column) {
    table.summary.push({
      columnName: column.name,
    });
    summaryTerm = null;
    table = table;
  }

  function filterColumnsByTerm(columns, term) {
    return columns.filter((c) =>
      _.lowerCase(c.name).includes(_.lowerCase(term))
    );
  }

  let columnActions = [
    //"Extract Columns to New Table",
    //"Delete Columns",
    //"Change Columns Data Type"
    //"Create Map",
    //"Remove Duplicates",
    //"Split Column",
    //"Merge Columns",
    //"Calculate and Replace",
    //"Calculate New Column",
  ];

  function getTableLinks(table) {
    let schemaTables = table.schema.tables

    let links = schemaTables.filter(t => {
      return linksToTable(table,t)
    });

    if (links.length == 0) {
      return null;
    } else {
      return links;
    }
  }

</script>

<div class="border-l w-80 bg-zinc-100 shrink-0 flex flex-col">
  {#if !inspector.column}
    <div class="border-b p-2 bg-zinc-300">
      <h3 class="font-semibold text-sm">Table Properties</h3>
    </div>
    <div class="space-y-1 border-b p-2">
      <label for="" class="text-sm">Table Name</label>
      <input
        class="p-1 border rounded w-full"
        type="text"
        bind:value={table.name}
      />
    </div>

    <div>

      <div class="p-2">
        <h4 class="font-semibold text-sm">Display Options</h4>
      </div>

      <div class="space-y-2 p-2">
        <Toggle
          type="checkbox"
          bind:checked={isCustomSummary}
          value={"Use Custom Record Summary"}
          let:checked
        >
          <div
            class="rounded-full cursor-pointer mr-1 {checked
              ? 'bg-indigo-400 pl-4'
              : 'bg-zinc-400 pr-4'}"
          >
            <div
              class="h-4 w-4 border-2 {checked
                ? 'border-indigo-500'
                : 'border-zinc-500'} rounded-full bg-white"
            />
          </div>
          <span class="text-sm">Use Custom Record Summary</span>
        </Toggle>
      

      

      {#if isCustomSummary}
        <div class="space-y-1 relative border p-1 rounded bg-zinc-50">
          <label for="" class="text-sm">Summary Expression</label>
          <div
            class="p-1 border rounded bg-white flex items-center w-full space-x-1"
          >
            {#each table.summary as summary}
              {#if summary.text}<span>{summary.text}</span>{/if}
              {#if summary.columnName}
                <span
                  class=" px-2 rounded-full whitespace-nowrap"
                  style="background-color:{table.color}"
                  >{getSummaryColumnByName(table, summary.columnName)
                    .name}</span
                >
              {/if}
            {/each}
            <input
              on:click={() => (summaryTerm = " ")}
              bind:this={summaryInput}
              on:keydown={handleKeyDown}
              class="w-full"
              type="text"
              bind:value={summaryTerm}
            />
          </div>

          {#if summaryTerm}
            <div
              class="bg-white rounded border p-2 absolute w-full shadow-md space-y-1"
            >
              {#each filterColumnsByTerm(table.columns, summaryTerm) as column}
                <div
                  class="space-x-2 hover:bg-indigo-50 cursor-pointer rounded p-1"
                  on:click={addColumnToSummary(column)}
                >
                  <i
                    class="{icon[column.type]} align-bottom border rounded"
                    style="background-color: {table.color};"
                  />
                  {column.name}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    </div>
    </div>


    <div class="">
      <div class="border-t p-2 flex items-center">
        <i class="ri-arrow-right-s-line align-bottom"></i>
        <h4 class="font-semibold text-sm">Links to Table ({getTableLinks(table)?.length||0})</h4>
      </div>
      <div class="border-t p-2 space-y-2">
        {#if getTableLinks(table)}
        {#each getTableLinks(table) as linkTable}
          <!--
          <div class="bg-white border p-2 rounded text-sm">
            <span class="font-semibold space-x-1"><i class="ri-table-line align-bottom"></i><span>{linkTable.name}</span></span>
            <span>via</span>  
            <span>{getForeignKeyColumn(linkTable,table).column}</span>
          </div>
          -->
  
          <div class="">
            <div
              class="w-max px-2 rounded-t-lg text-sm bg-zinc-300"
              
            >
              <i class="ri-table-line text-xs align-text-bottom" />
              {linkTable.name}
            </div>
            <div
              class="p-1 rounded-b-lg rounded-r-lg bg-zinc-300"
              
            >
              <div
                class="bg-zinc-50 w-full rounded p-1 space-x-1 "
              >
              <span class="text-sm text-zinc-600">FK</span>
                <i class="ri-key-line align-bottom rounded p-1" style="background-color: {linkTable.color};" />
                {getForeignKeyColumn(linkTable,table).column}
              </div>
            </div>
          </div>
     
        {/each}
        {:else}
        <span class="text-sm text-zinc-600">No Links</span> 
  
        {/if}
  
        <button class="border p-1 border-zinc-300 rounded text-sm w-full">Add Link</button>
      </div>
    </div>
  
    <div class="">
      <div class="border-t p-2 flex items-center">
        <i class="ri-arrow-right-s-line align-bottom"></i>
        <h4 class="font-semibold text-sm">Queries ({getTableQueries(table)?.length||0})</h4>
      </div>
      <div class="border-t p-2 space-y-2">
        {#if getTableQueries(table)}
        {#each getTableQueries(table) as query}
          <div class="bg-white border p-1 text-sm">
            {query.name}
          </div>
        {/each}
        {:else}
        <span class="text-sm text-zinc-600">No Queries</span> 
        <button class="border p-1 border-zinc-300 rounded text-sm w-full"><i class="ri-add-line align-bottom"></i> New Query</button>
        {/if}
      </div>
    </div>
  {/if}

 

  {#if inspector.column && inspector.column.length > 1}

    <div class="border-b p-2 bg-zinc-300 flex items-center">
      <h3 class="font-semibold text-sm flex-grow">Columns ({inspector.column.length})</h3>
      <button class="border border-zinc-400 rounded px-1 text-zinc-600"><i class="ri-close-line align-bottom"></i></button>
    </div>

    <!--
    <div class="p-2 space-y-2">
      <h4 class="font-semibold text-sm">Data Type</h4>
      <div class="bg-white border border-zinc-300 p-1 rounded bg-zinc-50 text-zinc-600">Multiple</div>
    </div>
    -->

    <SelectionActions on:extractColumns {table} column={inspector.column}/>

    
    


    

    
  {/if}

  {#if inspector.column && inspector.column.length == 1}
    <div class="border-b p-2 bg-zinc-300">
      <h3 class="font-semibold text-sm">Column</h3>
    </div>

    <div class="space-y-1 border-b p-2 ">
      <label for="" class="text-sm">Column Name</label>
      <input
        class="p-1 border border-zinc-300 rounded w-full"
        type="text"
        bind:value={inspector.column[0].name}
      />
    </div>

    <div class="space-y-1 border-b p-2 ">
      <Toggle
        type="checkbox"
        bind:checked={inspector.column.allowDuplicates}
        value={"Use Custom Record Summary"}
        let:checked
      >
        <div
          class="rounded-full cursor-pointer mr-1 {checked
            ? 'bg-indigo-400 pl-4'
            : 'bg-zinc-400 pr-4'}"
        >
          <div
            class="h-4 w-4 border-2 {checked
              ? 'border-indigo-500'
              : 'border-zinc-500'} rounded-full bg-white"
          />
        </div>
        <span class="text-sm">Allow Duplicates</span>
      </Toggle>
      <Toggle
        type="checkbox"
        bind:checked={inspector.column.allowNull}
        value={"Use Custom Record Summary"}
        let:checked
      >
        <div
          class="rounded-full cursor-pointer mr-1 {checked
            ? 'bg-indigo-400 pl-4'
            : 'bg-zinc-400 pr-4'}"
        >
          <div
            class="h-4 w-4 border-2 {checked
              ? 'border-indigo-500'
              : 'border-zinc-500'} rounded-full bg-white"
          />
        </div>
        <span class="text-sm">Allow Null</span>
      </Toggle>
    </div>

    {#if isForeignKey(table, inspector.column[0])}
      <div class="space-y-2 border-b p-2 ">
        <h4 class="font-semibold text-sm">Link Properties</h4>

        
          <div class="flex items-center">
            <div class="w-2 border-zinc-300 h-16 border-l-2 border-y-2 rounded-l"></div>
            <div class="flex-grow space-y-1">
            <div class="">
              <div
                class="w-max px-2 rounded-t-lg text-sm bg-zinc-300"
                
              >
                <i class="ri-table-line text-xs align-text-bottom" />
                {table.name}
              </div>
              <div
                class="p-1 rounded-b-lg rounded-r-lg bg-zinc-300"
                
              >
                <div
                  class="bg-zinc-50 w-full rounded p-1 space-x-1 "
                >
                <span class="text-sm text-zinc-600">FK</span>
                  <i class="ri-key-line align-bottom rounded p-1" style="background-color: {table.color};" />
                  {inspector.column[0].name} 
                </div>
              </div>
            </div>
            <div class="">
              <div
                class="p-1 rounded-t-lg rounded-r-lg bg-zinc-300"
                
              >
                <div
                  class="bg-zinc-50 w-full rounded p-1 space-x-1"
                  
                >
                <span class="text-sm text-zinc-600">PK</span>
                  <i class="ri-key-line align-bottom rounded p-1" style="background-color: {getLinkedTable(table, inspector.column[0]).color};"/> id
                </div>
              </div>
              <div
                class="w-max px-2 rounded-b-lg text-sm bg-zinc-300"
               
              >
                <i class="ri-table-line text-xs align-text-bottom"/>
                {getLinkedTable(table, inspector.column[0]).name}
              </div>
            </div>
            </div>
          </div>
        

        <button class="border p-1 rounded text-sm border-zinc-300 w-full"
          ><i class="ri-delete-bin-line align-bottom" /> Remove Link</button
        >
      </div>
    {/if}

    <div class="space-y-2 flex-grow p-2">
      <DataTypeSettings {table} column={inspector.column[0]} />
    </div>
      <SelectionActions {table} column={inspector.column[0]}/>
    

    
  {/if}


</div>
