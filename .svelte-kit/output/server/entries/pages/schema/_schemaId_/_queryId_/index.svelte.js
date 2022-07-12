import { c as create_ssr_component, b as subscribe, a as each, e as escape, l as null_to_empty, i as is_promise, n as noop, v as validate_component, d as add_attribute } from "../../../../../chunks/index-7ecd09be.js";
import * as Flatted from "flatted";
import ColumnEditor from "./ColumnEditor.svelte.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import { p as page } from "../../../../../chunks/stores-09f1f3e1.js";
import { a as clone, l as loadEntities, c as conditions, t as typeOptions } from "../../../../../chunks/utils-7eafc5e0.js";
import FormulaSettings from "./FormulaSettings.svelte.js";
import ColumnSelector from "./ColumnSelector.svelte.js";
import { v4 } from "uuid";
import TopNav from "../../../TopNav.svelte.js";
import _ from "lodash";
import SelectedColumns from "./SelectedColumns.svelte.js";
import TablePreview from "./TablePreview.svelte.js";
import Transformations from "./Transformations.svelte.js";
import { d as derived, w as writable } from "../../../../../chunks/index-561394f7.js";
import BaseTableSelector from "./BaseTableSelector.svelte.js";
import "../../../../../chunks/Dropdown-8713f3b9.js";
import "./Source.svelte.js";
import "../../../../../chunks/iconMap-7a0cdc3f.js";
import "jsonata";
import "randomcolor";
import "../../../../../chunks/Modal-aa394578.js";
import "./Column.svelte.js";
import "./Step.svelte.js";
function createNotificationStore(timeout) {
  const _notifications = writable([]);
  function send(message, type = "default", timeout2) {
    _notifications.update((state) => {
      return [...state, { id: id(), type, message, timeout: timeout2 }];
    });
  }
  const notifications2 = derived(_notifications, ($_notifications, set) => {
    set($_notifications);
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((state) => {
          state.shift();
          return state;
        });
      }, $_notifications[0].timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  const { subscribe: subscribe2 } = notifications2;
  return {
    subscribe: subscribe2,
    send,
    default: (msg, timeout2) => send(msg, "default", timeout2),
    danger: (msg, timeout2) => send(msg, "danger", timeout2),
    warning: (msg, timeout2) => send(msg, "warning", timeout2),
    info: (msg, timeout2) => send(msg, "info", timeout2),
    success: (msg, timeout2) => send(msg, "success", timeout2)
  };
}
function id() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
const notifications = createNotificationStore();
var Toast_svelte_svelte_type_style_lang = "";
const css = {
  code: ".notifications.svelte-1ykrt2d{position:fixed;top:10px;left:0;right:0;margin:0 auto;padding:0;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none}.toast.svelte-1ykrt2d{flex:0 0 auto;margin-bottom:10px}.content.svelte-1ykrt2d{padding:10px;display:block;color:white;font-weight:500}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let { themes = {
    danger: "bg-red-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    info: "bg-purple-500",
    default: "bg-purple-500"
  } } = $$props;
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  $$result.css.add(css);
  $$unsubscribe_notifications();
  return `<div class="${"notifications svelte-1ykrt2d"}">${each($notifications, (notification) => {
    return `<div class="${"toast " + escape(themes[notification.type]) + " rounded shadow-lg svelte-1ykrt2d"}"><div class="${"content svelte-1ykrt2d"}">${escape(notification.message)}</div>
            ${notification.icon ? `<i class="${escape(null_to_empty(notification.icon)) + " svelte-1ykrt2d"}"></i>` : ``}
        </div>`;
  })}
</div>`;
});
function getColumnNameIndex(table, column) {
  return table.columns.indexOf(table.columns.find((col) => col.name == column.name));
}
function getMapTable(sourceTable, baseTable) {
  return sourceTable.constraints.find((c) => c.referenceTable && c.referenceTable.id == baseTable.id);
}
function aggregate(items, idx) {
  let result = items.reduce(function(a, b) {
    return a.map(function(v, i) {
      if (v == b[i]) {
        return v;
      } else {
        return [v, b[i]];
      }
    });
  });
  return result;
}
const U5BqueryIdu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { schemaId } = $page.params;
  const { queryId } = $page.params;
  let columns = [];
  let schema = {};
  let showFormulaModal = false;
  let activeFormula = {};
  let selectedView;
  let runQuery;
  let entities;
  let newView = {
    id: v4(),
    type: "query",
    name: "New Query",
    columns: []
  };
  let inspector = { action: "Query Details" };
  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema2) => schema2.id == schemaId);
    entities.schemas.find((schema2) => schema2.id == schemaId).tables;
    selectedView = entities.queries.find((view) => view.id == queryId);
    let viewCount = entities.queries.filter((v) => v.name.startsWith("New Query")).length;
    if (!selectedView) {
      selectedView = {
        id: queryId,
        schemaId: _.toNumber(schemaId),
        type: "query",
        name: `New Query (${viewCount})`,
        columns: [],
        steps: {}
      };
      runQuery = false;
    }
    if (selectedView) {
      runQuery = true;
    }
    getColumnRecords(selectedView);
    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }
  function getColumnRecords(columns2) {
    let records = columns2.map((c) => {
      let columnIdx = getColumnNameIndex(c.source.table, c);
      if (c.source.link.column.name == c.name) {
        if (!!getMapTable(c.source.link.table, selectedView.baseTable)) {
          let fkIdx = c.source.table.columns.indexOf(c.source.table.columns.find((col) => col.name == getMapTable(c.source.link.table, selectedView.baseTable).column));
          let recordMap = c.source.table.records.map((r) => [r[fkIdx], r[columnIdx]]);
          let mergedRecord = c.source.table.records.map((r) => r[0]).reduce((acc, list) => {
            acc[list] = recordMap.filter((r) => r[0] == list).map((r) => r[1]);
            return acc;
          }, []);
          return mergedRecord;
        } else {
          return c.source.table.records.map((r) => r[columnIdx]);
        }
      } else {
        columnIdx = getColumnNameIndex(c.source.link.table, c.source.link.column);
        let recordId = c.source.link.table.records.map((r) => r[columnIdx]);
        let mergedRecord = recordId.map((rId) => {
          return c.source.table.records.find((r) => r[0] == rId);
        }).map((r) => r[getColumnNameIndex(c.source.table, c)]);
        return mergedRecord;
      }
    });
    let mergedRecords = records.reduce((acc, item) => {
      item.forEach((record, i) => {
        acc[i] = records.map((r) => r[i]);
      });
      return acc;
    }, []);
    let filteredRecords = mergedRecords.filter((record) => {
      if (mergedRecords.some((r) => r.length > 1)) {
        return !record.some((r) => r == void 0);
      } else {
        return !record.some((r) => r == void 0 || r == "");
      }
    });
    columns2.forEach((col, i) => {
      if (col.aggregation && col.aggregation == "Count") {
        filteredRecords.forEach((r) => {
          r[i] = _.flattenDeep(r[i]).length;
        });
      }
    });
    return filteredRecords;
  }
  function setFilter(column, step, records) {
    let columnIdx = selectedView.columns.indexOf(column);
    let condition = step.condition;
    if (!conditions[column.type].includes(condition)) {
      step.condition = conditions[column.type][0];
    }
    let value = step.value;
    if (condition == "contains" || condition == "includes") {
      return records.filter((r) => r[columnIdx] && _.toString(r).includes(value));
    }
    return records;
  }
  function setSummarization(column, step, records) {
    let columnIdx = selectedView.columns.indexOf(column);
    let groupedRecords = _.groupBy(records, function(n) {
      return n[columnIdx];
    });
    let aggregatedRecords = Object.keys(groupedRecords).map((group) => {
      return aggregate(groupedRecords[group]);
    });
    selectedView.steps[step].aggregations.splice(0, selectedView.steps[step].aggregations.length, selectedView.columns.map((c) => {
      return typeOptions[c.type].aggregations[0];
    }));
    changeColumnType(selectedView, columnIdx, step);
    return flattenRecords(aggregatedRecords);
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
      if (selectedView.steps[step].type == "filter" && !selectedView.steps[step].hidden) {
        newRecords = setFilter(column, selectedView.steps[step], newRecords);
      }
      if (selectedView.steps[step].type == "summarize" && !selectedView.steps[step].hidden) {
        newRecords = setSummarization(column, step, newRecords);
      }
    });
    return newRecords;
  }
  function changeColumnType(view, idx, step) {
    let columns2 = view.columns;
    columns2.forEach((col, i) => {
      if (i !== idx && !col.source.table.id == selectedView.baseTable.id)
        ;
      if (i !== idx) {
        col.aggregation = view.steps[step].aggregations.map((a) => a[i]);
      }
      if (i == idx) {
        col.aggregation = null;
      }
    });
  }
  function resetColumnTypes(columns2) {
    columns2.forEach((col, i) => {
      if (!col.source.table.id == selectedView.baseTable.id) {
        col.aggregation = col.aggregation;
      } else {
        col.aggregation = null;
      }
    });
  }
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
  <div>Loading (can be removed)</div>
