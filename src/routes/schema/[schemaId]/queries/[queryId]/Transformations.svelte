<script>
  import Step from "./Step.svelte";
  import { icon } from "$lib/iconMap";
  import _ from "lodash";
  import Dropdown from "$lib/Dropdown.svelte";
  import { createEventDispatcher } from "svelte";
  import { conditions, stepOptions } from "$lib/utils";
  const dispatch = createEventDispatcher();
  export let query;

  let minimize = [];

  function newStep(step) {
    //RESET PREVIEW
    Object.keys(query.steps).forEach((_step) => {
      query.steps[_step].hidden = false;
    });

    let newStep = `${step}_${
      query.steps ? Object.keys(query.steps).length : 0
    }`;


	query.steps[newStep] = {
		type: step
    };

    if (step !== "deduplicate" && step !== "limit"  && step !== "offset") {
		query.steps[newStep] = {
			column: query.columns[0],
    	};
    }

    if (step == "filter") {
      query.steps[newStep] = {
        ...query.steps[newStep],//DEFAULT
        condition: conditions[query.steps[newStep].column.type][0],
        value: "",
      };
    }

    if (step == "summarize") {
      query.steps[newStep] = {
        ...query.steps[newStep],
        aggregations: [],
      };
    }

    if (step == "sort") {
      query.steps[newStep] = {
        ...query.steps[newStep],
        direction: "ascending",
      };
    }

    query = query;
    dispatch("AddStep", query.records);
    minimize = Object.keys(query.steps).map((s, i) =>
      Object.keys(query.steps).length > i + 1 ? true : false
    );
  }
</script>

<div class="p-2 space-y-2">
  <h4 class="font-semibold text-sm leading-6">
    Transform Steps ({Object.keys(query.steps).length})
  </h4>

  <Dropdown full={true} closeOnClick={true}>
    <button
      disabled={!query.columns.length > 0}
      slot="toggle"
      class="cursor-pointer w-full bg-zinc-100 border border-zinc-300 py-1 px-2 text-sm flex items-center rounded text-left"
    >
      <div class="flex-grow">Select Step</div>
      <i class="ri-arrow-drop-down-line align-bottom" />
    </button>
    <div slot="menu">
      {#each Object.keys(stepOptions) as step}
        <div
          on:click={() => newStep(step)}
          class="p-2 cursor-pointer hover:bg-zinc-200"
        >
          <i class="{icon[step]} align-bottom" />
          {_.startCase(step)}
        </div>
      {/each}
    </div>
  </Dropdown>
</div>

<div class="border-t overflow-y-scroll p-2 border-zinc-200 space-y-2 flex-grow">
  {#if Object.keys(query.steps).length > 0}
    <button
      class="cursor-pointer w-full bg-zinc-200 py-1 px-2 text-sm flex items-center rounded space-x-1"
    >
      <i class="ri-delete-bin-line align-bottom" /><span>Remove All Steps</span>
    </button>
  {/if}

  {#each Object.keys(query.steps) as step, i}
    <Step
      bind:minimize={minimize[i]}
      on:previewStep
      on:deleteStep
      {step}
      bind:query
    />
  {/each}
</div>
