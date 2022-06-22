<script>
    import Modal from '$lib/Modal.svelte';
    import Dropdown from "$lib/Dropdown.svelte"
    import Question from "./Question.svelte";
    export let showModal;
    export let tables = [];
    export let table = {};

    const handleToggleModal = () => {
        showModal = !showModal
    }

    let selectedTable;
</script>

<Modal title="Link Table" subTitle="Link data from another table by setting up foreign key constraints" open={ showModal } on:close={() => handleToggleModal()}>
  <div slot="body" class="space-y-2">

    <p class="text-zinc-500 text-sm">If you prefer to configure this manually go to constraints settings</p>

    <div class="border space-y-2 p-2 border-zinc-200 text-zinc-800 rounded">
        <h4>Select Table to Link To</h4>
        <Dropdown>
            <button class="bg-zinc-200 p-2 rounded" slot="toggle">
                 {#if selectedTable}{selectedTable.name}{:else}Select Table{/if} <i class="ri-arrow-drop-down-line align-bottom"></i>
            </button>
            <div slot="menu" >
                {#each tables as table}
                    <div on:click={ ()=>{selectedTable = table} } class="p-2 hover:bg-zinc-100 cursor-pointer">{table.name}</div>
                {/each}
            </div>
        </Dropdown>
    </div>

    {#if selectedTable}
        <Question { table } { selectedTable }/>
    {/if}
    

  </div>
  <div slot="footer" class="p-4 text-right">
    <button class="bg-zinc-200 p-2 text-zinc-800 rounded">Cancel</button>
    <button class="bg-zinc-100 p-2 text-zinc-800 rounded">Create Link</button>
  </div>
</Modal>