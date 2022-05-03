import { c as create_ssr_component, e as escape, d as add_attribute } from "./index-7ecd09be.js";
import { t as theme } from "./themes-fa5ad8e6.js";
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = false } = $$props;
  let menu = null;
  let { full } = $$props;
  let { width } = $$props;
  let { closeOnClick } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.full === void 0 && $$bindings.full && full !== void 0)
    $$bindings.full(full);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.closeOnClick === void 0 && $$bindings.closeOnClick && closeOnClick !== void 0)
    $$bindings.closeOnClick(closeOnClick);
  return `<div class="${"relative " + escape(full ? "flex-grow" : "")}"${add_attribute("this", menu, 0)}><div>${slots.toggle ? slots.toggle({}) : ``}</div>
		${show ? `<div class="${"origin-top-left absolute left-0 min-w-fit " + escape(width ? width : "w-52") + " z-40 mt-1 " + escape(theme.darkBackgroundColor) + " rounded shadow-md border border-zinc-200 shadow-md"}">${slots.menu ? slots.menu({}) : ``}</div>` : ``}</div>`;
});
export { Dropdown as D };
