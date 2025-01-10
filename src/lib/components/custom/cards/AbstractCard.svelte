<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';

	export let flex: string = 'row';
</script>

<Card class="mb-2 w-full p-2">
	<div class="flex w-full flex-{flex} items-center justify-between">
		<slot />
	</div>
</Card>
