<script lang="ts">
	import AbstractDialogue from '../dialogues/AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	let tasksCheckbox = $state(true);
	let messagesCheckbox = $state(false);
</script>

<AbstractDialogue
	title="Add Webhook"
	description="Add a Webhook to the Starboard."
	trigger="Add Webhook"
	action="addWebhook"
>
	<div class="flex flex-col items-start">
		<Label for="name" class="mb-2 text-muted-foreground">Webhook Name</Label>
		<Input name="name" placeholder="Webhook Name" class="text-white" />
	</div>

	<div class="flex flex-col items-start">
		<Label for="url" class="mb-2 text-muted-foreground">Webhook URL</Label>
		<Input name="url" placeholder="Webhook URL" class="text-white" />
	</div>

	<div class="grid grid-cols-4 items-center gap-4">
		<!-- One issue with ShadCN is that we have to do this if we're using normal forms instead of their stupid SupaForms -->
		<input type="hidden" name="tasks" id="tasks" value={tasksCheckbox} />
		<Checkbox class="col-span-1 text-white" bind:checked={tasksCheckbox} />
		<Label for="tasks" class="col-span-3 text-sm text-muted-foreground">
			Hit this webhook when a task is created?
		</Label>
	</div>

	<div class="grid grid-cols-4 items-center gap-4">
		<!-- One issue with ShadCN is that we have to do this if we're using normal forms instead of their stupid SupaForms -->
		<input type="hidden" name="tamper" id="tamper" value={messagesCheckbox} />
		<Checkbox class="col-span-1 text-white" bind:checked={messagesCheckbox} />
		<Label for="tamper" class="col-span-3 text-sm text-muted-foreground">
			Hit this webhook when a tamper-evident seal is broken?
		</Label>
	</div>
</AbstractDialogue>
