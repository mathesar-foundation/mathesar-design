<script>
    import { theme } from '$lib/themes';
    import { icon } from '$lib/iconMap';

    export let column;
    export let externalLink;

    
</script>

<div class="border border-zinc-300 rounded p-2 space-y-4 text-sm">
    <div class="grid grid-cols-3">
        <div class="col-span-1">Table</div>
        <div class="text-sm col-span-2">
            <span class="rounded px-1 bg-opacity-20" style="background-color: {column.source.table.color};"
                >{column.source.table.name}</span
            >
        </div>
    </div>

    <div class="grid grid-cols-3">
        <div class="col-span-1">Column</div>
        <div class="text-sm col-span-2">
            <i class="{icon[column.type]} align-bottom rounded" style="background-color: {column.source.table.color};"/>
            {column.name}
        </div>
    </div>

    
    {#if column.source.table.id  !== column.source.link.table.id || externalLink}
    <div class="grid grid-cols-3">
        <div class="col-span-1">Link</div>
        
        <div class="text-sm col-span-2">
            {#if externalLink}
                <span>Linked to</span> 
                <span class="rounded px-1 bg-opacity-20" style="background-color: {externalLink.referenceTable.color};"
                    >{externalLink.referenceTable.name}</span
                >
                <span>via <i class="{icon[externalLink.type]} align-bottom"></i></span> 
                
                <span>{externalLink.column}</span>
                        in
                <span class="rounded px-1 bg-opacity-20 whitespace-nowrap" style="background-color: {column.source.link.table.color}"
                >{column.source.link.table.name}</span
            >
            {:else}
                
                <span>Linked From</span> 
                <span class="rounded px-1 bg-opacity-20" style="background-color: {column.source.table.color};"
                    >{column.source.table.name}</span
                >
                <span>via</span>
                <span class="space-x-1">
                    <i class="ri-key-line align-bottom" />
                    <span>
                        <i class="{icon[column.source.link.column.type]} align-bottom rounded" style="background-color: {column.source.link.table.color};"/>
                        {column.source.link.column.name}
                    </span>
                </span>
                <span>in</span> 
                <span class="rounded px-1 bg-opacity-20" style="background-color: {column.source.link.table.color}"
                    >{column.source.link.table.name}</span
                >
                {/if}
           
            

            
        </div>
       
    </div>
    {/if}
</div>