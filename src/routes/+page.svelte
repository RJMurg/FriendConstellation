<script lang="ts">
    import type { PageData } from './$types';
    import StarFilled from 'carbon-icons-svelte/lib/StarFilled.svelte';
    import Infinity from 'carbon-icons-svelte/lib/Infinity.svelte';
    import '$lib/css/base.css';
    import '$lib/css/colours/carbon-colours.css';
	import { LogicalPartition, StarReview } from 'carbon-icons-svelte';
    
    export let data: PageData;
</script>

<div class="header">
    <h1 class="title large">
        Ruán's Starboard
    </h1>
</div>

<div class="starlist">
    {#each data.starboard as {name, stars}, i}
        <div class="starbox">
            <div class="positionbox">
                <h1 class="title medium">
                    {i + 1}
                </h1>
            </div>
            <div class="staree">
                <h1 class="staree-name">
                    {name}
                </h1>

                <div class="staree-stars">
                    {#if stars >= 0}
                        {#if stars >= 40}
                            <Infinity fill="var(--yellow-500)" size={32}/>
                        {:else}
                            {#each Array(Number(stars)) as _, i}
                                <StarFilled fill="var(--yellow-500)" size={32}/>
                            {/each}
                        {/if}
                    {:else if stars < 0}
                        {#if stars >= -40}
                            {#each Array(Number(stars) + (-2 * Number(stars))) as _}
                                <StarFilled fill="var(--red-500)" size={32}/>
                            {/each}
                        {:else}
                            <Infinity fill="var(--red-500)" size={32}/>
                        {/if}
                    {:else}
                        <p>Unknown</p>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
</div>
