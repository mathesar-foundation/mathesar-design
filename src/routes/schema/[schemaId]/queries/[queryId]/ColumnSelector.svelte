<script>
	import { theme } from '$lib/themes';
	import { isForeignKey, linksToTable } from '$lib/utils';
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import { icon } from '$lib/iconMap';
	import Column from './Column.svelte';

	export let tables;
	export let selectedView;
	let baseTable = selectedView.baseTable;

	afterUpdate(()=>{
		baseTable = selectedView.baseTable;
	})

	let viewModes = [
		'In Table',
		'Linked Tables',
		'In Use'
	]
	
	let viewMode = viewModes[0];

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

<!--
<div class="grid">
	<input
		type="text"
		placeholder="Search Columns"
		class="p-2  bg-zinc-100"
	/>
</div>
-->


<div class="p-2 text-sm  border-zinc-300 flex space-x-2">
	{#each viewModes as option}
		<div
		on:click={() => (viewMode = option)}
		class:font-semibold={viewMode == option}
		class:bg-indigo-200={viewMode == option}
		class="flex-grow text-center bg-zinc-200 rounded cursor-pointer"
		>
		{option}
		</div>
	{/each}
</div>

<div class="leading-6 h-full border-b overflow-y-scroll p-2 space-y-1">

		{#if viewMode == "In Table"}

		<!--
		<div class="p-2 border">
			<div class="{baseTable.color} w-max px-1 rounded ">{baseTable.name}</div>
		</div>
		-->

		{#each baseTable.columns as column}
			{#if !isForeignKey(baseTable, column)}
				<Column
					{baseTable}
					sourceTable={baseTable}
					{column}
					sourceColumn={column}
					on:dragColumn
					on:dropColumn
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

				<div class="border-l-2 border-zinc-300 ml-4 space-y-1 pl-1">
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
							<div class="border-l-2 border-zinc-300 ml-4 space-y-1 pl-1">
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
		
		{/if}

		
		
		{#if viewMode == "Linked Tables"}

		{#each tables.filter((t) => linksToTable(baseTable, t)) as table}
			<div class="p-2 space-x-1 flex flex-wrap items-center ">
				<i class="ri-checkbox-multiple-blank-fill align-bottom" />
				<div class="px-1 rounded w-max" style="background-color: {table.color};">{table.name}</div>

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

					<div class="border-l border-zinc-300 ml-8">
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
								<div class="border-l border-zinc-300 ml-4">
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

		{/if}


		{#if viewMode == "In Use"}
			columns
		{/if}

		
	
</div>
