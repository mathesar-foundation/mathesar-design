import { c as create_ssr_component, e as escape } from "../../../../../chunks/index-7ecd09be.js";
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message = "Hi" } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `<p>\u{1F389} ${escape(message)} \u{1F37E}</p>`;
});
export { Popup as default };
