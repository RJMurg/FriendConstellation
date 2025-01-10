<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import StarsGenerator from '../StarsGenerator.svelte';

	import { stringifyPosition } from '$lib';
	import { ChevronRight, Crown, EllipsisVertical } from 'lucide-svelte';

	export let player: string;
	export let id: string = '';
	export let position: number;
	export let stars: number;
	export let joint: boolean;
	export let showLogLink = true;
	export let font = 'sans';
	export let hat = '';
	export let card = '';
	export let animation = '';
</script>

<AbstractCard
		font={font}
		card={card}
		animation={animation}
		hat={hat}>

	<div
		class="flex flex-row items-center font-mono text-lg md:ml-5 md:w-1/4 md:text-2xl"
		id="Position"
	>

		{stringifyPosition(position)}

		{#if joint}
			<EllipsisVertical class="h-6 w-6 text-green-500 md:ml-2" />
		{/if}
	</div>

	<div class="flex w-10/12 flex-col items-start md:w-3/4" id="Player">
		<h1 class="flex flex-row items-center text-2xl font-bold md:text-4xl">
			{#if position === 1}
				<Crown class="mr-2 h-4 w-4 text-yellow-500 md:mr-5 md:h-8 md:w-8" />
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
</AbstractCard>
