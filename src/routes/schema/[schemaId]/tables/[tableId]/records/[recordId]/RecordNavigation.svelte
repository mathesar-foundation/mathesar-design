<script>
import { onMount } from "svelte";


    export let table;
    export let cells;
    let totalRecords;
    let cellsIdx;

    onMount(() => {
        
        cellsIdx = Object.values(table.rows.cells).indexOf(cells);
       totalRecords = Object.keys(table.rows.cells).length
    });

    function goToNextRecord() {
        if (cellsIdx < totalRecords - 1) {
            cellsIdx++;
            goToRecord(cellsIdx);
        }
        
    }

    function goToPreviousRecord() {
        if (cellsIdx > 0) {
            cellsIdx--;
            goToRecord(cellsIdx);
        }
        
    }

    function goToRecord(idx) {
        window.location = `/schema/${table.schemaId}/tables/${table.id}/records/${Object.keys(table.rows.cells)[idx]}`;
    }

</script>

<div class="p-2 border-b flex items-center space-x-4">

    <div class="flex items-center space-x-2">
        
        <button on:click={goToPreviousRecord}  class="border rounded py-1 px-2 rounded border-zinc-300"><i class="ri-arrow-left-s-line align-bottom"></i> Previous Record</button>
        <div class="bg-white rounded tabular-nums py-1 px-2 border">{cellsIdx+1} of {totalRecords}</div>
        <button on:click={goToNextRecord} class="border rounded py-1 px-2 rounded border-zinc-300">Next Record <i class="ri-arrow-right-s-line align-bottom"></i></button>
    </div>
    <button><i class="ri-search-line align-bottom"></i> Go to Record</button>

</div>
