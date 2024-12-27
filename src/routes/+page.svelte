<script lang="ts">
	import type { PageData } from './$types';
	import EmptyCard from '$lib/components/custom/EmptyCard.svelte';
	import StarCard from '$lib/components/custom/StarCard.svelte';
	import Details from '$lib/details.json';
	import HomeMenu from '$lib/components/custom/HomeMenu.svelte';
	import TaskCard from '$lib/components/custom/TaskCard.svelte';

	let { data }: { data: PageData } = $props();

	let page = $state('players');
	let playersButtonVariant: buttonTypes = $state('default');
	let tasksButtonVariant: buttonTypes = $state('secondary');

	$effect(() => {
		if (page === 'tasks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'default';
		} else if (page === 'webhooks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'secondary';
		} else if (page === 'players') {
			playersButtonVariant = 'default';
			tasksButtonVariant = 'secondary';
		}
	});
</script>

<svelte:head>
	<title>
		{Details.title} - {Details.subtitle}
	</title>
</svelte:head>

<h1 class="absolute top-0 flex w-full flex-col items-center justify-center">
	<div
		class="flex flex-row items-center justify-center text-center text-4xl font-bold md:text-6xl"
		id="title"
	>
		<img src="favicon.webp" alt="Starboard logo" class="mr-1 w-16" />
		{Details.title.toUpperCase()}
		<img src="favicon.webp" alt="Starboard logo" class="ml-1 w-16" />
	</div>

	<HomeMenu {playersButtonVariant} {tasksButtonVariant} bind:page />
</h1>

{#if page === 'players'}
	<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
		{#if data.players.length == 0}
			<EmptyCard message="No Champions have joined Starboard yet." />
		{:else}
			{#each data.players as player, i}
				<StarCard player={player.name} position={i + 1} stars={player.stars} id={player.id} showLogLink={false} />
			{/each}
		{/if}
	</div>
{:else if page === 'tasks'}
	<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
		{#if data.tasks.length == 0}
			<EmptyCard message="No Tasks have been added Starboard yet." />
		{:else}
			{#each data.tasks as task, i}
				<TaskCard name={task.title} description={task.description} stars={task.reward} />
			{/each}
		{/if}
	</div>
{/if}
