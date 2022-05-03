import { c as create_ssr_component, b as subscribe, i as is_promise, n as noop, v as validate_component, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { p as page } from "../../../../../chunks/stores-09f1f3e1.js";
import TopNav from "../../../TopNav.svelte.js";
import { l as loadEntities } from "../../../../../chunks/utils-7eafc5e0.js";
import Tabs from "../Tabs.svelte.js";
import Toolbar from "../Toolbar.svelte.js";
import Table from "../Table.svelte.js";
import { M as Modal } from "../../../../../chunks/Modal-aa394578.js";
import SideBar from "../SideBar.svelte.js";
import "../../../../../chunks/Dropdown-8713f3b9.js";
import "../../../../../chunks/themes-fa5ad8e6.js";
import "uuid";
import "lodash";
import "jsonata";
import "flatted";
import "randomcolor";
import "../../../../../chunks/iconMap-7a0cdc3f.js";
import "../Column.svelte.js";
import "../Cell.svelte.js";
const U5BviewIdu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { schemaId } = $page.params;
  const { viewId } = $page.params;
  let showQueryModal;
  let schema = {};
  let view = {};
  let entities;
  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema2) => schema2.id == schemaId);
    view = entities.views.find((v) => v.id == viewId);
    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
  <div>Loading (can be removed)</div>
`;
      }
      return function(entities2) {
        return `
  ${validate_component(TopNav, "TopNav").$$render($$result, { schema }, {}, {})}
  <div class="${"w-screen flex bg-zinc-100 bg-opacity-10"}">${validate_component(SideBar, "SideBar").$$render($$result, { schema }, {}, {})}

    <div class="${"flex overflow-hidden flex-col h-full flex-grow"}" style="${"height: calc(100vh - 52px);"}">${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}

      ${validate_component(Toolbar, "Toolbar").$$render($$result, { table: view }, {}, {})}

      ${``}

      ${validate_component(Table, "Table").$$render($$result, { table: view }, {}, {})}</div></div>

  ${validate_component(Modal, "Modal").$$render($$result, { title: "SQL Query", open: showQueryModal }, {
          open: ($$value) => {
            showQueryModal = $$value;
            $$settled = false;
          }
        }, {
          body: () => {
            return `<div slot="${"body"}" class="${"space-y-2"}"><div class="${"flex items-center"}"><button class="${"border rounded p-2"}"><i class="${"ri-clipboard-line align-bottom"}"></i> Copy Query</button></div>
      <div class="${"border p-4 rounded bg-zinc-800 text-white"}"><pre><code>CREATE VIEW &#39;${escape(view.name)}&#39; AS
SELECT
${escape(view.columns.map((c) => c.name).join(","))}
FROM &#39;${escape(view.baseTable.name)}&#39;         
</code></pre></div></div>`;
          }
        })}
`;
      }();
    }(loadData())}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export { U5BviewIdu5D as default };
