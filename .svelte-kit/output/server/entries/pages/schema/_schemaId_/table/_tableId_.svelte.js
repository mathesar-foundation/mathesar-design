import { c as create_ssr_component, b as subscribe, h as set_store_value, i as is_promise, n as noop, v as validate_component } from "../../../../../chunks/index-7ecd09be.js";
import { l as loadEntities } from "../../../../../chunks/utils-7eafc5e0.js";
import { p as page } from "../../../../../chunks/stores-09f1f3e1.js";
import { w as writable } from "../../../../../chunks/index-561394f7.js";
import Toolbar from "../Toolbar.svelte.js";
import LinkTableWizard from "./LinkTableWizard.svelte.js";
import TopNav from "../../../TopNav.svelte.js";
import Table from "../Table.svelte.js";
import "highlight-words";
import "group-array";
import SideBar from "../SideBar.svelte.js";
import Tabs from "../Tabs.svelte.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
import "../../../../../chunks/themes-fa5ad8e6.js";
import "../../../../../chunks/iconMap-7a0cdc3f.js";
import "../../../../../chunks/Dropdown-8713f3b9.js";
import "../../../../../chunks/Modal-aa394578.js";
import "../Column.svelte.js";
import "../Cell.svelte.js";
let tableStore = writable({
  id: null,
  name: null,
  columns: [],
  records: [],
  type: null
});
const U5BtableIdu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tableStore, $$unsubscribe_tableStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_tableStore = subscribe(tableStore, (value) => $tableStore = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { schemaId } = $page.params;
  let { tableId } = $page.params;
  set_store_value(tableStore, $tableStore.viewDetails = false, $tableStore);
  let entities = {};
  let schema = {};
  let table = {};
  let openLinkOptions = false;
  async function loadData() {
    entities = await loadEntities();
    schema = entities.schemas.find((schema2) => schema2.id == schemaId);
    table = entities.tables.find((table2) => table2.id == tableId);
    if (!entities || !entities.schemas || !entities.tables) {
      return;
    }
    return entities;
  }
  $$unsubscribe_tableStore();
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
	<div class="${"w-screen flex bg-zinc-100 bg-opacity-10"}">${validate_component(SideBar, "SideBar").$$render($$result, { schema }, {}, {})}
	
		<div class="${"flex overflow-hidden flex-col h-full flex-grow"}" style="${"height: calc(100vh - 52px);"}">${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
			${validate_component(Toolbar, "Toolbar").$$render($$result, { table }, {}, {})}

			${``}

			${``}

			${table && table.columns ? `${validate_component(Table, "Table").$$render($$result, { table }, {}, {})}` : `${table && table.type == "table" ? `<div class="${"p-5 text-zinc-800"}">Table has no columns</div>` : ``}`}</div></div>
	${validate_component(LinkTableWizard, "LinkTableWizard").$$render($$result, {
        table,
        tables: entities2.tables,
        showModal: openLinkOptions
      }, {}, {})}
`;
    }(__value);
  }(loadData())}`;
});
export { U5BtableIdu5D as default };
