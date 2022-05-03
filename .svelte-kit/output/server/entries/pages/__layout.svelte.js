import { c as create_ssr_component, e as escape } from "../../chunks/index-7ecd09be.js";
import { t as theme } from "../../chunks/themes-fa5ad8e6.js";
var app = "";
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${escape(theme.backgroundColor) + " flex flex-col h-full"}">${slots.default ? slots.default({}) : ``}</div>`;
});
export { _layout as default };
