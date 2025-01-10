<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Trash2 } from 'lucide-svelte';
	import Card from '../ui/card/card.svelte';
	import Switch from '../ui/switch/switch.svelte';

	let { id, active, token } = $props();

	$effect(() => {
		fetch(`/api/toggleTask`, {
			method: 'POST',
			body: JSON.stringify({
				id,
				active,
				token
			})
		});
	});
</script>

<Card class="ml-2 mb-2">
	<div class="flex flex-col items-center justify-between p-5">
		<form action="?/deleteTask" method="POST" class="mb-2">
			<input type="hidden" name="id" value={id} />
			<Button type="submit" variant="destructive" class="text-red-500">
				<Trash2 class="h-6 w-6 text-white" />
			</Button>
		</form>

		<Switch bind:checked={active} />
	</div>
</Card>
