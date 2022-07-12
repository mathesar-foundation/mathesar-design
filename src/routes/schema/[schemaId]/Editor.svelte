<script>
    import * as Flatted from "flatted";
    import BaseTableSelector from "./queries/[queryId]/BaseTableSelector.svelte";
    import ColumnSelector from "./queries/[queryId]/ColumnSelector.svelte";
    import ColumnEditor from "./queries/[queryId]/ColumnEditor.svelte";
    import TablePreview from "./queries/[queryId]/TablePreview.svelte";
    import Transformations from "./queries/[queryId]/Transformations.svelte";
    import Parameters from "./queries/[queryId]/Parameters.svelte";
    import pluralize from "pluralize";
    import _ from "lodash";
    
    export let schema;
    export let query;

    import {applySteps, previewSteps, getColumnNameIndex, getColumnRecords} from "$lib/utils";

    let runQuery;
    let missingTables = {};
    let missingColumns = {};
    let inspector = { action: "Query Output" };


    function addColumn(table, column, _column) {
        let newColumn = createNewColumn(table, column, _column);
        query.columns.push(newColumn);
        query.records = getColumnRecords(query);
        query = query;
        applySteps(query);
    }

    function createNewColumn(table, column, _column) {
    let source;

    if (column !== _column) {
      source = getReferenceTable(table, column);
    } else {
      source = table;
    }

    let newColumn = {
      ..._column,
      alias: `${_column.name}`,
      source: {
        table: { ...source },
      },
    };

    if (!table.id == query.baseTable.id) {
      newColumn.aggregation = typeOptions[newColumn.type].aggregations[0];
    }

    if (column !== _column) {
      newColumn.alias = `${source.name}_${_column.name}_${column.name.replace(
        "Id",
        ""
      )}`;
    }

    newColumn.source.link = {
      column: column,
      table: table,
    };

    return newColumn;
  }

  function deleteColumn(column) {
    query.columns.splice(getColumnNameIndex(query, column), 1);
    query.records = getColumnRecords(query);
    query = query;
  }


  
</script>

<!--
<div class="p-2">
    {query.name}
</div>
-->

