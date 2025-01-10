<script lang="ts">
	import AbstractModify from './AbstractModify.svelte';

	export let id: number;
</script>

<AbstractModify {id} action="deleteWebhook" />
