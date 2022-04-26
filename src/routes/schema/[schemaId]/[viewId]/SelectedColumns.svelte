<script>
	import { theme } from '$lib/themes';
	export let inspector;
	export let selectedView;
	import { icon } from '$lib/iconMap';
</script>

<div
	class="border-b p-2 flex items-center {theme.tableBorderColor}"
>
	<h4 class="text-sm font-semibold flex-grow leading-6">Columns ({selectedView.columns.length})</h4>
	<button
		on:click={() => (inspector = { action: 'Add Column' })}
		disabled={!selectedView.baseTable}
		class:opacity-60={!selectedView.baseTable}
		class="{theme.mediumBackgroundColor} w-6 rounded"><i class="ri-add-line align-bottom" /></button
	>
</div>

{#if selectedView.columns.length > 0}
	<div>
		{#if selectedView.columns.length > 0}
			<div>
				{#each selectedView.columns as column}
					<div
						
						on:click={() => (inspector = { action: 'Column', column: column })}
						class="{inspector.column == column
							? theme.lightBackgroundColor
							: ''} cursor-pointer flex items-center space-x-2 border-b text-sm {theme.tableBorderColor} hover:bg-opacity-40 bg-opacity-0 {theme.lightBackgroundColor}  p-2 w-full shrink-0"
					>
						<span class="rounded text-xs {column.source.table.color} bg-opacity-80 align-bottom px-1">
							
							<i class="{icon[column.type]}"/>
							<i class={icon[column.aggregation]} />
						</span>
						<span class="flex-grow">{column.alias}</span>
						<i class="ri-delete-bin-line {theme.mutedTextColor}"></i>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
