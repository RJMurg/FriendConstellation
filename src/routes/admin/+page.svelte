<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Starbox from '$lib/starbox.svelte';
	import AdminControls from '$lib/adminControls.svelte';
	import Taskbox from '$lib/taskbox.svelte';
	import TaskControls from '$lib/taskControls.svelte';
	import 'carbon-components-svelte/css/all.css';
	import '$lib/css/carbon-colours.css';
	import '$lib/css/style.css';
	import { Home, Logout, TaskStar, Send, UserFollow } from 'carbon-icons-svelte';
	import {
		Button,
		TextInput,
		NumberInput,
		TextArea,
		PasswordInput,
		Modal
	} from 'carbon-components-svelte';

	export let form: ActionData;
	export let data: PageData;
	export let LoggedIn = false;
	export let page = 'starboard';
	export let open = false;
	import Pagebox from '$lib/pagebox.svelte';

	if (data.loggedIn) {
		LoggedIn = true;
	}

	$: if (form?.status == 200) {
		LoggedIn = true;
	}

	$: if (form?.status == 500) {
		LoggedIn = false;
	}
</script>

<svelte:head>
	<title>Starboard - Admin</title>
</svelte:head>

{#if !LoggedIn}
	<div>
		<h3>Please enter the Administrator Password:</h3>
		<form method="post" action="?/login" use:enhance>
			<PasswordInput name="password" placeholder="Enter the password..." required />
		</form>

		<Button
			class="starboard-buttons"
			kind="primary"
			on:click={() => (location.href = '/')}
			data-sveltekit-preload-date="hover"
		>
			<Home size={16} />
			<span class="button-span">Go Home</span>
		</Button>
	</div>
{:else}
	{#if page == 'taskboard'}
		<Modal
			bind:open
			passiveModal
			modalHeading="Create Task"
			secondaryButtonText="Cancel"
			selectorPrimaryFocus="#db-name"
		>
			<form method="post" action="?/addTask" use:enhance>
				<TextInput required name="title" labelText="Task Name" placeholder="Task name..." />

				<br />

				<TextArea
					required
					name="description"
					labelText="Task Description"
					placeholder="Enter the task description..."
				/>

				<br />

				<NumberInput
					required
					min={0}
					step={1}
					value={1}
					name="reward"
					label="Maximum reward offered"
				/>

				<br />

				<Button
					type="submit"
					on:submit={() => {
						open = false;
					}}
				>
					<Send size={16} />
					<span class="button-span">Submit</span>
				</Button>
			</form>
		</Modal>
	{:else if page == 'starboard'}
		<Modal
			bind:open
			passiveModal
			modalHeading="Create Person"
			secondaryButtonText="Cancel"
			selectorPrimaryFocus="#db-name"
		>
			<form method="post" action="?/addPerson" use:enhance>
				<TextInput required name="title" labelText="Name" placeholder="Person's name..." />

				<br />

				<NumberInput required min={0} step={1} value={1} name="stars" label="Starting stars" />

				<br />

				<Button
					type="submit"
					on:submit={() => {
						open = false;
					}}
				>
					<Send size={16} />
					<span class="button-span">Submit</span>
				</Button>
			</form>
		</Modal>
	{/if}

	<div class="commandmodal horizontal">
		<form method="post" action="?/logout" use:enhance>
			<Button icon={Logout} kind="secondary" type="submit" style="width: 100%;">Logout</Button>
		</form>

		{#if page == 'taskboard'}
			<Button on:click={() => (open = true)}>
				<TaskStar size={16} />
				<span class="button-span">Create Task</span>
			</Button>
		{:else if page == 'starboard'}
			<Button on:click={() => (open = true)}>
				<UserFollow size={16} />
				<span class="button-span">Create Person</span>
			</Button>
		{/if}
	</div>

	<hr />

	{#if page == 'starboard'}
		<Pagebox bind:page />
	{:else if page == 'taskboard'}
		<Pagebox bind:page />
	{/if}

	{#if page == 'starboard'}
		<h3>Starboard</h3>
		<div class="starlist">
			{#if data.starboard.length == 0}
				<div class="starbox">
					<div class="staree">
						<h1 class="staree-name">No people on starboard...</h1>
					</div>
				</div>
			{:else}
				{#each data.starboard as { id, name, stars, position }}
					<div class="horizontal">
						<Starbox {name} {position} {stars} />

						<AdminControls {id} {name} />
					</div>
				{/each}
			{/if}
		</div>
	{:else if page == 'taskboard'}
		<h3>Taskboard</h3>
		<div class="starlist">
			{#if data.tasks.length == 0}
				<div class="starbox">
					<div class="staree">
						<h1 class="staree-name">No tasks available yet...</h1>
					</div>
				</div>
			{:else}
				{#each data.tasks as { id, title, description, reward }}
					<div class="horizontal">
						<Taskbox {title} {description} {reward} />

						<TaskControls {id} />
					</div>
				{/each}
			{/if}
		</div>
	{/if}
{/if}
