<script>
  import { createEventDispatcher } from 'svelte';
  import { theme } from './themes';
  export let open = false
  export let title = ''
  export let subTitle;
  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-6 lg:p-0">
    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-80" on:click={()=> open = !open}></div>
    <div class="{theme.darkBackgroundColor} w-full flex flex-col lg:h-5/6 lg:w-5/6  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
      <div class="flex justify-between items-center py-4 px-6 text-xl {theme.textColor}">
        <div>
        {title}
        {#if subTitle}
        <p class="text-sm {theme.mutedTextColor}">{subTitle}</p>
        {/if}
        </div>
        <button class="" on:click={() => {dispatch('close');open = !open}}><i class="ri-close-line align-bottom"></i></button>
      </div>
      <div class="p-6 flex-grow">
        <slot name="body" />
      </div>
      <slot name="footer" />
    </div>
  </div>
{/if}