import { c as create_ssr_component, f as createEventDispatcher, e as escape, a as each, d as add_attribute } from "../../../../../chunks/index-7ecd09be.js";
import { t as theme } from "../../../../../chunks/themes-fa5ad8e6.js";
import { i as icon } from "../../../../../chunks/iconMap-7a0cdc3f.js";
import { g as getColumnIndex } from "../../../../../chunks/utils-7eafc5e0.js";
import "lodash";
import "jsonata";
import "flatted";
import "uuid";
import "randomcolor";
const TablePreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { selectedView } = $$props;
  let { inspector } = $$props;
  let { records } = $$props;
  if ($$props.selectedView === void 0 && $$bindings.selectedView && selectedView !== void 0)
    $$bindings.selectedView(selectedView);
  if ($$props.inspector === void 0 && $$bindings.inspector && inspector !== void 0)
    $$bindings.inspector(inspector);
  if ($$props.records === void 0 && $$bindings.records && records !== void 0)
    $$bindings.records(records);
  return `<div class="${"overflow-scroll border-t flex-grow " + escape(theme.darkBackgroundColor) + " bg-opacity-10 border-zinc-200"}"><div class="${"flex w-max items-stretch"}">${each(selectedView.columns, (column) => {
    return `<div class="${"border-r w-64 border-zinc-200"}"><div class="${escape(inspector.column == column ? theme.lightBackgroundColor : theme.mediumBackgroundColor) + " whitespace-nowrap cursor-pointer h-full p-2 space-x-1"}"><span class="${escape(column.source.table.color) + " leading-4 px-1 inline-block text-center rounded text-xs"}"><i${add_attribute("class", icon[column.type], 0)}></i>
            <i${add_attribute("class", icon[column.aggregation], 0)}></i></span>

          <span>${escape(column.alias)}</span></div>
      </div>`;
  })}</div>

  <div class="${"flex w-max items-stretch"}"><div>${each(records, (record, j) => {
    return `<div class="${"flex border-b border-zinc-200"}">${each(record, (cell, i) => {
      return `<div class="${"w-64 border-r space-y-1 border-zinc-200 p-2 " + escape(getColumnIndex(selectedView, inspector.column) == i ? theme.darkBackgroundColor : "")}">${selectedView.columns[i].aggregation == "List" ? `${Array.isArray(cell) ? `${each(cell, (item) => {
        return `<div class="${"inline-block mr-1 px-2 rounded-xl bg-[" + escape(selectedView.columns[i].source.table.color) + "] bg-opacity-30"}">${escape(item)}
                    </div>`;
      })}` : `<div class="${"inline-block mr-1 px-2 rounded-xl bg-[" + escape(selectedView.columns[i].source.table.color) + "] bg-opacity-30"}">${escape(cell)}
                  </div>`}` : `${escape(cell)}`}
            </div>`;
    })}
        </div>`;
  })}</div></div></div>
<div class="${"border-zinc-200 border-t p-2 " + escape(theme.darkBackgroundColor)}">${escape(selectedView.records?.length || 0)} Records
</div>`;
});
export { TablePreview as default };
