<script>
	import { icon } from '$lib/iconMap';
	import Dropdown from '$lib/Dropdown.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { conditions, summarizations, rangeOptions } from '$lib/utils';
	import _ from 'lodash';
	export let query;
	
	export let step;

	export let minimize = true;

	function deleteStep(step) {
		delete query.steps[step];

		query = query;
		dispatch('deleteStep', query.records);
	}

	function previewStep() {
		dispatch('previewStep', step);
	}

	function getFilterConditions(step) {
		let option = conditions[query.steps[step].column.type]
		let aggregationOptions = [];

		if(query.steps[step].column.aggregation){
			aggregationOptions = conditions[query.steps[step].column.aggregation];
		}

		return _.flatten([aggregationOptions,option]);
	}

	function setFilterCondition(condition){
		query.steps[step].condition = condition;
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
	class:opacity-20={query.steps[step].hidden}
	
>
	<div class="flex items-center space-x-2 cursor-pointer" on:click={() => minimize = !minimize}>
		<div class="flex-grow">
			<div class="font-semibold">
			<i class="{icon[query.steps[step].type]} align-bottom" /> {_.startCase(step)}
			</div>
		</div>

		<button on:click={() => previewStep(step)}>
			<i class="{!query.steps[step].hidden?'ri-eye-line':'ri-eye-close-line'} align-bottom" />
			
		</button>

		{#if Object.keys(query.steps).length == Object.keys(query.steps).indexOf(step)+1}
	
		<button on:click={() => deleteStep(step)}>
			<i class="ri-delete-bin-line align-bottom" />
		</button>

		{/if}
	</div>


	{#if !minimize}

		{#if query.steps[step].column}

		<div class="font-semibold">Column</div>
		<Dropdown closeOnClick={true}>
			
			<div slot="toggle" class="cursor-pointer flex items-center border bg-zinc-50 border-zinc-300 space-x-1 p-2 rounded">
				
				<div class="flex-grow">
					<div class="rounded inline-block text-xs px-1 border" style="background-color:{query.steps[step].column.source?.table.color||""}">
						<i class="{icon[query.steps[step].column.type]} align-bottom" /> 
						<i class="{icon[query.steps[step].column.aggregation]} align-bottom" /> 
					</div>
					{query.steps[step].column.alias}</div>
				<i class="ri-arrow-drop-down-line align-bottom" />
			</div>
			<div slot="menu">
				{#each query.columns as column}
					<div
						class="hover:bg-zinc-200 cursor-pointer bg-zinc-50 space-x-1 p-2"
						on:click={() => (query.steps[step].column = column)}
					>
						<i class="{icon[column.type]} align-bottom border rounded" style="background-color:{query.steps[step].column.source.table.color}"/> <span>{column.alias}</span>
					</div>
				{/each}
			</div>
		</Dropdown>
		{/if}

		{#if query.steps[step].aggregations}
			
			<div class="font-semibold">Summarize By</div>
			<Dropdown closeOnClick={true}>
				<div
					slot="toggle"
					class="cursor-pointer flex items-center border border-zinc-300 bg-zinc-50 space-x-1 p-2 rounded"
				>
					<span class="flex-grow">{_.startCase(query.steps[step].summaryCondition||summarizations[query.steps[step].column.type][0])}</span>
					<i class="ri-arrow-drop-down-line align-bottom" />
				</div>
				<div slot="menu">
					{#each summarizations[query.steps[step].column.type] as condition}
						<div
							class="hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
							on:click={() => (query.steps[step].summaryCondition = condition)}
						>
							<span>{_.startCase(condition)}</span>
						</div>
					{/each}
				</div>
			</Dropdown>

			{#if query.steps[step].summaryCondition == "range"}

			<div class="flex items-center space-x-2">
				<Dropdown closeOnClick={true} full={true}>
					<button class="cursor-pointer flex items-center w-full text-left border border-zinc-300 bg-zinc-50 space-x-1 p-2 rounded" slot="toggle">
						<span class="flex-grow">{query.steps[step].rangeOption||rangeOptions[query.steps[step].column.type][0]}</span>
						<i class="ri-arrow-drop-down-line align-bottom" />
					</button>
					<div slot="menu">
						{#each rangeOptions[query.steps[step].column.type] as option}
							<div
							class="hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
							on:click={() => query.steps[step].rangeOption = option}
					>
								{option}
							</div>
						{/each}
					</div>
				</Dropdown>
				{#if query.steps[step].rangeOption == "Size" || query.steps[step].rangeOption == "Groups"}
					<input type="number" class="p-2 border w-full rounded" bind:value={query.steps[step].rangeSize}>
				{/if}
				
			</div>
			{/if}

			<div class="font-semibold">Aggregations</div>
			<div class="space-y-2">
				{#each query.columns as column, i}
					{#if column !== query.steps[step].column}
						<div><i class="{icon[column.type]} align-bottom" /> {column.alias}</div>
						<div class="border flex items-center border-zinc-300 bg-zinc-50 p-2 rounded">
							<span class="flex-grow whitespace-nowrap">{query.steps[step].aggregations.map(a => a[i])}</span>
							<i class="ri-arrow-drop-down-line align-bottom" />
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="flex items-center space-x-2">
			{#if query.steps[step].condition}
				<Dropdown closeOnClick={true}>
					<div
						slot="toggle"
						class="cursor-pointer flex items-center border bg-zinc-50 border-zinc-300 space-x-1 p-2 rounded"
					>
						<span class="flex-grow whitespace-nowrap">{query.steps[step].condition}</span>
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
			{#if query.steps[step].value !== undefined}
				<Dropdown full={true} closeOnClick={true}>
				<div slot="toggle">

				{#if query.steps[step].value instanceof Object}
					<div class="flex items-center bg-zinc-50 rounded border-zinc-300 border p-2">
					<div class="flex-grow">
						<div class="rounded inline-block text-xs px-1" style="background-color:{query.steps[step].value.source.table.color}">
							<i class="{icon[query.steps[step].value.type]} align-bottom" /> 
							<i class="{icon[query.steps[step].value.aggregation]} align-bottom" /> 
						</div>
						{query.steps[step].value.alias}</div>
					<i class="ri-arrow-drop-down-line align-bottom" />
					</div>
				{:else}
					<input 
					class="bg-zinc-50 border-zinc-300 border p-2 rounded w-full"
					type="text"
					bind:value={query.steps[step].value}
					/>
				{/if}
				

				
				</div>	
					
				<div slot="menu">
					{#if query.steps[step].value instanceof Object}
					<div class="p-2" on:click={()=> query.steps[step].value=""}>Clear Column</div>
					{:else}
					<div class="p-2">Value: {query.steps[step].value}</div>
					{/if}
					<div class="border-t w-full"></div>

					{#each filterByValue(query.columns,query.steps[step].value) as column}
					<div
						class="hover:bg-zinc-200 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
						on:click={() => (query.steps[step].value = column)}
					>
						<i class="{icon[column.type]} align-bottom border rounded" style="background-color:{query.steps[step].value.source?.table.color}" /> <span>{column.alias}</span>
					</div>
					{/each}
				</div>
				</Dropdown>
			{/if}

			{#if query.steps[step].direction}
				<Dropdown>
					<button class="bg-zinc-50 w-full cursor-pointer space-x-1 p-2 border border-zinc-300 rounded" slot="toggle">
						<span class="flex-grow">{query.steps[step].direction}</span>
						<i class="ri-arrow-drop-down-line align-bottom" />
					</button>
				</Dropdown>
			{/if}


		</div>


	{/if}
</div>
