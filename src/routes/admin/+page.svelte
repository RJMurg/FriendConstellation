<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { PageData } from './$types';
	import { ChevronRight } from 'lucide-svelte';
	import Details from '$lib/details.json';
	import EmptyCard from '$lib/components/custom/EmptyCard.svelte';
	import ModifyUser from '$lib/components/custom/ModifyUser.svelte';
	import StarCard from '$lib/components/custom/StarCard.svelte';
	import TaskCard from '$lib/components/custom/TaskCard.svelte';
	import ModifyTask from '$lib/components/custom/ModifyTask.svelte';
	import WebhookCard from '$lib/components/custom/WebhookCard.svelte';
	import ModifyWebhook from '$lib/components/custom/ModifyWebhook.svelte';
	import AdminMenu from '$lib/components/custom/AdminMenu.svelte';

	let { data }: { data: PageData } = $props();

	let players = $state(data.players ?? []);
	let tasks = $state(data.tasks);
	let webhooks = $state(data.webhooks);
	let page = $state('players');
	let playersButtonVariant: buttonTypes = $state('default');
	let tasksButtonVariant: buttonTypes = $state('secondary');
	let webhooksButtonvariant: buttonTypes = $state('secondary');

	$effect(() => {
		if (page === 'tasks') {
			playersButtonVariant = 'secondary';
			webhooksButtonvariant = 'secondary';
			tasksButtonVariant = 'default';
		} else if (page === 'webhooks') {
			playersButtonVariant = 'secondary';
			webhooksButtonvariant = 'default';
			tasksButtonVariant = 'secondary';
		} else if (page === 'players') {
			playersButtonVariant = 'default';
			webhooksButtonvariant = 'secondary';
			tasksButtonVariant = 'secondary';
		}
	});
</script>

<svelte:head>
	<title>
		{Details.title} - Admin
	</title>
</svelte:head>

{#if !data.loggedIn}
	<h1 class="mb-5 text-center text-4xl font-bold">Admin Login</h1>
	<form
		action="?/login"
		method="post"
		use:enhance
		class="flex w-full max-w-sm items-center space-x-2"
	>
		<Input type="password" name="password" placeholder="Enter admin password" />
		<Button type="submit">
			<ChevronRight class="" />
		</Button>
	</form>
	<Button variant="secondary" href="/" class="mt-2">Go Home</Button>
{:else if page === 'players'}
	<AdminMenu {playersButtonVariant} {tasksButtonVariant} {webhooksButtonvariant} bind:page />

	<h1 class="my-2 text-center text-4xl font-bold">Champions</h1>
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Champion</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Champion</Dialog.Title>
				<Dialog.Description>Add a Champion to the Starboard.</Dialog.Description>
			</Dialog.Header>
			<form action="?/addPlayer" method="POST">
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Input name="name" placeholder="Champion Name" class="col-span-3 text-white" />
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<Input name="stars" value="1" class="col-span-3 text-white" type="number" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Add</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if (players ?? []).length == 0}
			<EmptyCard message="No champions have been added." />
		{:else}
			{#each players ?? [] as player, i}
				<div class="flex flex-row">
					<StarCard player={player.name} position={i + 1} stars={player.stars} showLogLink={false} />

					<ModifyUser id={player.id} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'tasks'}
	<AdminMenu {playersButtonVariant} {tasksButtonVariant} {webhooksButtonvariant} bind:page />

	<h1 class="my-2 text-center text-4xl font-bold">Tasks</h1>
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Task</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Task</Dialog.Title>
				<Dialog.Description>Add a Task to the Starboard.</Dialog.Description>
			</Dialog.Header>
			<form action="?/addTask" method="POST">
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Input name="name" placeholder="Task Title" class="col-span-3 text-white" />
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<Input
							name="description"
							placeholder="Explain how to complete the task"
							class="col-span-3 text-white"
						/>
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<Input name="stars" value="1" class="col-span-3 text-white" type="number" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Add</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if (tasks ?? []).length == 0}
			<EmptyCard message="No tasks have been added." />
		{:else}
			{#each tasks ?? [] as task, i}
				<div class="flex flex-row">
					<TaskCard name={task.title} description={task.description} stars={task.reward} />

					<ModifyTask id={task.id} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'webhooks'}
	<AdminMenu {playersButtonVariant} {tasksButtonVariant} {webhooksButtonvariant} bind:page />

	<h1 class="my-2 text-center text-4xl font-bold">Webhooks</h1>
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Webhook</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Webhook</Dialog.Title>
				<Dialog.Description>Add a Webhook to the Starboard.</Dialog.Description>
			</Dialog.Header>
			<form action="?/addWebhook" method="POST">
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Input name="name" placeholder="Webhook Name" class="col-span-3 text-white" />
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<Input name="url" placeholder="Webhook URL" class="col-span-3 text-white" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Add</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
	<div class="mx-auto w-full px-5 md:w-2/3 md:px-0">
		{#if (webhooks ?? []).length == 0}
			<EmptyCard message="No webhooks have been added." />
		{:else}
			{#each webhooks ?? [] as webhook, i}
				<div class="flex flex-row">
					<WebhookCard name={webhook.name} url={webhook.webhook} />

					<ModifyWebhook id={webhook.id} />
				</div>
			{/each}
		{/if}
	</div>
{/if}
