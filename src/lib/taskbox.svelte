<script lang="ts">
    import { TrophyFilled, Trophy, StarFilled, StarHalf, Star} from 'carbon-icons-svelte';

    let starBreakdown = {
        hundredStars: 0,
        fiftyStars: 0,
        tenStars: 0,
        fiveStars: 0,
        stars: 0,
        negative: false,
        total: 0
    };

	export let title = '';
    export let description = '';
    export let reward = starBreakdown;
</script>

<div class="starbox">
    <div class="staree">
        <h1 class="staree-name">
            {title}: Up to
            {#if reward.total < 0}
                <span style="color: var(--red-500);">
                    {reward.total}
                </span>
            {:else}
                <span>
                    {reward.total}
                </span>
            {/if}

            {#if reward.total == 1 || reward.total == -1}
                star
            {:else}
                stars
            {/if}
        </h1>

        <p>
            {description}
        </p>

        <div class="staree-stars">
            {#if reward.total >= 0}
                {#if reward.hundredStars >= 0}
                    {#each Array(Number(reward.hundredStars)) as _, i}
                        <TrophyFilled fill="var(--yellow-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.fiftyStars >= 0}
                    {#each Array(Number(reward.fiftyStars)) as _, i}
                        <Trophy fill="var(--yellow-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.tenStars >= 0}
                    {#each Array(Number(reward.tenStars)) as _, i}
                        <StarFilled fill="var(--yellow-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.fiveStars >= 0}
                    {#each Array(Number(reward.fiveStars)) as _, i}
                        <StarHalf fill="var(--yellow-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.stars >= 0}
                    {#each Array(Number(reward.stars)) as _, i}
                        <Star fill="var(--yellow-500)" size={32}/>
                    {/each}
                {/if}
            {:else if reward.total < 0}
                {#if reward.hundredStars >= 0}
                    {#each Array(Number(reward.hundredStars)) as _, i}
                        <TrophyFilled fill="var(--red-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.fiftyStars >= 0}
                    {#each Array(Number(reward.fiftyStars)) as _, i}
                        <Trophy fill="var(--red-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.tenStars >= 0}
                    {#each Array(Number(reward.tenStars)) as _, i}
                        <StarFilled fill="var(--red-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.fiveStars >= 0}
                    {#each Array(Number(reward.fiveStars)) as _, i}
                        <StarHalf fill="var(--red-500)" size={32}/>
                    {/each}
                {/if}
                {#if reward.stars >= 0}
                    {#each Array(Number(reward.stars)) as _, i}
                        <Star fill="var(--red-500)" size={32}/>
                    {/each}
                {/if}
            {:else}
                <p>Unknown</p>
            {/if}
        </div>
    </div>
</div>