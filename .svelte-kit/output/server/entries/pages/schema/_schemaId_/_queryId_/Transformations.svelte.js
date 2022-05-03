import { c as create_ssr_component, f as createEventDispatcher, e as escape, v as validate_component, a as each } from "../../../../../chunks/index-7ecd09be.js";
import Step from "./Step.svelte.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
import "../../../../../chunks/themes-fa5ad8e6.js";
import "../../../../../chunks/iconMap-7a0cdc3f.js";
import "../../../../../chunks/utils-7eafc5e0.js";
const Transformations = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { selectedView } = $$props;
  let minimize = [];
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"p-2 space-y-2"}"><h4 class="${"font-semibold text-sm leading-6"}">Transform Steps (${escape(Object.keys(selectedView.steps).length)})</h4>

	${selectedView.columns.length > 0 ? `${validate_component(Dropdown, "Dropdown").$$render($$result, { full: true }, {}, {
      menu: () => {
        return `<div slot="${"menu"}"><div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${"ri-filter-line align-bottom"}"></i> Filter
				</div>
				<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${"ri-layout-row-fill align-bottom"}"></i> Summarize
				</div>
				<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${"ri-arrow-up-down-fill align-bottom"}"></i> Sort
				</div>
				<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${"ri-tools-line align-bottom"}"></i> Deduplicate
				</div>
				<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${"ri-tools-line align-bottom"}"></i> Limit
				</div>
				<div class="${"p-2 cursor-pointer hover:bg-zinc-200"}"><i class="${"ri-tools-line align-bottom"}"></i> Offset
				</div></div>`;
      },
      toggle: () => {
        return `<button slot="${"toggle"}" class="${"cursor-pointer w-full bg-zinc-200 py-1 px-2 text-sm flex items-center rounded"}"><div class="${"flex-grow"}">Select Step</div>
				<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></button>`;
      }
    })}` : `<button disabled class="${"opacity-40 cursor-pointer w-full bg-zinc-200 py-1 px-2 text-sm flex items-center rounded"}"><div class="${"flex-grow"}">Select Step</div>
			<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></button>`}</div>

<div class="${"border-t overflow-y-scroll p-2 border-zinc-200 space-y-2 flex-grow"}">${each(Object.keys(selectedView.steps), (step, i) => {
      return `${validate_component(Step, "Step").$$render($$result, {
        step,
        minimize: minimize[i],
        selectedView
      }, {
        minimize: ($$value) => {
          minimize[i] = $$value;
          $$settled = false;
        },
        selectedView: ($$value) => {
          selectedView = $$value;
          $$settled = false;
        }
      }, {})}`;
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export { Transformations as default };
