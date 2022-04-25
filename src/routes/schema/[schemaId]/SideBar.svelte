<script>
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { theme } from '$lib/themes';
	import { v4 as uuidv4 } from 'uuid';

	export let schema;

	const dispatch = createEventDispatcher();

	function addNew() {
		dispatch('addNew', {
			type: 'view'
		});
	}
</script>

<div class="flex w-96 shrink-0">
	<div class={theme.darkBackgroundColor}>
		<div class="w-12 h-12 {theme.textColor} flex"><i class="ri-menu-line text-lg m-auto" /></div>
		<div class="w-12 h-12 {theme.textColor} flex">
			<i class="ri-function-line text-lg m-auto" />
		</div>
	</div>
	<div
		class="flex flex-grow flex-col border-r {theme.tableBorderColor} h-full {theme.darkPrimaryColor} bg-opacity-10"
	>
		<input
			type="text"
			class="{theme.inputBackgroundColor} bg-opacity-40 p-2"
			placeholder="Type to Search"
		/>

		<div>
			<div
				class="flex text-sm {theme.textColor} p-2 space-x-4 border-b leading-6 {theme.tableBorderColor}"
			>
				<button>All ({schema.tables.length})</button>
				<button>Tables ({schema.tables.length})</button>
				<button>Views ({schema.views.length})</button>
			</div>

			<div>
				<div class="p-2 border-b {theme.darkBackgroundColor} flex items-center {theme.tableBorderColor}">
					<h4 class="{theme.textColor} font-semibold text-sm">Views</h4>
					<a
						href="http://{$page.url.host}/schema/{schema.id}/{uuidv4()}"
						class="ml-auto {theme.textColor} text-sm"
						><i class="ri-add-line align-bottom" />Add View</a
					>
				</div>
				{#each schema.views as table, i}
					<div
						class="{theme.textColor} p-2 border-b {theme.tableBorderColor} cursor-pointer"
						on:click={() => dispatch('openObject', table)}
					>
						{table.name}
					</div>
				{/each}
			</div>

			<div>
				<div class="p-2 border-b {theme.darkBackgroundColor} {theme.tableBorderColor}">
					<h4 class="{theme.textColor} font-semibold text-sm">Tables</h4>
				</div>
				{#each schema.tables as table, i}
					<div
						class="{theme.textColor} p-2 border-b {theme.tableBorderColor} cursor-pointer"
						on:click={() => dispatch('openObject', table)}
					>
						{table.name}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
