<script>
	export let position = [0,0];
	export let right = position[0];
	export let top = position[1];
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e) {
		if (moving) {
			right += -e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
	
// 	$: console.log(moving);
</script>

<style>
	.draggable {
		user-select: none;
		cursor: move;

		position: absolute;
	}
</style>

<section on:mousedown={onMouseDown} style="right: {right}px; top: {top}px;" class="draggable">
	<slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />