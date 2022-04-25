<script>
	import { theme } from '$lib/themes';
	import { hexToRGB } from '$lib/utils';
	export let cell;
	export let table = {};
	export let column = {};
</script>

<div
	style={table.group && table.group.columnId == column.id
		? `background:${hexToRGB(column.color, 0.05)}`
		: ''}
	class="hover:{theme.darkPrimaryColor} hover:bg-opacity-20 p-2 border-r w-80 {theme.tableBorderColor} {theme.textColor}"
>
	{cell}
</div>
