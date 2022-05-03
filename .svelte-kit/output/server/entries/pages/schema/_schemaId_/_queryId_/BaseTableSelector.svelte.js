import { c as create_ssr_component, f as createEventDispatcher, e as escape, v as validate_component, a as each } from "../../../../../chunks/index-7ecd09be.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
let searchTerm = "";
function filter(tables, searchTerm2) {
  if (searchTerm2.trim()) {
    return tables.filter((t) => t.name.toLowerCase().includes(searchTerm2));
  } else {
    return tables;
  }
}
const BaseTableSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { entities } = $$props;
  let { selectedView } = $$props;
  if ($$props.entities === void 0 && $$bindings.entities && entities !== void 0)
    $$bindings.entities(entities);
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  return `<div class="${escape(theme.darkBackgroundColor) + " border-b-2 bg-opacity-20 text-zinc-800 p-2 flex items-center space-x-3"}"><div class="${"font-semibold"}">Exploring</div>

	${validate_component(Dropdown, "Dropdown").$$render($$result, {
    closeOnClick: true,
    full: false,
    width: "w-96"
  }, {}, {
    menu: () => {
      return `<div slot="${"menu"}"><div class="${"border flex items-center flex-grow border rounded overflow-hidden m-2"}"><i class="${"ri-search-line align-bottom px-1 text-zinc-500"}"></i>
				<input type="${"text"}" class="${"bg-zinc-100 bg-opacity-40 flex-grow p-1 text-sm"}" placeholder="${"Search Tables"}"></div>
			
			${each(filter(entities.tables, searchTerm), (table) => {
        return `<div class="${"p-2 hover:bg-indigo-100 border-t cursor-pointer"}"><div class="${"space-x-1"}"><i class="${"ri-table-line align-bottom"}"></i> <span>${escape(table.name)}</span></div>
					<div class="${"text-xs text-zinc-500"}">${escape(table.records.length)} Records ${escape(table.columns.length)} Columns</div>
				</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${escape(theme.mediumBorderColor) + " border px-2 py-1 rounded cursor-pointer space-x-1"}"><i class="${"ri-table-line align-bottom"}"></i>
			<span>${escape(selectedView.baseTable ? selectedView.baseTable.name : "Select Base Table")}</span>

			<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
    }
  })}
	${selectedView.baseTable ? `<div><button class="${"border py-1 px-2 rounded bg-zinc-50"}">Open Table</button></div>` : ``}
	<div class="${"flex justify-end flex-grow"}"></div></div>`;
});
export { BaseTableSelector as default };
