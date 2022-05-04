<script>
	import { theme } from '$lib/themes';
	export let inspector;
	export let selectedView;
	export let missingTables;
	export let missingColumns;
	import { icon } from '$lib/iconMap';
</script>

<div
	class="border-b p-2 flex items-center border-zinc-200"
>
	<h4 class="text-sm font-semibold flex-grow leading-6">Columns ({selectedView.columns.length})</h4>
	<button
		on:click={() => (inspector = { action: 'Add Column' })}
		disabled={!selectedView.baseTable}
		class:opacity-60={!selectedView.baseTable}
		class="bg-zinc-200 w-6 rounded"><i class="ri-add-line align-bottom" /></button
	>
</div>

{#if selectedView.columns.length > 0}
	<div>
		{#if selectedView.columns.length > 0}
			<div>
				{#each selectedView.columns as column}
					<div
						
						on:click={() => (inspector = { action: 'Column', column: column })}
						class:bg-red-100={missingTables[column.source.table.id] || missingColumns[column.id]}
						class="cursor-pointer flex items-center space-x-2 border-b text-sm border-zinc-200 p-2 w-full shrink-0"
					>
						{#if missingTables[column.source.table.id] || missingColumns[column.id]}
							<i class="ri-error-warning-fill align-bottom"></i>
						{/if}
						<span class="rounded text-xs bg-opacity-80 align-bottom px-1" style="background-color:{column.source.table.color}">
							
							<i class="{icon[column.type]}"/>
							<i class={icon[column.aggregation]} />
						</span>
						<span class="flex-grow">{column.alias}</span>
						<i class="ri-delete-bin-line text-zinc-500"></i>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
