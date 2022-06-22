<script>
    import Draggable from '$lib/Draggable.svelte';
import Table from '../Table.svelte';

    export let table;
    let position = [100,200];

</script>

<Draggable {position}>
    <div class="bg-white p-4 rounded-lg shadow-lg border w-[64rem] space-y-2">
        <h3 class="text-lg">New Linked Table</h3>
        <div>
            <input class="border p-2 rounded" type="text" bind:value={table.name}>
        </div>
        <div class="flex items-center border">
            {#each table.columns as column}
                <div class="p-2">{column.name}</div>
            {/each}
        </div>
        <div class="border h-80 overflow-y-scroll">
            records
        </div>
    </div>
</Draggable>