<script>
	import { theme } from '$lib/themes';
	import Step from './Step.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
    import { createEventDispatcher } from 'svelte';
    import { conditions } from '$lib/utils';
    const dispatch = createEventDispatcher();
	export let selectedView;

	let minimize = [];

	function newStep(step) {
        //RESET PREVIEW
        Object.keys(selectedView.steps).forEach(_step => {
            selectedView.steps[_step].hidden = false;
        });

		let newStep = `${step}_${selectedView.steps ? Object.keys(selectedView.steps).length : 0}`;

		selectedView.steps[newStep] = {
			column: selectedView.columns[0],
			type: step
		};

		if (step == 'deduplicate') {
			selectedView.steps[newStep] = {
				type: step
			};
		}

		if (step == 'filter') {
			selectedView.steps[newStep] = {
				...selectedView.steps[newStep],
				condition: conditions[selectedView.steps[newStep].column.type][0],
				value:""
			};
		}

		if (step == 'summarize') {
			selectedView.steps[newStep] = {
				...selectedView.steps[newStep],
				aggregations:[]
			};
		}

		if (step == 'sort') {
			selectedView.steps[newStep] = {
				...selectedView.steps[newStep],
				direction: "ascending"
			};
		}


		selectedView = selectedView;
        dispatch('AddStep',selectedView.records)
		minimize = Object.keys(selectedView.steps).map((s,i) => Object.keys(selectedView.steps).length > (i+1)?true:false)
	}
</script>



<div class="p-2 space-y-2">
	<h4 class="font-semibold text-sm leading-6">Transform Steps ({Object.keys(selectedView.steps).length})</h4>

	{#if selectedView.columns.length > 0}
		<Dropdown full={true} closeOnClick={true}>
			<button
				slot="toggle"
				class="cursor-pointer w-full bg-zinc-100 border border-zinc-300 py-1 px-2 text-sm flex items-center rounded text-left"
			>
				<div class="flex-grow">Select Step</div>
				<i class="ri-arrow-drop-down-line align-bottom" />
			</button>
			<div slot="menu">
				<div
					on:click={() => newStep('filter')}
					class="p-2 cursor-pointer hover:bg-zinc-200"
				>
					<i class="ri-filter-line align-bottom" /> Filter
				</div>
				<div
					on:click={() => newStep('summarize')}
					class="p-2 cursor-pointer hover:bg-zinc-200"
				>
					<i class="ri-layout-row-fill align-bottom" /> Summarize
				</div>
				<div
					on:click={() => newStep('sort')}
					class="p-2 cursor-pointer hover:bg-zinc-200"
				>
					<i class="ri-arrow-up-down-fill align-bottom" /> Sort
				</div>
				<div
					on:click={() => newStep('deduplicate')}
					class="p-2 cursor-pointer hover:bg-zinc-200"
				>
					<i class="ri-tools-line align-bottom" /> Deduplicate
				</div>
				<div
					on:click={() => newStep('limit')}
					class="p-2 cursor-pointer hover:bg-zinc-200"
				>
					<i class="ri-tools-line align-bottom" /> Limit
				</div>
				<div
					on:click={() => newStep('offset')}
					class="p-2 cursor-pointer hover:bg-zinc-200"
				>
					<i class="ri-tools-line align-bottom" /> Offset
				</div>
			</div>
		</Dropdown>

	

		
	{:else}
		<button
			disabled
			class="opacity-50 border border-zinc-300 cursor-pointer w-full bg-zinc-100 py-1 px-2 text-sm flex items-center rounded"
		>
			<div class="flex-grow">Select Step</div>
			<i class="ri-arrow-drop-down-line align-bottom" />
		</button>
	{/if}
</div>

<div class="border-t overflow-y-scroll p-2 border-zinc-200 space-y-2 flex-grow">

	{#if Object.keys(selectedView.steps).length > 0}
		<button class="cursor-pointer w-full bg-zinc-200 py-1 px-2 text-sm flex items-center rounded space-x-1">
		<i class="ri-delete-bin-line align-bottom"></i><span>Remove All Steps</span>
			
		</button>
		{/if}
		
	{#each Object.keys(selectedView.steps) as step,i}
		<Step bind:minimize={ minimize[i] } on:previewStep on:deleteStep {step} bind:selectedView={selectedView} />
	{/each}
</div>
