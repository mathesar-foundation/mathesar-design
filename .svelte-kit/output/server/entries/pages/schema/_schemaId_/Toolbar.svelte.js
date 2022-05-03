import { c as create_ssr_component, f as createEventDispatcher, e as escape, v as validate_component, a as each, d as add_attribute } from "../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../chunks/themes-fa5ad8e6.js";
import { i as icon } from "../../../../chunks/iconMap-7a0cdc3f.js";
import { D as Dropdown } from "../../../../chunks/Dropdown-8713f3b9.js";
import { c as conditions } from "../../../../chunks/utils-7eafc5e0.js";
import _ from "lodash";
import "jsonata";
import "flatted";
import "uuid";
import "randomcolor";
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { table } = $$props;
  table.filter = {
    column: table.columns[0],
    condition: conditions[table.columns[0].type][0],
    value: ""
  };
  createEventDispatcher();
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  return `<div class="${"text-zinc-800 flex items-center space-x-3 border-b " + escape(theme.darkBackgroundColor) + " bg-opacity-40 border-zinc-200"}">${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}"><div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"}">Rename ${escape(_.startCase(table.type))}</div>
      <div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"}">Duplicate ${escape(_.startCase(table.type))}</div>

      ${table.type == "table" ? `<div class="${"border-t border-zinc-200"}"></div>
        <div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"}">Table Constraints
        </div>
        <div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"}">Table Preferences
        </div>
        <div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"}">Open in Data Explorer
        </div>` : ``}

      ${table.type == "view" ? `<div class="${"border-t border-zinc-200"}"></div>
    
        <div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 bg-zinc-200 cursor-pointer"}">View SQL Query
        </div>` : ``}
      <div class="${"border-t border-zinc-200"}"></div>
      <div class="${"px-2 py-1 hover:bg-opacity-40 bg-opacity-0 space-x-1 bg-zinc-200 cursor-pointer"}"><i class="${"ri-delete-bin-line align-bottom"}"></i>
        <span>Delete ${escape(_.startCase(table.type))}</span></div></div>`;
    },
    toggle: () => {
      return `<button slot="${"toggle"}" class="${"text-lg px-2 py-3 space-x-1 bg-white bg-opacity-10 hover:bg-opacity-80"}"><i class="${escape(icon[table.type]) + " align-bottom"}"></i>
      <span>${escape(table.name)}</span>
      <i class="${"ri-arrow-drop-down-line align-bottom"}"></i></button>`;
    }
  })}

  ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}" class="${"p-2 space-y-2"}"><button class="${"p-1 bg-zinc-50 w-full rounded"}"><i class="${"ri-add-line align-bottom"}"></i> Add Filter</button>

      <div class="${"rounded p-2 text-sm space-y-2"}"><div class="${"flex items-center"}"><div class="${"font-semibold flex-grow"}">Column</div>
          <button><i class="${"ri-delete-bin-line align-bottom"}"></i></button></div>
        ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
        menu: () => {
          return `<div slot="${"menu"}">${each(table.columns, (_column) => {
            return `<div class="${"hover:bg-opacity-80 bg-opacity-0 cursor-pointer bg-zinc-50 space-x-1 p-2"}"><i class="${escape(icon[_column.type]) + " align-bottom border rounded"}"></i>
                <span>${escape(_column.name)}</span>
              </div>`;
          })}</div>`;
        },
        toggle: () => {
          return `<div slot="${"toggle"}" class="${"cursor-pointer bg-zinc-100 border border-zinc-300 p-2 rounded flex items-center"}"><div class="${"flex-grow space-x-1"}"><i class="${"align-bottom border text-center " + escape(icon[table.filter.column.type]) + " rounded"}"></i>
              <span>${escape(table.filter.column.name)}</span></div>
            <i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
        }
      })}

        <div class="${"flex items-center space-x-2"}">${table.filter.condition ? `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
        menu: () => {
          return `<div slot="${"menu"}">${each(conditions[table.filter.column.type], (condition) => {
            return `<div class="${"hover:bg-opacity-80 bg-opacity-0 cursor-pointer bg-zinc-50 space-x-1 p-2"}"><span>${escape(condition)}</span>
                  </div>`;
          })}</div>`;
        },
        toggle: () => {
          return `<div slot="${"toggle"}" class="${"cursor-pointer border bg-zinc-100 border-zinc-300 space-x-1 p-2 flex items-center whitespace-nowrap rounded"}"><span>${escape(table.filter.condition)}</span>
                <i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
        }
      })}` : ``}
          ${table.filter.value !== void 0 ? `<input class="${"bg-zinc-100 border border-zinc-300 p-2 rounded w-full"}" type="${"text"}"${add_attribute("value", table.filter.value, 0)}>` : ``}</div></div></div>`;
    },
    toggle: () => {
      return `<button slot="${"toggle"}" class="${"border " + escape(theme.mediumBorderColor) + " p-1 rounded"}"><i class="${"ri-filter-fill align-bottom"}"></i>
      Filter <i class="${"ri-arrow-drop-down-line align-bottom"}"></i></button>`;
    }
  })}</div>


`;
});
export { Toolbar as default };
