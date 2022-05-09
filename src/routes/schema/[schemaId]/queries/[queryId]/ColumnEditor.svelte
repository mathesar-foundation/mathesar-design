<script>
	import Dropdown from '$lib/Dropdown.svelte';
	import { theme } from '$lib/themes';
	import Source from './Source.svelte'
	import { typeOptions, conditions } from '$lib/utils';
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import { icon } from '$lib/iconMap';
	import _ from "lodash";

	const dispatch = createEventDispatcher();

	export let selectedView;
	export let column;
	let externalLink;
	let columnIdx;
	let records = [];

	beforeUpdate(() => {
		columnIdx = selectedView.columns.indexOf(column);
		records = selectedView.records.map((r) => r[columnIdx]);
		externalLink = column.source.table.constraints.find(
			(c) => c.referenceTable && c.referenceTable.id == selectedView.baseTable.id
		);
		selectedView = selectedView;
	});

	function updateAggregation(aggregation) {
		dispatch('updateAggregation', {
			aggregation,
			column,
			columnIdx,
			records
		});

		column = column;
	}

</script>

<div class="p-4 space-y-2 flex flex-col h-full">
	<div class="space-y-1 grid">
		<label class="font-semibold" for="columnName">Name</label>
		<input
			id="columnName"
			class="p-2 rounded bg-zinc-100 border border-zinc-300 bg-opacity-80"
			type="text"
			bind:value={column.alias}
		/>
	</div>

	<div class="space-y-1 grid">
		<h4 class="font-semibold">Source</h4>
		<Source {column} {externalLink}/>
		
	</div>

	{#if records.some((r) => Array.isArray(r)) || column.aggregation}
		<div class="border-t border-zinc-200" />
		<div class="">
			<h4 class="font-semibold">Aggregation Formula</h4>
			<p class="text-sm text-zinc-500">
				Columns containing multiple records are aggregated to be displayed in a single row.
			</p>
		</div>
		<Dropdown>
			<div
				slot="toggle"
				class="cursor-pointer bg-zinc-50 border-zinc-300 py-1 px-2 rounded border flex items-center"
			>
				<div class="flex-grow"><i class="{icon[column.aggregation]} align-bottom" /> {_.startCase(column.aggregation)}</div>
				<i class="ri-arrow-drop-down-line align-bottom" />
			</div>
			<div slot="menu">
				{#each typeOptions[column.source.link.column.type].aggregations as aggregation}
					<div
						on:click={() => updateAggregation(aggregation)}
						class="p-2 cursor-pointer hover:bg-zinc-200"
					>
						<i class="{icon[aggregation]} align-bottom" />
						{_.startCase(aggregation)}
					</div>
				{/each}
			</div>
		</Dropdown>
		<div class="border-t border-zinc-200" />
		<div>
			<h4 class="font-semibold">Filter Linked Records</h4>
			<p class="text-sm text-zinc-500">
				Add a filter to narrow down the linked records that will be included in this column.
			</p>
		</div>

		

		{#if !column.source.filter?.column}
			<button
				on:click={() => dispatch('addFilter', column)}
				class="p-1 bg-zinc-50 border-zinc-300 w-full rounded border"
				><i class="ri-add-line align-bottom" /> Add Filter</button
			>
		{:else}
			<div class="rounded bg-zinc-200 p-2 text-sm space-y-2">
				<div class="flex items-center">
					<div class="font-semibold flex-grow">Column</div>
					<button on:click={() => dispatch('deleteFilter', column)}>
						<i class="ri-delete-bin-line align-bottom" />
					</button>
				</div>
				<Dropdown>
					<div
						slot="toggle"
						class="cursor-pointer bg-zinc-100  border border-zinc-300 p-2 rounded flex items-center"
					>
						<div class="flex-grow space-x-1">
							<i
								class="align-bottom border text-center {icon[
									column.source.filter.column.type
								]} rounded"
							/>
							<span>{column.source.filter.column.name}</span>
						</div>
						<i class="ri-arrow-drop-down-line align-bottom" />
					</div>
					<div slot="menu">
						{#each selectedView.columns as _column}
							<div
								class="hover:bg-zinc-50 space-x-1 p-2 cursor-pointer"
								on:click={() => (column.source.filter.column = _column)}
							>
								<i class="{icon[_column.type]} align-bottom border rounded" />
								<span>{_column.alias}</span>
							</div>
						{/each}
					</div>
				</Dropdown>

				<div class="flex items-center space-x-2">
					{#if column.source.filter.condition}
						<Dropdown>
							<div
								slot="toggle"
								class="cursor-pointer border bg-zinc-100 border-zinc-300 space-x-1 p-2 flex items-center whitespace-nowrap rounded"
							>
								<span>{column.source.filter.condition}</span>
								<i class="ri-arrow-drop-down-line align-bottom" />
							</div>
							<div slot="menu">
								{#each conditions[column.source.filter.column.type] as condition}
									<div
										class="hover:bg-zinc-50 space-x-1 p-2"
										on:click={() => (column.source.filter.condition = condition)}
									>
										<span>{condition}</span>
									</div>
								{/each}
							</div>
						</Dropdown>
					{/if}
					{#if column.source.filter.value !== undefined}
						<input
							class="bg-zinc-100 p-2 rounded w-full"
							type="text"
							bind:value={column.source.filter.value}
						/>
					{/if}
				</div>
			</div>
		{/if}
	{/if}

	<div class="border-b flex-grow border-zinc-200" />
	<div class="space-y-2 grid">
		<button
			on:click={dispatch('deleteColumn', column)}
			class="bg-zinc-50 p-1 rounded"
			><i class="ri-delete-bin-line align-bottom" /> Delete Column</button
		>
	</div>
</div>
