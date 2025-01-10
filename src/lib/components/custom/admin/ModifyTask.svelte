<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	let { id, active, token } = $props();

	$effect(() => {
		fetch(`/api/toggleTask`, {
			method: 'POST',
			body: JSON.stringify({
				id,
				active,
				token
			})
		});
	});
</script>

<AbstractModify {id} action="deleteTask">
	<Switch bind:checked={active} />
</AbstractModify>
