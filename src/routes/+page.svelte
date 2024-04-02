<script lang="ts">
	import type { PageData } from './$types';
	import Starbox from '$lib/starbox.svelte';
	import Taskbox from '$lib/taskbox.svelte';
	import Pagebox from '$lib/pagebox.svelte';
	import {
		TrophyFilled,
		Trophy,
		StarFilled,
		StarHalf,
		Star,
		TaskStar,
		ChartClusterBar
	} from 'carbon-icons-svelte';
	import 'carbon-components-svelte/css/all.css';
	import '$lib/css/carbon-colours.css';
	import '$lib/css/style.css';

	export let data: PageData;
	export let page = 'starboard';
</script>

<svelte:head>
	<title>Starboard</title>
</svelte:head>

<div class="header">
	{#if page == 'starboard'}
		<h1 class="title">Starboard</h1>

		<Pagebox bind:page />

		<hr />

		<div class="horizontal">
			<div>
				<TrophyFilled fill="var(--yellow-500)" /> = 100 Stars
			</div>

			<div>
				<Trophy fill="var(--yellow-500)" /> = 50 Stars
			</div>

			<div>
				<StarFilled fill="var(--yellow-500)" /> = 10 Stars
			</div>

			<div>
				<StarHalf fill="var(--yellow-500)" /> = 5 Stars
			</div>

			<div>
				<Star fill="var(--yellow-500)" /> = 1 Star
			</div>
		</div>
	{:else if page == 'taskboard'}
		<h1 class="title">Taskboard</h1>

		<Pagebox bind:page />

		<hr />

		<h4>Send a photo or video of the relevant task once you have completed it</h4>
	{/if}
	<h4><a href="https://youtu.be/8q8IEsbpOSg?si=Khk3AH-PIR5H5py3">I have officially caused pain</a></h4>
</div>

{#if page == 'starboard'}
	<div class="starlist">
		{#if data.starboard.length == 0}
			<div class="starbox">
				<div class="staree">
					<h1 class="staree-name">No people on starboard...</h1>
				</div>
			</div>
		{:else}
			{#each data.starboard as { name, stars, position }}
				<Starbox {name} {position} {stars} />
			{/each}
		{/if}
	</div>
{:else if page == 'taskboard'}
	<div class="starlist">
		{#if data.tasks.length == 0}
			<div class="starbox">
				<div class="staree">
					<h1 class="staree-name">No tasks available yet...</h1>
				</div>
			</div>
		{:else}
			{#each data.tasks as { title, description, reward }}
				<Taskbox {title} {description} {reward} />
			{/each}
		{/if}
	</div>
{/if}
