<script lang="ts">
	import { enhance } from '$app/forms';
	import { TrashCan, Send } from 'carbon-icons-svelte';
	import { Button, TextInput } from 'carbon-components-svelte';

	export let id = 0;
</script>

<div class="controlbox">
	<form method="post" action="?/deleteTask" use:enhance>
		<input type="hidden" name="id" value={id} />
		<Button kind="danger" class="controlbox-buttons" type="submit">
			<TrashCan size={32} />
		</Button>
	</form>
</div>
