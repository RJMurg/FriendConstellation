<script lang="ts">
	import AbstractDialogue from './AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import ShopCard from '../cards/ShopCard.svelte';
	import { Switch } from '$lib/components/ui/switch';

	let {
		id = '',
		name = '',
		description = '',
		cost = 1,
		font = '',
		card = '',
		action = 'addCosmetic',
		animation = '',
		hat = '',
		checked = true,
		trigger = 'Add Cosmetic',
		title = 'Add Cosmetic'
	} = $props();
</script>

<AbstractDialogue
	{title}
	description="Create or Modify a Cosmetic that would modify the appearance of a player."
	{trigger}
	{action}
>
	{#if id}
		<input type="hidden" name="id" value={id} />
	{/if}

	<div class="grid grid-cols-2 gap-4 py-4">
		<div class="flex flex-col items-start">
			<Label for="name" class="mb-2 text-white">Name</Label>
			<Input name="name" placeholder="The cosmetic name" class="text-white" bind:value={name} />
		</div>

		<div class="flex flex-col items-start">
			<Label for="description" class="mb-2 text-white">Description</Label>
			<Textarea
				name="description"
				placeholder="The description for the cosmetic."
				class="text-white"
				bind:value={description}
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="cost" class="mb-2 text-white">Cost</Label>
			<Input name="cost" class="text-white" type="number" bind:value={cost} />
		</div>

		<div class="flex flex-col items-start">
			<Label for="card" class="mb-2 text-white">Card CSS</Label>
			<Input name="card" placeholder="The card's custom CSS" class="text-white" bind:value={card} />
		</div>

		<div class="flex flex-col items-start">
			<Label for="font" class="mb-2 text-white">Font</Label>
			<Input name="font" placeholder="The font to be used" class="text-white" bind:value={font} />
		</div>

		<div class="flex flex-col items-start">
			<Label for="animation" class="mb-2 text-white">Animation</Label>
			<Input
				name="animation"
				placeholder="The animation to be used"
				class="text-white"
				bind:value={animation}
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="hat" class="mb-2 text-white">Hat</Label>
			<Input name="hat" placeholder="The had to be added" class="text-white" bind:value={hat} />
		</div>

		<div class="flex flex-col items-start">
			<input type="hidden" name="active" value={String(checked)} />
			<Label for="active" class="mb-2 text-muted-foreground">Show Cosmetic?</Label>
			<Switch name="active" class="text-white" bind:checked />
		</div>
	</div>

	<div class="flex flex-col items-start">
		<Label for={name} class="mb-2 text-white">Example:</Label>
		<ShopCard {name} {description} {cost} {card} {font} {animation} {hat} />
	</div>
</AbstractDialogue>
