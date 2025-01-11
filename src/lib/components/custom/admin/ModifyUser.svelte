<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';
	import ModifyUserStarsDialogue from '../dialogues/ModifyUserStarsDialogue.svelte';
	import AddCosmeticToUser from '../AddCosmeticToUser.svelte';

	export let id: number;
	export let cosmetics: any[] = [];
</script>

<AbstractModify {id} action="deletePlayer">
	<ModifyUserStarsDialogue {id} />
	<AddCosmeticToUser {id} {cosmetics} />
</AbstractModify>
