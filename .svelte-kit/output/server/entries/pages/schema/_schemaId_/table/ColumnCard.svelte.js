import { c as create_ssr_component, e as escape, a as each } from "../../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
const ColumnCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { column = {} } = $$props;
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  return `<div class="${"p-2 space-y-2 border " + escape(theme.darkBackgroundColor) + " rounded border-zinc-200 text-zinc-800"}"><div><i style="${"background-color: " + escape(column.color) + ";"}" class="${escape(icon[column.type]) + " rounded align-bottom"}"></i>
            ${escape(column.name)}</div>
        
        <div class="${"flex space-x-2"}"><span>Source</span> <div class="${"bg-zinc-200 px-1 w-max rounded"}">${escape(column.source.tableName)} ${escape(column.source.columnName)}</div></div>  
        
        ${column.source.filter ? `<div class="${"flex items-center space-x-2"}"><div>Filter</div>
                ${each(column.source.filter, (filter) => {
    return `<div class="${"bg-zinc-200 w-max px-1 rounded"}">${escape(column.source.columnName)}</div>
                    <div class="${"bg-zinc-200 w-max px-1 rounded"}">${escape(filter.function)}</div>
                    <div class="${"bg-zinc-200 w-max px-1 rounded"}">${escape(filter.pattern)}
                    </div>`;
  })}</div>` : ``}

        ${column.source.list ? `<div class="${"flex items-center space-x-2"}"><div>List</div>
                <div class="${"bg-zinc-200 w-max px-1 rounded"}">${escape(column.source.list.function)}</div>
                <div>with separator</div>
                <div class="${"bg-zinc-200 w-max px-2 rounded"}">${escape(column.source.list.separator)}
                     <i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div></div>` : ``}

        ${column.source.count ? `<div class="${"flex items-center space-x-2"}"><div>Count</div>
                <div class="${"bg-zinc-200 w-max px-1 rounded"}">Distinct ${escape(column.source.count.distinct)}</div></div>` : ``}

        ${column.source.formula ? `<div class="${"flex items-center space-x-2"}"><div>Formula</div>
                <div class="${"bg-zinc-200 w-max px-1 rounded"}">${escape(column.source.formula.expression)}</div></div>` : ``}</div>`;
});
export { ColumnCard as default };
