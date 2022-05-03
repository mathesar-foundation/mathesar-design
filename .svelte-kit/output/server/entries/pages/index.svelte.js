import { c as create_ssr_component, i as is_promise, n as noop, v as validate_component, a as each, e as escape } from "../../chunks/index-7ecd09be.js";
import TopNav from "./TopNav.svelte.js";
import _ from "lodash";
import { l as loadEntities } from "../../chunks/utils-7eafc5e0.js";
import { t as theme } from "../../chunks/themes-fa5ad8e6.js";
import "../../chunks/stores-09f1f3e1.js";
import "../../chunks/Dropdown-8713f3b9.js";
import "uuid";
import "jsonata";
import "flatted";
import "randomcolor";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let entities;
  async function loadData() {
    entities = await loadEntities();
    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }
  return `<div class="${"bg-yellow-100 fixed bottom-0 p-2 w-screen"}"><a href="${"https://jolly-phoenix-c9377f.netlify.app/?activeSchema=album_collection"}">For Old Prototype Click Here</a></div>

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
    <div>Loading (can be removed)</div>
    
`;
    }
    return function(entities2) {
      return `
${validate_component(TopNav, "TopNav").$$render($$result, { entities: entities2 }, {}, {})}
<div class="${"space-y-2 p-4 flex-grow"}"><h2 class="${"text-zinc-800 text-4xl font-light"}">Mathesar Prototype</h2>
    <div class="${"text-lg"}">Sample Schemas</div>
    ${each(entities2.schemas, (schema, i) => {
        return `<a class="${"block hover:bg-opacity-10 bg-opacity-0 bg-indigo-500 border-2 p-4 text-lg rounded space-x-2 " + escape(theme.textColor) + " border-zinc-200"}" href="${"/schema/" + escape(i)}"><span class="${"bg-indigo-500 text-white text-sm py-1 px-2 text-lg text-center rounded"}">${escape(_.startCase(schema.name.slice(0, 2)))}</span>
            <span>${escape(schema.name)}</span>
        </a>`;
      })}</div>

    
`;
    }(__value);
  }(loadData())}`;
});
export { Routes as default };
