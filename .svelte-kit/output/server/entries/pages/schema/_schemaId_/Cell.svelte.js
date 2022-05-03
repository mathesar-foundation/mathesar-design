import { c as create_ssr_component, f as createEventDispatcher, a as each, e as escape } from "../../../../chunks/index-7ecd09be.js";
const Cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { cell } = $$props;
  let { column } = $$props;
  if ($$props.cell === void 0 && $$bindings.cell && cell !== void 0)
    $$bindings.cell(cell);
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  return `<div class="${"hover:bg-opacity-60 bg-opacity-0 bg-zinc-100 cursor-pointer p-2 border-r w-80 space-y-1 border-zinc-200 text-zinc-800"}">${column.aggregation == "List" ? `${Array.isArray(cell) ? `${each(cell, (item) => {
    return `<div class="${"inline-block mr-1 px-2 rounded-xl " + escape(column.source.table.color) + " bg-opacity-30"}">${escape(item)}
        </div>`;
  })}` : `<div class="${"inline-block mr-1 px-2 rounded-xl " + escape(column.source.table.color) + " bg-opacity-30"}">${escape(cell)}</div>`}` : `${escape(cell)}`}</div>`;
});
export { Cell as default };
