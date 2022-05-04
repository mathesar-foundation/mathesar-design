<script>
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { loadEntities, saveEntities } from '$lib/utils';
	import { page } from '$app/stores';
	import { theme } from '$lib/themes';
	import { tableStore } from '$lib/stores/tableStore';
	import Toolbar from '../Toolbar.svelte';
	import LinkTableWizard from './LinkTableWizard.svelte';

	import TopNav from "../../../TopNav.svelte"

	import Table from '../Table.svelte';
	import Query from './Query.svelte';
	import Design from './Design.svelte';
	import SideBar from '../SideBar.svelte';
	import Tabs from '../Tabs.svelte';

	let { schemaId } = $page.params;
	let { tableId } = $page.params;
	$tableStore.viewDetails = false;

	let entities = {};
	let schema = {};
	let table = {};
	let activeMode = 'table';

	let openLinkOptions = false;

	async function loadData() {

		entities = await loadEntities();
		schema = entities.schemas.find((schema) => schema.id == schemaId);
		table = entities.tables.find(table => table.id == tableId);

		if (!entities || !entities.schemas || !entities.tables) {
			return;
		}

		return entities;
	}

	beforeUpdate(() => {
		
		saveEntities(entities);
		
	});

	function showMode(e) {
		let { mode } = e.detail;
		activeMode = mode;
	}

	function linkTable(e) {
		openLinkOptions = true;
	}

	function openView(view) {
		entities.queries.push(view);
		entities = entities;
		saveEntities(entities);


		setTimeout(function () {
			window.location = `/schema/${ table.schema.id }/${ view.id }`
    	}, 200);
		
		

		
	}

	function deleteTable(){
		let tableIdx = entities.tables.indexOf(table);
		entities.tables.splice(tableIdx,1);
		entities = entities;

		setTimeout(() => {
			window.location.href= `/schema/${schemaId}`
		}, "200")
		
	}

	function deleteColumn(column){
		let columnIdx = table.columns.indexOf(column);

		table.columns.splice(columnIdx,1);

		table.records.forEach(r => {
			r.splice(columnIdx,1)
			console.log(r[columnIdx])
		})

		table = table;
	}

</script>

{#await loadData()}
	<div>Loading (can be removed)</div>
{:then entities}

	<TopNav {schema} />
	<div class="w-screen flex bg-zinc-100 bg-opacity-10">
	
		<SideBar {schema} on:openObject={(e)=> window.location = `/schema/0/${e.detail.type}/${e.detail.id}` }/>
	
		<div class="flex overflow-hidden flex-col h-full flex-grow" style="height: calc(100vh - 52px);">
			<Tabs />
			<Toolbar on:deleteTable={deleteTable} on:switch={showMode} bind:table={table} on:linkTable={linkTable} on:CreateView={(e)=> openView(e.detail) } />

			{#if activeMode == 'edit'}
				<Design {table} />
			{/if}

			{#if activeMode == 'query'}
				<Query allowed={table.allowEdit} {table} />
			{/if}

			{#if table && table.columns}
				<Table on:deleteColumn={(e)=>deleteColumn(e.detail)} bind:table={table} />
			{:else}
				{#if table && table.type == 'table'}
					<div class="p-5 text-zinc-800">Table has no columns</div>
				{/if}

			{/if}
		</div>
	</div>
	<LinkTableWizard {table} tables={entities.tables} showModal={openLinkOptions} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
