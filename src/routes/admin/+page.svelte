<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
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
	import MessageCard from '$lib/components/custom/MessageCard.svelte';
	import ModifyMessage from '$lib/components/custom/ModifyMessage.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let { data }: { data: PageData } = $props();

	let players = $state(data.players ?? []);
	let tasks = $state(data.tasks);
	let webhooks = $state(data.webhooks);
	let messages = $state(data.messages);
	let page = $state('players');
	let open = $state(false);
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

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

	let tasksCheckbox = $state(true);
	let messagesCheckbox = $state(false);

	$effect(() => {
		localStorage.setItem('adminPage', page);

		if (page === 'players') {
			playersButtonVariant = 'default';
			tasksButtonVariant = 'secondary';
			webhooksButtonvariant = 'secondary';
			tamperButtonVariant = 'secondary';
		} else if (page === 'tasks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'default';
			webhooksButtonvariant = 'secondary';
			tamperButtonVariant = 'secondary';
		} else if (page === 'webhooks') {
			playersButtonVariant = 'secondary';
			tasksButtonVariant = 'secondary';
			webhooksButtonvariant = 'default';
			tamperButtonVariant = 'secondary';
		} else if (page === 'tamper') {
			playersButtonVariant = 'secondary';
			webhooksButtonvariant = 'secondary';
			tasksButtonVariant = 'secondary';
			tamperButtonVariant = 'default';
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
	<form action="?/login" method="post" class="flex w-full max-w-sm items-center space-x-2">
		<Input type="password" name="password" placeholder="Enter admin password" />
		<Button type="submit">
			<ChevronRight class="" />
		</Button>
	</form>
	<Button variant="secondary" href="/" class="mt-2">Go Home</Button>
{:else if page === 'players'}
	<AdminMenu
		{playersButtonVariant}
		{tasksButtonVariant}
		{webhooksButtonvariant}
		{tamperButtonVariant}
		bind:page
	/>

	<h1 class="my-2 text-center text-4xl font-bold">Champions</h1>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Champion</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Champion</Dialog.Title>
				<Dialog.Description>Add a Champion to the Starboard.</Dialog.Description>
			</Dialog.Header>
			<form action="?/addPlayer" method="POST" use:enhance>
				<div class="grid gap-4 py-4">
					<div class="flex flex-col items-start">
						<Label for="name" class="mb-2 text-muted-foreground">Champion Name</Label>
						<Input name="name" placeholder="Champion Name" class="text-white" />
					</div>

					<div class="flex flex-col items-start">
						<Label for="stars" class="mb-2 text-muted-foreground">Stars</Label>
						<Input name="stars" value="1" class="text-white" type="number" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Add</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
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

					<ModifyUser id={player.id} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'tasks'}
	<AdminMenu
		{playersButtonVariant}
		{tasksButtonVariant}
		{webhooksButtonvariant}
		{tamperButtonVariant}
		bind:page
	/>

	<h1 class="my-2 text-center text-4xl font-bold">Tasks</h1>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Task</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Task</Dialog.Title>
				<Dialog.Description>Add a Task to the Starboard.</Dialog.Description>
			</Dialog.Header>
			<form action="?/addTask" method="POST" use:enhance>
				<div class="grid gap-4 py-4">
					<div class="flex flex-col items-start">
						<Label for="name" class="mb-2 text-muted-foreground">Task Name</Label>
						<Input name="name" placeholder="Task Title" class="text-white" />
					</div>

					<div class="flex flex-col items-start">
						<Label for="description" class="mb-2 text-muted-foreground">Task Body</Label>
						<Textarea
							name="description"
							placeholder="Explain how to complete the task"
							class="text-white"
						/>
					</div>

					<div class="flex flex-col items-start">
						<Label for="stars" class="mb-2 text-muted-foreground">Max Stars Available</Label>
						<Input name="stars" value="1" class="text-white" type="number" />
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
			{#each tasks ?? [] as task}
				<div class="flex flex-row">
					<TaskCard name={task.title} description={task.description} stars={task.reward} />

					<ModifyTask id={task.id} active={task.active} token={data.token} />
				</div>
			{/each}
		{/if}
	</div>
{:else if page === 'webhooks'}
	<AdminMenu
		{playersButtonVariant}
		{tasksButtonVariant}
		{webhooksButtonvariant}
		{tamperButtonVariant}
		bind:page
	/>

	<h1 class="my-2 text-center text-4xl font-bold">Webhooks</h1>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Webhook</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Webhook</Dialog.Title>
				<Dialog.Description>Add a Webhook to the Starboard.</Dialog.Description>
			</Dialog.Header>
			<form action="?/addWebhook" method="POST" use:enhance>
				<div class="grid gap-4 py-4">
					<div class="flex flex-col items-start">
						<Label for="name" class="mb-2 text-muted-foreground">Webhook Name</Label>
						<Input name="name" placeholder="Webhook Name" class="text-white" />
					</div>

					<div class="flex flex-col items-start">
						<Label for="url" class="mb-2 text-muted-foreground">Webhook URL</Label>
						<Input name="url" placeholder="Webhook URL" class="text-white" />
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<!-- One issue with ShadCN is that we have to do this if we're using normal forms instead of their stupid SupaForms -->
						<input type="hidden" name="tasks" id="tasks" value={tasksCheckbox} />
						<Checkbox class="col-span-1 text-white" bind:checked={tasksCheckbox} />
						<Label for="tasks" class="col-span-3 text-sm text-muted-foreground">
							Hit this webhook when a task is created?
						</Label>
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<!-- One issue with ShadCN is that we have to do this if we're using normal forms instead of their stupid SupaForms -->
						<input type="hidden" name="tamper" id="tamper" value={messagesCheckbox} />
						<Checkbox class="col-span-1 text-white" bind:checked={messagesCheckbox} />
						<Label for="tamper" class="col-span-3 text-sm text-muted-foreground">
							Hit this webhook when a tamper-evident seal is broken?
						</Label>
					</div>
					<Dialog.Footer>
						<Button type="submit">Add</Button>
					</Dialog.Footer>
				</div>
			</form>
		</Dialog.Content>
	</Dialog.Root>
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
	<AdminMenu
		{playersButtonVariant}
		{tasksButtonVariant}
		{webhooksButtonvariant}
		{tamperButtonVariant}
		bind:page
	/>

	<h1 class="my-2 text-center text-4xl font-bold">Tamper Evident Messages</h1>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' mb-2'}
			>Add Message</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title class="dark">Add Message</Dialog.Title>
				<Dialog.Description>
					Add a Tamper-Evident Message. <br />
					This can be given to players and it shows when it is opened
				</Dialog.Description>
			</Dialog.Header>
			<form action="?/addMessage" method="POST" use:enhance>
				<div class="grid gap-4 py-4">
					<div class="flex flex-col items-start">
						<Label for="name" class="mb-2 text-muted-foreground">Tamper-Evident Message Name</Label>
						<Input name="name" placeholder="Message Name" class="text-white" />
					</div>

					<div class="flex flex-col items-start">
						<Label for="name" class="mb-2 text-muted-foreground">Message Body</Label>
						<Textarea
							name="message"
							placeholder="Enter your Tamper-Evident Message"
							class="text-white"
						/>
					</div>

					<Dialog.Footer>
						<Button type="submit">Add</Button>
					</Dialog.Footer>
				</div>
			</form>
		</Dialog.Content>
	</Dialog.Root>
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
{/if}
