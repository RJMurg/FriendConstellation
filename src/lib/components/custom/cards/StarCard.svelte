<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import StarGenerator from '../StarGenerator.svelte';

	import { stringifyPosition } from '$lib';
	import { ChevronRight, Crown, EllipsisVertical } from 'lucide-svelte';
	let {
		player,
		id = '',
		position,
		stars,
		joint,
		showLogLink = true,
		font = 'font-sans',
		hat = '',
		card = '',
		animation = ''
	}: {
		player: string;
		id: string;
		position: number;
		stars: number;
		joint: boolean;
		showLogLink: boolean;
		font: string;
		hat: string;
		card: string;
		animation: string;
	} = $props();
</script>

<AbstractCard {font} {card} {animation} {hat}>
	<div class="flex w-fit flex-row items-center font-mono text-lg md:mx-5 md:text-2xl" id="Position">
		{stringifyPosition(position)}

		{#if joint}
			<EllipsisVertical class="h-6 w-6 text-green-500 md:ml-2" />
		{/if}
	</div>

	<div class="ml-5 flex w-max flex-col items-start md:ml-2 md:w-full" id="Player">
		<h1 class="flex flex-row items-center text-2xl font-bold md:text-4xl">
			{#if position === 1}
				<Crown class="mr-2 h-4 w-4 text-yellow-500 md:mr-5 md:h-8 md:w-8" />
			{/if}

			{player}
		</h1>

		<div class="flex flex-row">
			<StarGenerator {stars} />

			<div class="ml-2 w-max">
				{#if stars > 1 || stars <= 0}
					{stars} stars
				{:else}
					{stars} star
				{/if}
			</div>
		</div>
	</div>

	{#if showLogLink}
		<div class="flex w-full flex-row items-center justify-end" id="Actions">
			<Button variant="outline" href="/log/{id}">
				<ChevronRight />
			</Button>
		</div>
	{/if}
</AbstractCard>
