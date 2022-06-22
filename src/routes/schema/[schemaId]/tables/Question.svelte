<script>
    import { theme } from '$lib/themes';
    export let table;
    export let selectedTable;

    let answers = []


</script>

<div class="text-zinc-800 space-y-2">
       
    <div class="flex items-center border border-zinc-200 rounded p-2">
        <p>Can a single {table.name} record be linked to more than one {selectedTable.name} record?</p>
        <div class="ml-auto">
            <div class="space-x-2"><input bind:group={ answers[0] } value="Yes" type="radio" name="q1" id="a1"> <label for="a1">Yes</label></div>
            <div class="space-x-2"><input bind:group={ answers[0] } value="No" type="radio" name="q1" id="a2"> <label for="a2">No</label></div>
        </div>

    </div>
    <div class="flex items-center border border-zinc-200 rounded p-2">
        <p>Can a single {selectedTable.name} record be linked to more than one {table.name} record?</p>

        <div class="ml-auto">
            <div class="space-x-2"><input bind:group={ answers[1] } value="Yes" type="radio" name="q2" id="a3"> <label for="a3">Yes</label></div>
            <div class="space-x-2"><input bind:group={ answers[1] } value="No" type="radio" name="q2" id="a4"> <label for="a4">No</label></div>
        </div>

    </div>

    {#if answers.every(a => a == "No")}
        ALL NO
    {/if}

    {#if answers.every(a => a == "Yes")}
        ALL Yes
    {/if}




</div>

