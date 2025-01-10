<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let uuid: string;
</script>

<AbstractCard flex="col">
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
</AbstractCard>