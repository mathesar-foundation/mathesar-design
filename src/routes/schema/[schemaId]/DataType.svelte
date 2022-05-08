<script>
    import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
    export let column;
    import { icon } from '$lib/iconMap';
    import { dataTypes } from "$lib/utils";

    export let editDataType;

   
</script>

{#if editDataType}
<div>
    <div class="p-2 border-b cursor-pointer text-sm" on:click={()=> dispatch('save')}>
        <i class="ri-arrow-left-s-line align-bottom"></i> <span>Go Back</span> 
    </div>
    <div class="p-2 space-y-2">
        <div class="border rounded h-24 overflow-y-scroll">
            {#each Object.keys(dataTypes) as type}
                <div class="p-1 space-x-1 cursor-pointer hover:bg-zinc-100" class:bg-zinc-200={column.type == type}>
                    <i class="{icon[type]} align-bottom border border-zinc-300 rounded"></i> <span>{type}</span>
                </div>
            {/each}
        </div>
        <div>
            <div class="font-semibold">Database</div> 

        </div>
    </div>
</div>
{/if}