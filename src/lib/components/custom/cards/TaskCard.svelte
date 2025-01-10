<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	import StarsGenerator from '../StarsGenerator.svelte';

	export let name: string;
	export let description: string;
	export let stars: number;
</script>

<AbstractCard>
	<div class="flex w-3/4 flex-col items-start" id="Task">
		<h1 class="flex flex-row items-center text-2xl font-bold lg:text-4xl">
			{name}
		</h1>

		<p>
			{description}
		</p>

		<div class="flex flex-row items-center">
			Max reward:

			<span class="ml-2">
				<StarsGenerator {stars} />
			</span>

			<div class="ml-2">
				{#if stars > 1 || stars <= 0}
					{stars} stars
				{:else}
					{stars} star
				{/if}
			</div>
		</div>
	</div>
</AbstractCard>