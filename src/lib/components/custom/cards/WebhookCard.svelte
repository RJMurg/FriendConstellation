<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';

	export let name: string;
	export let url: string;
</script>

<Card class="mb-2 w-full p-2">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="flex w-3/4 flex-col items-start" id="Webhook">
			<h1 class="flex flex-row items-center text-4xl font-bold">
				{name}
			</h1>

			<div class="flex flex-row">
				<p class="text-sm text-gray-500">{url}</p>
			</div>
		</div>
	</div>
</Card>
