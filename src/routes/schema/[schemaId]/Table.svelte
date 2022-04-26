<script>
    import { theme } from "$lib/themes";
    import Column from "./Column.svelte";
    import Cell from "./Cell.svelte";

    export let fixedHeight;
    
    export let table; 


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
                    {#each record as cell,i}
                        <Cell cell={ cell } table={ table } column={ table.columns[i] }/>
                    {/each}
                </div>
            {/each}
        {/if}
     
    </div>

</div>

<!--
<div class="overflow-y-scroll h-full flex flex-col">
    <div class="grid drop-shadow-md { theme.tableBorderColor } {theme.mediumBackgroundColor} bg-opacity-30 border-b grid-cols-[40px_repeat({table.columns.length},300px)]" >
        <div class="p-2 border-r {theme.tableBorderColor}"></div>
        {#each table.columns as column }

            <Column column={ column } table={ table }/> 
        {/each} 
    </div>

    

    <div class="border-t {theme.textColor} {theme.tableBorderColor} p-2">
        {#if table.records}
        {table.records.length} Records
        {/if}
    </div>
</div>
-->
