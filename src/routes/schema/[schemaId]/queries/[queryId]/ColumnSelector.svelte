<script>
  import { isForeignKey, linksToTable, getReferenceTable } from "$lib/utils";
  import { afterUpdate, createEventDispatcher } from "svelte";
  import Column from "./Column.svelte";
  import ColumnGroup from "./ColumnGroup.svelte";
  export let schema;
  export let query;
  let baseTable = query.baseTable;

  afterUpdate(() => {
    baseTable = query.baseTable;
  });

  let viewModes = ["All Columns", "In Use"];

  let viewMode = viewModes[0];

  const dispatch = createEventDispatcher();

  function addColumn(sourceTable, sourceColumn, column) {
    dispatch("addColumn", {
      sourceTable,
      sourceColumn,
      column,
    });
  }

  function getLinkedTables(table) {
    console.log(table, "table");
    let schemaTables = table.schema.tables;
    return schemaTables.filter((t) => linksToTable(table, t));
  }

  function getForeignKeyColumn(baseTable, table) {
    return table.constraints.find(
      (c) => c.type == "Foreign Key" && c.referenceTable.id == baseTable.id
    );
  }
</script>

<!--
<div class="grid">
	<input
		type="text"
		placeholder="Search Columns"
		class="p-2  bg-zinc-100"
	/>
</div>
-->

<div class="p-2 text-sm  border-zinc-300 flex space-x-2">
  {#each viewModes as option}
    <div
      on:click={() => (viewMode = option)}
      class:font-semibold={viewMode == option}
      class:bg-indigo-200={viewMode == option}
      class="flex-grow text-center bg-zinc-200 rounded cursor-pointer"
    >
      {option}
    </div>
  {/each}
</div>

<div class="leading-6 h-full border-b overflow-y-scroll p-2 space-y-1">
  {#if viewMode == "All Columns"}
  
  <!--
		<div class="p-2 border">
			<div class="{baseTable.color} w-max px-1 rounded ">{baseTable.name}</div>
		</div>
	-->

    {#each baseTable.columns as column}
      {#if !isForeignKey(baseTable, column)}
        <Column
          {baseTable}
          sourceTable={baseTable}
          
          {column}
          on:addColumn={(e) =>
            addColumn(e.detail.baseTable, e.detail.column, e.detail.column)}
        />
      {/if}
    {/each}

    {#each baseTable.columns as column}
      {#if isForeignKey(baseTable, column)}
        <!--FOREIGN KEY TABLES-->
        <ColumnGroup
        {baseTable}
          table={getReferenceTable(baseTable, column)}
          {column}
          on:addColumn={(e) =>
            addColumn(e.detail.baseTable, e.detail.column, e.detail.column)}
        />

        <div class="space-y-1">
          {#each getReferenceTable(baseTable, column).columns as col}
            {#if isForeignKey(getReferenceTable(baseTable, column), col)}
              <ColumnGroup
              {baseTable}
                table={getReferenceTable(
                  getReferenceTable(baseTable, column),
                  col
                )}
                column={col}
                on:addColumn={(e) =>
                  addColumn(
                    e.detail.baseTable,
                    e.detail.column,
                    e.detail.column
                  )}
              />
            {/if}
          {/each}
        </div>
      {/if}
    {/each}

    {#each getLinkedTables(baseTable) as table}
      <div class="space-y-2">
        <ColumnGroup
        {baseTable}
          {table}
          column={getForeignKeyColumn(baseTable, table)}
          on:addColumn={(e) =>
            addColumn(e.detail.baseTable, e.detail.column, e.detail.column)}
        />

        {#each table.columns as column}
          {#if !isForeignKey(table, column)}
            <!--
          <Column
            baseTable={table}
            sourceTable={table}
            sourceColumn={column}
            {column}
            on:addColumn={(e) =>
              addColumn(
                e.detail.baseTable,
                e.detail.sourceColumn,
                e.detail.column
              )}
          />
		  -->
          {:else if column.name !== getForeignKeyColumn(baseTable, table).column}
            <ColumnGroup
            {baseTable}
              table={getReferenceTable(table, column)}
              {column}
              on:addColumn={(e) =>
                addColumn(e.detail.baseTable, e.detail.column, e.detail.column)}
            />

            <div class="border">
              {#each getReferenceTable(table, column).columns as col}
                {#if isForeignKey(getReferenceTable(table, column), col)}
                  <ColumnGroup
                  {baseTable}
                    table={getReferenceTable(
                      getReferenceTable(table, column),
                      col
                    )}
                    column={col}
                    on:addColumn={(e) =>
                      addColumn(
                        e.detail.baseTable,
                        e.detail.column,
                        e.detail.column
                      )}
                  />
                  <!--
                <div class="p-2 space-x-1 flex items-center">
                  <span>{col.name}</span>
                  <div
                    class=" px-1 rounded {getReferenceTable(
                      getReferenceTable(table, column),
                      col
                    ).color}"
                  >
                    {getReferenceTable(getReferenceTable(table, column), col)
                      .name}
                  </div>
                </div>


                <div class="border-l border-zinc-300 ml-4">
                  {#each getReferenceTable(getReferenceTable(table, column), col).columns as col2}
                    <Column
                      baseTable={getReferenceTable(table, column)}
                      sourceTable={getReferenceTable(
                        getReferenceTable(table, column),
                        col
                      )}
                      sourceColumn={col}
                      column={col2}
                      on:addColumn={(e) =>
                        addColumn(
                          e.detail.baseTable,
                          e.detail.sourceColumn,
                          e.detail.column
                        )}
                    />
                  {/each}
                </div>
				-->
                {/if}
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  {/if}

  {#if viewMode == "In Use"}
    columns
  {/if}
</div>
