<script>
	import { theme } from '$lib/themes';
	import { icon } from '$lib/iconMap';
	import { hexToRGB } from '$lib/utils';
	import Dropdown from '$lib/Dropdown.svelte';
	export let column = {};
</script>

<div
	class="border-r hover:{theme.darkBackgroundColor} flex items-center p-2 {theme.tableBorderColor} {theme.textColor} w-80"
>
	<Dropdown full={true}>
		<div class="space-y-1 cursor-pointer" slot="toggle">
			<div>
				<i
					class="rounded align-bottom {icon[column.type]} {column.source?.table.color||theme.lightBackgroundColor}"
					
				/>
				<span>{column.name}</span>
			</div>
		</div>

		<div slot="menu" class="text-sm py-2">
			<div class="space-y-2">
				<div class="border-b space-y-2 px-2 pb-2 {theme.tableBorderColor}">
					<div class="{theme.mutedTextColor} text-xs">Data Type</div>
					<div class="space-x-1">
						<i
							class="rounded align-bottom {icon[column.type]}"
							style="background-color: {column.color};"
						/>
						<span class="capitalize">{column.type}</span>
						<span
							class="text-xs font-mono {theme.mediumBackgroundColor} px-1 rounded {theme.mutedTextColor}"
							>{column.db}</span
						>
					</div>

					{#if column.source}
						<div class="space-y-1 grid">
							<h4 class="{theme.mutedTextColor} text-xs">Source</h4>
							<div class="border {theme.tableBorderColor} rounded p-2 space-y-2">
								<div class="grid grid-cols-3">
									<div class="col-span-1">Column</div>

									<div class="col-span-2">
										<i class="{icon[column.type]} align-bottom" />
										{column.name}
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
					{/if}
				</div>

				<div class="{theme.mutedTextColor} text-xs mb-1 px-2">Operations</div>
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer">
					<i class="ri-sort-asc align-bottom" /> Sort Ascending
				</div>
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer">
					<i class="ri-sort-desc align-bottom" /> Sort Descending
				</div>
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer">
					<i class="ri-layout-row-fill align-bottom" /> Group by Column
				</div>
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 text-gray-500">
					Delete Column
				</div>
			</div>
		</div>
	</Dropdown>
</div>

<!--
    style="background-color: {$colorsStore[column.source.tableId].hex.value};"
-->
