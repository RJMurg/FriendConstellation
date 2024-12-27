<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import { stringifyPosition } from '$lib';
	import { Crown } from 'lucide-svelte';
	import StarsGenerator from './StarsGenerator.svelte';

	export let player: string;
	export let position: number;
	export let stars: number;
</script>

<Card class="mb-2 w-full p-2">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="ml-5 w-1/4 font-mono text-2xl" id="Position">
			{stringifyPosition(position)}
		</div>

		<div class="flex w-3/4 flex-col items-start" id="Player">
			<h1 class="flex flex-row items-center text-4xl font-bold">
				{#if position === 1}
					<Crown class="mr-5 h-8 w-8 text-yellow-500" />
				{/if}

				{player}
			</h1>

			<div class="flex flex-row">
				<StarsGenerator {stars} />

				<div class="ml-2">
					{#if stars > 1}
						{stars} stars
					{:else}
						{stars} star
					{/if}
				</div>
			</div>
		</div>
	</div>
</Card>
