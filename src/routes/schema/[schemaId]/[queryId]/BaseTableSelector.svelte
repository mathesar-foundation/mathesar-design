<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Dropdown from '$lib/Dropdown.svelte';
	import { theme } from '$lib/themes';
	import tippy from 'tippy.js';

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


<div class="{theme.darkBackgroundColor} border-b bg-opacity-20 {theme.textColor} p-2 flex items-center space-x-3">
	<div class="font-semibold">Exploring</div>

	<Dropdown full={false} width={'w-96'}>
		<div
			slot="toggle"
			class="{theme.mediumBorderColor} border px-2 py-1 rounded cursor-pointer space-x-1"
		>
			<i class="ri-table-line align-bottom" />
			<span>{selectedView.baseTable ? selectedView.baseTable.name : 'Select Base Table'}</span>

			<i class="ri-arrow-drop-down-line align-bottom" />
		</div>
		<div slot="menu">
			<input
				type="text"
				class="p-2 w-full {theme.inputBackgroundColor} bg-opacity-60"
				placeholder="Search Tables"
				bind:value={searchTerm}
			/>
			{#each filter(entities.tables,searchTerm) as table}
				<div
					on:click={() => dispatch('tableSelected', table)}
					class="p-2 hover:bg-opacity-20 bg-opacity-0 {theme.primaryColor} cursor-pointer"
				>
					<div class="space-x-1">
						<i class="ri-table-line align-bottom" /> <span>{table.name}</span>
					</div>
					<div class="text-xs {theme.mutedTextColor}">{table.records.length} Records {table.columns.length} Columns</div>
				</div>
			{/each}
		</div>
	</Dropdown>
	<div class="flex justify-end flex-grow">
	<button class="border p-1 rounded {theme.mediumBorderColor}">Leave Data Explorer</button>
	</div>
</div>
