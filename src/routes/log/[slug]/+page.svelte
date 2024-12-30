<script lang="ts">
	import StarsGenerator from '$lib/components/custom/StarsGenerator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="h-screen w-full p-5">
	<Card class="flex h-full w-full flex-col">
		<Button variant="outline" href="/" class="m-5 w-fit">
			<ChevronLeft size={24} />
		</Button>
		<div class="align-start m-5 flex flex-col items-start">
			<h1 class="text-2xl font-bold md:text-4xl">{data.player?.name}</h1>
			<StarsGenerator stars={data.player?.stars} size={8} />
		</div>

		{#if data.logs.length === 0}
			<p class="text-lg text-neutral-500 m-5">No logs found</p>
		{/if}
		
		{#each data.logs as log}
			<div class="mb-2 ml-5 flex flex-row items-end">
				<h1 class="text-xl font-bold md:text-2xl">{log.action}</h1>
				<p class="text-md ml-5 text-neutral-500">{log.timestamp}</p>
			</div>
		{/each}
	</Card>
</div>
