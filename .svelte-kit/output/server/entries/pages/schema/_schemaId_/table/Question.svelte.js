import { c as create_ssr_component, e as escape, d as add_attribute } from "../../../../../chunks/index-7ecd09be.js";
const Question = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { table } = $$props;
  let { selectedTable } = $$props;
  let answers = [];
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  if ($$props.selectedTable === void 0 && $$bindings.selectedTable && selectedTable !== void 0)
    $$bindings.selectedTable(selectedTable);
  {
  }
  return `<div class="${"text-zinc-800 space-y-2"}"><div class="${"flex items-center border border-zinc-200 rounded p-2"}"><p>Can a single ${escape(table.name)} record be linked to more than one ${escape(selectedTable.name)} record?</p>
        <div class="${"ml-auto"}"><div class="${"space-x-2"}"><input value="${"Yes"}" type="${"radio"}" name="${"q1"}" id="${"a1"}"${answers[0] === "Yes" ? add_attribute("checked", true, 1) : ""}> <label for="${"a1"}">Yes</label></div>
            <div class="${"space-x-2"}"><input value="${"No"}" type="${"radio"}" name="${"q1"}" id="${"a2"}"${answers[0] === "No" ? add_attribute("checked", true, 1) : ""}> <label for="${"a2"}">No</label></div></div></div>
    <div class="${"flex items-center border border-zinc-200 rounded p-2"}"><p>Can a single ${escape(selectedTable.name)} record be linked to more than one ${escape(table.name)} record?</p>

        <div class="${"ml-auto"}"><div class="${"space-x-2"}"><input value="${"Yes"}" type="${"radio"}" name="${"q2"}" id="${"a3"}"${answers[1] === "Yes" ? add_attribute("checked", true, 1) : ""}> <label for="${"a3"}">Yes</label></div>
            <div class="${"space-x-2"}"><input value="${"No"}" type="${"radio"}" name="${"q2"}" id="${"a4"}"${answers[1] === "No" ? add_attribute("checked", true, 1) : ""}> <label for="${"a4"}">No</label></div></div></div>

    ${answers.every((a) => a == "No") ? `ALL NO` : ``}

    ${answers.every((a) => a == "Yes") ? `ALL Yes` : ``}</div>`;
});
export { Question as default };
