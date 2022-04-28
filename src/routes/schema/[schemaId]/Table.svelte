<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { theme } from "$lib/themes";
    import Column from "./Column.svelte";
    import Cell from "./Cell.svelte";

    export let fixedHeight;
    
    export let table; 

    function showForm(column,cell){
        
    }

</script>

<div class="overflow-y-scroll h-full flex flex-col">

    <div class="drop-shadow-md flex { theme.tableBorderColor } {theme.mediumBackgroundColor} border-b" >
        <div class="p-3 w-10 border-r {theme.tableBorderColor}"></div>
        {#each table.columns as column }
            <Column column={ column } table={ table }/> 
        {/each} 
    </div>

    <div class="flex-grow {fixedHeight?fixedHeight:''}">
        {#if table.records}     
            {#each table.records as record,i }
                <div class="flex border-b { theme.tableBorderColor }">
                    <div class="p-3 {theme.mediumBackgroundColor} bg-opacity-20 w-10 border-r {theme.tableBorderColor} text-xs {theme.mutedTextColor} text-center">{i}</div>
                    {#each record as cell,j}
                        <Cell on:editCell={()=>dispatch('editCell',{table,columnIdx:j,recordIdx:i})} cell={ cell } column={ table.columns[j] }/>
                    {/each}
                </div>
            {/each}
        {/if}
     
    </div>

</div>
