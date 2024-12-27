<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	export let message: string;
</script>

<Card class="mb-2 w-full p-2">
	<div class="flex w-full flex-col items-center justify-between">
		<p class="font-mono text-2xl text-gray-500">
			{message}
		</p>
	</div>
</Card>
