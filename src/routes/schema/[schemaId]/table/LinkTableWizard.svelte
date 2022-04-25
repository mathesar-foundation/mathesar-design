<script>
    import Modal from '$lib/Modal.svelte';
    import { theme } from '$lib/themes';
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

    <p class="{theme.mutedTextColor} text-sm">If you prefer to configure this manually go to constraints settings</p>

    <div class="border space-y-2 p-2 {theme.tableBorderColor} {theme.textColor} rounded">
        <h4>Select Table to Link To</h4>
        <Dropdown>
            <button class="{theme.mediumBackgroundColor} p-2 rounded" slot="toggle">
                 {#if selectedTable}{selectedTable.name}{:else}Select Table{/if} <i class="ri-arrow-drop-down-line align-bottom"></i>
            </button>
            <div slot="menu" >
                {#each tables as table}
                    <div on:click={ ()=>{selectedTable = table} } class="p-2 hover:{theme.darkPrimaryColor} cursor-pointer">{table.name}</div>
                {/each}
            </div>
        </Dropdown>
    </div>

    {#if selectedTable}
        <Question { table } { selectedTable }/>
    {/if}
    

  </div>
  <div slot="footer" class="p-4 text-right">
    <button class="{theme.mediumBackgroundColor} p-2 {theme.textColor} rounded">Cancel</button>
    <button class="{theme.darkPrimaryColor} p-2 {theme.textColor} rounded">Create Link</button>
  </div>
</Modal>