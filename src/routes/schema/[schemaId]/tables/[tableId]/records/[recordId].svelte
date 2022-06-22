<script>
import TopNav from "$lib/TopNav.svelte";
import { page } from '$app/stores';
import { icon } from "$lib/iconMap";
import Table from "../../../Table.svelte";
import Dropdown from "$lib/Dropdown.svelte";
import _ from "lodash";
let { schemaId } = $page.params;
let { tableId } = $page.params;
let { recordId } = $page.params;

import { loadEntities, saveEntities } from '$lib/utils';
import Cell from "../../../Cell.svelte";

let entities;
let record;
let table;
let linkedTables;
let cells;

async function loadData() {

entities = await loadEntities();
table = entities.tables.find(table => table.id == tableId);
record = table.records[recordId];
cells = table.cells[recordId];

linkedTables = entities.tables.filter(t => {
    let valid = false;

    console.log(t.constraints.some(c => c.referenceTable && c.referenceTable.id == table.id))

    if(t.constraints.some(c => c.referenceTable && c.referenceTable.id == table.id)){
        valid = true;
    }

    return valid;
})

if (!entities || !entities.schemas || !entities.tables) {
    return;
}

return entities;


}

function getCellByIdx(_table,_id){
    let recordIdx = _table.records.indexOf(_table.records.find(r => r[0] == _id))
    console.log(recordIdx,"TESTST")
    //cells.find()
    return _table.cells[recordIdx]||[]
}

</script>

<div class="bg-zinc-100 h-full">
{#await loadData()}
	<div>Loading (can be removed)</div>
{:then entities}
    <TopNav schema={table.schema} />
    <div class="border-b p-2 bg-zinc-100 shadow-lg space-x-1">
        <input type="text" class="border p-2" placeholder="Search Records">
        <button class="border p-2">Previous Record</button>
        <button class="border p-2">Next Record</button>
    </div>
    <div class="p-10 bg-white border-2 m-4 space-y-4">

        <div class="space-y-1">
            <h3 class="text-2xl font-semibold">
              
                    {table.summary.map(idx => record[idx]).join(' ')}
              
            </h3>
            <div class="">Record in <a href="/" class="text-indigo-700"><i class="ri-table-line align-bottom"></i> {table.name}</a></div>
        </div>
   
        <div class="space-y-4">
            {#each cells as cell}
                <div class="space-y-1">
                {#if !cell.primary && !cell.link}
                <h4 class="font-semibold">{_.startCase(cell.column.name)}</h4> 

                <div class="border p-2 flex items-center space-x-2">
                    <i class="{icon[cell.column.type]} align-bottom border rounded px-1" /> 
                    {#if !_.isArray(cell.content)}
                    <div><input type="text" class="border-2 rounded p-2 focus:border-indigo-500" bind:value={cell.content}></div>
                    {:else}
                    <div class="flex items-center space-x-2">
                        {#each cell.content as item}
                            <div class="bg-indigo-100 rounded-xl px-2">{item}</div>
                        {/each}
                    </div>
                    {/if}
                </div>
                {/if}

                {#if cell.link}
                    <div class="text-lg font-semibold">{_.startCase(cell.link.column)}</div>
                    <div class="">Record Linked from <a href="/" class="text-indigo-700"><i class="ri-table-line align-bottom"></i> {cell.link.referenceTable.name}</a></div>
                    
                    <div class="border rounded p-2 cursor-pointer hover:border-indigo-500 space-y-2">
                    
                        <div class="px-2 inline-block rounded-xl" style="background-color: {cell.link.referenceTable?.color};">{cell.summary}</div>
                        <!--
                    <div class="border font-semibold">
                    {getCellByIdx(cell.link.referenceTable,cell.content)[0].table.summary.join(' ')}
                    </div>
                    -->
                    <!--
                    {#each getCellByIdx(cell.link.referenceTable,cell.content) as cell,i}
                       
                        
                        
                        {#if cell.link}
                            
                        <div class="bg-indigo-200">
                            {cell.column.name}: {getCellByIdx(cell.link.referenceTable,cell.content)[4].content}
                        </div>
                        {/if}
                        {#if !cell.primary && !cell.link}
                            <div>{_.startCase(cell.column.name)}: {cell.content}</div>
                        {/if}
                    {/each}
                    -->
                  
                    </div>
                {/if}
                </div>
            {/each}
        </div>

       
        <hr>
        
           
            {#each linkedTables as table}

                <div class="flex items-center space-x-4">
                    <div>
                    <h3 class="text-lg font-semibold leading-6">{table.name}</h3>
                    <p>Via Patron Id in <a href="/" class="text-indigo-700"><i class="ri-table-line align-bottom"></i> {table.name}</a></p>
                    </div>
                  
                    <div class="flex items-center space-x-2">
                    <Dropdown>
                        <button class="border py-1 px-2 rounded border-zinc-300" slot="toggle">
                           <span class="flex-grow">Edit Views</span>
                           <!--
                           <i class="ri-arrow-drop-down-line align-bottom" />
                           -->
                        </button>
                        <div slot="menu" class="p-2 space-y-2">
                            <div class="text-sm font-semibold">Queries</div>
                            <div class="py-1 px-2 border border-indigo-200 rounded bg-indigo-100 hover:bg-indigo-200 cursor-pointer whitespace-nowrap">
                                <i class="ri-menu-fill text-indigo-300 align-bottom"></i> <input checked type="checkbox"> <span class="font-semibold">All Records (Default)</span> </div>
                            <div class="py-1 px-2 border bg-zinc-100 rounded hover:bg-indigo-100 cursor-pointer">
                                <i class="ri-menu-fill text-zinc-400 align-bottom"></i> <input type="checkbox"> <span>Recent Checkouts</span></div>
                            <div class="py-1 px-2 border bg-zinc-100 hover:bg-indigo-100 cursor-pointer">
                                <i class="ri-menu-fill text-zinc-400 align-bottom"></i> <input type="checkbox"> <span>Pending Returns</span> </div>
                        </div>
                    </Dropdown>
                    <!--
                    <button class="border py-1 px-2 rounded border-zinc-300">New Query</button>
                    -->
                    </div>
                    <div class="border-l h-8"></div>
                    <button class="border py-1 px-2 rounded border-zinc-300"><i class="ri-add-line align-bottom"></i> Add Record</button>
                </div>

                <div class="flex items-center space-x-2">
                   <h4 class="font-semibold">All Records</h4> 
                   <span class="bg-indigo-100 rounded px-1 text-indigo-500 text-sm">Default</span>
                </div>
                <div class="border">
                <Table bind:table={table}></Table>
                </div>



            {/each}

       
       
    </div>

    

    
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
</div>