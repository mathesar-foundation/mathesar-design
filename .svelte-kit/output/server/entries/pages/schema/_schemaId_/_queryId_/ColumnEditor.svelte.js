import { c as create_ssr_component, f as createEventDispatcher, d as add_attribute, v as validate_component, a as each, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
import Source from "./Source.svelte.js";
import { t as typeOptions, c as conditions } from "../../../../../chunks/utils-7eafc5e0.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
import "../../../../../chunks/themes-fa5ad8e6.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
const ColumnEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { selectedView } = $$props;
  let { column } = $$props;
  let externalLink;
  let records = [];
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  return `<div class="${"p-4 space-y-2 flex flex-col h-full"}"><div class="${"space-y-1 grid"}"><label for="${"columnName"}">Name</label>
		<input id="${"columnName"}" class="${"p-2 rounded bg-zinc-100 border border-zinc-300 bg-opacity-80"}" type="${"text"}"${add_attribute("value", column.alias, 0)}></div>

	<div class="${"space-y-1 grid"}"><h4>Source</h4>
		${validate_component(Source, "Source").$$render($$result, { column, externalLink }, {}, {})}</div>

	${records.some((r) => Array.isArray(r)) || column.aggregation ? `<div class="${"border-t border-zinc-200"}"></div>
		<div class="${""}"><h4>Aggregation Formula</h4>
			<p class="${"text-sm text-zinc-500"}">Columns containing multiple records are aggregated to be displayed in a single row.
			</p></div>
		${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}">${each(typeOptions[column.source.link.column.type].aggregations, (aggregation) => {
        return `<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${escape(icon[aggregation]) + " align-bottom"}"></i>
						${escape(aggregation)}
					</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${"cursor-pointer bg-zinc-50 py-1 px-2 rounded flex items-center"}"><div class="${"flex-grow"}"><i class="${escape(icon[column.aggregation]) + " align-bottom"}"></i> ${escape(column.aggregation)}</div>
				<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
    }
  })}
		<div class="${"border-t border-zinc-200"}"></div>
		<div><h4>Filter Linked Records</h4>
			<p class="${"text-sm text-zinc-500"}">Add a filter to narrow down the linked records that will be included in this column.
			</p></div>

		

		${!column.source.filter?.column ? `<button class="${"p-1 bg-zinc-50 w-full rounded"}"><i class="${"ri-add-line align-bottom"}"></i> Add Filter</button>` : `<div class="${"rounded bg-zinc-200 p-2 text-sm space-y-2"}"><div class="${"flex items-center"}"><div class="${"font-semibold flex-grow"}">Column</div>
					<button><i class="${"ri-delete-bin-line align-bottom"}"></i></button></div>
				${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}">${each(selectedView.columns, (_column) => {
        return `<div class="${"hover:bg-zinc-50 space-x-1 p-2 cursor-pointer"}"><i class="${escape(icon[_column.type]) + " align-bottom border rounded"}"></i>
								<span>${escape(_column.alias)}</span>
							</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${"cursor-pointer bg-zinc-100 border border-zinc-300 p-2 rounded flex items-center"}"><div class="${"flex-grow space-x-1"}"><i class="${"align-bottom border text-center " + escape(icon[column.source.filter.column.type]) + " rounded"}"></i>
							<span>${escape(column.source.filter.column.name)}</span></div>
						<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
    }
  })}

				<div class="${"flex items-center space-x-2"}">${column.source.filter.condition ? `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}">${each(conditions[column.source.filter.column.type], (condition) => {
        return `<div class="${"hover:bg-zinc-50 space-x-1 p-2"}"><span>${escape(condition)}</span>
									</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${"cursor-pointer border bg-zinc-100 border-zinc-300 space-x-1 p-2 flex items-center whitespace-nowrap rounded"}"><span>${escape(column.source.filter.condition)}</span>
								<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
    }
  })}` : ``}
					${column.source.filter.value !== void 0 ? `<input class="${"bg-zinc-100 p-2 rounded w-full"}" type="${"text"}"${add_attribute("value", column.source.filter.value, 0)}>` : ``}</div></div>`}` : ``}

	<div class="${"border-b flex-grow border-zinc-200"}"></div>
	<div class="${"space-y-2 grid"}"><button class="${"bg-zinc-50 p-1 rounded"}"><i class="${"ri-delete-bin-line align-bottom"}"></i> Delete Column</button></div></div>`;
});
export { ColumnEditor as default };
