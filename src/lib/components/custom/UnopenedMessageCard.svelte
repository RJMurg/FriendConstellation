<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import Card from '../ui/card/card.svelte';

	export let uuid: string;
</script>

<Card class="mb-2 flex w-full flex-col items-center justify-center p-2">
	<h1 class="mb-2 text-4xl font-bold">Unopened Message</h1>
	<p>
		This message has not been opened yet.
		<br />
		Opening it is permanent and irreversible!
	</p>

	<form action="/tamper/{uuid}?/openMessage" method="POST">
		<input type="hidden" name="uuid" value={uuid} />
		<Button variant="destructive" type="submit" class="mt-2">Open Message</Button>
	</form>
</Card>
