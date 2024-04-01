<script lang="ts">
    import type { PageData } from './$types';
    import { TrophyFilled, Trophy, StarFilled, StarHalf, Star } from 'carbon-icons-svelte';
    import '$lib/css/base.css';
    import '$lib/css/colours/carbon-colours.css';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>
        Starboard
    </title>
</svelte:head>

<div class="header">
    <h1 class="title large">
        Ruán's Starboard
    </h1>
    <div class="key">
        <div>
            <TrophyFilled fill="var(--yellow-500)"/> = 100 Stars
        </div>

        <div>
            <Trophy fill="var(--yellow-500)"/> = 50 Stars
        </div>

        <div>
            <StarFilled fill="var(--yellow-500)"/> = 10 Stars
        </div>

        <div>
            <StarHalf fill="var(--yellow-500)"/> = 5 Stars
        </div>

        <div>
            <Star fill="var(--yellow-500)"/> = 1 Star
        </div>
    </div>

    <h2 class="subtitle small nogap">
        All red icons are <span style="color: var(--red-500);">negative</span>
    </h2>
</div>

<div class="starlist">
    {#if data.starboard.length == 0}
        <div class="starbox">
            <div class="staree">
                <h1 class="staree-name">
                    No people on starboard...
                </h1>
            </div>
        </div>
    {:else}
        {#each data.starboard as {name, stars}, i}
            <div class="starbox">
                <div class="positionbox">
                    <h1 class="title medium">
                        {i + 1}
                    </h1>

                </div>
                <div class="staree">
                    <h1 class="staree-name">
                        {name}:
                        {#if stars.total < 0}
                            <span style="color: var(--red-500);">
                                {stars.total}
                            </span>
                        {:else}
                            <span>
                                {stars.total}
                            </span>
                        {/if}

                        {#if stars.total == 1 || stars.total == -1}
                            star
                        {:else}
                            stars
                        {/if}
                    </h1>

                    <div class="staree-stars">
                        {#if stars.total >= 0}
                            {#if stars.hundredStars >= 0}
                                {#each Array(Number(stars.hundredStars)) as _, i}
                                    <TrophyFilled fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiftyStars >= 0}
                                {#each Array(Number(stars.fiftyStars)) as _, i}
                                    <Trophy fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.tenStars >= 0}
                                {#each Array(Number(stars.tenStars)) as _, i}
                                    <StarFilled fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiveStars >= 0}
                                {#each Array(Number(stars.fiveStars)) as _, i}
                                    <StarHalf fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.stars >= 0}
                                {#each Array(Number(stars.stars)) as _, i}
                                    <Star fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                        {:else if stars.total < 0}
                            {#if stars.hundredStars >= 0}
                                {#each Array(Number(stars.hundredStars)) as _, i}
                                    <TrophyFilled fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiftyStars >= 0}
                                {#each Array(Number(stars.fiftyStars)) as _, i}
                                    <Trophy fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.tenStars >= 0}
                                {#each Array(Number(stars.tenStars)) as _, i}
                                    <StarFilled fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiveStars >= 0}
                                {#each Array(Number(stars.fiveStars)) as _, i}
                                    <StarHalf fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.stars >= 0}
                                {#each Array(Number(stars.stars)) as _, i}
                                    <Star fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                        {:else}
                            <p>Unknown</p>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    {/if}
</div>
