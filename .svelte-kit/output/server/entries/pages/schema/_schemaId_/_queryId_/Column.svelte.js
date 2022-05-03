import { c as create_ssr_component, f as createEventDispatcher, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
const Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { baseTable } = $$props;
  let { sourceColumn } = $$props;
  let { sourceTable } = $$props;
  let { column } = $$props;
  createEventDispatcher();
  if ($$props.baseTable === void 0 && $$bindings.baseTable && baseTable !== void 0)
    $$bindings.baseTable(baseTable);
  if ($$props.sourceColumn === void 0 && $$bindings.sourceColumn && sourceColumn !== void 0)
    $$bindings.sourceColumn(sourceColumn);
  if ($$props.sourceTable === void 0 && $$bindings.sourceTable && sourceTable !== void 0)
    $$bindings.sourceTable(sourceTable);
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  return `<div class="${"p-2 cursor-pointer hover:bg-opacity-40 bg-zinc-200 bg-opacity-0"}"><i class="${escape(icon[column.type]) + " align-bottom bg-[" + escape(sourceTable.color) + "] rounded mr-1"}"></i>
	${escape(column.name)}</div>`;
});
export { Column as default };
