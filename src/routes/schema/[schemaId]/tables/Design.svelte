<script>
    import { afterUpdate } from 'svelte';
    import { theme } from "$lib/themes";
    import { icon } from "$lib/iconMap";
    import groupArray from "group-array"
    import ColumnCard from './ColumnCard.svelte';

    export let table;

    let columns = table.columns.map(c => c.name);

    let groups = {}
    let ungrouped = [];

    afterUpdate(()=>{
        groups = groupArray(table.columns, 'group');
        if (table.columns) {
            ungrouped = table.columns.filter(c => !Object.values(groups).flat().includes(c));
        }
    });
</script>

<!--
<div class="flex-grow space-y-2 bg-white p-4 border-b-4 border-zinc-200">
    <h3  class="text-zinc-800">Edit View</h3>


    <div class="text-zinc-800 space-y-2">

    <div class="border rounded space-y-2 p-2 border-zinc-200">

    {#each table.columns as column}
        <div class="space-y-2 border p-2 rounded border-zinc-200">
        <div class="space-x-1 border-zinc-200">
            <i style="background-color: {column.color};" class="rounded {icon[column.type]} align-bottom"></i>
            <span>{column.name}</span>
        </div>
            <div class="flex space-x-1">
                <span class="text-zinc-500">From</span>
                <span class="rounded bg-zinc-200 px-1">{column.source.tableName}</span>
                <span class="rounded bg-zinc-200 px-1">{column.source.columnName}</span>
            </div>
   
            {#if column.source.filter}
                <div class="flex space-x-1">
                <span class="text-zinc-500">Where</span>
                {#each column.source.filter as filter}
                    <span class="rounded bg-zinc-200 px-1">{filter.columnId}</span>
                    <span class="rounded bg-zinc-200 px-1">{filter.function}</span>
                    <span class="rounded bg-zinc-200 px-1">{filter.pattern}</span>
                {/each}
                </div>
            {/if}
    
            {#if column.source.formula}
            <div class="flex space-x-1">
                <div class="text-zinc-500">Formula</div>
                <span class="rounded bg-zinc-200 px-1">{column.source.formula.expression}</span>
                </div>
            {/if}

            {#if column.aggregation}
                <div class="flex space-x-1">
                    <div class="text-zinc-500">Aggregation</div>
                    <span class="rounded bg-zinc-200 px-1">{column.aggregation.function}</span>
                    <span class="rounded bg-zinc-200 px-1">{column.aggregation.option}</span>
                </div>
            {/if}
        </div>

        

    {/each}

     
    {#if table.group}
    <div class="flex space-x-1">
        <div class="text-zinc-500">Group By</div>
        <span class="rounded bg-zinc-200 px-1">{table.group.tableId}</span>
        <span class="rounded bg-zinc-200 px-1">{table.group.columnId}</span>
    </div>

    {/if}
    {#if table.join}
    <div>
        <div class="border p-2 border-zinc-200">
            From 
            <span class="border px-1">{ table.join.tableLeft }</span> 
            Inner Join 
            <span class="border px-1">{ table.join.tableRight }</span> 
            On
            <span class="border px-1">{ table.join.columnLeft }</span> 
            =
            <span class="border px-1">{ table.join.columnRight }</span> 
        </div>
    </div>
    {/if}
        

    </div>
    
    </div>
 
</div>
-->