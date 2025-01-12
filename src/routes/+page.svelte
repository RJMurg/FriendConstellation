<script lang="ts">
	import type { PageData } from './$types';
	import EmptyCard from '$lib/components/custom/cards/EmptyCard.svelte';
	import StarCard from '$lib/components/custom/cards/StarCard.svelte';
	import Details from '$lib/details.json';
	import HomeMenu from '$lib/components/custom/HomeMenu.svelte';
	import TaskCard from '$lib/components/custom/cards/TaskCard.svelte';
	import ShopCard from '$lib/components/custom/cards/ShopCard.svelte';

	let { data }: { data: PageData } = $props();

	let page = $state('players');
	let playersButtonVariant: buttonTypes = $state('default');
	let tasksButtonVariant: buttonTypes = $state('secondary');
	let shopButtonVariant: buttonTypes = $state('secondary');

	$effect(() => {
		if (page === 'players') {
			playersButtonVariant = 'default';
			tasksButtonVariant = 'secondary';
			shopButtonVariant = 'secondary';
		} else if (page === 'tasks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'default';
			shopButtonVariant = 'secondary';
		} else if (page === 'shop') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'secondary';
			shopButtonVariant = 'default';
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
		<enhanced:img src="/static/favicon.webp" alt="Starboard logo" class="mr-1 w-16" />
		{Details.title.toUpperCase()}
		<enhanced:img src="/static/favicon.webp" alt="Starboard logo" class="ml-1 w-16" />
	</div>

	<HomeMenu {playersButtonVariant} {tasksButtonVariant} {shopButtonVariant} bind:page />
</h1>

{#if page === 'players'}
	<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
		{#if data.players.length === 0}
			<EmptyCard message="No Champions have joined Starboard yet." />
		{:else}
			{#each data.players as player}
				<StarCard
					player={player.name}
					position={player.position}
					stars={player.stars}
					id={String(player.id)}
					joint={player.jointPosition}
					showLogLink={true}
					font={player.font}
					hat={player.hat}
					card={player.card}
					animation={player.animation}
				/>
			{/each}
		{/if}
	</div>
{:else if page === 'tasks'}
	<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
		{#if data.tasks.length === 0}
			<EmptyCard message="No Tasks have been added to the Starboard yet." />
		{:else}
			{#each data.tasks as task}
				<TaskCard name={task.title} description={task.description} stars={task.reward} />
			{/each}
		{/if}
	</div>
{:else if page === 'shop'}
	<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
		{#if data.cosmetics.length === 0}
			<EmptyCard message="Nothing is for sale yet." />
		{:else}
			<h2 class="text-center text-2xl font-bold">Contact the Starmaster to purchase cosmetics</h2>

			{#each data.cosmetics as cosmetic}
				<ShopCard
					name={cosmetic.name}
					description={cosmetic.description}
					cost={cosmetic.cost}
					font={cosmetic.font}
					hat={cosmetic.hat}
					card={cosmetic.card}
					animation={cosmetic.animation}
				/>
			{/each}
		{/if}
	</div>
{/if}
