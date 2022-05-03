import { c as create_ssr_component, f as createEventDispatcher, v as validate_component, d as add_attribute, a as each, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { M as Modal } from "../../../../../chunks/Modal-aa394578.js";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
import ColumnSelector from "./ColumnSelector.svelte.js";
import "../../../../../chunks/themes-fa5ad8e6.js";
import "../../../../../chunks/utils-7eafc5e0.js";
import "./Column.svelte.js";
import "../../../../../chunks/iconMap-7a0cdc3f.js";
const FormulaSettings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showFormulaModal } = $$props;
  let { activeFormula } = $$props;
  createEventDispatcher();
  let { view } = $$props;
  let { columns } = $$props;
  let formulas = [
    {
      name: "count",
      arguments: [{ type: "column" }, { type: "integer" }]
    }
  ];
  if ($$props.showFormulaModal === void 0 && $$bindings.showFormulaModal && showFormulaModal !== void 0)
    $$bindings.showFormulaModal(showFormulaModal);
  if ($$props.activeFormula === void 0 && $$bindings.activeFormula && activeFormula !== void 0)
    $$bindings.activeFormula(activeFormula);
  if ($$props.view === void 0 && $$bindings.view && view !== void 0)
    $$bindings.view(view);
  if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0)
    $$bindings.columns(columns);
  return `${validate_component(Modal, "Modal").$$render($$result, {
    title: "Add New Formula Column",
    open: showFormulaModal
  }, {}, {
    footer: () => {
      return `<div slot="${"footer"}" class="${"p-6 text-right space-x-1"}"><button class="${"p-2 bg-zinc-200 text-zinc-800 rounded"}">Cancel</button>
        <button class="${"p-2 bg-zinc-100 text-zinc-800 rounded"}">Apply</button></div>`;
    },
    body: () => {
      return `<div slot="${"body"}" class="${"space-y-4 h-full flex flex-col"}"><div class="${"space-y-2"}"><label class="${"text-zinc-800 block"}" for="${""}">Column Name</label>
            <input type="${"text"}" class="${"p-2 w-full bg-opacity-30 rounded bg-zinc-100 text-zinc-800"}" placeholder="${"Column Name"}"${add_attribute("value", activeFormula.name, 0)}></div>

        

        <div class="${"grid grid-cols-6 flex-grow gap-4"}"><div class="${"col-span-2"}"><div class="${"border border-zinc-200 rounded text-zinc-800 h-full p-2 space-y-2"}"><div class="${"text-lg"}">Functions</div>
                    <div class="${"text-zinc-500"}">String Functions</div>
                    <div class="${"hover:bg-opacity-90 bg-zinc-200 bg-opacity-60 cursor-pointer py-1 px-2 rounded"}">Count</div></div></div>


            <div class="${"col-span-4"}"><div class="${"border p-2 h-full rounded space-y-2 text-zinc-800 border-zinc-200"}">${each(formulas, (formula) => {
        return `<h4 class="${"capitalize"}">Set Variables for ${escape(formula.name)}</h4>
                        <p>To use this formula, you&#39;ll need to set some options:</p>
        
                        ${each(formula.arguments, (argument) => {
          return `${argument.type == "column" ? `<div>Select Column</div>
                                ${validate_component(ColumnSelector, "ColumnSelector").$$render($$result, { columns, view }, {}, {})}` : ``}

                            ${argument.type == "integer" ? `<div>Select Integer</div>
                                <input type="${"text"}" class="${"bg-zinc-100 p-2 rounded bg-opacity-60 w-48"}">` : ``}`;
        })}`;
      })}</div>

                </div></div></div>`;
    }
  })}`;
});
export { FormulaSettings as default };
