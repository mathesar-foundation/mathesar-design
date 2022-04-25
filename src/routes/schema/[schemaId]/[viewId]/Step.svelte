<script>
	import { theme } from '$lib/themes';
	import { icon } from '$lib/iconMap';
	import Dropdown from '$lib/Dropdown.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { conditions, summarizations } from '$lib/utils';
	import _ from 'lodash';
	export let selectedView;
	
	export let step;

	export let minimize = true;

	function deleteStep(step) {
		delete selectedView.steps[step];

		selectedView = selectedView;
		dispatch('deleteStep', selectedView.records);
	}

	function previewStep() {
		dispatch('previewStep', step);
	}
</script>

<div
	class="{theme.mediumBackgroundColor} p-2 rounded space-y-2 text-sm"
	class:opacity-20={selectedView.steps[step].hidden}
	
>
	<div class="flex items-center space-x-2 cursor-pointer" on:click={() => minimize = !minimize}>
		<div class="flex-grow">
			<div class="font-semibold">
			<i class="{icon[selectedView.steps[step].type]} align-bottom" /> {_.startCase(step)}
			</div>
		</div>

		<button on:click={() => previewStep(step)}>
			<i class="ri-eye-line align-bottom" />
		</button>

		<button on:click={() => deleteStep(step)}>
			<i class="ri-delete-bin-line align-bottom" />
		</button>
	</div>


	{#if !minimize}

		<div class="font-semibold">Column</div>
		<Dropdown>
			
			<div slot="toggle" class="cursor-pointer border {theme.lightBorderColor} space-x-1 p-2 rounded">
				<i class="{icon[selectedView.steps[step].column.type]} align-bottom border rounded" />
				<span>{selectedView.steps[step].column.alias}</span>
			</div>
			<div slot="menu">
				{#each selectedView.columns as column}
					<div
						class="hover:{theme.lightBackgroundColor} space-x-1 p-2"
						on:click={() => (selectedView.steps[step].column = column)}
					>
						<i class="{icon[column.type]} align-bottom border rounded" /> <span>{column.alias}</span>
					</div>
				{/each}
			</div>
		</Dropdown>

		{#if selectedView.steps[step].aggregations}
			
			<div class="font-semibold">Summarize By</div>
			<Dropdown>
				<div
					slot="toggle"
					class="cursor-pointer border {theme.lightBorderColor} space-x-1 p-2 rounded"
				>
					<span>Value</span>
				</div>
				<div slot="menu">
					{#each summarizations[selectedView.steps[step].column.type] as condition}
						<div
							class="hover:{theme.lightBackgroundColor} space-x-1 p-2"
							on:click={() => (selectedView.steps[step].condition = condition)}
						>
							<span>{condition}</span>
						</div>
					{/each}
				</div>
			</Dropdown>

			<div class="font-semibold">Aggregations</div>
			<div class="space-y-2">
				{#each selectedView.columns as column, i}
					{#if column !== selectedView.steps[step].column}
						<div><i class="{icon[column.type]} align-bottom" /> {column.alias}</div>
						<div class="border {theme.mediumBorderColor} p-2 rounded">
							{selectedView.steps[step].aggregations.map(a => a[i])}
						
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="flex items-center space-x-2">
			{#if selectedView.steps[step].condition}
				<Dropdown>
					<div
						slot="toggle"
						class="cursor-pointer border {theme.lightBorderColor} space-x-1 p-2 rounded"
					>
						<span>{selectedView.steps[step].condition}</span>
					</div>
					<div slot="menu">
						{#each conditions[selectedView.steps[step].column.type] as condition}
							<div
								class="hover:{theme.lightBackgroundColor} space-x-1 p-2"
								on:click={() => (selectedView.steps[step].condition = condition)}
							>
								<span>{condition}</span>
							</div>
						{/each}
					</div>
				</Dropdown>
			{/if}
			{#if selectedView.steps[step].value !== undefined}
				<input
					class="{theme.inputBackgroundColor} p-2 rounded w-full"
					type="text"
					bind:value={selectedView.steps[step].value}
				/>
			{/if}
		</div>
	{/if}
</div>