`;
      }
      return function(entities2) {
        return `
  ${validate_component(TopNav, "TopNav").$$render($$result, { schema }, {}, {})}

  ${validate_component(BaseTableSelector, "BaseTableSelector").$$render($$result, { entities: entities2, selectedView }, {
          selectedView: ($$value) => {
            selectedView = $$value;
            $$settled = false;
          }
        }, {})}

  <div class="${"flex-grow flex text-zinc-800 max-w-full overflow-hidden"}" style="${"height: calc(100vh - 120px);"}"><div class="${"flex-grow h-full flex flex-col shrink-0 " + escape(theme.darkBackgroundColor)}"><div>${validate_component(SelectedColumns, "SelectedColumns").$$render($$result, { selectedView, inspector }, {
          selectedView: ($$value) => {
            selectedView = $$value;
            $$settled = false;
          },
          inspector: ($$value) => {
            inspector = $$value;
            $$settled = false;
          }
        }, {})}</div>

      ${validate_component(Transformations, "Transformations").$$render($$result, { selectedView }, {
          selectedView: ($$value) => {
            selectedView = $$value;
            $$settled = false;
          }
        }, {})}

      <div></div></div>

    <div class="${"w-7/12 p-4 border-r border-l"}"><div class="${"border overflow-hidden rounded border-zinc-200 flex flex-col h-full"}">${runQuery && !!entities2.queries.find((v) => v.id == selectedView.id) ? `<div class="${"h-full w-full p-8 text-center space-y-2"}"><div class="${"text-xl text-zinc-500"}">Run query or preview to list results</div>
            <button class="${"border p-2 rounded " + escape(theme.mediumBorderColor)}">Run Query</button>
            <button class="${"border p-2 rounded bg-zinc-50"}">Preview</button></div>` : `${selectedView.columns.length > 0 ? `<div class="${"p-2 flex items-center space-x-4"}"><h3 class="${"font-semibold"}">Result</h3>
          <p class="${"text-sm text-zinc-500"}">Query Run Succesfully</p></div>
        ${validate_component(TablePreview, "TablePreview").$$render($$result, {
          records: applySteps(selectedView.records, selectedView.steps),
          inspector,
          selectedView
        }, {
          inspector: ($$value) => {
            inspector = $$value;
            $$settled = false;
          },
          selectedView: ($$value) => {
            selectedView = $$value;
            $$settled = false;
          }
        }, {})}` : `${!selectedView.baseTable ? `<div class="${"border-t " + escape(theme.darkBackgroundColor) + " opacity-40 text-center text-zinc-500 border-zinc-200 p-10 flex-grow"}"><span class="${"text-xl"}">Select a base table to get started</span></div>` : `<div class="${"border-t " + escape(theme.darkBackgroundColor) + " opacity-40 text-center text-zinc-500 border-zinc-200 p-10 flex-grow"}"><span class="${"text-xl"}">Select or drop columns</span></div>`}`}`}</div></div>

    <div class="${"flex flex-col h-full overflow-y-scroll w-80 " + escape(theme.darkBackgroundColor)}"><div class="${"text-sm font-semibold border-b border-zinc-200 p-2"}"><h4 class="${"leading-6"}">${escape(inspector.action)}</h4></div>

      ${inspector.action == "Query Details" ? `<div class="${"p-2 space-y-4"}"><h4 class="${"font-semibold text-sm"}">Save Options</h4>

          <div class="${"grid space-y-2"}"><div class="${"grid space-y-1"}"><label class="${"text-sm font-semibold"}" for="${"viewName"}">Query Name</label>
              <input type="${"text"}" class="${"p-2 rounded bg-zinc-100 border border-zinc-300"}"${add_attribute("value", selectedView.name, 0)}></div>
            ${entities2.queries.find((v) => v.id == selectedView.id) ? `<button ${!selectedView.baseTable ? "disabled" : ""} class="${[
          "w-full border " + escape(theme.mediumBorderColor) + " text-zinc-800 p-1 text-sm rounded",
          !selectedView.baseTable ? "opacity-60" : ""
        ].join(" ").trim()}">Save Changes to Query</button>` : `<button ${!selectedView.baseTable ? "disabled" : ""} class="${[
          "w-full border " + escape(theme.mediumBorderColor) + " text-zinc-800 p-1 text-sm rounded",
          !selectedView.baseTable ? "opacity-60" : ""
        ].join(" ").trim()}">Save Query</button>

              <a href="${"./"}" class="${"w-full block text-center border " + escape(theme.mediumBorderColor) + " bg-zinc-50 text-zinc-800 p-1 text-sm rounded"}">Close without Saving</a>`}</div>
          ${entities2.queries.find((v) => v.id == selectedView.id) ? `<div class="${"border-b border-zinc-200"}"></div>
            <div class="${"space-y-1"}"><h4 class="${"font-semibold text-sm"}">Publish as View</h4>
              <p class="${"text-xs text-zinc-500"}">Views differ from saved queries in that they don&#39;t include the Data
                Explorer configuration\u2014transformation steps, and filters\u2014along with the query.
              </p></div>
            <button ${!selectedView.baseTable ? "disabled" : ""} class="${[
          "w-full border " + escape(theme.mediumBorderColor) + " text-zinc-800 p-1 text-sm rounded",
          !selectedView.baseTable ? "opacity-60" : ""
        ].join(" ").trim()}">Publish View</button>` : ``}
          <div class="${"border-b border-zinc-200"}"></div>
          <div class="${"space-y-1"}"><h4 class="${"text-sm font-semibold"}">SQL Query</h4>
            <p class="${"text-xs text-zinc-500"}">This view is a virtual table based on a SQL statement&#39;s result
              set. The SQL below can be used to recreate this view.
            </p></div>

          <button ${!selectedView.baseTable ? "disabled" : ""} class="${[
          "w-full bg-zinc-50 text-zinc-800 p-1 text-sm rounded",
          !selectedView.baseTable ? "opacity-60" : ""
        ].join(" ").trim()}">View SQL Query</button></div>` : ``}

      ${inspector.action == "Add Column" ? `<div>${validate_component(ColumnSelector, "ColumnSelector").$$render($$result, { tables: entities2.tables, selectedView }, {
          selectedView: ($$value) => {
            selectedView = $$value;
            $$settled = false;
          }
        }, {})}</div>` : ``}

      ${inspector.action == "Column" ? `${validate_component(ColumnEditor, "ColumnEditor").$$render($$result, { selectedView, column: inspector.column }, {
          selectedView: ($$value) => {
            selectedView = $$value;
            $$settled = false;
          },
          column: ($$value) => {
            inspector.column = $$value;
            $$settled = false;
          }
        }, {})}` : ``}</div></div>

  ${validate_component(FormulaSettings, "FormulaSettings").$$render($$result, {
          activeFormula: clone(activeFormula),
          view: newView,
          columns,
          showFormulaModal
        }, {
          showFormulaModal: ($$value) => {
            showFormulaModal = $$value;
            $$settled = false;
          }
        }, {})}

  ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}
`;
      }(__value);
    }(loadData())}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export { U5BqueryIdu5D as default };
