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

<div class="flex-grow space-y-2 {theme.darkBackgroundColor} p-4 border-b-4 border-zinc-200">
    <div class="flex items-center space-x-4">
        <h3  class="text-zinc-800">View Query</h3>
        <button class="ml-auto text-zinc-800"><i class="ri-edit-line align-bottom {theme.primaryTextColor}"></i> Edit in View Builder</button>
        <button class="text-zinc-800"><i class="ri-clipboard-line align-bottom {theme.primaryTextColor}"></i> Copy</button>
    </div>
    <p class="text-sm text-zinc-500"><i class="ri-error-warning-fill align-bottom"></i>Warning: Once you edit the generated query, you cannot go back and use the view editor interface to update or modify this view.</p>
     
    <div class="border p-2 border-zinc-200">
    <code class="text-zinc-800 text-sm space-y-1">

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

<div class="p-2 text-zinc-800">Not allowed</div>

{/if}
