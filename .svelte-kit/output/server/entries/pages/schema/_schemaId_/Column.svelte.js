import { c as create_ssr_component, e as escape, v as validate_component, d as add_attribute } from "../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../chunks/themes-fa5ad8e6.js";
import { i as icon } from "../../../../chunks/iconMap-7a0cdc3f.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
import { D as Dropdown } from "../../../../chunks/Dropdown-8713f3b9.js";
const Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { column = {} } = $$props;
  let { table } = $$props;
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  return `<div class="${"border-r bg-opacity-0 hover:bg-opacity-40 " + escape(theme.darkBackgroundColor) + " flex items-center p-2 border-zinc-200 text-zinc-800 w-80"}">${validate_component(Dropdown, "Dropdown").$$render($$result, { full: true }, {}, {
    menu: () => {
      return `<div slot="${"menu"}" class="${"text-sm py-2"}"><div class="${"space-y-2"}"><div class="${"border-b space-y-2 px-2 pb-2 border-zinc-200"}"><div class="${"text-zinc-500 text-xs"}">Data Type</div>
					<div class="${"space-x-1"}"><i class="${"rounded align-bottom " + escape(icon[column.type])}" style="${"background-color: " + escape(column.color) + ";"}"></i>
						<span class="${"capitalize"}">${escape(column.type)}</span>
						<span class="${"text-xs font-mono bg-zinc-200 px-1 rounded text-zinc-500"}">${escape(column.db)}</span></div>

					${column.source ? `<div class="${"space-y-1 grid"}"><h4 class="${"text-zinc-500 text-xs"}">Source</h4>
							<div class="${"border border-zinc-200 rounded p-2 space-y-2"}"><div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}">Column</div>

									<div class="${"col-span-2"}"><i class="${escape(icon[column.type]) + " align-bottom"}"></i>
										${escape(column.name)}</div></div>

								<div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}">Table</div>
									<div class="${"col-span-2"}"><i class="${"ri-table-line align-bottom"}"></i>
										${escape(column.source.table.name)}</div></div>

								<div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}">Link</div>
									<div class="${"col-span-2"}"><span><i class="${"ri-table-line align-bottom"}"></i>
											${escape(column.source.link.table.name)}</span>
										<span><i class="${"ri-key-line align-bottom"}"></i> ${escape(column.source.link.column.name)}</span></div></div></div></div>` : ``}</div>

				<div class="${"text-zinc-500 text-xs mb-1 px-2"}">Operations</div>
				<div class="${"px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer"}"><i class="${"ri-sort-asc align-bottom"}"></i> Sort Ascending
				</div>
				<div class="${"px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer"}"><i class="${"ri-sort-desc align-bottom"}"></i> Sort Descending
				</div>
				<div class="${"px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 cursor-pointer"}"><i class="${"ri-layout-row-fill align-bottom"}"></i> Group by Column
				</div>
				${table.type == "table" ? `<div class="${"px-2 py-1 hover:bg-zinc-100 hover:bg-opacity-40 text-gray-500"}">Delete Column
				</div>` : ``}</div></div>`;
    },
    toggle: () => {
      return `<div class="${"cursor-pointer space-x-2 flex items-center"}" slot="${"toggle"}"><div class="${"bg-[" + escape(column.source?.table.color) + "] px-1 text-sm rounded text-center"}"><i${add_attribute("class", icon[column.type], 0)}></i>
				${column.aggregation ? `<i${add_attribute("class", icon[column.aggregation], 0)}></i>` : ``}</div>
				
				<div>${escape(table.type == "table" ? column.name : column.alias)}</div></div>`;
    }
  })}</div>

`;
});
export { Column as default };
