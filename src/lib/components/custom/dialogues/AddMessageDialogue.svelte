<script lang="ts">
	import AbstractDialogue from '../dialogues/AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
</script>

<AbstractDialogue
	title="Add Message"
	description="Add a Tamper-Evident Message. This can be given to players and it shows when it is opened."
	trigger="Add Message"
	action="addMessage"
>
	<div class="flex flex-col items-start">
		<Label for="name" class="mb-2 text-muted-foreground">Tamper-Evident Message Name</Label>
		<Input name="name" placeholder="Message Name" class="text-white" />
	</div>

	<div class="flex flex-col items-start">
		<Label for="name" class="mb-2 text-muted-foreground">Message Body</Label>
		<Textarea name="message" placeholder="Enter your Tamper-Evident Message" class="text-white" />
	</div>
</AbstractDialogue>
