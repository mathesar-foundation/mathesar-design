<script>
    import { theme } from "$lib/themes";
    import { icon } from "$lib/iconMap";
    export let table;
    export let url;

</script>

<a class="block p-1 hover:{theme.primaryColor} hover:bg-opacity-20 rounded {theme.textColor}" href="{ url }">
    <i class="{icon[table.type]} align-bottom" style="color:{table.color}"></i> 
    {table.name}
</a>