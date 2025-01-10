<script lang="ts">
	import AbstractCard from '$lib/components/custom/cards/AbstractCard.svelte';
import EmptyCard from '$lib/components/custom/cards/EmptyCard.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<EmptyCard message="peanits"/>