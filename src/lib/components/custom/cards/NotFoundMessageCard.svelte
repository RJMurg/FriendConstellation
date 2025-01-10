<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<AbstractCard flex="col">
	<h1 class="mb-2 text-4xl font-bold">Message Not Found</h1>
	<p>This message does not exist or has been deleted.</p>

	<Button variant="outline" href="/" class="mt-2">Go home</Button>
</AbstractCard>
