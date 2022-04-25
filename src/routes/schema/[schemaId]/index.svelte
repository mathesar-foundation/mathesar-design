<script>
    import { beforeUpdate } from 'svelte';
    import { theme } from "$lib/themes";    
    import { page } from "$app/stores";
    import TopNav from "../../TopNav.svelte"

    import {
		loadEntities,
        saveEntities

	} from '$lib/utils';
    const { schemaId } = $page.params;

    import SideBar from "./SideBar.svelte";


    let schema = {};
    let entities;

    async function loadData() {        
        entities = await loadEntities();
    

        schema = entities.schemas.find(schema => schema.id == schemaId)
        schema = schema;

        if (!entities || !entities.schemas || !entities.tables) {
            return;
        } 

    

        return entities;
    };

    beforeUpdate(() => {
		saveEntities(entities);
	});


</script>

{#await loadData()}
    <div>Loading (can be removed)</div>
    
{:then entities}

<TopNav {entities} />

<div class="flex flex-grow {theme.darkPrimaryColor} bg-opacity-10">

    <SideBar on:openObject={(e)=> window.location = `/schema/0/${e.detail.type}/${e.detail.id}` } schema={ schema }/>
    
    <div class="p-8 space-y-4 {theme.textColor}">
        <div class="flex items-center space-x-2">
            <div class="w-10 h-10 rounded flex {theme.primaryColor} bg-opacity-20">
                <i class="ri-share-fill align-bottom m-auto text-2xl"></i>
            </div>
            <div>
                <h2 class="text-lg font-semibold">{ schema.name }</h2>
                <p class="text-sm {theme.mutedTextColor}">
                { schema.tables.filter(t => t.type == 'table').length } Tables
                { schema.tables.filter(t => t.type == 'view').length } Views
                </p>
            </div>
        </div>
    
        <h3 class="text-lg">Recent</h3>

        <div class="space-y-4">
            {#each schema.tables as table}
                <a class="block space-x-1" href="tables/{schema.id}-{table.id}"><i class="ri-table-fill align-bottom" style="color:{table.color}"></i> <span>{table.name}</span></a>
            {/each}
        </div>

        <h3 class="text-lg">Activity</h3>
        <p class="{theme.mutedTextColor}">No Activity</p>
    
        <h3 class="text-lg">Get Started</h3>
        <div>
            <button>Create a Table</button>
            <button>Create a View</button>
        </div>
        
    </div>
    
</div>


    
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}




