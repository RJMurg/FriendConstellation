<script lang="ts">
    import CosmeticCard from '$lib/components/custom/cards/CosmeticCard.svelte';
	import StarCard from '$lib/components/custom/cards/StarCard.svelte';
import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
    <CosmeticCard
        player="Bob"
        position={1}
        stars={1666}
        joint={false}
        showLogLink={true}
        hat="topHat.webp"
        card="bg-gradient-to-tr from-orange-700 to-yellow-700"
        animation="animate-pulsing repeat-infinite duration-1000"
    />

    <StarCard
        player="Alice"
        position={2}
        stars={1337}
        joint={true}
        showLogLink={true}
    />
</div>