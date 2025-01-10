<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';

	export let flex: string = 'row';
	export let font = 'sans';
	export let card = '';
	export let animation = '';
	export let hat = '';
</script>

<Card class="mb-2 w-full p-2 {card} {animation}">
	<div class="flex w-full flex-{flex} items-center justify-between {font}">
		{#if hat}
			<img
				src="./cosmetics/{hat}"
				class="absolute -ml-4 -mt-20 h-8 w-8 md:-ml-12 md:-mt-28 md:h-16 md:w-16"
				alt="Hat"
			/>
		{/if}

		<slot />
	</div>
</Card>
