<script lang="ts">
	import StarCard from '$lib/components/custom/StarCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<StarCard player="Bob" position={1} stars={500} />
<StarCard player="Bob" position={2} stars={150} />
<StarCard player="Bob" position={3} stars={50} />
<StarCard player="Bob" position={4} stars={25} />
<StarCard player="Bob" position={5} stars={10} />
<StarCard player="Bob" position={6} stars={5} />
<StarCard player="Bob" position={7} stars={4} />
<StarCard player="Bob" position={8} stars={3} />
<StarCard player="Bob" position={9} stars={1} />
