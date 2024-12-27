<script lang="ts">
	import type { PageData } from './$types';
	import EmptyCard from '$lib/components/custom/EmptyCard.svelte';
	import StarCard from '$lib/components/custom/StarCard.svelte';
	import Details from '$lib/details.json';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>
		{Details.title} - {Details.subtitle}
	</title>
</svelte:head>

<h1
	class="absolute top-0 flex w-full flex-row items-center justify-center text-center text-4xl font-bold md:text-6xl"
>
	<img src="favicon.webp" alt="Starboard logo" class="mr-1 w-16" />
	{Details.title.toUpperCase()}
	<img src="favicon.webp" alt="Starboard logo" class="ml-1 w-16" />
</h1>

<div class="mx-auto mt-20 w-full px-2 md:w-1/2 md:px-0">
	{#if data.players.length == 0}
		<EmptyCard message="No champions have joined Starboard yet." />
	{:else}
		{#each data.players as player, i}
			<StarCard player={player.name} position={i + 1} stars={player.stars} />
		{/each}
	{/if}
</div>
