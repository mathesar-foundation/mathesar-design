import { c as create_ssr_component, f as createEventDispatcher, e as escape } from "./index-7ecd09be.js";
import { t as theme } from "./themes-fa5ad8e6.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { title = "" } = $$props;
  let { subTitle } = $$props;
  createEventDispatcher();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subTitle === void 0 && $$bindings.subTitle && subTitle !== void 0)
    $$bindings.subTitle(subTitle);
  return `${open ? `<div class="${"modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-6 lg:p-0"}"><div class="${"modal-overlay fixed w-full h-full bg-gray-900 opacity-80"}"></div>
    <div class="${escape(theme.darkBackgroundColor) + " w-full flex flex-col lg:h-5/6 lg:w-5/6 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"}"><div class="${"flex justify-between items-center py-4 px-6 text-xl text-zinc-800"}"><div>${escape(title)}
        ${subTitle ? `<p class="${"text-sm text-zinc-500"}">${escape(subTitle)}</p>` : ``}</div>
        <button class="${""}"><i class="${"ri-close-line align-bottom"}"></i></button></div>
      <div class="${"p-6 flex-grow"}">${slots.body ? slots.body({}) : ``}</div>
      ${slots.footer ? slots.footer({}) : ``}</div></div>` : ``}`;
});
export { Modal as M };
