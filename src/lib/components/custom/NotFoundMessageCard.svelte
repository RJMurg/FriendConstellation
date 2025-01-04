<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import Card from '../ui/card/card.svelte';
</script>

<Card class="mb-2 flex w-full flex-col items-center justify-center p-2">
	<h1 class="mb-2 text-4xl font-bold">Message Not Found</h1>
	<p>This message does not exist or has been deleted.</p>

	<Button variant="outline" href="/" class="mt-2">Go home</Button>
</Card>
