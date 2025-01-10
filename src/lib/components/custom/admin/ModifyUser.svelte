<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';
	import ModifyUserStarsDialogue from '../dialogues/ModifyUserStarsDialogue.svelte';

	export let id: number;
</script>

<AbstractModify {id} action="deletePlayer">
	<ModifyUserStarsDialogue {id} />
</AbstractModify>
