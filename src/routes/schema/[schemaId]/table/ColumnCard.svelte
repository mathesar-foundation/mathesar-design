<script>
    import { theme } from "$lib/themes";
    import { icon } from "$lib/iconMap";
    export let column = {};
    

    //Any columns come from the following aggregation functions, considered as derived column. AVG, COUNT,SUM,MIN,MAX,GROUPING,STDEV,STDEVP,VAR,VARP
    //If the view definition contains following syntax, all columns considered as derived column. UNION, UNION ALL, CROSSJOIN, EXCEPT, INTERSECT
    //The columns affected by GROUP BY, HAVING, DISTINCT, are also considered as derived column.
    
    </script>
    
    <div class="p-2 space-y-2 border {theme.darkBackgroundColor} rounded {theme.tableBorderColor} {theme.textColor}">

        <div>
            <i style="background-color: {column.color};" class="{icon[column.type]} rounded align-bottom"></i>
            {column.name}
        </div>
        
        <div class="flex space-x-2">
            <span>Source</span> <div class="{theme.mediumBackgroundColor} px-1 w-max rounded">{column.source.tableName} {column.source.columnName}</div>
        </div>  
        
        {#if column.source.filter}
            <div class="flex items-center space-x-2">
                <div>Filter</div>
                {#each column.source.filter as filter}
                    <div class="{theme.mediumBackgroundColor} w-max px-1 rounded">
                        {column.source.columnName}
                    </div>
                    <div class="{theme.mediumBackgroundColor} w-max px-1 rounded">
                        {filter.function}
                    </div>
                    <div class="{theme.mediumBackgroundColor} w-max px-1 rounded">
                        {filter.pattern}
                    </div>
                    
                {/each}
            </div>
        {/if}

        {#if column.source.list}
            <div class="flex items-center space-x-2">
                <div>List</div>
                <div class="{theme.mediumBackgroundColor} w-max px-1 rounded">
                    {column.source.list.function}
                </div>
                <div>with separator</div>
                <div class="{theme.mediumBackgroundColor} w-max px-2 rounded">
                     {column.source.list.separator}
                     <i class="ri-arrow-drop-down-line align-bottom"></i>
                </div>
            </div>
        {/if}

        {#if column.source.count}
            <div class="flex items-center space-x-2">
                <div>Count</div>
                <div class="{theme.mediumBackgroundColor} w-max px-1 rounded">
                    Distinct {column.source.count.distinct}
                </div>
            </div>
        {/if}

        {#if column.source.formula}
            <div class="flex items-center space-x-2">
                <div>Formula</div>
                <div class="{theme.mediumBackgroundColor} w-max px-1 rounded">
                    {column.source.formula.expression}
                </div>
            </div>
        {/if}
  
    </div>