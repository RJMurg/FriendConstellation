<script lang="ts">
	import AbstractDialogue from '../dialogues/AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Switch } from '$lib/components/ui/switch';

	let checked = $state(false);
</script>

<AbstractDialogue
	title="Add Task"
	description="Add a Task to the Starboard."
	trigger="Add Task"
	action="addTask"
>
	<div class="grid gap-4 py-4">
		<div class="flex flex-col items-start">
			<Label for="name" class="mb-2 text-muted-foreground">Task Name</Label>
			<Input name="name" placeholder="Task Title" class="text-white" />
		</div>

		<div class="flex flex-col items-start">
			<Label for="description" class="mb-2 text-muted-foreground">Task Body</Label>
			<Textarea
				name="description"
				placeholder="Explain how to complete the task"
				class="text-white"
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="stars" class="mb-2 text-muted-foreground">Max Stars Available</Label>
			<Input name="stars" value="1" class="text-white" type="number" />
		</div>
	</div>

	<div class="flex flex-col items-start">
		<input type="hidden" name="active" value={String(checked)} />
		<Label for="active" class="mb-2 text-muted-foreground">Show Task?</Label>
		<Switch name="active" class="text-white" bind:checked />
	</div>
</AbstractDialogue>
