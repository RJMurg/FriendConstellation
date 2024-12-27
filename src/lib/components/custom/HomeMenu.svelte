<script lang="ts">
	import Button from '../ui/button/button.svelte';

	export let playersButtonVariant: buttonTypes = 'default';
	export let tasksButtonVariant: buttonTypes = 'secondary';
	export let page: string = 'players';
</script>

<div class="flex flex-row">
	<Button variant={playersButtonVariant} on:click={() => (page = 'players')} class="mr-2">
		Champions
	</Button>

	<Button variant={tasksButtonVariant} on:click={() => (page = 'tasks')} class="mr-2">Tasks</Button>
</div>
