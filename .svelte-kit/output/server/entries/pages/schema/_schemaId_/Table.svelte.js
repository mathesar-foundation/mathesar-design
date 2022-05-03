import { c as create_ssr_component, f as createEventDispatcher, e as escape, a as each, v as validate_component } from "../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../chunks/themes-fa5ad8e6.js";
import Column from "./Column.svelte.js";
import Cell from "./Cell.svelte.js";
import "../../../../chunks/iconMap-7a0cdc3f.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
import "../../../../chunks/Dropdown-8713f3b9.js";
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { fixedHeight } = $$props;
  let { table } = $$props;
  if ($$props.fixedHeight === void 0 && $$bindings.fixedHeight && fixedHeight !== void 0)
    $$bindings.fixedHeight(fixedHeight);
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  return `<div class="${"overflow-y-scroll h-full flex flex-col"}"><div class="${"drop-shadow-md flex " + escape(theme.tableBorderColor) + " bg-zinc-200 border-b"}"><div class="${"p-3 w-10 border-r border-zinc-200"}"></div>
        ${each(table.columns, (column) => {
    return `${validate_component(Column, "Column").$$render($$result, { column, table }, {}, {})}`;
  })}</div>

    <div class="${"flex-grow " + escape(fixedHeight ? fixedHeight : "")}">${table.records ? `${each(table.records, (record, i) => {
    return `<div class="${"flex border-b " + escape(theme.tableBorderColor)}"><div class="${"p-3 bg-zinc-200 bg-opacity-20 w-10 border-r border-zinc-200 text-xs text-zinc-500 text-center"}">${escape(i)}</div>
                    ${each(record, (cell, j) => {
      return `${validate_component(Cell, "Cell").$$render($$result, { cell, column: table.columns[j] }, {}, {})}`;
    })}
                </div>`;
  })}` : ``}</div></div>`;
});
export { Table as default };
