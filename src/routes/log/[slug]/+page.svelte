<script lang="ts">
	import StarGenerator from '$lib/components/custom/StarGenerator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import Details from '$lib/details.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#if data.player}
		<title>
			{Details.title} - {data.player.name} Star Log
		</title>
	{:else}
		<title>
			{Details.title} - Log Not Found
		</title>
	{/if}
</svelte:head>

{#if data.player}
	<div class="h-screen w-full p-5 {data.player.font}">
		<Card class="flex h-full w-full flex-col {data.player.card}">
			<Button variant="outline" href="/" class="m-5 w-fit">
				<ChevronLeft size={24} />
			</Button>
			<div class="align-start m-5 flex flex-col items-start">
				<h1 class="text-2xl font-bold md:text-4xl">{data.player?.name}</h1>
				<StarGenerator stars={data.player?.stars} size={8} />
			</div>

			{#if data.logs.length === 0}
				<p class="m-5 text-lg text-neutral-500">No logs found</p>
			{/if}

			{#each data.logs as log}
				<div class="mb-2 ml-5 flex flex-row items-end">
					<h1 class="text-xl font-bold md:text-2xl">{log.action}</h1>
					<p class="text-md ml-5 text-neutral-500">{log.timestamp}</p>
				</div>
			{/each}
		</Card>
	</div>
{:else}
	<div class="h-screen w-full p-5">
		<Card class="flex h-full w-full flex-col">
			<Button variant="outline" href="/" class="m-5 w-fit">
				<ChevronLeft size={24} />
			</Button>
			<p class="m-5 text-lg text-neutral-500">No logs found</p>
		</Card>
	</div>
{/if}