<div class="flex-grow h-full flex text-zinc-800 max-w-full overflow-hidden">
    <div
      on:click|self={() => (inspector = { action: "Query Output" })}
      class="h-full flex flex-col bg-zinc-50 w-80 "
    >
      <div>
        <BaseTableSelector
          schema={schema}
          bind:query
          on:tableSelected={(e)=> query.baseTable = e.detail}
          
        />
      </div>

      <div class="border h-full overflow-hidden">
        {#if query.baseTable}
          <ColumnSelector
            schema={schema}
            on:addColumn={(e) =>
              addColumn(
                e.detail.sourceTable,
                e.detail.sourceColumn,
                e.detail.column
              )}
            tables={schema.tables}
            bind:query
          />
        {/if}
      </div>

      <!--
      <div>
        <SelectedColumns
          {missingColumns}
          {missingTables}
          bind:query
          bind:inspector
        />
      </div>
      -->

      <div />
    </div>

    <div class="w-7/12 p-2 border-r border-l space-y-2">
      {#if Object.keys(missingTables).length > 0}
        <div
          class="bg-red-100 border-l-4 border-red-500 p-4 rounded text-left"
        >
          <div class="font-semibold">
            <i class="ri-error-warning-fill align-bottom font-light" /> Warning
          </div>
          This query cannot be run because it is missing {Object.keys(
            missingTables
          ).length}
          {pluralize("table", Object.keys(missingTables).length)}.
        </div>
      {/if}

      {#if Object.keys(missingColumns).length > 0}
        <div
          class="bg-red-100 border-l-4 border-red-500 p-4 rounded text-left"
        >
          <div class="font-semibold">
            <i class="ri-error-warning-fill align-bottom font-light" /> Warning
          </div>
          This query cannot be run because it is missing {Object.keys(
            missingColumns
          ).length}
          {pluralize("column", Object.keys(missingColumns).length)}.
        </div>
      {/if}

      <div
        class="border overflow-hidden rounded border-zinc-200 flex flex-col h-full"
        on:click|self={() => (inspector = { action: "Query Output" })}
      >
        {#if runQuery && !!schema.queries.find((v) => v.id == query.id)}
          <div class="h-full w-full p-8 text-center space-y-2">
            <div class="text-xl text-zinc-500">
              Run query or preview to list results
            </div>
            <button
              disabled={Object.keys(missingTables).length > 0}
              class:opacity-50={Object.keys(missingTables).length > 0}
              class="border p-2 rounded border-zinc-300"
              on:click={() => (runQuery = !runQuery)}>Run Query</button
            >
            <button
              disabled={Object.keys(missingTables).length > 0}
              class:opacity-50={Object.keys(missingTables).length > 0}
              class="border p-2 rounded bg-zinc-50"
              on:click={() => (runQuery = !runQuery)}>Preview</button
            >
          </div>
        {:else if query.columns.length > 0}
          <div class="p-2 flex items-center space-x-4">
            <h3 class="font-semibold">Result</h3>
            <p class="text-sm text-zinc-500">Query Run Succesfully</p>
          </div>
          <TablePreview
            records={applySteps(query)}
            tables={schema.tables}
            bind:inspector
            bind:query
          />
        {:else if !query.baseTable}
          <div
            class="border-t bg-zinc-50 opacity-40 text-center text-zinc-500 border-zinc-200 p-10 flex-grow"
          >
            <span class="text-xl">Select a base table to get started</span>
          </div>
        {:else}
          <div
            class="border-t bg-zinc-50 opacity-40 text-center text-zinc-500 border-zinc-200 p-10 flex-grow"
          >
            <span class="text-xl">Select or drop columns</span>
          </div>
        {/if}
      </div>
    </div>

    <div class="flex flex-col w-80 h-full overflow-y-scroll bg-zinc-50 flex-grow">
      <div class="text-sm font-semibold border-b border-zinc-200 p-2">
        <h4 class="leading-6">{inspector.action}</h4>
      </div>

      {#if inspector.action == "Query Output"}
        <div class="p-2 space-y-2 border-b">
          <Parameters bind:query />
        </div>
        <Transformations
          on:previewStep={(e) => previewSteps(query,e.detail)}
          on:AddStep={(e) => applySteps(e.detail)}
          on:deleteStep={(e) => {
            applySteps(query);
          }}
          bind:query
        />
      {/if}

      <!--
        <div class="p-2 space-y-4 border-t">
          <h4 class="font-semibold text-sm">Save Options</h4>
          
          <div class="grid space-y-2">
            <div class="grid space-y-1">
              <label class="text-sm font-semibold" for="viewName"
                >Query Name</label
              >
              <input
                type="text"
                class="p-2 rounded bg-zinc-100 border border-zinc-300"
                bind:value={query.name}
              />
            </div>
            {#if schema.queries.find((v) => v.id == query.id)}
              <button
                on:click={saveQuery}
                disabled={!query.baseTable}
                class:opacity-60={!query.baseTable}
                class="w-full border border-zinc-300 text-zinc-800 p-1 text-sm rounded"
                >Save Changes to Query</button
              >
            {:else}
              <button
                on:click={saveQuery}
                disabled={!query.baseTable}
                class:opacity-60={!query.baseTable}
                class="w-full border border-zinc-300 text-zinc-800 p-1 text-sm rounded"
                >Save Query</button
              >

              <a
                href="./"
                class="w-full block text-center border border-zinc-300 bg-zinc-50 text-zinc-800 p-1 text-sm rounded"
                >Close without Saving</a
              >
            {/if}
          </div>
          
          {#if schema.queries.find((v) => v.id == query.id)}
            <div class="border-b border-zinc-200" />
            <div class="space-y-1">
              <h4 class="font-semibold text-sm">Publish as View</h4>
              <p class="text-xs text-zinc-500">
                Views differ from saved queries in that they don't include
                the Data Explorer configuration—transformation steps, and
                filters—along with the query.
              </p>
            </div>
            <button
              on:click={saveView}
              disabled={!query.baseTable}
              class:opacity-60={!query.baseTable}
              class="w-full border border-zinc-300 text-zinc-800 p-1 text-sm rounded"
              >Publish View</button
            >
          {/if}
          <div class="border-b border-zinc-200" />
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">SQL Query</h4>
            <p class="text-xs text-zinc-500">
              This view is a virtual table based on a SQL statement's result
              set. The SQL below can be used to recreate this view.
            </p>
          </div>

          <button
            disabled={!query.baseTable}
            class:opacity-60={!query.baseTable}
            class="w-full bg-zinc-50 text-zinc-800 border border-zinc-300 p-1 text-sm rounded"
            >View SQL Query</button
          >
        </div>
      -->

      {#if inspector.action == "Add Column"}
        <div>
          <ColumnSelector
            on:addColumn={(e) =>
              addColumn(
                e.detail.sourceTable,
                e.detail.sourceColumn,
                e.detail.column
              )}
            bind:query
          />
        </div>
      {/if}

      {#if inspector.action == "Column"}
        <ColumnEditor
          
          on:deleteColumn={(e) => deleteColumn(e.detail)}
          bind:query
          bind:column={inspector.column}
        />
      {/if}
    </div>
  </div>