<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import { icon } from '$lib/iconMap';
	import Dropdown from '$lib/Dropdown.svelte';
	import DataType from './DataType.svelte';
	export let column;
	export let table;
	let editDataType;
</script>

<div
	class="border-r bg-opacity-0 bg-zinc-50 flex items-center p-2 border-zinc-200 text-zinc-800 w-80"
>
	<Dropdown full={true} closeOnClick={false}>
		
		<div class="cursor-pointer space-x-2 flex items-center" slot="toggle">
	
				<div class="px-1 text-sm rounded text-center bg-zinc-100" style="background-color:{column.source?.table.color}">
				<i class="{icon[column.type]}"/>
				{#if column.aggregation}
				<i class="{icon[column.aggregation]}"></i>
				{/if}
				</div>
				
				<div>{table.type == "table"?column.name:column.alias}</div>
		
		</div>

		<div slot="menu" class="text-sm py-2">
			
			<DataType bind:editDataType={editDataType} bind:column={column} on:save={()=>editDataType = false} />

			{#if !editDataType}
			<div class="space-y-2">
				<div class="border-b space-y-2 px-2 pb-2 border-zinc-200">
					<div class="text-zinc-500 text-xs">Data Type</div>

					<div class="space-x-2 w-full cursor-pointer flex items-center" on:click={()=> editDataType = true}>
						<i
							class="rounded align-bottom {icon[column.type]}"
							style="background-color: {column.color};"
						/>
						<span class="capitalize">{column.type}</span>
						<span
							class="text-sm align-bottom font-mono bg-zinc-200 px-1 rounded text-zinc-500"
							>{column.db}</span
						>
						<div class="flex-grow"></div>
						<i class="ri-arrow-right-s-line align-bottom"></i>
					</div>

					{#if column.source}
						<div class="space-y-1 grid">
							<h4 class="text-zinc-500 text-xs">Source</h4>
							<div class="border border-zinc-200 rounded p-2 space-y-2">
								<div class="grid grid-cols-3">
									<div class="col-span-1">Column</div>

									<div class="col-span-2">
										<i class="{icon[column.type]} align-bottom" />{column.name}
									</div>
								</div>

								<div class="grid grid-cols-3">
									<div class="col-span-1">Table</div>
									<div class="col-span-2">
										<i class="ri-table-line align-bottom" />
										{column.source.table.name}
									</div>
								</div>

								<div class="grid grid-cols-3">
									<div class="col-span-1">Link</div>
									<div class="col-span-2">
										<span
											><i class="ri-table-line align-bottom" />
											{column.source.link.table.name}</span
										>
										<span
											><i class="ri-key-line align-bottom" /> {column.source.link.column.name}</span
										>
									</div>
								</div>
							</div>
						</div>
					{:else}
						{#if table.type == "view"}
							<div class="border rounded p-2">
							This view's source cannot be located. Some features may be limited.
							</div>
						{/if}
					{/if}
				</div>

				<div class="text-zinc-500 text-xs mb-1 px-2">Operations</div>
				<div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer">
					<i class="ri-sort-asc align-bottom" /> Sort Ascending
				</div>
				<div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer">
					<i class="ri-sort-desc align-bottom" /> Sort Descending
				</div>
				<div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer">
					<i class="ri-layout-row-fill align-bottom" /> Group by Column
				</div>
				{#if table.type == "table"}
				<div class="px-2 py-1 hover:bg-zinc-100 cursor-pointer" on:click={()=> dispatch('deleteColumn',column)}>
					<i class="ri-delete-bin-line align-bottom"></i> Delete Column
				</div>
				{/if}
			</div>
			{/if}
		</div>
		
	</Dropdown>
	
</div>

<!--
    style="background-color: {$colorsStore[column.source.tableId].hex.value};"
-->
