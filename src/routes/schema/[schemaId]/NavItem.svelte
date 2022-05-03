<script>
    import { theme } from "$lib/themes";
    import { icon } from "$lib/iconMap";
    export let table;
    export let url;

</script>

<a class="block p-1 hover:bg-indigo-500 hover:bg-opacity-20 rounded text-zinc-800" href="{ url }">
    <i class="{icon[table.type]} align-bottom"></i> 
    {table.name}
</a>