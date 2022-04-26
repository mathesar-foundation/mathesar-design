<script>
	import Dropdown from '$lib/Dropdown.svelte';
	import { theme } from '$lib/themes';
	import { typeOptions, conditions } from '$lib/utils';
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import { icon } from '$lib/iconMap';

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
		<label for="columnName">Name</label>
		<input
			id="columnName"
			class="p-2 rounded {theme.inputBackgroundColor} bg-opacity-80"
			type="text"
			bind:value={column.alias}
		/>
	</div>

	<div class="space-y-1 grid">
		<h4>Source</h4>
		<div class="border {theme.lightBorderColor} rounded p-2 space-y-2">
			<div class="grid grid-cols-3">
				<div class="col-span-1">Column</div>
				<div class="text-sm col-span-2">
					<i class="{icon[column.type]} {column.source.table.color} align-bottom rounded" />
					{column.name}
				</div>
			</div>

			<div class="grid grid-cols-3">
				<div class="col-span-1">Table</div>
				<div class="text-sm col-span-2">
					<span class="rounded px-1 bg-opacity-20 {column.source.table.color}"
						>{column.source.table.name}</span
					>
				</div>
			</div>

			<div class="grid grid-cols-3">
				<div class="col-span-1">Link</div>

				<div class="text-sm col-span-2">
					{#if externalLink}
						<span class="rounded px-1 bg-opacity-20 {externalLink.referenceTable.color}"
							>{externalLink.referenceTable.name}</span
						>
						{externalLink.column}
					{/if}
					<span class="rounded px-1 bg-opacity-20 {column.source.link.table.color}"
						>{column.source.link.table.name}</span
					>
					<div class="space-x-1">
						<i class="ri-key-line align-bottom" /><span
							><i
								class="{icon[column.source.link.column.type]} {column.source.link.table
									.color} align-bottom rounded"
							/>
							{column.source.link.column.name}</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if records.some((r) => Array.isArray(r)) || column.aggregation}
		<div class="border-t {theme.tableBorderColor}" />
		<div class="">
			<h4>Aggregation Formula</h4>
			<p class="text-sm {theme.mutedTextColor}">
				Columns containing multiple records are aggregated to be displayed in a single row.
			</p>
		</div>
		<Dropdown>
			<div
				slot="toggle"
				class="cursor-pointer {theme.lightBackgroundColor} py-1 px-2 rounded flex items-center"
			>
				<div class="flex-grow"><i class="{icon[column.aggregation]} align-bottom" /> {column.aggregation}</div>
				<i class="ri-arrow-drop-down-line align-bottom" />
			</div>
			<div slot="menu">
				{#each typeOptions[column.source.link.column.type].aggregations as aggregation}
					<div
						on:click={() => updateAggregation(aggregation)}
						class="p-2 cursor-pointer hover:{theme.mediumBackgroundColor}"
					>
						<i class="{icon[aggregation]} align-bottom" />
						{aggregation}
					</div>
				{/each}
			</div>
		</Dropdown>
		<div class="border-t {theme.tableBorderColor}" />
		<div>
			<h4>Filter Linked Records</h4>
			<p class="text-sm {theme.mutedTextColor}">
				Add a filter to narrow down the linked records that will be included in this column.
			</p>
		</div>

		{#if !column.source.filter?.column}
			<button
				on:click={() => dispatch('addFilter', column)}
				class="p-1 {theme.lightBackgroundColor} w-full rounded"
				><i class="ri-add-line align-bottom" /> Add Filter</button
			>
		{:else}
			<div class="rounded {theme.mediumBackgroundColor} p-2 text-sm space-y-2">
				<div class="flex items-center">
					<div class="font-semibold flex-grow">Column</div>
					<button on:click={() => dispatch('deleteFilter', column)}>
						<i class="ri-delete-bin-line align-bottom" />
					</button>
				</div>
				<Dropdown>
					<div
						slot="toggle"
						class="cursor-pointer {theme.inputBackgroundColor}  border {theme.lightBorderColor} p-2 rounded flex items-center"
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
								class="hover:{theme.lightBackgroundColor} space-x-1 p-2 cursor-pointer"
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
								class="cursor-pointer border {theme.inputBackgroundColor} {theme.lightBorderColor} space-x-1 p-2 flex items-center whitespace-nowrap rounded"
							>
								<span>{column.source.filter.condition}</span>
								<i class="ri-arrow-drop-down-line align-bottom" />
							</div>
							<div slot="menu">
								{#each conditions[column.source.filter.column.type] as condition}
									<div
										class="hover:{theme.lightBackgroundColor} space-x-1 p-2"
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
							class="{theme.inputBackgroundColor} p-2 rounded w-full"
							type="text"
							bind:value={column.source.filter.value}
						/>
					{/if}
				</div>
			</div>
		{/if}
	{/if}

	<div class="border-b flex-grow {theme.tableBorderColor}" />
	<div class="space-y-2 grid">
		<button
			on:click={dispatch('deleteColumn', column)}
			class="{theme.lightBackgroundColor} p-1 rounded"
			><i class="ri-delete-bin-line align-bottom" /> Delete Column</button
		>
	</div>
</div>
