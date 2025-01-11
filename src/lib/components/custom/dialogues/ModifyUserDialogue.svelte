<script lang="ts">
	import AbstractDialogue from './AbstractDialogue.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import StarCard from '../cards/StarCard.svelte';

	let { player } = $props();
</script>

<AbstractDialogue
	title="Modify User"
	description="Modify the details of a user"
	trigger="Modify"
	action="updatePlayer"
>
	<input type="hidden" name="id" value={player.id} />
	<div class="grid grid-cols-2 gap-4 py-4">
		<div class="flex flex-col items-start">
			<Label for="name" class="mb-2 text-white">Name</Label>
			<Input
				name="name"
				placeholder="The cosmetic name"
				class="text-white"
				bind:value={player.name}
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="card" class="mb-2 text-white">Card CSS</Label>
			<Input
				name="card"
				placeholder="The card's custom CSS"
				class="text-white"
				bind:value={player.card}
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="font" class="mb-2 text-white">Font</Label>
			<Input
				name="font"
				placeholder="The font to be used"
				class="text-white"
				bind:value={player.font}
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="animation" class="mb-2 text-white">Animation</Label>
			<Input
				name="animation"
				placeholder="The animation to be used"
				class="text-white"
				bind:value={player.animation}
			/>
		</div>

		<div class="flex flex-col items-start">
			<Label for="hat" class="mb-2 text-white">Hat</Label>
			<Input
				name="hat"
				placeholder="The had to be added"
				class="text-white"
				bind:value={player.hat}
			/>
		</div>
	</div>

	<div class="flex w-fit flex-col items-start">
		<Label for={player.name} class="mb-2 text-white">Example:</Label>
		<StarCard
			player={player.name}
			position={1}
			stars={player.stars}
			font={player.font}
			card={player.card}
			animation={player.animation}
			hat={player.hat}
			joint={true}
		/>
	</div>
</AbstractDialogue>
