<script>
    import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
    export let column;
    import { icon } from '$lib/iconMap';
    import { dataTypes } from "$lib/utils";
    import _ from "lodash";


   
</script>


<div class="w-full">
    <div class="p-2 border-b cursor-pointer text-sm" on:click={()=> dispatch('save')}>
        <i class="ri-arrow-left-s-line align-bottom"></i> <span>Go Back</span> 
    </div>
    <div class="p-2 space-y-2">
        <div class="border rounded h-32 overflow-y-scroll">
            {#each Object.keys(dataTypes) as type}
                <div class="p-1 leading-6 space-x-1 cursor-pointer hover:bg-zinc-100" class:bg-zinc-200={column.type == type}>
                    <i class="{icon[type]} align-bottom border border-zinc-300 rounded"></i> <span>{_.startCase(type)}</span>
                </div>
            {/each}
        </div>
        <div class="flex items-center space-x-2">
            <div class="font-semibold border-b-2 border-zinc-600"><i class="ri-database-2-line align-bottom"></i> Database</div> 

            <div class="text-zinc-500"><i class="ri-brush-line align-bottom"></i> Display</div> 
        </div>
    </div>
</div>
