<script>
    import { theme } from "$lib/themes"; 
    import Modal from '$lib/Modal.svelte';
    import Dropdown from "$lib/Dropdown.svelte";
    import { icon } from "$lib/iconMap";
    import ColumnSelector from "./ColumnSelector.svelte";

    export let showFormulaModal;
    export let activeFormula;
    
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let view;
    export let columns;


    let expression = '';

    function closeModal() {
        showFormulaModal = false;
    }

    function updateFormula(){
        dispatch('updateFormula', activeFormula);
        showFormulaModal = false;
    }

    function validColumns(columns, formula) {
        return columns.filter(col => col.name != formula.name);
    }

    let formulas = [
        {
            name:"count",
            arguments: [
                {
                    type:"column"
                },{
                    type:"integer"
                }
            ]
        }
    ]

    //showFormulaModal
</script>

<Modal title="Add New Formula Column" open={ showFormulaModal } on:close={ closeModal }>
    <div slot="body" class="space-y-4 h-full flex flex-col">
        <div class="space-y-2">
            <label class="text-zinc-800 block" for="">Column Name</label>
            <input type="text" bind:value={ activeFormula.name } class="p-2 w-full bg-opacity-30 rounded bg-zinc-100 text-zinc-800" placeholder="Column Name">
        </div>

        

        <div class="grid grid-cols-6 flex-grow gap-4">
            <div class="col-span-2">
                <div class="border border-zinc-200 rounded text-zinc-800 h-full p-2 space-y-2">
                    <div class="text-lg">Functions</div>
                    <div class="text-zinc-500">String Functions</div>
                    <div on:click={ ()=>{expression += 'COUNT( )'} } class="hover:bg-opacity-90 bg-zinc-200 bg-opacity-60 cursor-pointer py-1 px-2 rounded">Count</div>
                </div>
            </div>


            <div class="col-span-4">

                <div class="border p-2 h-full rounded space-y-2 text-zinc-800 border-zinc-200">
                    {#each formulas as formula}
                        <h4 class="capitalize">Set Variables for {formula.name}</h4>
                        <p>To use this formula, you'll need to set some options:</p>
        
                        {#each formula.arguments as argument}
                            {#if argument.type == "column"}
                                <div>Select Column</div>
                                <ColumnSelector columns={columns} view={ view }/>
                            {/if}

                            {#if argument.type == "integer"}
                                <div>Select Integer</div>
                                <input type="text" class="bg-zinc-100 p-2 rounded bg-opacity-60 w-64">
                            {/if}
        
                        {/each}
                    {/each}
                </div>

                <!--
                <div class="text-zinc-800 border border-zinc-200 rounded h-full p-2 space-y-2">
                    <div class="text-lg">Columns</div>
                    <div class="space-y-2">
                        {#each validColumns(view.columns, activeFormula) as column}
                            <div on:click={ ()=>{expression += column.name} } style="background-color: {hexToRGB(column.color,0.1)};"  class="rounded space-x-1 p-2 cursor-pointer">
                                <i style="background:{column.color}" class="rounded {icon[column.type]} align-bottom"></i>
                                <span>{column.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>
                -->
            </div>
        </div>
    </div>
    <div slot="footer" class="p-6 text-right space-x-1">
        <button on:click={closeModal} class="p-2 bg-zinc-200 text-zinc-800 rounded">Cancel</button>
        <button on:click={updateFormula} class="p-2 bg-zinc-100 text-zinc-800 rounded">Apply</button>
    </div>
</Modal>
