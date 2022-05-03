import { c as create_ssr_component, f as createEventDispatcher, e as escape, a as each, v as validate_component } from "../../../../../chunks/index-7ecd09be.js";
import { b as linksToTable, i as isForeignKey } from "../../../../../chunks/utils-7eafc5e0.js";
import Column from "./Column.svelte.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
import "../../../../../chunks/iconMap-7a0cdc3f.js";
function getReferenceTable(table, column) {
  return table.constraints.find((c) => c.type == "Foreign Key" && c.column == column.name).referenceTable;
}
const ColumnSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tables } = $$props;
  let { selectedView } = $$props;
  let baseTable = selectedView.baseTable;
  createEventDispatcher();
  if ($$props.tables === void 0 && $$bindings.tables && tables !== void 0)
    $$bindings.tables(tables);
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  return `<div class="${"p-2 border-b text-sm border-zinc-300 flex"}"><div class="${[
    "flex-grow text-center cursor-pointer",
    "font-semibold"
  ].join(" ").trim()}">Available
	</div>
	<div class="${[
    "flex-grow text-center cursor-pointer",
    ""
  ].join(" ").trim()}">In Use
	</div></div>

<div class="${"leading-6"}">${`<div class="${"grid"}"><input type="${"text"}" placeholder="${"Search Columns"}" class="${"p-2 bg-zinc-100"}"></div>

		<div class="${"p-2"}"><div class="${"bg-[" + escape(baseTable.color) + "] w-max px-1 rounded"}">${escape(baseTable.name)}</div></div>
		${each(baseTable.columns, (column) => {
    return `${!isForeignKey(baseTable, column) ? `${validate_component(Column, "Column").$$render($$result, {
      baseTable,
      sourceTable: baseTable,
      column,
      sourceColumn: column
    }, {}, {})}` : `<div class="${"p-2 space-x-1 "}"><span><i class="${"ri-checkbox-blank-fill align-bottom"}"></i>
						<i class="${"ri-key-line align-bottom"}"></i>
						${escape(column.name)}</span>
					<span class="${escape(getReferenceTable(baseTable, column).color) + " px-1 rounded"}">${escape(getReferenceTable(baseTable, column).name)}
					</span></div>

				<div class="${"border-l border-zinc-300 ml-4"}">${each(getReferenceTable(baseTable, column).columns, (col) => {
      return `${!isForeignKey(getReferenceTable(baseTable, column), col) ? `${validate_component(Column, "Column").$$render($$result, {
        baseTable,
        sourceTable: getReferenceTable(baseTable, column),
        sourceColumn: column,
        column: col
      }, {}, {})}` : `<div class="${"p-2 space-x-1"}"><span>${escape(col.name)}</span>
								<span class="${"px-1 rounded " + escape(getReferenceTable(getReferenceTable(baseTable, column), col).color)}">${escape(getReferenceTable(getReferenceTable(baseTable, column), col).name)}</span></div>
							<div class="${"border-l border-zinc-300 ml-4"}">${each(getReferenceTable(getReferenceTable(baseTable, column), col).columns, (col2) => {
        return `${validate_component(Column, "Column").$$render($$result, {
          baseTable: getReferenceTable(baseTable, column),
          sourceTable: getReferenceTable(getReferenceTable(baseTable, column), col),
          sourceColumn: col,
          column: col2
        }, {}, {})}`;
      })}
							</div>`}`;
    })}
				</div>`}`;
  })}

		${each(tables.filter((t) => linksToTable(baseTable, t)), (table) => {
    return `<div class="${"p-2 space-x-1 flex flex-wrap items-center "}"><i class="${"ri-checkbox-multiple-blank-fill align-bottom"}"></i>
				<div class="${"bg-[" + escape(table.color) + "] px-1 rounded w-max"}">${escape(table.name)}</div>

				<div><span>via</span>
					<i class="${"ri-key-line align-bottom"}"></i>
					<span>${escape(table.constraints.find((c) => c.type == "Foreign Key" && c.referenceTable.id == baseTable.id).column)}</span>
				</div></div>

			${each(table.columns, (column) => {
      return `${!isForeignKey(table, column) ? `${validate_component(Column, "Column").$$render($$result, {
        baseTable: table,
        sourceTable: table,
        sourceColumn: column,
        column
      }, {}, {})}` : `${column.name !== table.constraints.find((c) => c.type == "Foreign Key" && c.referenceTable.id == baseTable.id).column ? `<div class="${"p-2 space-x-1 ml-4 flex items-center"}"><span>${escape(column.name)}</span>
						<div class="${"px-1 rounded " + escape(getReferenceTable(table, column).color)}">${escape(getReferenceTable(table, column).name)}</div></div>

					<div class="${"border-l border-zinc-300 ml-8"}">${each(getReferenceTable(table, column).columns, (col) => {
        return `${!isForeignKey(getReferenceTable(table, column), col) ? `${validate_component(Column, "Column").$$render($$result, {
          baseTable: table,
          sourceTable: getReferenceTable(table, column),
          sourceColumn: column,
          column: col
        }, {}, {})}` : `<div class="${"p-2 space-x-1 flex items-center"}"><span>${escape(col.name)}</span>
									<div class="${"px-1 rounded " + escape(getReferenceTable(getReferenceTable(table, column), col).color)}">${escape(getReferenceTable(getReferenceTable(table, column), col).name)}</div></div>
								<div class="${"border-l border-zinc-300 ml-4"}">${each(getReferenceTable(getReferenceTable(table, column), col).columns, (col2) => {
          return `${validate_component(Column, "Column").$$render($$result, {
            baseTable: getReferenceTable(table, column),
            sourceTable: getReferenceTable(getReferenceTable(table, column), col),
            sourceColumn: col,
            column: col2
          }, {}, {})}`;
        })}
								</div>`}`;
      })}
					</div>` : ``}`}`;
    })}`;
  })}`}</div>`;
});
export { ColumnSelector as default };
