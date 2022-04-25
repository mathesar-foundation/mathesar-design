<script>
    import { theme } from '$lib/themes';
    import { createEventDispatcher } from 'svelte';
    import { icon } from '$lib/iconMap';
    export let baseTable;
    export let sourceColumn;
    export let sourceTable;
    export let column;

    const dispatch = createEventDispatcher();

</script>

<div
	on:click={() => dispatch('addColumn',{baseTable, sourceColumn, column})}
	class="p-2 cursor-pointer hover:bg-opacity-40 {theme.mediumBackgroundColor} bg-opacity-0"
>
	<i class="{icon[column.type]} align-bottom {sourceTable.color} rounded mr-1" />
	{column.name}
</div>
