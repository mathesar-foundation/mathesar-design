<script>
    import TopNav from "./TopNav.svelte";
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
<div class="space-y-4 p-4 flex-grow">
    <h2 class="{theme.textColor} text-xl">Mathesar Prototype</h2>
    {#each entities.schemas as schema,i}
        <a class="block border p-4 text-lg rounded { theme.textColor } {theme.tableBorderColor}" href="/schema/{i}">{schema.name}</a>
    {/each}
</div>

    
{:catch error}
    <div style="color:#FFFFFF">
	    <p>{error.message}</p>
        <button on:click={localStorage.clear()}>Reset Storage</button>
    </div>
{/await}
