<script lang="ts">
	import AbstractDialogue from '../dialogues/AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';

	export let id: number;
</script>

<AbstractDialogue
	title="Modify Stars"
	description="Add or remove stars from a player."
	trigger="Modify"
	action="updateStars"
>
	<input type="hidden" name="id" value={id} />
	<div class="grid gap-4 py-4">
		<div class="flex flex-col items-start">
			<Label for="stars" class="mb-2 text-white">Stars</Label>
			<Input name="stars" value="1" class="text-white" type="number" />
		</div>

		<div class="flex flex-col items-start">
			<Label for="log" class="mb-2 text-white">Log</Label>
			<Input name="log" placeholder="# Stars added/removed for..." class="text-white" />
		</div>
	</div>
</AbstractDialogue>
