<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	
	export let message: string;
</script>

<AbstractCard flex="col">
	<p class="font-mono text-2xl text-gray-500">
		{message}
	</p>
</AbstractCard>