<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';

	export let name: string;
	export let url: string;
</script>

<AbstractCard>
	<div class="flex w-3/4 flex-col items-start" id="Webhook">
		<h1 class="flex flex-row items-center text-4xl font-bold">
			{name}
		</h1>

		<div class="flex flex-row">
			<p class="text-sm text-gray-500">{url}</p>
		</div>
	</div>
</AbstractCard>