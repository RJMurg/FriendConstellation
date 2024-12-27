<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import StarsGenerator from './StarsGenerator.svelte';

	export let name: string;
	export let description: string;
	export let stars: number;
</script>

<Card class="mb-2 w-full p-2">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="flex w-3/4 flex-col items-start" id="Task">
			<h1 class="flex flex-row items-center text-2xl lg:text-4xl font-bold">
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
	</div>
</Card>
