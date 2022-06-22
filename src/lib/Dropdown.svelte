<script>
	import { theme } from '$lib/themes';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	export let show = false; // menu state
	let menu = null; // menu wrapper DOM reference
	export let full;

	export let width;
	export let closeOnClick;
	export let position = "left"

	onMount(() => {

		

		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<div class="relative" class:flex-grow={full} bind:this={menu}>
	<div on:click={() => (show = !show)}>
		<slot name="toggle" />
	</div>
		{#if show}
			<div
				on:click={()=> {if(closeOnClick){ show = !show }} }
				in:scale={{ duration: 100, start: 0.95 }}
				out:scale={{ duration: 75, start: 0.95 }}
				class="origin-top-left absolute {position}-0 min-w-fit {width
					? width
					: 'w-52'} z-40 mt-1 bg-zinc-50 rounded shadow-md border border-zinc-200 shadow-md"
			>
				<slot name="menu" />
			</div>
		{/if}
	
</div>
