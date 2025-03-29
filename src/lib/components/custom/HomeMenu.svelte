<script lang="ts">
	import Button from '../ui/button/button.svelte';

	export let playersButtonVariant: buttonTypes = 'default';
	export let tasksButtonVariant: buttonTypes = 'secondary';
	export let shopButtonVariant: buttonTypes = 'secondary';
	export let shopEnabled: boolean = false;
	export let tasksEnabled: boolean = true;
	export let scoreboardEnabled: boolean = true;

	export let page: string = 'players';
</script>

<div class="flex flex-row">
	{#if scoreboardEnabled}
		<Button variant={playersButtonVariant} on:click={() => (page = 'players')} class="mr-2">
			Champions
		</Button>
	{/if}

	{#if tasksEnabled}
		<Button variant={tasksButtonVariant} on:click={() => (page = 'tasks')} class="mr-2"
			>Tasks</Button
		>
	{/if}

	{#if shopEnabled}
		<Button variant={shopButtonVariant} on:click={() => (page = 'shop')} class="mr-2">Shop</Button>
	{/if}
</div>
