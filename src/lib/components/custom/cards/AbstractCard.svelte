<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';

	let {
		flex = 'row',
		font = 'font-sans',
		card = '',
		animation = '',
		hat = '',
		children
	} = $props();
</script>

<Card class="mb-2 w-full p-2 {card} {animation}">
	<div class="flex w-full flex-{flex} items-center justify-between {font}">
		{#if hat}
			<img
				src="./cosmetics/{hat}"
				class="absolute -ml-4 -mt-28 h-8 w-8 md:-ml-10 md:-mt-28 md:h-16 md:w-16"
				alt="Hat"
			/>
		{/if}

		{@render children()}
	</div>
</Card>
