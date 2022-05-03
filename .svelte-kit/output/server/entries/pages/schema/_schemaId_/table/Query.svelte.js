import { c as create_ssr_component, e as escape, a as each } from "../../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import "highlight-words";
import "jsonata";
import "flatted";
import "uuid";
import "lodash";
import "randomcolor";
const Query = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { table } = $$props;
  let chunks = [];
  let { allowed } = $$props;
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  if ($$props.allowed === void 0 && $$bindings.allowed && allowed !== void 0)
    $$bindings.allowed(allowed);
  return `${allowed ? `<div class="${"flex-grow space-y-2 " + escape(theme.darkBackgroundColor) + " p-4 border-b-4 border-zinc-200"}"><div class="${"flex items-center space-x-4"}"><h3 class="${"text-zinc-800"}">View Query</h3>
        <button class="${"ml-auto text-zinc-800"}"><i class="${"ri-edit-line align-bottom " + escape(theme.primaryTextColor)}"></i> Edit in View Builder</button>
        <button class="${"text-zinc-800"}"><i class="${"ri-clipboard-line align-bottom " + escape(theme.primaryTextColor)}"></i> Copy</button></div>
    <p class="${"text-sm text-zinc-500"}"><i class="${"ri-error-warning-fill align-bottom"}"></i>Warning: Once you edit the generated query, you cannot go back and use the view editor interface to update or modify this view.</p>
     
    <div class="${"border p-2 border-zinc-200"}"><code class="${"text-zinc-800 text-sm space-y-1"}">${each(chunks, (chunk) => {
    return `<pre class="${"flex"}">${each(chunk, (term) => {
      return `
                    <div class="${"rounded inline px-1"}">
                        ${escape(term.text)}
                    </div>
                `;
    })}</pre>`;
  })}</code></div>
    <div class="${"flex w-full"}"></div></div>` : `<div class="${"p-2 text-zinc-800"}">Not allowed</div>`}`;
});
export { Query as default };
