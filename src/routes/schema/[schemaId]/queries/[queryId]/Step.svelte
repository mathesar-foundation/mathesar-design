<script>
	import { theme } from '$lib/themes';
	import { icon } from '$lib/iconMap';
	import Dropdown from '$lib/Dropdown.svelte';
	import { afterUpdate, beforeUpdate, createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	import { conditions, summarizations, rangeOptions } from '$lib/utils';
	import _ from 'lodash';
	export let selectedView;
	
	export let step;

	export let minimize = true;

	console.log(selectedView.steps[step])


	function deleteStep(step) {
		delete selectedView.steps[step];

		selectedView = selectedView;
		dispatch('deleteStep', selectedView.records);
	}

	function previewStep() {
		dispatch('previewStep', step);
	}

	function getFilterConditions(step) {
		let option = conditions[selectedView.steps[step].column.type]
		let aggregationOptions = [];

		if(selectedView.steps[step].column.aggregation){
			aggregationOptions = conditions[selectedView.steps[step].column.aggregation];
		}

		return _.flatten([aggregationOptions,option]);
	}

	function setFilterCondition(condition){
		selectedView.steps[step].condition = condition;
	}

	function filterByValue(columns,value){
		if(value instanceof Object){
			return columns;
		} else {
			return columns.filter(c => _.lowerCase(c.name).includes(_.lowerCase(value)))
		}
	
	}
</script>

<div
	class="border border-zinc-300 bg-zinc-100 p-2 rounded space-y-2 text-sm"
	class:opacity-20={selectedView.steps[step].hidden}
	
>
	<div class="flex items-center space-x-2 cursor-pointer" on:click={() => minimize = !minimize}>
		<div class="flex-grow">
			<div class="font-semibold">
			<i class="{icon[selectedView.steps[step].type]} align-bottom" /> {_.startCase(step)}
			</div>
		</div>

		<button on:click={() => previewStep(step)}>
			<i class="{!selectedView.steps[step].hidden?'ri-eye-line':'ri-eye-close-line'} align-bottom" />
			
		</button>

		{#if Object.keys(selectedView.steps).length == Object.keys(selectedView.steps).indexOf(step)+1}
	
		<button on:click={() => deleteStep(step)}>
			<i class="ri-delete-bin-line align-bottom" />
		</button>

		{/if}
	</div>


	{#if !minimize}

		{#if selectedView.steps[step].column}

		<div class="font-semibold">Column</div>
		<Dropdown closeOnClick={true}>
			
			<div slot="toggle" class="cursor-pointer flex items-center border bg-zinc-50 border-zinc-300 space-x-1 p-2 rounded">
				
				<div class="flex-grow">
					<div class="rounded inline-block text-xs px-1" style="background-color:{selectedView.steps[step].column.source.table.color}">
						<i class="{icon[selectedView.steps[step].column.type]} align-bottom" /> 
						<i class="{icon[selectedView.steps[step].column.aggregation]} align-bottom" /> 
					</div>
					{selectedView.steps[step].column.alias}</div>
				<i class="ri-arrow-drop-down-line align-bottom" />
			</div>
			<div slot="menu">
				{#each selectedView.columns as column}
					<div
						class="hover:bg-zinc-200 cursor-pointer bg-zinc-50 space-x-1 p-2"
						on:click={() => (selectedView.steps[step].column = column)}
					>
						<i class="{icon[column.type]} align-bottom border rounded" style="background-color:{selectedView.steps[step].column.source.table.color}"/> <span>{column.alias}</span>
					</div>
				{/each}
			</div>
		</Dropdown>
		{/if}

		{#if selectedView.steps[step].aggregations}
			
			<div class="font-semibold">Summarize By</div>
			<Dropdown closeOnClick={true}>
				<div
					slot="toggle"
					class="cursor-pointer flex items-center border border-zinc-300 bg-zinc-50 space-x-1 p-2 rounded"
				>
					<span class="flex-grow">{_.startCase(selectedView.steps[step].summaryCondition||summarizations[selectedView.steps[step].column.type][0])}</span>
					<i class="ri-arrow-drop-down-line align-bottom" />
				</div>
				<div slot="menu">
					{#each summarizations[selectedView.steps[step].column.type] as condition}
						<div
							class="hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
							on:click={() => (selectedView.steps[step].summaryCondition = condition)}
						>
							<span>{_.startCase(condition)}</span>
						</div>
					{/each}
				</div>
			</Dropdown>

			{#if selectedView.steps[step].summaryCondition == "range"}

			<div class="flex items-center space-x-2">
				<Dropdown closeOnClick={true} full={true}>
					<button class="cursor-pointer flex items-center w-full text-left border border-zinc-300 bg-zinc-50 space-x-1 p-2 rounded" slot="toggle">
						<span class="flex-grow">{selectedView.steps[step].rangeOption||rangeOptions[selectedView.steps[step].column.type][0]}</span>
						<i class="ri-arrow-drop-down-line align-bottom" />
					</button>
					<div slot="menu">
						{#each rangeOptions[selectedView.steps[step].column.type] as option}
							<div
							class="hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
							on:click={() => selectedView.steps[step].rangeOption = option}
					>
								{option}
							</div>
						{/each}
					</div>
				</Dropdown>
				{#if selectedView.steps[step].rangeOption == "Size" || selectedView.steps[step].rangeOption == "Groups"}
					<input type="number" class="p-2 border w-full rounded" bind:value={selectedView.steps[step].rangeSize}>
				{/if}
				
			</div>
			{/if}

			<div class="font-semibold">Aggregations</div>
			<div class="space-y-2">
				{#each selectedView.columns as column, i}
					{#if column !== selectedView.steps[step].column}
						<div><i class="{icon[column.type]} align-bottom" /> {column.alias}</div>
						<div class="border flex items-center border-zinc-300 bg-zinc-50 p-2 rounded">
							<span class="flex-grow whitespace-nowrap">{selectedView.steps[step].aggregations.map(a => a[i])}</span>
							<i class="ri-arrow-drop-down-line align-bottom" />
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="flex items-center space-x-2">
			{#if selectedView.steps[step].condition}
				<Dropdown closeOnClick={true}>
					<div
						slot="toggle"
						class="cursor-pointer flex items-center border bg-zinc-50 border-zinc-300 space-x-1 p-2 rounded"
					>
						<span class="flex-grow whitespace-nowrap">{selectedView.steps[step].condition}</span>
						<i class="ri-arrow-drop-down-line align-bottom" />
					</div>
					
					<div slot="menu">
						{#each getFilterConditions(step) as condition}
							<div
								class="hover:bg-zinc-100 cursor-pointer space-x-1 p-2"
								on:click={() => setFilterCondition(condition)}
							>
								{condition}
							</div>
						{/each}
					</div>
				</Dropdown>
			{/if}
			{#if selectedView.steps[step].value !== undefined}
				<Dropdown full={true} closeOnClick={true}>
				<div slot="toggle">

				{#if selectedView.steps[step].value instanceof Object}
					<div class="flex items-center bg-zinc-50 rounded border-zinc-300 border p-2">
					<div class="flex-grow">
						<div class="rounded inline-block text-xs px-1" style="background-color:{selectedView.steps[step].value.source.table.color}">
							<i class="{icon[selectedView.steps[step].value.type]} align-bottom" /> 
							<i class="{icon[selectedView.steps[step].value.aggregation]} align-bottom" /> 
						</div>
						{selectedView.steps[step].value.alias}</div>
					<i class="ri-arrow-drop-down-line align-bottom" />
					</div>
				{:else}
					<input 
					class="bg-zinc-50 border-zinc-300 border p-2 rounded w-full"
					type="text"
					bind:value={selectedView.steps[step].value}
					/>
				{/if}
				

				
				</div>	
					
				<div slot="menu">
					{#if selectedView.steps[step].value instanceof Object}
					<div class="p-2" on:click={()=> selectedView.steps[step].value=""}>Clear Column</div>
					{:else}
					<div class="p-2">Value: {selectedView.steps[step].value}</div>
					{/if}
					<div class="border-t w-full"></div>

					{#each filterByValue(selectedView.columns,selectedView.steps[step].value) as column}
					<div
						class="hover:bg-zinc-200 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
						on:click={() => (selectedView.steps[step].value = column)}
					>
						<i class="{icon[column.type]} align-bottom border rounded" style="background-color:{selectedView.steps[step].value.source?.table.color}" /> <span>{column.alias}</span>
					</div>
					{/each}
				</div>
				</Dropdown>
			{/if}

			{#if selectedView.steps[step].direction}
				<Dropdown>
					<button class="bg-zinc-50 w-full cursor-pointer space-x-1 p-2 border border-zinc-300 rounded" slot="toggle">
						<span class="flex-grow">{selectedView.steps[step].direction}</span>
						<i class="ri-arrow-drop-down-line align-bottom" />
					</button>
				</Dropdown>
			{/if}


		</div>


	{/if}
</div>
