<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { ChevronRight } from 'lucide-svelte';
	import EmptyCard from '$lib/components/custom/cards/EmptyCard.svelte';
	import ModifyUser from '$lib/components/custom/admin/ModifyUser.svelte';
	import StarCard from '$lib/components/custom/cards/StarCard.svelte';
	import TaskCard from '$lib/components/custom/cards/TaskCard.svelte';
	import ModifyTask from '$lib/components/custom/admin/ModifyTask.svelte';
	import WebhookCard from '$lib/components/custom/cards/WebhookCard.svelte';
	import ModifyWebhook from '$lib/components/custom/admin/ModifyWebhook.svelte';
	import AdminMenu from '$lib/components/custom/admin/AdminMenu.svelte';
	import MessageCard from '$lib/components/custom/cards/MessageCard.svelte';
	import ModifyMessage from '$lib/components/custom/admin/ModifyMessage.svelte';
	import AddChampionDialogue from '$lib/components/custom/dialogues/AddChampionDialogue.svelte';
	import AddTasksDialogue from '$lib/components/custom/dialogues/AddTasksDialogue.svelte';
	import AddWebhookDialogue from '$lib/components/custom/dialogues/AddWebhookDialogue.svelte';
	import AddMessageDialogue from '$lib/components/custom/dialogues/AddMessageDialogue.svelte';

	// This file is so ugly.
	// I'm sorry.

	let { data }: { data: PageData } = $props();
	import { onMount } from 'svelte';
	import CreateCosmetic from '$lib/components/custom/dialogues/CreateCosmetic.svelte';
	import ShopCard from '$lib/components/custom/cards/ShopCard.svelte';
	import ModifyCosmetics from '$lib/components/custom/admin/ModifyCosmetics.svelte';
	import AbstractCard from '$lib/components/custom/cards/AbstractCard.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';

	let players = $state(data.players ?? []);
	let tasks = $state(data.tasks ?? []);
	let webhooks = $state(data.webhooks ?? []);
	let messages = $state(data.messages ?? []);
	let cosmetics = $state(data.cosmetics ?? []);
	let page = $state('players');

	onMount(() => {
		const savedPage = localStorage.getItem('adminPage');
		if (savedPage) {
			page = savedPage;
		}
	});

	let playersButtonVariant: buttonTypes = $derived(page === 'players' ? 'default' : 'secondary');
	let tasksButtonVariant: buttonTypes = $derived(page === 'tasks' ? 'default' : 'secondary');
	let webhooksButtonVariant: buttonTypes = $derived(page === 'webhooks' ? 'default' : 'secondary');
	let tamperButtonVariant: buttonTypes = $derived(page === 'tamper' ? 'default' : 'secondary');
	let cosmeticButtonVariant: buttonTypes = $derived(page === 'cosmetics' ? 'default' : 'secondary');
	let gameButtonVariant: buttonTypes = $derived(page === 'game' ? 'default' : 'secondary');

	$effect(() => {
		localStorage.setItem('adminPage', page);
	});
</script>

<svelte:head>
	<title>
		{data.gameDetails.name} - Admin
	</title>
</svelte:head>

