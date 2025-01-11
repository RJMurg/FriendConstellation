<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';
	import ModifyUserStarsDialogue from '../dialogues/ModifyUserStarsDialogue.svelte';
	import ModifyUserDialogue from '../dialogues/ModifyUserDialogue.svelte';

	let { player } = $props();
</script>

<AbstractModify id={player.id} action="deletePlayer">
	<ModifyUserStarsDialogue id={player.id} />
	<ModifyUserDialogue {player} />
</AbstractModify>
