import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../chunks/index-7ecd09be.js";
import { p as page } from "../../chunks/stores-09f1f3e1.js";
import { D as Dropdown } from "../../chunks/Dropdown-8713f3b9.js";
import "uuid";
import _ from "lodash";
import "../../chunks/themes-fa5ad8e6.js";
const TopNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { schema } = $$props;
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  $$unsubscribe_page();
  return `<div class="${"p-2 flex space-x-3 items-center border-b bg-white border-zinc-200"}"><a href="${"/"}" class="${"block bg-zinc-200 text-sm text-zinc-800 rounded px-1 text-opacity-40 border border-zinc-300"}">Prototype</a>

  <div class="${"flex items-center mr-2 space-x-3"}"><div class="${"border text-zinc-800 border-zinc-200 rounded flex items-center space-x-1 p-1 text-sm"}">${$page.params.schemaId ? `<span><i class="${"ri-database-2-line align-bottom"}"></i> My Database</span>
        <span class="${"text-zinc-500"}">/</span>
        <div class="${"bg-indigo-500 text-white text-sm px-1 text-center rounded"}">${escape(_.startCase(schema.name.slice(0, 2)))}</div>
        <a href="${"/schema/" + escape(schema.id)}" class="${"font-semibold"}">${escape(schema.name)}</a>` : `<span><i class="${"ri-database-2-line align-bottom"}"></i> My Database</span>`}
      <button class="${"border-l w-6 text-center"}"><i class="${"ri-settings-line align-bottom"}"></i></button></div>

    </div>
  ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}"><div class="${"p-2 cursor-pointer"}">Query</div>
        <div class="${"p-2 cursor-pointer"}">Table</div></div>`;
    },
    toggle: () => {
      return `<button class="${"border text-sm p-1 rounded border-zinc-200"}" slot="${"toggle"}">New <i class="${"ri-add-line align-bottom"}"></i></button>`;
    }
  })}
  


<div class="${"border flex items-center flex-grow border rounded overflow-hidden"}"><i class="${"ri-search-line align-bottom px-1 text-zinc-500"}"></i>
  <input type="${"text"}" class="${"bg-zinc-100 bg-opacity-40 flex-grow p-1 text-sm"}" placeholder="${"Search or Jump To\u2026"}"></div>
  <div class="${"cursor-pointer text-zinc-500"}">Reset
  </div></div>`;
});
export { TopNav as default };
