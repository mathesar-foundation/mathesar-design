<script>
	export let type = 'checkbox'
	export let checked = false
	export let group = ''
	export let value = void 0

	$: type === 'radio' && updateRadio(group, value)
	
	$: type === 'checkbox' && group && updateChekbox(group, value)
	$: type === 'checkbox' && group && updateGroup(checked, value)
	
	function updateRadio(group, value) {
		checked = group === value
	}	
	
	function updateChekbox(group, value) {
		checked = group.indexOf(value) >= 0
	}
	
	function updateGroup(checked, value) {
		const index = group.indexOf(value)
		if (checked) {
			if (index < 0) {
				group.push(value)
				group = group
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1)
				group = group
			}
		}
	}
</script>

<label>
	{#if type === 'radio'}
		<input
			type="radio"
			class="collapsed"
			on:click
			bind:group={group}
			value={value}
		/>
	{:else}
		<input
			type="checkbox"
			class="collapsed"
			on:click
			bind:checked={checked}
			value={value}
		/>
	{/if}
  <slot checked={checked}></slot>
</label>

<style>
	label {
		display: flex;
		align-items: center;
		user-select: none;
	}
	label > :global(*) {
		pointer-events: none;
	}
	input {
		display: none;
	}
</style>