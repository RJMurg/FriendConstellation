<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Trash2 } from 'lucide-svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	export let id: number;
</script>

<Card class="mb-2 ml-2">
	<div class="flex flex-col items-center justify-between p-5">
		<form action="?/deleteMessage" method="POST" class="mb-5">
			<input type="hidden" name="id" value={id} />
			<Button type="submit" variant="destructive" class="text-red-500">
				<Trash2 class="h-6 w-6 text-white" />
			</Button>
		</form>
	</div>
</Card>
