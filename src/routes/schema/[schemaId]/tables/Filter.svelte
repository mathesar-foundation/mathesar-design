<script>
    import { theme } from "$lib/themes";
    import Dropdown from "$lib/Dropdown.svelte";

    export let table;

    let showFilter = false;
</script>

<Dropdown closeOnClick={ false }>
    <button slot="toggle" class="border rounded py-1 px-2 border-zinc-200"><i class="ri-filter-fill align-bottom {theme.primaryTextColor}"></i> Filter</button>
    <div class="p-2 space-y-2" slot="menu">
        <div>Filter</div>
        <button on:click={() => (showFilter = !showFilter)} class="py-1 px-2 rounded {showFilter?'hidden':'block'} bg-zinc-200">Add New Filter</button>

        {#if showFilter}
        <div class="flex space-x-2">
            <select class="bg-zinc-100 p-1 rounded">
                {#each table.columns as column}
                    <option>{column.name}</option>
                {/each}
            </select>

            <select class="bg-zinc-100 p-1 rounded">
                <option>equals</option>
                <option>not equals</option>
            </select>

            <input type="text" class="w-28 bg-zinc-100 bg-opacity-60 p-1 rounded">

            <button class="bg-zinc-100 rounded px-2"><i class="ri-add-line align-bottom"></i></button>
            <button on:click={() => (showFilter = !showFilter)} class="bg-zinc-200 rounded px-2"><i class="ri-close-line align-bottom"></i></button>
        </div>
        {/if}
        
    </div>
</Dropdown>