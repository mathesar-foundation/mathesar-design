<script>
  import Dropdown from "$lib/Dropdown.svelte";
  import Toggle from "$lib/Toggle.svelte";
  import { icon } from "$lib/iconMap";
  export let selectedView;

  let newParameter;

  function addNewParameter() {
    if (!selectedView.parameters) {
      selectedView.parameters = {};
    }

    let parameterName = `Parameter-${
      Object.keys(selectedView.parameters).length
    }`;

    selectedView.parameters[parameterName] = {};
  }
</script>

<div class="space-y-1">
  <h4 class="font-semibold text-sm">Query Parameters</h4>
  <!--
  <p class="text-xs text-zinc-500">
    Parameters for this query can be defined and used in the transformation
    steps to change the output.
  </p>
  -->
</div>




{#if selectedView.parameters}
  {#each Object.keys(selectedView.parameters) as parameter}
     

    <div class="grid grid-cols-2 space-x-2">
        <div class="space-y-1">
          <label class="text-sm font-semibold" for="">Name</label>
          <input
            bind:value={parameter}
            type="text"
            class="border rounded p-1 w-full border-zinc-300 text-sm"
          />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-semibold" for="">Value</label>
          <div class="flex items-center space-x-1">
            <Dropdown full={true} position={"right"}>
                <button
                class="cursor-pointer flex flex-grow items-center w-full text-left border border-zinc-300 bg-zinc-50 space-x-1 p-1 text-sm rounded"
                slot="toggle"
                >
                <span class="flex-grow"
                    >{selectedView.parameters[parameter].value || "Select"}</span
                >
                <i class="ri-arrow-drop-down-line align-bottom" />
                </button>
                <div slot="menu">

                
                <!--
                {#each selectedView.baseTable.columns as column}
                    <div
                    class="hover:bg-zinc-200 bg-opacity-0 bg-zinc-50 cursor-pointer space-x-1 p-2"
                    on:click={() => (selectedView.parameters[parameter] = column)}
                    >
                    <i
                        class="{icon[column.type]} align-bottom border rounded"
                        style="background-color:{selectedView.baseTable.color}"
                    /> <span>{column.name}</span>
                    </div>
                {/each}
                -->
                </div>
            </Dropdown>
            <button><i class="ri-delete-bin-line align-bottom"></i></button>
            </div>
        </div>
        
      </div>
  {/each}
{/if}


<button
  on:click={addNewParameter}
  disabled={!selectedView.baseTable}
  class:opacity-50={!selectedView.baseTable}
  class="border w-full border p-1 rounded text-sm border-zinc-300 bg-zinc-100"
  >Add Parameter</button
>
