<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';
	import ModifyUserStarsDialogue from '../dialogues/ModifyUserStarsDialogue.svelte';
	import AddCosmeticToUser from '../AddCosmeticToUser.svelte';

	let { id, cosmetics, token } = $props();
</script>

<AbstractModify {id} action="deletePlayer">
	<ModifyUserStarsDialogue {id} />
	<AddCosmeticToUser {id} {cosmetics} {token} />
</AbstractModify>
