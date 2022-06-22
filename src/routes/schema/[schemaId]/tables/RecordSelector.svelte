<script>
    import Draggable from '$lib/Draggable.svelte';
    import Modal from '$lib/Modal.svelte';
    export let record;


    console.log(record,"test")

    let position = [100,200];

</script>

<Modal open={record} title="Edit Record">

    <div slot="body">
        {record.content}
        {#if record.link}
            {record.link.referenceTable.name}
            <div class="flex items-center border">
                {#each record.link.referenceTable.columns as column}
                <div class="p-2 border">{column.name}</div> 
                {/each}
            </div>
            <div class="border h-80 overflow-y-scroll">
            
                {#each record.link.referenceTable.records as row}
                    <div class="border-b flex items-center">
                        {#each row as cell}
                            <div class="border p-2">{cell}</div>
                        {/each}
                    </div> 
                {/each}
              
            </div>
        {/if}
    </div>
</Modal>