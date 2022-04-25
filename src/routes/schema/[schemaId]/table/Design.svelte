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
<div class="flex-grow space-y-2 {theme.backgroundColor} p-4 border-b-4 {theme.tableBorderColor}">
    <h3  class="{theme.textColor}">Edit View</h3>


    <div class="{theme.textColor} space-y-2">

    <div class="border rounded space-y-2 p-2 {theme.tableBorderColor}">

    {#each table.columns as column}
        <div class="space-y-2 border p-2 rounded {theme.tableBorderColor}">
        <div class="space-x-1 {theme.tableBorderColor}">
            <i style="background-color: {column.color};" class="rounded {icon[column.type]} align-bottom"></i>
            <span>{column.name}</span>
        </div>
            <div class="flex space-x-1">
                <span class="{theme.mutedTextColor}">From</span>
                <span class="rounded {theme.mediumBackgroundColor} px-1">{column.source.tableName}</span>
                <span class="rounded {theme.mediumBackgroundColor} px-1">{column.source.columnName}</span>
            </div>
   
            {#if column.source.filter}
                <div class="flex space-x-1">
                <span class="{theme.mutedTextColor}">Where</span>
                {#each column.source.filter as filter}
                    <span class="rounded {theme.mediumBackgroundColor} px-1">{filter.columnId}</span>
                    <span class="rounded {theme.mediumBackgroundColor} px-1">{filter.function}</span>
                    <span class="rounded {theme.mediumBackgroundColor} px-1">{filter.pattern}</span>
                {/each}
                </div>
            {/if}
    
            {#if column.source.formula}
            <div class="flex space-x-1">
                <div class="{theme.mutedTextColor}">Formula</div>
                <span class="rounded {theme.mediumBackgroundColor} px-1">{column.source.formula.expression}</span>
                </div>
            {/if}

            {#if column.aggregation}
                <div class="flex space-x-1">
                    <div class="{theme.mutedTextColor}">Aggregation</div>
                    <span class="rounded {theme.mediumBackgroundColor} px-1">{column.aggregation.function}</span>
                    <span class="rounded {theme.mediumBackgroundColor} px-1">{column.aggregation.option}</span>
                </div>
            {/if}
        </div>

        

    {/each}

     
    {#if table.group}
    <div class="flex space-x-1">
        <div class="{theme.mutedTextColor}">Group By</div>
        <span class="rounded {theme.mediumBackgroundColor} px-1">{table.group.tableId}</span>
        <span class="rounded {theme.mediumBackgroundColor} px-1">{table.group.columnId}</span>
    </div>

    {/if}
    {#if table.join}
    <div>
        <div class="border p-2 {theme.tableBorderColor}">
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