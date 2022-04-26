<script>
	import { beforeUpdate } from 'svelte';
	import { theme } from '$lib/themes';
	import { page } from '$app/stores';

	import TopNav from "../../../TopNav.svelte"

	import { loadEntities, saveEntities } from '$lib/utils';
	const { schemaId } = $page.params;
    const { viewId } = $page.params;

    import Tabs from "../Tabs.svelte";
    import Toolbar from "../Toolbar.svelte";
    import Table from "../Table.svelte"

	import SideBar from '../SideBar.svelte';

	let schema = {};
    let view = {};
	let entities;

	async function loadData() {
		entities = await loadEntities();

		schema = entities.schemas.find((schema) => schema.id == schemaId);
        view = entities.views.find(v => v.id == viewId)
		
		

		if (!entities || !entities.schemas || !entities.tables) {
			return;
		}

		return entities;
	}

	beforeUpdate(() => {
		saveEntities(entities);
	});

	function openDataExplorer(view){
		setTimeout(function () {
			window.location = `/schema/${ view.schema.id }/${ view.id }`
    	}, 200);
	}
</script>

{#await loadData()}
	<div>Loading (can be removed)</div>
{:then entities}
<TopNav {entities} />
	<div class="w-screen flex {theme.darkPrimaryColor} bg-opacity-10">
			<!--
		    <SideBar {schema} on:openObject={(e)=> window.location = `/schema/0/${e.detail.type}/${e.detail.id}`}/>
			-->

            <div class="flex overflow-hidden flex-col h-full flex-grow" style="height: calc(100vh - 52px);">
            
                <Tabs/>

                <Toolbar on:openView={(e)=>openDataExplorer(e.detail) } table={ view }/>
         
                <Table table={ view }/>
                
                
            </div>
  
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
