import { c as create_ssr_component, e as escape, a as each, d as add_attribute } from "../../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
const SelectedColumns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { inspector } = $$props;
  let { selectedView } = $$props;
  if ($$props.inspector === void 0 && $$bindings.inspector && inspector !== void 0)
    $$bindings.inspector(inspector);
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  return `<div class="${"border-b p-2 flex items-center border-zinc-200"}"><h4 class="${"text-sm font-semibold flex-grow leading-6"}">Columns (${escape(selectedView.columns.length)})</h4>
	<button ${!selectedView.baseTable ? "disabled" : ""} class="${["bg-zinc-200 w-6 rounded", !selectedView.baseTable ? "opacity-60" : ""].join(" ").trim()}"><i class="${"ri-add-line align-bottom"}"></i></button></div>

${selectedView.columns.length > 0 ? `<div>${selectedView.columns.length > 0 ? `<div>${each(selectedView.columns, (column) => {
    return `<div class="${escape(inspector.column == column ? theme.lightBackgroundColor : "") + " cursor-pointer flex items-center space-x-2 border-b text-sm border-zinc-200 hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 p-2 w-full shrink-0"}"><span class="${"rounded text-xs bg-[" + escape(column.source.table.color) + "] bg-opacity-80 align-bottom px-1"}"><i${add_attribute("class", icon[column.type], 0)}></i>
							<i${add_attribute("class", icon[column.aggregation], 0)}></i></span>
						<span class="${"flex-grow"}">${escape(column.alias)}</span>
						<i class="${"ri-delete-bin-line text-zinc-500"}"></i>
					</div>`;
  })}</div>` : ``}</div>` : ``}`;
});
export { SelectedColumns as default };
