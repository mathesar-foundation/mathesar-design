<script>
    import { page } from "$app/stores";
  import {saveSchema} from "$lib/utils";
  import { v4 as uuidv4 } from "uuid";

  let newSchema = {
    id: uuidv4(),
    name: "New Schema",
    description: "",
    tables: [],
  };

  function openSchema(){
    saveSchema(newSchema);

    
    setTimeout(() => {
        window.location.href = `/schema/${newSchema.id}`;
    }, 200);
  }
</script>

<div class="p-6 space-y-4 w-96">
  <h2 class="text-2xl">New Schema</h2>

  <div class="space-y-1">
    <label class="block" for="">Name</label>
    <input type="text" class="border p-2 rounded w-full" bind:value={newSchema.name} />
  </div>
  <div class="space-y-1">
    <label class="block" for="">Description</label>
    <input
      type="text"
      class="border p-2 rounded w-full"
      bind:value={newSchema.description}
    />
  </div>
  <div class="flex justify-end">
  <button class="border border-zinc-300 p-2 rounded" on:click={openSchema}>Create Schema</button>
</div>
</div>