{#if data.loggedIn}
	<AdminMenu
		{playersButtonVariant}
		{tasksButtonVariant}
		{webhooksButtonVariant}
		{tamperButtonVariant}
		{cosmeticButtonVariant}
		{gameButtonVariant}
		bind:page
	/>
{/if}

{#if !data.loggedIn}
	<h1 class="mb-5 text-center text-4xl font-bold">Admin Login</h1>
	<form
		action="?/login"
		method="post"
		class="flex w-full max-w-sm items-center space-x-2 px-4 md:p-0"
	>
		<Input type="password" name="password" placeholder="Enter admin password" />
		<Button type="submit">
			<ChevronRight class="" />
		</Button>
	</form>
	<Button variant="secondary" href="/" class="mt-2">Go Home</Button>
{:else if page === 'players'}
	<h1 class="my-2 text-center text-4xl font-bold">Champions</h1>
	<AddChampionDialogue />

	<div class="mx-auto w-full px-2 md:w-2/3 md:px-0">
		{#if players.length === 0}
			<EmptyCard message="No champions have been added." />
		{:else}
			{#each players ?? [] as player}
				<div class="flex flex-row">
					<StarCard
						player={player.name}
						position={player.position}
						stars={player.stars}
						showLogLink={false}
						joint={player.jointPosition}
						font={player.font}
						card={player.card}
						animation={player.animation}
					/>

					<ModifyUser {player} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'tasks'}
	<h1 class="my-2 text-center text-4xl font-bold">Tasks</h1>
	<AddTasksDialogue />

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if tasks.length === 0}
			<EmptyCard message="No tasks have been added." />
		{:else}
			{#each tasks ?? [] as task}
				<div class="flex flex-row">
					<TaskCard name={task.title} description={task.description} stars={task.reward} />

					<ModifyTask id={task.id} active={task.active} token={data.token} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'webhooks'}
	<h1 class="my-2 text-center text-4xl font-bold">Webhooks</h1>
	<AddWebhookDialogue />

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if webhooks.length === 0}
			<EmptyCard message="No webhooks have been added." />
		{:else}
			{#each webhooks ?? [] as webhook}
				<div class="flex flex-row">
					<WebhookCard name={webhook.name} url={webhook.webhook} />

					<ModifyWebhook id={webhook.id} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'tamper'}
	<h1 class="my-2 text-center text-4xl font-bold">Tamper Evident Messages</h1>
	<AddMessageDialogue />

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if messages.length === 0}
			<EmptyCard message="No tamper-evident messages have been added." />
		{:else}
			{#each messages ?? [] as message}
				<div class="flex flex-row">
					<MessageCard
						title={message.title}
						message={message.message}
						uuid={message.uuid}
						opened={message.opened}
						timestamp={message.timestamp ?? new Date()}
						showLink={true}
					/>

					<ModifyMessage id={message.id} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'cosmetics'}
	<h1 class="my-2 text-center text-4xl font-bold">Cosmetics</h1>
	<CreateCosmetic action="addCosmetic" />

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if cosmetics.length === 0}
			<EmptyCard message="No cosmetics messages have been added." />
		{:else}
			{#each cosmetics ?? [] as cosmetic}
				<div class="flex flex-row">
					<ShopCard
						name={cosmetic.name}
						description={cosmetic.description}
						cost={cosmetic.cost}
						card={cosmetic.card}
						font={cosmetic.font}
						animation={cosmetic.animation}
						hat={cosmetic.hat}
					/>

					<ModifyCosmetics {cosmetic} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'game'}
	<h1 class="my-2 text-center text-4xl font-bold">Game Settings</h1>

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		<AbstractCard>
			<div class="flex w-full flex-col items-center">
				<form action="?/updateGameDetails" method="post">
					<div class="flex flex-col">
						<Label for="name" class="mt-4">Game Name</Label>
						<Input type="text" name="name" placeholder="Game Name" value={data.gameDetails.name} />

						<Label for="subtitle" class="mt-4">Game Subtitle</Label>
						<Input
							type="text"
							name="subtitle"
							placeholder="Game Subtitle"
							value={data.gameDetails.subtitle}
						/>

						<Label for="active" class="mb-2 mt-4">Game Active?</Label>
						<Switch name="active" bind:checked={data.gameDetails.active} />

						<Label for="showInstagram" class="mb-2 mt-4">Show Instagram?</Label>
						<Switch name="showInstagram" bind:checked={data.gameDetails.showInstagram} />

						<Label for="shopEnabled" class="mb-2 mt-4">Shop Enabled?</Label>
						<Switch name="shopEnabled" bind:checked={data.gameDetails.shopEnabled} />

						<Label for="tasksEnabled" class="mb-2 mt-4">Tasks Enabled?</Label>
						<Switch name="tasksEnabled" bind:checked={data.gameDetails.tasksEnabled} />

						<Label for="scoreboardEnabled" class="mb-2 mt-4">Scoreboard Enabled?</Label>
						<Switch name="scoreboardEnabled" bind:checked={data.gameDetails.scoreboardEnabled} />

						<Button type="submit" class="mt-4">Update Game Details</Button>
					</div>
				</form>
			</div>
		</AbstractCard>
	</div>
{/if}
