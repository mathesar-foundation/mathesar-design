import { c as create_ssr_component, b as subscribe, i as is_promise, n as noop, v as validate_component, e as escape, a as each } from "../../../../chunks/index-7ecd09be.js";
import { p as page } from "../../../../chunks/stores-09f1f3e1.js";
import TopNav from "../../TopNav.svelte.js";
import _ from "lodash";
import { l as loadEntities } from "../../../../chunks/utils-7eafc5e0.js";
import SideBar from "./SideBar.svelte.js";
import "../../../../chunks/Dropdown-8713f3b9.js";
import "../../../../chunks/themes-fa5ad8e6.js";
import "uuid";
import "jsonata";
import "flatted";
import "randomcolor";
import "../../../../chunks/iconMap-7a0cdc3f.js";
const U5BschemaIdu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { schemaId } = $page.params;
  let entities;
  let schema = {};
  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema2) => schema2.id == schemaId);
    schema = schema;
    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }
  $$unsubscribe_page();
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
  <div>Loading (can be removed)</div>
`;
    }
    return function(entities2) {
      return `
  ${validate_component(TopNav, "TopNav").$$render($$result, { schema }, {}, {})}

  <div class="${"flex flex-grow bg-zinc-100 bg-opacity-10"}">${validate_component(SideBar, "SideBar").$$render($$result, { expanded: true, schema }, {}, {})}

    <div class="${"space-y-4 w-full text-zinc-800"}"><div class="${"flex items-center space-x-2 bg-opacity-10 p-8 bg-indigo-500"}"><div class="${"bg-indigo-500 text-white text-2xl py-2 w-12 text-center rounded"}">${escape(_.startCase(schema.name.slice(0, 2)))}</div>
        <div><h2 class="${"text-xl font-semibold"}">${escape(schema.name)}</h2>
          <p class="${"text-sm text-zinc-500"}">${escape(schema.tables.filter((t) => t.type == "table").length)} Tables
            ${escape(schema.tables.filter((t) => t.type == "view").length)} Views
          </p></div></div>

      <div class="${"px-8 space-y-4"}"><div class="${"border-b py-2"}"><h3 class="${"text-lg"}">Recent</h3></div>

        <div class="${"flex items-center space-x-4"}">${each(schema.tables, (table) => {
        return `<a class="${"block border-2 space-x-1 p-4 rounded w-64"}" href="${"./" + escape(schema.id) + "/table/" + escape(table.id)}"><i class="${"ri-table-fill align-bottom"}"></i> <span>${escape(table.name)}</span></a>`;
      })}</div>

        <div class="${"border-b py-2"}"><h3 class="${"text-lg"}">Activity</h3></div>
        <p class="${"text-zinc-500"}">No Activity</p>

        <div class="${"border-b py-2"}"><h3 class="${"text-lg"}">Get Started</h3></div>
        <div><button>Create a Table</button>
          <button>Create a View</button></div></div></div></div>
`;
    }();
  }(loadData())}`;
});
export { U5BschemaIdu5D as default };
