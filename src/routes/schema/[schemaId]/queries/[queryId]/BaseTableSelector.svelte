<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Dropdown from '$lib/Dropdown.svelte';

	export let schema;
	export let query;
	let searchTerm = "";

	function filter(tables,searchTerm){
		if (searchTerm.trim()){
			return tables.filter(t => t.name.toLowerCase().includes(searchTerm))
		} else {
			return tables;
		}
	}
</script>

<div class="border-b text-zinc-800 p-2 space-y-1 relative">


	<h4 class="text-sm font-semibold flex-grow leading-6">Base Table</h4>
	<Dropdown closeOnClick={true} full={false} width={'w-96'}>
		
		<div
			slot="toggle"
			class="border-zinc-300 border p-1 flex bg-white items-center rounded cursor-pointer space-x-1"
		>
			<i class="ri-table-line align-bottom" />
			<span class="flex-grow">{query.baseTable ? query.baseTable.name : 'Select Base Table'}</span>

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
			
			
			{#each filter(schema.tables,searchTerm) as table}
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

	
	{#if !query.baseTable}
		<div class="top-20 left-0 z-10 absolute">
		
			<div class="w-4 border-solid border-b-indigo-500 mx-8 border-b-8 border-x-transparent border-x-8 border-t-0"></div>
		
			<div class="bg-indigo-500 text-white p-8 rounded mx-2 space-y-2">
				<h4 class="font-semibold text-xl font-light opacity-80">Select a Base Table</h4>	
				<p class="text-sm">To begin your query, select a base table. The base table will determine the joins with other tables.</p>
			</div>
		</div>
		
		
	{/if}
	

	{#if query.baseTable}
	<!--
	<div>
		<button class="border py-1 px-2 rounded bg-zinc-50">Open Table</button>
	</div>
	-->
	{/if}

</div>
