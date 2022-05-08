<script>
    import TopNav from "$lib/TopNav.svelte";
    import _ from "lodash";
	import {
		loadEntities,
	} from '$lib/utils';
    
    import { theme } from "$lib/themes";

    let entities;

    async function loadData() {        
        entities = await loadEntities();
        if (!entities || !entities.schemas || !entities.tables) {
            return;
        } 
        return entities;
    };
</script>

<div class="bg-yellow-100 fixed bottom-0 p-2 w-screen">
    <a href="https://jolly-phoenix-c9377f.netlify.app/?activeSchema=album_collection">For Old Prototype Click Here</a>
</div>

{#await loadData()}
    <div>Loading (can be removed)</div>
    
{:then entities}
<TopNav {entities} />
<div class="space-y-2 p-4 flex-grow">
    <h2 class="text-zinc-800 text-4xl font-light">Mathesar Prototype</h2>
    <div class="text-lg">Sample Schemas</div>
    {#each entities.schemas as schema,i}

        <a class="block hover:bg-opacity-10 bg-opacity-0 bg-indigo-500 border-2 p-4 text-lg rounded space-x-2 { theme.textColor } border-zinc-200" href="/schema/{i}">
            <span class="bg-indigo-500 text-white text-sm py-1 px-2 text-lg text-center rounded">{_.startCase(schema.name.slice(0,2))}</span>
            <span>{schema.name}</span>
        </a>
    {/each}
</div>

    
{:catch error}
    <div style="color:#FFFFFF">
	    <p>{error.message}</p>
        <button on:click={localStorage.clear()}>Reset Storage</button>
    </div>
{/await}
