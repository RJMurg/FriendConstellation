<script lang="ts">
	import StarsGenerator from '$lib/components/custom/StarsGenerator.svelte';
    import Card from '$lib/components/ui/card/card.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="p-5 w-full h-screen">
    <Card class="flex flex-col w-full h-full">
        <div class="m-5 flex flex-col align-start items-start">
            <h1 class="text-2xl md:text-4xl font-bold">{data.player?.name}</h1>
            <StarsGenerator stars={data.player?.stars} size={8} />
        </div>

        {#each data.logs as log}
            <div class="ml-5 mb-2 flex flex-row items-end">
                <h1 class="text-xl md:text-2xl font-bold">{log.action}</h1>
                <p class="ml-5 text-md text-neutral-500">{log.timestamp}</p>
            </div>
        {/each}
    </Card>
</div>