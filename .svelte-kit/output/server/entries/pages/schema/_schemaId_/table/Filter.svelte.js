import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
const Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { table } = $$props;
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, { closeOnClick: false }, {}, {
    menu: () => {
      return `<div class="${"p-2 space-y-2"}" slot="${"menu"}"><div>Filter</div>
        <button class="${"py-1 px-2 rounded " + escape("block") + " bg-zinc-200"}">Add New Filter</button>

        ${``}</div>`;
    },
    toggle: () => {
      return `<button slot="${"toggle"}" class="${"border rounded py-1 px-2 border-zinc-200"}"><i class="${"ri-filter-fill align-bottom " + escape(theme.primaryTextColor)}"></i> Filter</button>`;
    }
  })}`;
});
export { Filter as default };
