<script>
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    import { theme } from "$lib/themes";
    import Column from "./Column.svelte";
    import Cell from "./Cell.svelte";
	
    //export let fixedHeight;
    let columnSelection = {};
    let selectedCell = {};

    let cellSelection = {};
    
    import RecordSelector from "./tables/RecordSelector.svelte";
    export let table; 

    let activeEdit;
    let cells = {};
    

    onMount(()=>{

        console.log(table,"TEST TABLE")
        if(table && table.rows){
            cells = table.rows.cells;
        }
        //cells = createCells(table);
        //activeEdit = cells[1][3];
        //cells[1][3].edit = true;
    })

    function closePanels(){
        activeEdit = {};
        cells = {}
        table = table;
    }

    function selectCell(cell){
        selectedCell = cell;
    }



</script>



<div class="overflow-y-scroll flex-grow  h-full flex flex-col w-full" on:click|self={() => dispatch('closeInspector')}>

    
    {#if table && table.columns}
    <div class="drop-shadow-sm flex border-b border-zinc-200">
        <div class="p-3 w-10 border-r border-zinc-200 shrink-0"></div>
        
        {#each table.columns as column }
            <Column bind:columnSelection={columnSelection} on:selectColumn on:extractToTable on:deleteColumn bind:column={ column } bind:table={ table }/> 
        {/each} 
        
    </div>
    {/if}
    {#if table && table.rows && table.rows.cells}
        {#each Object.keys(cells) as record}
            <div class="flex border-zinc-200">

                <div class="p-3 w-10 border-b border-r border-zinc-200 text-xs text-zinc-500 text-center shrink-0">{record}</div>

                {#each table.rows.cells[record] as cell,j}
                    <Cell bind:selectedCell={selectedCell} bind:columnSelection={columnSelection} on:selectCell={()=>selectCell(cell)} bind:cell={ cell } />
                {/each}
        
            </div>
        {/each}
    {/if}
    
   
       

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
