<script>
	import { theme } from '$lib/themes';
	import { isForeignKey, linksToTable } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import { icon } from '$lib/iconMap';
	import Column from './Column.svelte';

	export let tables;
	export let selectedView;
	let baseTable = selectedView.baseTable;
	let viewMode = 'available';

	const dispatch = createEventDispatcher();

	function getReferenceTable(table, column) {
		return table.constraints.find((c) => c.type == 'Foreign Key' && c.column == column.name)
			.referenceTable;
	}

	function addColumn(sourceTable, sourceColumn, column) {
		dispatch('addColumn', {
			sourceTable,
			sourceColumn,
			column
		});
	}
</script>

<div class="p-2 border-b text-sm  {theme.lightBorderColor} flex">
	<div
		on:click={() => (viewMode = 'available')}
		class:font-semibold={viewMode == 'available'}
		class="flex-grow text-center cursor-pointer"
	>
		Available
	</div>
	<div
		on:click={() => (viewMode = 'in use')}
		class:font-semibold={viewMode !== 'available'}
		class="flex-grow text-center cursor-pointer"
	>
		In Use
	</div>
</div>

<div class="leading-6">
	{#if viewMode == 'available'}
		<div class="grid">
			<input
				type="text"
				placeholder="Search Columns"
				class="p-2  {theme.inputBackgroundColor}"
			/>
		</div>

		<div class="p-2">
			<div class="{baseTable.color} w-max px-1 rounded ">{baseTable.name}</div>
		</div>
		{#each baseTable.columns as column}
			{#if !isForeignKey(baseTable, column)}
				<Column
					{baseTable}
					sourceTable={baseTable}
					{column}
					sourceColumn={column}
					on:addColumn={(e) => addColumn(e.detail.baseTable, e.detail.column, e.detail.column)}
				/>
			{:else}
				<div class="p-2 space-x-1 ">
					<span
						><i class="ri-checkbox-blank-fill align-bottom" />
						<i class="ri-key-line align-bottom" />
						{column.name}</span
					>
					<span class="{getReferenceTable(baseTable, column).color} px-1 rounded">
						{getReferenceTable(baseTable, column).name}
					</span>
				</div>

				<div class="border-l {theme.lightBorderColor} ml-4">
					{#each getReferenceTable(baseTable, column).columns as col}
						{#if !isForeignKey(getReferenceTable(baseTable, column), col)}
							<Column
								{baseTable}
								sourceTable={getReferenceTable(baseTable, column)}
								sourceColumn={column}
								column={col}
								on:addColumn={(e) =>
									addColumn(e.detail.baseTable, e.detail.sourceColumn, e.detail.column)}
							/>
						{:else}
							<div class="p-2 space-x-1">
								<span>{col.name}</span>
								<span
									class="px-1 rounded  {getReferenceTable(
										getReferenceTable(baseTable, column),
										col
									).color}"
									>{getReferenceTable(getReferenceTable(baseTable, column), col).name}</span
								>
							</div>
							<div class="border-l {theme.lightBorderColor} ml-4">
								{#each getReferenceTable(getReferenceTable(baseTable, column), col).columns as col2}
									<Column
										baseTable={getReferenceTable(baseTable, column)}
										sourceTable={getReferenceTable(getReferenceTable(baseTable, column), col)}
										sourceColumn={col}
										column={col2}
										on:addColumn={(e) =>
											addColumn(e.detail.baseTable, e.detail.sourceColumn, e.detail.column)}
									/>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/each}

		{#each tables.filter((t) => linksToTable(baseTable, t)) as table}
			<div class="p-2 space-x-1 flex flex-wrap items-center ">
				<i class="ri-checkbox-multiple-blank-fill align-bottom" />
				<div class="{table.color} px-1 rounded w-max">{table.name}</div>

				<div>
					<span>via</span>
					<i class="ri-key-line align-bottom" />
					<span
						>{table.constraints.find(
							(c) => c.type == 'Foreign Key' && c.referenceTable.id == baseTable.id
						).column}</span
					>
				</div>
			</div>

			{#each table.columns as column}
				{#if !isForeignKey(table, column)}
					<Column
						baseTable={table}
						sourceTable={table}
						sourceColumn={column}
						{column}
						on:addColumn={(e) =>
							addColumn(e.detail.baseTable, e.detail.sourceColumn, e.detail.column)}
					/>
			
				{:else if column.name !== table.constraints.find((c) => c.type == 'Foreign Key' && c.referenceTable.id == baseTable.id).column}
					<div class="p-2 space-x-1 ml-4 flex items-center">
						<span>{column.name}</span>
						<div class=" px-1 rounded {getReferenceTable(table, column).color}"
							>{getReferenceTable(table, column).name}</div
						>
					</div>

					<div class="border-l {theme.lightBorderColor} ml-8">
						{#each getReferenceTable(table, column).columns as col}
							{#if !isForeignKey(getReferenceTable(table, column), col)}
								<Column
									baseTable={table}
									sourceTable={getReferenceTable(table, column)}
									sourceColumn={column}
									column={col}
									on:addColumn={(e) =>
										addColumn(e.detail.baseTable, e.detail.sourceColumn, e.detail.column)}
								/>
							
							{:else}
								<div class="p-2 space-x-1 flex items-center">
									<span>{col.name}</span>
									<div
										class=" px-1 rounded {getReferenceTable(
											getReferenceTable(table, column),
											col
										).color}">{getReferenceTable(getReferenceTable(table, column), col).name}</div
									>
								</div>
								<div class="border-l {theme.lightBorderColor} ml-4">
									{#each getReferenceTable(getReferenceTable(table, column), col).columns as col2}
										<Column
											baseTable={getReferenceTable(table, column)}
											sourceTable={getReferenceTable(getReferenceTable(table, column), col)}
											sourceColumn={col}
											column={col2}
											on:addColumn={(e) =>
												addColumn(e.detail.baseTable, e.detail.sourceColumn, e.detail.column)}
										/>
								
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
		{/each}
	{:else}
		{#each selectedView.columns as column}
			<div class="border p-2">{column.name}</div>
		{/each}
	{/if}
</div>
