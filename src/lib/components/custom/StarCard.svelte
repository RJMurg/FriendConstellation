<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import { stringifyPosition } from '$lib';
	import { ChevronRight, Crown, EllipsisVertical } from 'lucide-svelte';
	import StarsGenerator from './StarsGenerator.svelte';
	import Button from '../ui/button/button.svelte';

	export let player: string;
	export let id: string = '';
	export let position: number;
	export let stars: number;
	export let joint: boolean;
	export let showLogLink: boolean;
</script>

<Card class="mb-2 w-full p-2">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="ml-5 w-1/4 font-mono text-2xl flex flex-row items-center" id="Position">
			{stringifyPosition(position)}

			{#if joint}
				<EllipsisVertical class="ml-2 h-6 w-6 text-green-500" />
			{/if}
		</div>

		<div class="flex w-1/2 flex-col items-start" id="Player">
			<h1 class="flex flex-row items-center text-4xl font-bold">
				{#if position === 1}
					<Crown class="mr-5 h-8 w-8 text-yellow-500" />
				{/if}

				{player}
			</h1>

			<div class="flex flex-row">
				<StarsGenerator {stars} />

				<div class="ml-2">
					{#if stars > 1 || stars <= 0}
						{stars} stars
					{:else}
						{stars} star
					{/if}
				</div>
			</div>
		</div>

		{#if showLogLink}
			<div class="flex w-1/4 flex-row items-center justify-end" id="Actions">
				<Button variant="outline" href="/log/{id}">
					<ChevronRight />
				</Button>
			</div>
		{/if}
	</div></Card
>
