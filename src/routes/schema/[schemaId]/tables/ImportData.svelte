<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import Modal from '$lib/Modal.svelte';
    import Papa from "papaparse";
    import { v4 as uuidv4 } from "uuid";

    import Table from '../Table.svelte';

    export let showModal;
    export let table;

    let filePath = '/csv/books.csv';


    let csv = {};
    let fields = [];
    let records = [];

    const handleToggleModal = () => {
        showModal = !showModal
    }

    export async function loadCSV(path) {
        let res = await fetch(path)
        let content = await res.text();
        return Papa.parse(content, {
            header: true
        });
    }



    async function getImportedTable(path){

        let importedTable = {
            ...table,
            name: filePath.split('/').pop(),
            type: "table",
            columns: [],
            records: [],
        };
        let csv = await loadCSV(path);
        let fields = csv.meta.fields;
        let records = csv.data;

        importedTable.constraints = [
            {
                "type": "Primary Key",
                "column": fields[0]
            },
        ]
     
        fields.forEach(field => {

            importedTable.columns.push({
                id: uuidv4(),
                name: field,
                type: "text",
                db: "VARCHAR"
            });
        });

        records.forEach(record => {
            importedTable.records.push(
                Object.values(record)
            )
        })
    

        return importedTable;

    }

    async function finishImport(){
        table = await getImportedTable(filePath);
        showModal = false;
        dispatch('finishImport',table)
    }
</script>

<Modal title="Import Data" subTitle="Select Data Source" open={ showModal } on:close={() => handleToggleModal()}>
    <div slot="body" class="space-y-2">

        <div class="flex space-x-4">
        <div>
            <label class="font-semibold" for="">Name</label>
            <input type="text" class="border rounded p-2" bind:value={table.name}>
        </div>
        <div class="">
            <label class="font-semibold" for="">Select File</label>
            <input type="text" class="border rounded p-2" bind:value={filePath}>
        </div>
        </div>
       
        <div class="border-2 overflow-hidden rounded h-96">
            
        {#await getImportedTable(filePath)}
            loading
        {:then importedTable}
            <div class="p-2 border-b bg-white flex space-x-4">
                <div>{importedTable.records.length} Records</div>
                <div>{importedTable.columns.length} Columns</div>
            </div>
            <Table table={importedTable} />
        
        {/await}
        </div>

  
    </div>
    <div slot="footer" class="p-4 text-right">
      <button class="bg-zinc-200 p-2 text-zinc-800 rounded">Cancel</button>
      <button class="bg-zinc-200 p-2 text-zinc-800 rounded" on:click={finishImport}>Finish Import</button>
    </div>
  </Modal>