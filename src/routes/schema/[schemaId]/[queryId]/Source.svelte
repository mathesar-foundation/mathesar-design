<script>
    import { theme } from '$lib/themes';
    import { icon } from '$lib/iconMap';

    export let column;
    export let externalLink;
</script>

<div class="border {theme.lightBorderColor} rounded p-2 space-y-4 text-sm">
    <div class="grid grid-cols-3">
        <div class="col-span-1">Column</div>
        <div class="text-sm col-span-2">
            <i class="{icon[column.type]} {column.source.table.color} align-bottom rounded" />
            {column.name}
        </div>
    </div>

    <div class="grid grid-cols-3">
        <div class="col-span-1">Table</div>
        <div class="text-sm col-span-2">
            <span class="rounded px-1 bg-opacity-20 {column.source.table.color}"
                >{column.source.table.name}</span
            >
        </div>
    </div>

    <div class="grid grid-cols-3">
        <div class="col-span-1">Link</div>

        <div class="text-sm col-span-2">
            {#if externalLink}
                <span class="rounded px-1 bg-opacity-20 {externalLink.referenceTable.color}"
                    >{externalLink.referenceTable.name}</span
                >
                {externalLink.column}
            {/if}
            <span class="rounded px-1 bg-opacity-20 {column.source.link.table.color}"
                >{column.source.link.table.name}</span
            >
            <div class="space-x-1">
                <i class="ri-key-line align-bottom" /><span
                    ><i
                        class="{icon[column.source.link.column.type]} {column.source.link.table
                            .color} align-bottom rounded"
                    />
                    {column.source.link.column.name}</span
                >
            </div>
        </div>
    </div>
</div>