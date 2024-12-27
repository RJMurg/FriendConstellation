<script lang="ts">
	import ModifyUser from '$lib/components/custom/ModifyUser.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<ModifyUser id="1" />