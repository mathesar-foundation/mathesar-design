<script>
	import { createEventDispatcher } from 'svelte';
	import { theme } from '$lib/themes';
	import { icon } from '$lib/iconMap';
	import Dropdown from '$lib/Dropdown.svelte';
	import { newView } from '$lib/utils';
	import _ from "lodash";

	import Modal from '$lib/Modal.svelte';

	//import NewView from './table/NewView.svelte';
	import Filter from './table/Filter.svelte';

	export let table;

	const dispatch = createEventDispatcher();

	let showModal = false;
	const handleToggleModal = () => {
		showModal = !showModal;
	};

	function linkTable() {
		dispatch('linkTable');
	}
</script>

<div class="{theme.textColor} flex items-center space-x-3 border-b {theme.darkBackgroundColor} bg-opacity-40  {theme.tableBorderColor}">
	<Dropdown>
		<button slot="toggle" class="text-lg px-2 py-3 space-x-1 {theme.backgroundColor} bg-opacity-10 hover:bg-opacity-80"
			><i style="color:{table.color}" class="{icon[table.type]} align-bottom" />
			<span>{table.name}</span> <i class="ri-arrow-drop-down-line align-bottom" /></button
		>
		<div slot="menu">
			<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
				Rename {_.startCase(table.type)}
			</div>
			<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
				Duplicate {_.startCase(table.type)}
			</div>

			{#if table.type == "table"}
				<div class="border-t {theme.tableBorderColor}"></div>
				<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
					Table Constraints
				</div>
				<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
					Table Preferences
				</div>
				<div on:click={() => dispatch('CreateView', newView(table))} class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
					Open in Data Explorer
				</div>
			{/if}

			{#if table.type == "view"}
				<div class="border-t {theme.tableBorderColor}"></div>
				<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
					Edit Query
				</div>
				<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 {theme.mediumBackgroundColor} cursor-pointer">
					View SQL Query
				</div>
			{/if}
			<div class="border-t {theme.tableBorderColor}"></div>
			<div class="px-2 py-1 hover:bg-opacity-40 bg-opacity-0 space-x-1 {theme.mediumBackgroundColor} cursor-pointer">
				<i class="ri-delete-bin-line align-bottom"></i> <span>Delete {_.startCase(table.type)}</span>	
			</div>
		</div>
	</Dropdown>
</div>

<!--
<div class="{theme.textColor} flex items-center space-x-3 px-2 border-b {theme.tableBorderColor}">
	<div class="flex-grow flex items-center space-x-3">
		<Dropdown>
			<button slot="toggle" class="text-xl"
				><i style="color:{table.color}" class="ri-table-fill align-bottom" />
				{table.name} <i class="ri-arrow-drop-down-line align-bottom" /></button
			>
			<div slot="menu">
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer">
					Table Constraints
				</div>
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer">
					Table Preferences
				</div>
				<div class="px-2 py-1 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer">
					Delete Table
				</div>
			</div>
		</Dropdown>

		<Filter {table} />
		<button class="border rounded py-1 px-2 {theme.tableBorderColor}"
			><i class="ri-arrow-up-down-fill align-bottom {theme.primaryTextColor}" /> Sort</button
		>
		<button class="border rounded py-1 px-2 {theme.tableBorderColor}"
			><i class="ri-layout-row-fill align-bottom {theme.primaryTextColor}" /> Group</button
		>
	</div>

	{#if table.type == 'view'}
		<div class="border-l flex items-center p-2 space-x-2 {theme.tableBorderColor}">
			<div>Query</div>
			<a
				class="border rounded p-1 w-32 text-center {theme.mediumBorderColor}"
				href="/schema/{table.schema.id}/{table.id}">Edit</a
			>
			<a
				class="border rounded p-1 w-32 text-center {theme.mediumBorderColor}"
				href="/schema/{table.schema.id}/{table.id}">View SQL</a
			>
		</div>
		
	{/if}

	{#if table.type == 'table'}
		<Dropdown>
			<button slot="toggle" class="border rounded py-1 px-2 {theme.tableBorderColor}"
				><i class="ri-add-line align-bottom" /> New View from Table</button
			>
			<div slot="menu">
				<div
					on:click={() => dispatch('CreateView', newView(table))}
					class="px-2 py-1 p-2 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer"
				>
					<div>All Records</div>
					<div class="text-sm {theme.mutedTextColor}">
						Create a view with all records from this table
					</div>
				</div>
				<div
					class="px-2 py-1 p-2 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer"
				>
					<div>Filtered Only</div>
					<div class="text-sm {theme.mutedTextColor}">
						Create a view based on your current filter options
					</div>
				</div>
				<div
					class="px-2 py-1 p-2 hover:{theme.darkPrimaryColor} hover:bg-opacity-40 cursor-pointer"
					on:click={() => handleToggleModal()}
				>
					<div>Duplicates Only</div>
					<div class="text-sm {theme.mutedTextColor}">Create a view containing duplicates only</div>
				</div>
			</div>
		</Dropdown>

		<button on:click={linkTable} class="border rounded py-1 px-2 {theme.tableBorderColor}"
			><i class="ri-links-fill align-bottom" /> Link Table</button
		>
	{/if}
</div>
-->
<!--

<button
      
      class="menu focus:outline-none focus:shadow-solid text-xl"
    >
        {#if icon }
        <i class="{icon} align-bottom mr-1" style="color:{ iconColor }"></i>
        {/if}

        {#if label }
      { label }
         {/if}
      <i class="ri-arrow-drop-down-line align-bottom"></i>
    </button>-->
