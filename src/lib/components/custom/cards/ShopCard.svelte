<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	import StarsGenerator from '../StarsGenerator.svelte';

	export let name: string;
	export let description: string;
	export let cost: number;
	export let font = 'font-sans';
	export let hat = '';
	export let card = '';
	export let animation = '';

	let starString = 'star';

	if (cost > 1) {
		starString += 's';
	}
</script>

<AbstractCard {font} {hat} {card} {animation}>
	<div class="flex w-3/4 flex-col items-start" id="Task">
		<h1 class="flex flex-row items-center text-2xl font-bold lg:text-4xl">
			{name}
		</h1>

		<p>
			{description}
		</p>

		<div class="flex flex-row items-center">
			<div class="mr-2">
				<span class="font-bold">Cost:</span>
				{cost}
				{starString}
			</div>

			<StarsGenerator stars={cost} />
		</div>
	</div>
</AbstractCard>
