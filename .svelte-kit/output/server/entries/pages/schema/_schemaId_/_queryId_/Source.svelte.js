import { c as create_ssr_component, e as escape } from "../../../../../chunks/index-7ecd09be.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
const Source = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { column } = $$props;
  let { externalLink } = $$props;
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  if ($$props.externalLink === void 0 && $$bindings.externalLink && externalLink !== void 0)
    $$bindings.externalLink(externalLink);
  return `<div class="${"border border-zinc-300 rounded p-2 space-y-4 text-sm"}"><div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}">Column</div>
        <div class="${"text-sm col-span-2"}"><i class="${escape(icon[column.type]) + " bg-[" + escape(column.source.table.color) + "] align-bottom rounded"}"></i>
            ${escape(column.name)}</div></div>

    <div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}">Table</div>
        <div class="${"text-sm col-span-2"}"><span class="${"rounded px-1 bg-opacity-20 bg-[" + escape(column.source.table.color) + "]"}">${escape(column.source.table.name)}</span></div></div>

    <div class="${"grid grid-cols-3"}"><div class="${"col-span-1"}">Link</div>

        <div class="${"text-sm col-span-2"}">${externalLink ? `<span class="${"rounded px-1 bg-opacity-20 bg-[" + escape(externalLink.referenceTable.color) + "]"}">${escape(externalLink.referenceTable.name)}</span>
                ${escape(externalLink.column)}` : ``}
            <span class="${"rounded px-1 bg-opacity-20 bg-[" + escape(column.source.link.table.color) + "]"}">${escape(column.source.link.table.name)}</span>
            <div class="${"space-x-1"}"><i class="${"ri-key-line align-bottom"}"></i><span><i class="${escape(icon[column.source.link.column.type]) + " " + escape(column.source.link.table.color) + " align-bottom rounded"}"></i>
                    ${escape(column.source.link.column.name)}</span></div></div></div></div>`;
});
export { Source as default };
