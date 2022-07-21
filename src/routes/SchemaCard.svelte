<script>
  export let schema;
  import _ from "lodash";
  function goToSchema(schemaId) {
    window.location.href = `/schema/${schemaId}`;
  }
</script>

<div
  on:click={() => goToSchema(schema.id)}
  class="border-2 rounded p-4 space-y-4 hover:bg-indigo-50 cursor-pointer hover:border-indigo-400"
>
  <div class="flex items-start space-x-2">
    <div
      class="bg-indigo-500 text-white w-10 h-10 leading-10 text-center rounded"
    >
      {_.startCase(schema.name.slice(0, 2))}
    </div>

    <div class="leading-6 flex-grow">
      <div>
        {_.startCase(schema.name)}
        {#if schema.isLocked}<i
            class="ri-lock-fill align-bottom text-zinc-400"
          />
        {/if}
      </div>
      <div class="text-zinc-600 text-sm">{schema.description}</div>
    </div>
    {#if !schema.isLocked}
      <div><i class="ri-delete-bin-line text-zinc-800" /></div>
    {/if}
  </div>
  <div class="text-sm border flex items-center space-x-2 text-zinc-600">
    <div>
      {schema.tables?.length || 0} Tables
    </div>
    <div>{schema.queries?.length || 0} Queries</div>
  </div>
</div>
