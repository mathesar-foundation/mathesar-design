<script>
import { afterUpdate, createEventDispatcher, } from "svelte";
const dispatch = createEventDispatcher();
export let table;
export let inspector;

afterUpdate(()=>{
    console.log(inspector,"INSPECTOR")
});

function getLinks(table) {
	return table.constraints.filter(c => c.type == "Foreign Key");
}

</script>



<div class="p-4 border-l w-80 bg-zinc-100 shrink-0 space-y-4">


    {#if inspector.column && inspector.column.length == 1}
        COLUMN

        {inspector.column[0].name}
        <div>Data type</div>
        <div>
            Detect if link
            <div>If not convert to link</div>
                <div>first option is that a new table is created</div>
                <div>second option is that column exist on other table</div>
                <div>third is to create a map</div>
            <div>If link display link info</div>
        </div>
        <div>
            Show constraints
        </div>
        <div>
            <button class="border">Extract to Table</button>
        </div>
    {/if}


    {#if inspector.column && inspector.column.length > 1}
        MULTIPLE COLUMNS ({inspector.column.length})
        <div>
            Shared properties
        </div>
        <div>
            <button on:click={()=> dispatch('extractTable',inspector.column)} class="border">Extract to Table</button>
        </div>
    {/if}





    <!--
    <div class="border-b p-2">
        <h3 class="font-semibold">Table</h3>
    </div>
    <div class="space-y-1">
        <label for="" class="text-sm font-semibold">Table Name</label>
        <input class="p-2 border rounded w-full" type="text" bind:value={table.name}>
    </div>
    <h4 class="font-semibold text-sm">Links</h4>
    <div class="space-y-1">
        {#each getLinks(table) as link}
            <div class="border rounded bg-white p-2">
                {link.column} to {link.referenceTable.name}
            </div>
        {/each}
    </div>
    <h4 class="font-semibold text-sm">Saved Queries</h4>
    <div>
        No Saved Queries
    </div>
    <h4 class="font-semibold text-sm">Views</h4>
    <div>

    </div>
    -->

</div>
