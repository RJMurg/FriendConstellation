<script lang="ts">
	import type { PageData } from './$types';
	import EmptyCard from '$lib/components/custom/cards/EmptyCard.svelte';
	import StarCard from '$lib/components/custom/cards/StarCard.svelte';
	import Details from '$lib/details.json';
	import HomeMenu from '$lib/components/custom/HomeMenu.svelte';
	import TaskCard from '$lib/components/custom/cards/TaskCard.svelte';
	import ShopCard from '$lib/components/custom/cards/ShopCard.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Label } from '$lib/components/ui/label';
	import { source } from 'sveltekit-sse';
	import { Button } from '$lib/components/ui/button';
	import { Instagram, SettingsIcon } from 'lucide-svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	let { data }: { data: PageData } = $props();

	let page = $state('players');
	let live = $state(true);
	let playersButtonVariant: buttonTypes = $derived(page == 'players' ? 'default' : 'secondary');
	let tasksButtonVariant: buttonTypes = $derived(page == 'tasks' ? 'default' : 'secondary');
	let shopButtonVariant: buttonTypes = $derived(page == 'shop' ? 'default' : 'secondary');

	const liveUpdate = $state(source('/api/liveUpdates').select('players').json());
	let updatedPlayers = $state(data.players);

	$effect(() => {
		liveUpdate.subscribe((value: unknown) => {
			const data = value as internalPlayer[];
			updatedPlayers = data || [];
		});
	});

	let players = $derived(live ? updatedPlayers : data.players);
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
		{#if players.length === 0}
			<EmptyCard message="No Champions have joined Starboard yet." />
		{:else}
			{#each players as player}
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

<Popover.Root portal={null}>
	<Popover.Trigger asChild let:builder>
		<div class="sticky bottom-0 z-50 ml-auto">
			<Button builders={[builder]} variant="outline" class="m-5 ml-auto">
				<SettingsIcon class="h-6 w-6" />
			</Button>
		</div>
	</Popover.Trigger>
	<Popover.Content class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="font-medium leading-none">Live Update</h4>
				<p class="text-sm text-muted-foreground">
					Starboard will automatically update the player list when the rankings change, or a
					Champion joins.
					<br />
					<br />
					If you want to minimise data usage, you can disable this feature.
				</p>
			</div>
			<div class="grid gap-2">
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="toggleLiveUpdates">Get Live Updates</Label>
					<Switch id="toggleLiveUpdates" value="none" class="col-span-2 h-8" bind:checked={live} />
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

<div class="sticky bottom-0 z-50 mr-auto">
	<Button
		href="https://www.instagram.com/stars.rjm.ie"
		target="_blank"
		variant="outline"
		class="m-5 mr-auto"
	>
		<Instagram class="h-6 w-6" />
	</Button>
</div>
