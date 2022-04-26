<script>
  import * as Flatted from "flatted";
  import ColumnEditor from "./ColumnEditor.svelte";
  import { beforeUpdate } from "svelte";
  import { theme } from "$lib/themes";
  import { page } from "$app/stores";

  import {
    clone,
    loadEntities,
    saveEntities,
    conditions,
    aggregations,
    typeOptions,
  } from "$lib/utils";

  import FormulaSettings from "./FormulaSettings.svelte";
  import ColumnSelector from "./ColumnSelector.svelte";
  import { v4 as uuidv4 } from "uuid";
  import TopNav from "../../../TopNav.svelte";
  import _ from "lodash";
  import SelectedColumns from "./SelectedColumns.svelte";
  import TablePreview from "./TablePreview.svelte";
  import Transformations from "./Transformations.svelte";
  import { notifications } from "$lib/notifications.js";
  import Toast from "$lib/Toast.svelte";
  import BaseTableSelector from "./BaseTableSelector.svelte";

  const { schemaId } = $page.params;
  const { viewId } = $page.params;

  let columns = [];
  let schema = {};
  let tables = [];

  let showFormulaModal = false;
  let activeFormula = {};

  let selectedView;

  let entities;

  let newView = {
    id: uuidv4(),
    type: "view",
    name: "New View",
    columns: [],
  };

  let inspector = { action: "Query Details" };

  async function loadData() {
    entities = await loadEntities();

    schema = entities.schemas.find((schema) => schema.id == schemaId);
    tables = entities.schemas.find((schema) => schema.id == schemaId).tables;
    selectedView = entities.views.find((view) => view.id == viewId);

    //inspector = { action: 'Column', column: selectedView.columns[2] };

    let viewCount = entities.views.filter((v) =>
      v.name.startsWith("New View")
    ).length;

    if (!selectedView) {
      selectedView = {
        id: viewId,
        schemaId: _.toNumber(schemaId),
        type: "view",
        name: `New View (${viewCount})`,
        columns: [],
        steps: {},
      };
      //entities.views.push(selectedView)
      //entities = entities;
    }

    getColumnRecords(selectedView.columns);

    //selectedView.steps = {};

    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }

    return entities;
  }

  beforeUpdate(() => {
    saveEntities(entities);
  });

  function updateFormula(e) {
    let newFormula = e.detail;
    let activeFormulaIdx = newView.columns.indexOf(activeFormula);

    if (activeFormulaIdx >= 0) {
      newView.columns.splice(activeFormulaIdx, 1, newFormula);
    } else {
      newView.columns.push(newFormula);
    }

    newView = newView;
  }

  function getReferenceTable(table, column) {
    return table.constraints.find(
      (c) => c.type == "Foreign Key" && c.column == column.name
    ).referenceTable;
  }

  function addColumn(table, column, _column) {
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

    if (!table.id == selectedView.baseTable.id) {
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

    selectedView.columns.push(newColumn);

    inspector = { action: "Column", column: newColumn };
    selectedView.records = getColumnRecords(selectedView.columns);
    selectedView = selectedView;
    applySteps(selectedView.records);
  }

  function getColumnNameIndex(table, column) {
    return table.columns.indexOf(
      table.columns.find((col) => col.name == column.name)
    );
  }

  function getMapTable(sourceTable, baseTable) {
    return sourceTable.constraints.find(
      (c) => c.referenceTable && c.referenceTable.id == baseTable.id
    );
  }

  function getColumnRecords(columns) {
    let records = columns.map((c) => {
      let columnIdx = getColumnNameIndex(c.source.table, c);

      if (c.source.link.column.name == c.name) {
        if (!!getMapTable(c.source.link.table, selectedView.baseTable)) {
          let fkIdx = c.source.table.columns.indexOf(
            c.source.table.columns.find(
              (col) =>
                col.name ==
                getMapTable(c.source.link.table, selectedView.baseTable).column
            )
          );
          let recordMap = c.source.table.records.map((r) => [
            r[fkIdx],
            r[columnIdx],
          ]);

          let mergedRecord = c.source.table.records
            .map((r) => r[0])
            .reduce((acc, list) => {
              acc[list] = recordMap
                .filter((r) => r[0] == list)
                .map((r) => r[1]);

              return acc;
            }, []);

          return mergedRecord;
        } else {
          return c.source.table.records.map((r) => r[columnIdx]);
        }
      } else {
        columnIdx = getColumnNameIndex(
          c.source.link.table,
          c.source.link.column
        ); //c.source.link.table.columns.indexOf(c.source.link.column)
        let recordId = c.source.link.table.records.map((r) => r[columnIdx]);

        let mergedRecord = recordId
          .map((rId) => {
            return c.source.table.records.find((r) => r[0] == rId);
          })
          .map((r) => r[getColumnNameIndex(c.source.table, c)]);

        return mergedRecord; //c.source.link.table.records.map(r => r[columnIdx])
      }
    });

    let mergedRecords = records.reduce((acc, item) => {
      item.forEach((record, i) => {
        acc[i] = records.map((r) => r[i]);
      });

      return acc;
    }, []);
    //

    let filteredRecords = mergedRecords.filter((record) => {
      if (mergedRecords.some((r) => r.length > 1)) {
        return !record.some((r) => r == undefined);
      } else {
        return !record.some((r) => r == undefined || r == "");
      }
    });

    columns.forEach((col, i) => {
      if (col.aggregation && col.aggregation == "Count") {
        filteredRecords.forEach((r) => {
          r[i] = _.flattenDeep(r[i]).length;
        });
      }
    });

    return filteredRecords;
    //return mergedRecords;
  }

  function deleteColumn(column) {
    selectedView.columns.splice(getColumnNameIndex(selectedView, column), 1);
    selectedView.records = getColumnRecords(selectedView.columns);
    selectedView = selectedView;
  }

  function aggregate(items, idx) {
    let result = items.reduce(function (a, b) {
      return a.map(function (v, i) {
        if (v == b[i]) {
          return v;
        } else {
          return [v, b[i]];
        }
      });
    });

    return result;
  }

  function setFilter(column, step, records) {
    let columnIdx = selectedView.columns.indexOf(column);
    let condition = step.condition;

    // Change condition based on data type
    if (!conditions[column.type].includes(condition)) {
      step.condition = conditions[column.type][0];
    }

    let value = step.value;

    if (condition == "contains" || condition == "includes") {
      return records.filter(
        (r) => r[columnIdx] && _.toString(r).includes(value)
      );
    }
  }

  function setSummarization(column, step, records) {

	//console.log(column, step, records,"SUMMARIZE")

    let columnIdx = selectedView.columns.indexOf(column);

    let groupedRecords = _.groupBy(records, function (n) {
      return n[columnIdx];
    });

	

    let aggregatedRecords = Object.keys(groupedRecords).map((group) => {
      return aggregate(groupedRecords[group], columnIdx);
    });

	

    //selectedView.steps[step].aggregations = []

    //selectedView.steps[step].aggregations = aggregations;

    selectedView.steps[step].aggregations.splice(
      0,
      selectedView.steps[step].aggregations.length,
      selectedView.columns.map((c) => {
        return typeOptions[c.type].aggregations[0];
      })
    );

	

    changeColumnType(selectedView, columnIdx, step);


    return flattenRecords(aggregatedRecords);
  }

  function previewSteps(step) {
    let stepIdx = Object.keys(selectedView.steps).indexOf(step);

    Object.keys(selectedView.steps).forEach((_step, i) => {
      if (i > stepIdx) {
        selectedView.steps[_step].hidden = !selectedView.steps[_step].hidden;
      }
    });

    applySteps(selectedView.records);
  }

  function resetPreview() {
    Object.keys(selectedView.steps).forEach((_step) => {
      selectedView.steps[_step].hidden = false;
    });
  }

  function flattenRecords(records) {
    return records.map((r) => {
      return r.map((item) => {
        if (Array.isArray(item)) {
          return _.concat(_.flattenDeep(item));
        } else {
          return item;
        }
      });
    });
  }

  function applySteps(records, steps) {
    let newRecords = Flatted.parse(Flatted.stringify(records));

    newRecords = flattenRecords(newRecords);

    resetColumnTypes(selectedView.columns);

    Object.keys(selectedView.steps).forEach((step) => {
      let column = selectedView.steps[step].column;

      if (
        selectedView.steps[step].type == "filter" &&
        !selectedView.steps[step].hidden
      ) {
        newRecords = setFilter(column, selectedView.steps[step], newRecords);
      }
	  
	  if (
        selectedView.steps[step].type == "summarize" &&
        !selectedView.steps[step].hidden
      ) {
        newRecords = setSummarization(column, step, newRecords);
      }
    });

    return newRecords;
  }

  function saveView() {
    resetPreview();
    selectedView.records = applySteps(selectedView.records, selectedView.steps);

    if (!entities.views.find((v) => v.id == viewId)) {
      entities.views.push(selectedView);
      notifications.info("New View Saved", 3000);
    } else {
      notifications.info("Changes Saved", 3000);
    }

    selectedView = selectedView;
    entities = entities;
  }

  function changeColumnType(view, idx, step) {
    let columns = view.columns;

    columns.forEach((col, i) => {
      if (i !== idx && !col.source.table.id == selectedView.baseTable.id) {
        //col.aggregation = col.aggregation;
		//console.log(col,"COL 1")
      } //

      if (i !== idx) {
        col.aggregation = view.steps[step].aggregations.map((a) => a[i]);
		console.log(i,idx,col,"COL 2")
      }

      if (i == idx) {
        col.aggregation = null;
		console.log(i,idx,col,"COL 3")
      }

    });
  }

  function resetColumnTypes(columns) {
    columns.forEach((col, i) => {
      //col.type = col.source.table.columns.find((c) => c.name == col.name).type;
      if (!col.source.table.id == selectedView.baseTable.id) {
        col.aggregation = col.aggregation;
        //console.log(selectedView.records.map(r => r[i]),col,"TESTTESTCOL")
      } else {
        col.aggregation = null;
      }
    });
  }

  function updateAggregation(aggregation, column, columnIdx) {
    let newColumn = column;

    newColumn.aggregation = aggregation;

    newColumn.type = aggregations[aggregation].type;

    selectedView.columns.splice(columnIdx, 1, newColumn);

    selectedView.records = getColumnRecords(selectedView.columns);
    selectedView = selectedView;
  }

  function addColumnFilter(column) {
    let columnIdx = selectedView.columns.indexOf(column);

    column.source.filter = {
      column: column,
      condition: conditions[column.type][0],
      value: "",
    };

    selectedView.columns[columnIdx] = column;
  }

  function deleteColumnFilter(column) {
    let columnIdx = selectedView.columns.indexOf(column);

    column.source.filter = {};

    selectedView.columns[columnIdx] = column;
  }
</script>

{#await loadData()}
  <div>Loading (can be removed)</div>
{:then entities}
  <TopNav {entities} />

  <BaseTableSelector
    {entities}
    {selectedView}
    on:tableSelected={(e) => {
      selectedView.baseTable = e.detail;
      inspector.action = "Add Column";
    }}
  />

  <div
    class="flex-grow flex {theme.textColor} max-w-full overflow-hidden"
    style="height: calc(100vh - 120px);"
  >
    <div
      on:click|self={() => (inspector = { action: "Query Details" })}
      class="flex-grow h-full flex flex-col shrink-0 {theme.darkBackgroundColor}"
    >
      <div>
        <SelectedColumns bind:selectedView bind:inspector />
      </div>

      <Transformations
        on:previewStep={(e) => previewSteps(e.detail)}
        on:AddStep={(e) => applySteps(e.detail)}
        on:deleteStep={(e) => {
          applySteps(selectedView.records);
        }}
        bind:selectedView
      />

      <div />
    </div>

    <div class="w-7/12 flex-grow p-4">
      <div
        class="border overflow-hidden rounded {theme.tableBorderColor} flex flex-col h-full"
        on:click|self={() => (inspector = { action: "Query Details" })}
      >
        <div class="p-2">
          <h3>Result Table</h3>
        </div>

        {#if selectedView.columns.length > 0}
          <TablePreview
            records={applySteps(selectedView.records, selectedView.steps)}
            bind:inspector
            bind:selectedView
          />
        {:else if !selectedView.baseTable}
          <div
            class="border-t {theme.darkBackgroundColor} opacity-40 text-center {theme.mutedTextColor} {theme.tableBorderColor} p-10 flex-grow"
          >
            <span class="text-xl">Select a base table to get started</span>
          </div>
        {:else}
          <div
            class="border-t {theme.darkBackgroundColor} opacity-40 text-center {theme.mutedTextColor} {theme.tableBorderColor} p-10 flex-grow"
          >
            <span class="text-xl">Select or drop columns</span>
          </div>
        {/if}
      </div>
    </div>

    <div
      class="flex flex-col h-full overflow-y-scroll w-80 {theme.darkBackgroundColor}"
    >
      <div class="text-sm font-semibold border-b {theme.tableBorderColor} p-2">
        <h4 class="leading-6">{inspector.action}</h4>
      </div>

      {#if inspector.action == "Query Details"}
        <div class="p-2 space-y-2">
          <h4 class="text-sm font-semibold">SQL Query</h4>
          <p class="text-xs {theme.mutedTextColor}">
            This view is a virtual table based on a SQL statement's result set.
            The SQL below can be used to recreate this view.
          </p>

          <button
            disabled={!selectedView.baseTable}
            class:opacity-60={!selectedView.baseTable}
            class="w-full {theme.lightBackgroundColor} {theme.textColor} p-1 text-sm rounded"
            >View SQL Query</button
          >
          <div class="border-b {theme.tableBorderColor}" />

          <h4 class="font-semibold text-sm">Save Options</h4>
          <div class="grid space-y-1 text-sm">
            <label for="viewName">View Name</label>
            <input
              type="text"
              class="p-2 rounded {theme.inputBackgroundColor} bg-opacity-80"
              bind:value={selectedView.name}
            />
          </div>

          <div class="flex items-center space-x-2">
            {#if entities.views.find((v) => v.id == selectedView.id)}
              <button
                on:click={saveView}
                disabled={!selectedView.baseTable}
                class:opacity-60={!selectedView.baseTable}
                class="w-full border {theme.mediumBorderColor} {theme.textColor} p-1 text-sm rounded"
                >Save Changes</button
              >
            {:else}
              <a
                href="./"
                class="w-full block text-center border {theme.mediumBorderColor} {theme.lightBackgroundColor} {theme.textColor} p-1 text-sm rounded"
                >Close without Saving</a
              >
              <button
                on:click={saveView}
                disabled={!selectedView.baseTable}
                class:opacity-60={!selectedView.baseTable}
                class="w-full border {theme.mediumBorderColor} {theme.textColor} p-1 text-sm rounded"
                >Save as View</button
              >
            {/if}
          </div>
        </div>
      {/if}

      {#if inspector.action == "Add Column"}
        <div>
          <ColumnSelector
            on:addColumn={(e) =>
              addColumn(
                e.detail.sourceTable,
                e.detail.sourceColumn,
                e.detail.column
              )}
            tables={entities.tables}
            bind:selectedView
          />
        </div>
      {/if}

      {#if inspector.action == "Column"}
        <ColumnEditor
          on:deleteFilter={(e) => deleteColumnFilter(e.detail)}
          on:addFilter={(e) => addColumnFilter(e.detail)}
          on:updateAggregation={(e) =>
            updateAggregation(
              e.detail.aggregation,
              e.detail.column,
              e.detail.columnIdx
            )}
          on:deleteColumn={(e) => deleteColumn(e.detail)}
          bind:selectedView
          bind:column={inspector.column}
        />
      {/if}
    </div>
  </div>

  <FormulaSettings
    bind:showFormulaModal
    activeFormula={clone(activeFormula)}
    view={newView}
    {columns}
    on:updateFormula={updateFormula}
  />

  <Toast />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
