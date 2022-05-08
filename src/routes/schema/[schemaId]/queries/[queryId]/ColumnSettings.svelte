<script>
    import { theme } from "$lib/themes"; 
    import Modal from '$lib/Modal.svelte';
    import Dropdown from "$lib/Dropdown.svelte";
    export let showColumnModal;
    export let activeColumn = {};

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function closeModal() {
        showColumnModal = false;
    }

    function updateColumn(){
        dispatch('updateColumn', activeColumn);
        showColumnModal = false;
    }

    let filterOptions = [
        'contains','is','is not','starts with','end with','does not contain','does not start with'
    ]
</script>

<Modal title="Column Settings" open={showColumnModal} on:close={ closeModal }>
    <div slot="body" class="space-y-4 h-full flex flex-col">

        <div class="space-y-2 text-zinc-800">
            <label class=" block" for="">Column Name</label>
            <input bind:value={ activeColumn.name } type="text" class="p-2 w-full rounded bg-opacity-30 bg-zinc-100 text-zinc-800">
            <div>Data Type: {activeColumn.type}</div>
        </div>

        {#if activeColumn.source}
        <div class="border border-zinc-200 text-zinc-800 p-2 rounded space-y-2">
            <h4 class="text-lg">Source</h4>
            <div>
                
                <div class=""><i class="ri-table-line align-bottom"></i> Table: <span class="underline">{activeColumn.source.tableName}</span></div>
                <div class=""><i class="ri-layout-column-line align-bottom"></i> Column: <span class="underline">{activeColumn.source.columnName}</span></div>
                
            </div>
        </div> 
        {/if}


        
        <div class="border border-zinc-200 text-zinc-800 p-2 rounded space-y-2">
            <h4 class="text-lg">Filters ({activeColumn.filters?activeColumn.filters.length:0})</h4>
            
            {#if activeColumn.filters}
                {#each activeColumn.filters as filter}
                    <div class="flex items-center space-x-2">

                        <Dropdown>
                            <button class="bg-zinc-200 p-2 rounded text-zinc-800" slot="toggle">
                                {filter.condition} <i class="ri-arrow-down-s-line align-bottom"></i>
                            </button>
                            <div slot="menu">
                                {#each filterOptions as option}
                                    <div class="p-2 cursor-pointer hover:bg-zinc-200">{option}</div>
                                {/each}
                            </div>
                        </Dropdown>
                    
                    
                        <input bind:value={filter.value} class="bg-zinc-100 p-2 rounded">
                      

                        <button class="text-zinc-800 bg-zinc-100 py-2 px-3 rounded"><i class="ri-add-line align-bottom"></i>Add Filter</button>
                        <button class="text-zinc-800 bg-zinc-200 py-2 px-3 rounded"><i class="ri-close-line align-bottom"></i></button>
                    </div>
                {/each}
                {:else}

                <button class="text-zinc-800 bg-zinc-100 py-2 px-3 rounded"><i class="ri-add-line align-bottom"></i>Add Filter</button>

                {/if}
        </div>
       

    
    </div>
    <div slot="footer" class="p-6 text-right space-x-1">
        <button on:click={closeModal} class="p-2 bg-zinc-200 text-zinc-800 rounded">Cancel</button>
        <button on:click={updateColumn} class="p-2 bg-zinc-100 text-zinc-800 rounded">Apply</button>
    </div>
</Modal>