import { c as create_ssr_component, d as add_attribute, e as escape } from "../../../../chunks/index-7ecd09be.js";
import { i as icon } from "../../../../chunks/iconMap-7a0cdc3f.js";
const NavItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { table } = $$props;
  let { url } = $$props;
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<a class="${"block p-1 hover:bg-indigo-500 hover:bg-opacity-20 rounded text-zinc-800"}"${add_attribute("href", url, 0)}><i class="${escape(icon[table.type]) + " align-bottom"}"></i> 
    ${escape(table.name)}</a>`;
});
export { NavItem as default };
