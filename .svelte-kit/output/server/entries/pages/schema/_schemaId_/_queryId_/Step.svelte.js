import { c as create_ssr_component, f as createEventDispatcher, e as escape, v as validate_component, a as each, d as add_attribute } from "../../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
import { D as Dropdown } from "../../../../../chunks/Dropdown-8713f3b9.js";
import { s as summarizations, c as conditions } from "../../../../../chunks/utils-7eafc5e0.js";
import _ from "lodash";
import "jsonata";
import "flatted";
import "uuid";
import "randomcolor";
const Step = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { selectedView } = $$props;
  let { step } = $$props;
  let { minimize = true } = $$props;
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.minimize === void 0 && $$bindings.minimize && minimize !== void 0)
    $$bindings.minimize(minimize);
  return `<div class="${[
    "bg-zinc-200 p-2 rounded space-y-2 text-sm",
    selectedView.steps[step].hidden ? "opacity-20" : ""
  ].join(" ").trim()}"><div class="${"flex items-center space-x-2 cursor-pointer"}"><div class="${"flex-grow"}"><div class="${"font-semibold"}"><i class="${escape(icon[selectedView.steps[step].type]) + " align-bottom"}"></i> ${escape(_.startCase(step))}</div></div>

		<button><i class="${"ri-eye-line align-bottom"}"></i></button>

		<button><i class="${"ri-delete-bin-line align-bottom"}"></i></button></div>


	${!minimize ? `<div class="${"font-semibold"}">Column</div>
		${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}">${each(selectedView.columns, (column) => {
        return `<div class="${"hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 space-x-1 p-2"}"><i class="${escape(icon[column.type]) + " align-bottom border rounded"}"></i> <span>${escape(column.alias)}</span>
					</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${"cursor-pointer flex items-center border bg-zinc-100 border-zinc-300 space-x-1 p-2 rounded"}"><span class="${"flex-grow"}"><i class="${escape(icon[selectedView.steps[step].column.type]) + " align-bottom border rounded"}"></i> ${escape(selectedView.steps[step].column.alias)}</span>
				<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
    }
  })}

		${selectedView.steps[step].aggregations ? `<div class="${"font-semibold"}">Summarize By</div>
			${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}">${each(summarizations[selectedView.steps[step].column.type], (condition) => {
        return `<div class="${"hover:bg-opacity-40 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"}"><span>${escape(_.startCase(condition))}</span>
						</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${"cursor-pointer flex items-center border border-zinc-300 bg-zinc-100 space-x-1 p-2 rounded"}"><span class="${"flex-grow"}">${escape(_.startCase(selectedView.steps[step].summaryCondition || summarizations[selectedView.steps[step].column.type][0]))}</span>
					<i class="${"ri-arrow-drop-down-line align-bottom"}"></i></div>`;
    }
  })}

			<div class="${"font-semibold"}">Aggregations</div>
			<div class="${"space-y-2"}">${each(selectedView.columns, (column, i) => {
    return `${column !== selectedView.steps[step].column ? `<div><i class="${escape(icon[column.type]) + " align-bottom"}"></i> ${escape(column.alias)}</div>
						<div class="${"border " + escape(theme.mediumBorderColor) + " bg-zinc-100 p-2 rounded"}">${escape(selectedView.steps[step].aggregations.map((a) => a[i]))}
						
						</div>` : ``}`;
  })}</div>` : ``}

		<div class="${"flex items-center space-x-2"}">${selectedView.steps[step].condition ? `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    menu: () => {
      return `<div slot="${"menu"}">${each(conditions[selectedView.steps[step].column.type], (condition) => {
        return `<div class="${"hover:bg-zinc-50 space-x-1 p-2"}"><span>${escape(condition)}</span>
							</div>`;
      })}</div>`;
    },
    toggle: () => {
      return `<div slot="${"toggle"}" class="${"cursor-pointer border bg-zinc-100 border-zinc-300 space-x-1 p-2 rounded"}"><span>${escape(selectedView.steps[step].condition)}</span></div>`;
    }
  })}` : ``}
			${selectedView.steps[step].value !== void 0 ? `<input class="${"bg-zinc-100 p-2 rounded w-full"}" type="${"text"}"${add_attribute("value", selectedView.steps[step].value, 0)}>` : ``}</div>` : ``}</div>`;
});
export { Step as default };
