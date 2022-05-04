<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Dropdown from '$lib/Dropdown.svelte';
	import { theme } from '$lib/themes';

	export let entities;
	export let selectedView;
	let searchTerm = "";

	function filter(tables,searchTerm){
		if (searchTerm.trim()){
			return tables.filter(t => t.name.toLowerCase().includes(searchTerm))
		} else {
			return tables;
		}
	}
</script>


<div class="bg-zinc-50 border-b-2 bg-opacity-20 text-zinc-800 p-2 flex items-center space-x-3">
	<div class="font-semibold">Exploring</div>

	<Dropdown closeOnClick={true} full={false} width={'w-96'}>
		
		<div
			slot="toggle"
			class="{theme.mediumBorderColor} border px-2 py-1 rounded cursor-pointer space-x-1"
		>
			<i class="ri-table-line align-bottom" />
			<span>{selectedView.baseTable ? selectedView.baseTable.name : 'Select Base Table'}</span>

			<i class="ri-arrow-drop-down-line align-bottom" />
		</div>
		<div slot="menu">
			

			<div class="border flex items-center flex-grow border rounded overflow-hidden m-2">
				<i class="ri-search-line align-bottom px-1 text-zinc-500" />
				<input
				  type="text"
				  class="bg-zinc-100 bg-opacity-40 flex-grow p-1 text-sm"
				  placeholder="Search Tables"
				/>
			  </div>
			
			{#each filter(entities.tables,searchTerm) as table}
				<div
					on:click={() => dispatch('tableSelected', table)}
					class="p-2 hover:bg-indigo-100 border-t cursor-pointer"
				>
					<div class="space-x-1">
						<i class="ri-table-line align-bottom" /> <span>{table.name}</span>
					</div>
					<div class="text-xs text-zinc-500">{table.records.length} Records {table.columns.length} Columns</div>
				</div>
			{/each}
		</div>
	</Dropdown>
	{#if selectedView.baseTable}
	<div>
		<button class="border py-1 px-2 rounded bg-zinc-50">Open Table</button>
	</div>
	{/if}
	<div class="flex justify-end flex-grow">
		<!--
	<button class="border py-1 px-2 rounded bg-zinc-50">Leave Data Explorer</button>
	-->
	</div>
</div>
