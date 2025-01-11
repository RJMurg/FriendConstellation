<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';
	import CreateCosmetic from '../dialogues/CreateCosmetic.svelte';

	export let cosmetic;
</script>

<AbstractModify id={cosmetic.id} action="deleteCosmetic">
	<CreateCosmetic
		id={cosmetic.id}
		name={cosmetic.name}
		description={cosmetic.description}
		cost={cosmetic.cost}
		font={cosmetic.font}
		card={cosmetic.card}
		animation={cosmetic.animation}
		hat={cosmetic.hat}
		checked={cosmetic.active}
		trigger="Modify Cosmetic"
		title="Modify Cosmetic"
		action="modifyCosmetic"
	/>
</AbstractModify>
