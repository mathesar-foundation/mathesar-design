import { c as create_ssr_component, b as subscribe, f as createEventDispatcher, e as escape, a as each } from "../../../../chunks/index-7ecd09be.js";
import { p as page } from "../../../../chunks/stores-09f1f3e1.js";
import { v4 } from "uuid";
import { i as icon } from "../../../../chunks/iconMap-7a0cdc3f.js";
const SideBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { schema } = $$props;
  let { expanded } = $$props;
  createEventDispatcher();
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  $$unsubscribe_page();
  return `<div class="${"flex shrink-0"}"><div class="${"bg-zinc-200 bg-opacity-30"}"><div class="${"w-12 h-12 text-zinc-800 cursor-pointer hover:bg-opacity-80 bg-opacity-0 bg-zinc-100 flex"}"><i class="${"ri-menu-line text-lg m-auto"}"></i></div>
    <div class="${"w-12 h-12 text-zinc-800 flex"}"><i class="${"ri-function-line text-lg m-auto"}"></i></div></div>

  ${expanded ? `<div class="${"flex flex-grow flex-col border-r border-zinc-200 h-full p-2"}"><div class="${"border flex items-center border rounded overflow-hidden"}"><i class="${"ri-search-line align-bottom px-1 text-zinc-500"}"></i>
        <input type="${"text"}" class="${"bg-zinc-100 bg-opacity-40 flex-grow p-1 text-sm"}" placeholder="${"Type to Search"}"></div>

      <div><div class="${"flex text-sm text-zinc-800 p-2 space-x-4 border-b leading-6 border-zinc-200"}"><button class="${"font-semibold bg-zinc-50 rounded px-1"}">All (${escape(schema.tables.length | 0)})</button>
          <button>Queries (${escape(schema.queries?.length | 0)})</button>
          <button>Views (${escape(schema.views?.length | 0)})</button>
          <button>Tables (${escape(schema.tables?.length | 0)})</button></div>

        <div><div class="${"p-2 border-b flex items-center border-zinc-200"}"><h4 class="${"text-zinc-800 font-semibold text-sm"}">Queries</h4>
            <a href="${"http://" + escape($page.url.host) + "/schema/" + escape(schema.id) + "/" + escape(v4())}" class="${"ml-auto bg-zinc-200 px-1 text-center rounded text-zinc-800 text-sm"}"><i class="${"ri-add-line align-bottom"}"></i></a></div>
          ${schema.queries ? `${each(schema.queries, (table, i) => {
    return `<a href="${"http://" + escape($page.url.host) + "/schema/" + escape(schema.id) + "/" + escape(table.id)}" class="${"text-zinc-800 p-2 border-b block border-zinc-200 cursor-pointer space-x-1"}"><i class="${escape(icon[table.type]) + " align-bottom"}"></i>
                <span>${escape(table.name)}</span>
              </a>`;
  })}` : `<div class="${"p-2 text-zinc-500 text-sm"}">You have no queries</div>`}</div>

        <div><div class="${"p-2 border-b flex items-center border-zinc-200"}"><h4 class="${"text-zinc-800 font-semibold text-sm"}">Views</h4>
            <a href="${"http://" + escape($page.url.host) + "/schema/" + escape(schema.id) + "/" + escape(v4())}" class="${"ml-auto bg-zinc-200 px-1 text-center rounded text-zinc-800 text-sm"}"><i class="${"ri-add-line align-bottom"}"></i></a></div>
          ${schema.views ? `${each(schema.views, (table, i) => {
    return `<div class="${"text-zinc-800 p-2 border-b border-zinc-200 cursor-pointer space-x-1"}"><i class="${escape(icon[table.type]) + " align-bottom"}"></i>
                <span>${escape(table.name)}</span>
              </div>`;
  })}` : `<div class="${"p-2 text-zinc-500 text-sm"}">You have no views</div>`}</div>

        <div><div class="${"p-2 border-b flex items-center border-zinc-200"}"><h4 class="${"text-zinc-800 font-semibold text-sm"}">Tables</h4>
            <a href="${"http://" + escape($page.url.host) + "/schema/" + escape(schema.id) + "/" + escape(v4())}" class="${"ml-auto bg-zinc-200 px-1 text-center rounded text-zinc-800 text-sm"}"><i class="${"ri-add-line align-bottom"}"></i></a></div>
          ${each(schema.tables, (table, i) => {
    return `<div class="${"text-zinc-800 p-2 border-b border-zinc-200 cursor-pointer space-x-1"}"><i class="${escape(icon[table.type]) + " align-bottom"}"></i>
              <span>${escape(table.name)}</span>
            </div>`;
  })}</div></div></div>` : ``}</div>`;
});
export { SideBar as default };
