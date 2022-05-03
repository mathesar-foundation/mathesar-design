import { c as create_ssr_component } from "../../../../../chunks/index-7ecd09be.js";
import "group-array";
const Design = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { table } = $$props;
  table.columns.map((c) => c.name);
  if ($$props.table === void 0 && $$bindings.table && table !== void 0)
    $$bindings.table(table);
  return ``;
});
export { Design as default };
