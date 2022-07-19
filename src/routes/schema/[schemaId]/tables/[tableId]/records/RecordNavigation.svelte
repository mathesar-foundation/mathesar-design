<script>
  import { onMount } from "svelte";
  
  import { getRecordSummary } from "$lib/utils";

  export let table;
  export let cells;
  let totalRecords;
  let cellsIdx;

  onMount(() => {
    cellsIdx = Object.values(table.rows.cells).indexOf(cells);
    totalRecords = Object.keys(table.rows.cells).length;
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
    window.location = `/schema/${table.schemaId}/tables/${table.id}/records/${
      Object.keys(table.rows.cells)[idx]
    }`;
  }
</script>

<div class="space-x-2 flex items-center">
  <div class="flex items-center space-x-2">
    <button
      on:click={goToPreviousRecord}
      class="py-1 px-2 rounded border-zinc-300"
      ><i class="ri-arrow-left-s-line align-bottom" /> Previous Record</button
    >
    <div class="bg-white border rounded tabular-nums py-1 px-2">
      {cellsIdx + 1} of {totalRecords}
    </div>
    <button on:click={goToNextRecord} class="py-1 px-2 rounded border-zinc-300"
      >Next Record <i class="ri-arrow-right-s-line align-bottom" /></button
    >
  </div>
  <button class="border rounded py-1 px-2 border-zinc-300"
    ><i class="ri-search-line align-bottom" /> Go to Record</button
  >
  <button class="border rounded py-1 px-2 border-zinc-300"
    ><i class="ri-add-line align-bottom" /> Add Record</button
  >
</div>
