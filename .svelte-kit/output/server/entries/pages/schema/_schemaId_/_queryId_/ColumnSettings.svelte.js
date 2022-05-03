import { c as create_ssr_component, f as createEventDispatcher, v as validate_component, d as add_attribute, e as escape, a as each } from "../../../../../chunks/index-7ecd09be.js";
import { M as Modal } from "../../../../../chunks/Modal-aa394578.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
import "../../../../../chunks/themes-fa5ad8e6.js";
const ColumnSettings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showColumnModal } = $$props;
  let { activeColumn = {} } = $$props;
  createEventDispatcher();
  let filterOptions = [
    "contains",
    "is",
    "is not",
    "starts with",
    "end with",
    "does not contain",
    "does not start with"
  ];
  if ($$props.showColumnModal === void 0 && $$bindings.showColumnModal && showColumnModal !== void 0)
    $$bindings.showColumnModal(showColumnModal);
  if ($$props.activeColumn === void 0 && $$bindings.activeColumn && activeColumn !== void 0)
    $$bindings.activeColumn(activeColumn);
  return `${validate_component(Modal, "Modal").$$render($$result, {
    title: "Column Settings",
    open: showColumnModal
  }, {}, {
    footer: () => {
      return `<div slot="${"footer"}" class="${"p-6 text-right space-x-1"}"><button class="${"p-2 bg-zinc-200 text-zinc-800 rounded"}">Cancel</button>
        <button class="${"p-2 bg-zinc-100 text-zinc-800 rounded"}">Apply</button></div>`;
    },
    body: () => {
      return `<div slot="${"body"}" class="${"space-y-4 h-full flex flex-col"}"><div class="${"space-y-2 text-zinc-800"}"><label class="${"block"}" for="${""}">Column Name</label>
            <input type="${"text"}" class="${"p-2 w-full rounded bg-opacity-30 bg-zinc-100 text-zinc-800"}"${add_attribute("value", activeColumn.name, 0)}>
            <div>Data Type: ${escape(activeColumn.type)}</div></div>

        ${activeColumn.source ? `<div class="${"border border-zinc-200 text-zinc-800 p-2 rounded space-y-2"}"><h4 class="${"text-lg"}">Source</h4>
            <div><div class="${""}"><i class="${"ri-table-line align-bottom"}"></i> Table: <span class="${"underline"}">${escape(activeColumn.source.tableName)}</span></div>
                <div class="${""}"><i class="${"ri-layout-column-line align-bottom"}"></i> Column: <span class="${"underline"}">${escape(activeColumn.source.columnName)}</span></div></div></div>` : ``}


        
        <div class="${"border border-zinc-200 text-zinc-800 p-2 rounded space-y-2"}"><h4 class="${"text-lg"}">Filters (${escape(activeColumn.filters ? activeColumn.filters.length : 0)})</h4>
            
            ${activeColumn.filters ? `${each(activeColumn.filters, (filter) => {
        return `<div class="${"flex items-center space-x-2"}">${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
          menu: () => {
            return `<div slot="${"menu"}">${each(filterOptions, (option) => {
              return `<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}">${escape(option)}</div>`;
            })}
                            </div>`;
          },
          toggle: () => {
            return `<button class="${"bg-zinc-200 p-2 rounded text-zinc-800"}" slot="${"toggle"}">${escape(filter.condition)} <i class="${"ri-arrow-down-s-line align-bottom"}"></i>
                            </button>`;
          }
        })}
                    
                    
                        <input class="${"bg-zinc-100 p-2 rounded"}"${add_attribute("value", filter.value, 0)}>
                      

                        <button class="${"text-zinc-800 bg-zinc-100 py-2 px-3 rounded"}"><i class="${"ri-add-line align-bottom"}"></i>Add Filter</button>
                        <button class="${"text-zinc-800 bg-zinc-200 py-2 px-3 rounded"}"><i class="${"ri-close-line align-bottom"}"></i></button>
                    </div>`;
      })}` : `<button class="${"text-zinc-800 bg-zinc-100 py-2 px-3 rounded"}"><i class="${"ri-add-line align-bottom"}"></i>Add Filter</button>`}</div></div>`;
    }
  })}`;
});
export { ColumnSettings as default };
