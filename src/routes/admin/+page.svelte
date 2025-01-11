<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { ChevronRight } from 'lucide-svelte';
	import Details from '$lib/details.json';
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

	let players = $state(data.players ?? []);
	let tasks = $state(data.tasks);
	let webhooks = $state(data.webhooks);
	let messages = $state(data.messages);
	let cosmetics = $state(data.cosmetics);
	let page = $state('players');

	onMount(() => {
		const savedPage = localStorage.getItem('adminPage');
		if (savedPage) {
			page = savedPage;
		}
	});

	let playersButtonVariant: buttonTypes = $state('default');
	let tasksButtonVariant: buttonTypes = $state('secondary');
	let webhooksButtonvariant: buttonTypes = $state('secondary');
	let tamperButtonVariant: buttonTypes = $state('secondary');
	let cosmeticButtonVariant: buttonTypes = $state('secondary');

	$effect(() => {
		localStorage.setItem('adminPage', page);

		// I hate this so much
		if (page === 'players') {
			playersButtonVariant = 'default';
			tasksButtonVariant = 'secondary';
			webhooksButtonvariant = 'secondary';
			tamperButtonVariant = 'secondary';
			cosmeticButtonVariant = 'secondary';
		} else if (page === 'tasks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'default';
			webhooksButtonvariant = 'secondary';
			tamperButtonVariant = 'secondary';
			cosmeticButtonVariant = 'secondary';
		} else if (page === 'webhooks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'secondary';
			webhooksButtonvariant = 'default';
			tamperButtonVariant = 'secondary';
			cosmeticButtonVariant = 'secondary';
		} else if (page === 'tamper') {
			playersButtonVariant = 'secondary';
			webhooksButtonvariant = 'secondary';
			tasksButtonVariant = 'secondary';
			tamperButtonVariant = 'default';
			cosmeticButtonVariant = 'secondary';
		} else if (page === 'cosmetics') {
			playersButtonVariant = 'secondary';
			webhooksButtonvariant = 'secondary';
			tasksButtonVariant = 'secondary';
			tamperButtonVariant = 'secondary';
			cosmeticButtonVariant = 'default';
		}
	});
</script>

<svelte:head>
	<title>
		{Details.title} - Admin
	</title>
</svelte:head>

{#if data.loggedIn}
	<AdminMenu
		{playersButtonVariant}
		{tasksButtonVariant}
		{webhooksButtonvariant}
		{tamperButtonVariant}
		{cosmeticButtonVariant}
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
		{#if (players ?? []).length == 0}
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
					/>

					<ModifyUser id={player.id} cosmetics={data.cosmetics} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'tasks'}
	<h1 class="my-2 text-center text-4xl font-bold">Tasks</h1>
	<AddTasksDialogue />

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if (tasks ?? []).length == 0}
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
		{#if (webhooks ?? []).length == 0}
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
		{#if (messages ?? []).length == 0}
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
	<CreateCosmetic />

	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if (cosmetics ?? []).length == 0}
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
{/if}
