<script lang="ts">
	import AbstractDialogue from '../dialogues/AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
</script>

<AbstractDialogue
	title="Add Champion"
	description="Add a Champion to the Starboard."
	trigger="Add Champion"
	action="addPlayer"
>
	<div class="grid gap-4 py-4">
		<div class="flex flex-col items-start">
			<Label for="name" class="mb-2 text-muted-foreground">Champion Name</Label>
			<Input name="name" placeholder="Champion Name" class="text-white" />
		</div>

		<div class="flex flex-col items-start">
			<Label for="stars" class="mb-2 text-muted-foreground">Stars</Label>
			<Input name="stars" value="1" class="text-white" type="number" />
		</div>
	</div>
</AbstractDialogue>
