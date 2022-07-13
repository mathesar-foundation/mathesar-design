<script>
    import { page } from "$app/stores";
  import {saveSchema} from "$lib/utils";
  import { v4 as uuidv4 } from "uuid";

  let newSchema = {
    id: uuidv4(),
    name: "New Project",
    description: "Project Description",
    tables: [],
  };

  function openSchema(){
    saveSchema(newSchema);

    
    setTimeout(() => {
        window.location.href = `/schema/${newSchema.id}`;
    }, 200);
  }
</script>

<div class="flex h-screen">
<div class="bg-indigo-700 w-96 p-8 space-y-4 text-white">
  
</div>

<div class="p-8 space-y-4 w-96">
  <h2 class="text-zinc-800 text-3xl font-light">New Schema</h2>

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
  <div class="flex justify-end space-x-2">
    <button class="border bg-zinc-200 p-2 rounded" on:click={openSchema}>Cancel</button>
  <button class="border-2 border-zinc-300 p-2 rounded" on:click={openSchema}>Create Schema</button>
</div>
</div>
</div>