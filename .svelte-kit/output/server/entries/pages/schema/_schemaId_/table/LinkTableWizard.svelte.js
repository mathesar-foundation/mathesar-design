import { c as create_ssr_component, v as validate_component, a as each, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { M as Modal } from "../../../../../chunks/Modal-aa394578.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
import "../../../../../chunks/themes-fa5ad8e6.js";
const LinkTableWizard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal } = $$props;
  let { tables = [] } = $$props;
  let { table = {} } = $$props;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  if ($$props.tables === void 0 && $$bindings.tables && tables !== void 0)
    $$bindings.tables(tables);
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  return `${validate_component(Modal, "Modal").$$render($$result, {
    title: "Link Table",
    subTitle: "Link data from another table by setting up foreign key constraints",
    open: showModal
  }, {}, {
    footer: () => {
      return `<div slot="${"footer"}" class="${"p-4 text-right"}"><button class="${"bg-zinc-200 p-2 text-zinc-800 rounded"}">Cancel</button>
    <button class="${"bg-zinc-100 p-2 text-zinc-800 rounded"}">Create Link</button></div>`;
    },
    body: () => {
      return `<div slot="${"body"}" class="${"space-y-2"}"><p class="${"text-zinc-500 text-sm"}">If you prefer to configure this manually go to constraints settings</p>

    <div class="${"border space-y-2 p-2 border-zinc-200 text-zinc-800 rounded"}"><h4>Select Table to Link To</h4>
        ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
        menu: () => {
          return `<div slot="${"menu"}">${each(tables, (table2) => {
            return `<div class="${"p-2 hover:bg-zinc-100 cursor-pointer"}">${escape(table2.name)}</div>`;
          })}</div>`;
        },
        toggle: () => {
          return `<button class="${"bg-zinc-200 p-2 rounded"}" slot="${"toggle"}">${`Select Table`} <i class="${"ri-arrow-drop-down-line align-bottom"}"></i></button>`;
        }
      })}</div>

    ${``}</div>`;
    }
  })}`;
});
export { LinkTableWizard as default };
