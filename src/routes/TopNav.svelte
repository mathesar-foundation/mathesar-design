<script>
    import { page } from "$app/stores";
    import { theme } from "$lib/themes";
    import { v4 as uuidv4 } from 'uuid';
    import _ from "lodash";

    export let schema;

</script>

<div class="p-2 flex space-x-3 items-center border-b {theme.backgroundColor} {theme.tableBorderColor}">

    <a href="/" class="block {theme.mediumBackgroundColor} text-sm {theme.textColor} rounded px-1 text-opacity-40 border {theme.lightBorderColor}">Prototype</a>

    <div class="flex items-center mr-2 rounded space-x-3">

        {#if $page.params.schemaId}
       
            <div class="border {theme.textColor} {theme.tableBorderColor} rounded flex items-center space-x-1 p-1 text-sm">
                <div class="{theme.primaryColor} {theme.inverseTextColor} text-sm px-1 text-center rounded">{_.startCase(schema.name.slice(0,2))}</div>
                <span>database</span>
                <span class="{theme.mutedTextColor}">/</span>
                <a href="/schema/{ schema.id }"  class="font-semibold"><i class="ri-share-line align-bottom"></i> {schema.name}</a>
            </div>
            <a href="/schema/{ schema.id }/{uuidv4()}" class="border {theme.tableBorderColor} py-1 px-2 rounded {theme.textColor}">Data Explorer</a>
        {:else}

            <div class="{theme.primaryColor} {theme.inverseTextColor} text-sm px-1 rounded mr-2">D</div>
            <div class="{theme.textColor} space-x-2">
                <span>database</span>
            </div>
        {/if}

        <input type="text" class="py-1 px-2 border {theme.inputBackgroundColor} bg-opacity-20 rounded {theme.tableBorderColor}" placeholder="Search or Jump To…">
        
    </div>
    <div on:click={localStorage.clear()} class="cursor-pointer {theme.mutedTextColor}">Reset</div>
</div>