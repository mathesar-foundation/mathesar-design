<script>
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    import { theme } from "$lib/themes";
    import Column from "./Column.svelte";
    import Cell from "./Cell.svelte";
	
    //export let fixedHeight;
    let columnSelection = {};
    
    import RecordSelector from "./tables/RecordSelector.svelte";
    export let table; 

    let activeEdit;
    let cells = {};
    

    onMount(()=>{
        cells = table.rows.cells;
        //cells = createCells(table);
        //activeEdit = cells[1][3];
        //cells[1][3].edit = true;
    })


    function editCell(cell,record){
        let cellIdx = cells[record].indexOf(cell);
        cells = table.rows.cells

        //cells[record][cellIdx].edit = true;
        if(cell.link){
            activeEdit = cells[record][cellIdx];
        }
    }

    function closePanels(){
        activeEdit = {};
        cells = {}
        table = table;
    }

</script>



<div class="overflow-y-scroll h-full flex flex-col w-full bg-zinc-50" >

    

    <div class="drop-shadow-sm flex border-b border-zinc-200">
        <div class="p-3 w-10 border-r border-zinc-200 shrink-0"></div>
        {#if table && table.columns}
        {#each table.columns as column }
            <Column bind:columnSelection={columnSelection} on:selectColumn on:extractToTable on:deleteColumn bind:column={ column } bind:table={ table }/> 
        {/each} 
        {/if}
    </div>

    {#each Object.keys(cells) as record}
        <div class="flex border-zinc-200">

            <div class="p-3 w-10 border-b border-r border-zinc-200 text-xs text-zinc-500 text-center shrink-0">{record}</div>

            {#each table.rows.cells[record] as cell,j}
                <Cell bind:columnSelection={columnSelection} on:editCell={(e)=>editCell(e.detail,record)} bind:cell={ cell } />
            {/each}
    
        </div>
    {/each}
    
   
       

    <!--

         {#if activeEdit}
        <RecordSelector bind:record={activeEdit}/>
    {/if}

    <div class="flex-grow {fixedHeight?fixedHeight:''}">
        {#if table.records}     
            {#each table.records as record,i }
                <div class="flex border-zinc-200">
                    <div class="p-3 bg-white w-10 border-r border-zinc-200 text-xs text-zinc-500 text-center shrink-0">{i}</div>

         
               
                    {#each cells[i] as cell,j}
                        <Cell on:editCell={(e)=>editCell(e.detail,record)} bind:cell={ cell } column={ table.columns[j] }/>
                    {/each}
              
                </div>
            {/each}
        {/if}
     
    </div>

    -->

</div>
