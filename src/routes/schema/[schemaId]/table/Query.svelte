<script>
    import { afterUpdate, onMount } from 'svelte';
    import { theme } from "$lib/themes";
    import highlightWords from 'highlight-words';
    import { hexToRGB } from "$lib/utils"

    export let table;
    let chunks = [];
    let tableColors = [];

    export let allowed;



    afterUpdate(()=>{

        let sentences = table.query.split('\r\n');

        chunks = sentences.map(sentence => {

            return highlightWords({
                text: sentence,
                query: '/(column1|column2)/',

            }) 
        });




   

    });


   //let tableColors = table.columns.map(c => ({ color: c.color, table: c.source.tableId }))


  
    
  


    


</script>

{#if allowed}

<div class="flex-grow space-y-2 {theme.darkBackgroundColor} p-4 border-b-4 {theme.tableBorderColor}">
    <div class="flex items-center space-x-4">
        <h3  class="{theme.textColor}">View Query</h3>
        <button class="ml-auto {theme.textColor}"><i class="ri-edit-line align-bottom {theme.primaryTextColor}"></i> Edit in View Builder</button>
        <button class="{theme.textColor}"><i class="ri-clipboard-line align-bottom {theme.primaryTextColor}"></i> Copy</button>
    </div>
    <p class="text-sm {theme.mutedTextColor}"><i class="ri-error-warning-fill align-bottom"></i>Warning: Once you edit the generated query, you cannot go back and use the view editor interface to update or modify this view.</p>
     
    <div class="border p-2 {theme.tableBorderColor}">
    <code class="{theme.textColor} text-sm space-y-1">

           {#each chunks as chunk}
            <pre class="flex">{#each chunk as term}
                    <div class="rounded inline px-1" style="background-color:{term.match?hexToRGB(table.color,0.3):''};">
                        {term.text}
                    </div>
                {/each}</pre>  
           {/each}
   
    </code>
    </div>
    <div class="flex w-full">
        
    </div>
</div>
{:else}

<div class="p-2 {theme.textColor}">Not allowed</div>

{/if}
