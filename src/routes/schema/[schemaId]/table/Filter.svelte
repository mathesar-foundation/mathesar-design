<script>
    import { theme } from "$lib/themes";
    import Dropdown from "$lib/Dropdown.svelte";

    export let table;

    let showFilter = false;
</script>

<Dropdown closeOnClick={ false }>
    <button slot="toggle" class="border rounded py-1 px-2 {theme.tableBorderColor}"><i class="ri-filter-fill align-bottom {theme.primaryTextColor}"></i> Filter</button>
    <div class="p-2 space-y-2" slot="menu">
        <div>Filter</div>
        <button on:click={() => (showFilter = !showFilter)} class="py-1 px-2 rounded {showFilter?'hidden':'block'} {theme.mediumBackgroundColor}">Add New Filter</button>

        {#if showFilter}
        <div class="flex space-x-2">
            <select class="{theme.inputBackgroundColor} p-1 rounded">
                {#each table.columns as column}
                    <option>{column.name}</option>
                {/each}
            </select>

            <select class="{theme.inputBackgroundColor} p-1 rounded">
                <option>equals</option>
                <option>not equals</option>
            </select>

            <input type="text" class="w-28 {theme.inputBackgroundColor} bg-opacity-60 p-1 rounded">

            <button class="{theme.darkPrimaryColor} rounded px-2"><i class="ri-add-line align-bottom"></i></button>
            <button on:click={() => (showFilter = !showFilter)} class="{theme.mediumBackgroundColor} rounded px-2"><i class="ri-close-line align-bottom"></i></button>
        </div>
        {/if}
        
    </div>
</Dropdown>