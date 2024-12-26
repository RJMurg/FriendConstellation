<script lang="ts">
	import { parseStars } from '$lib';
    import { Star, StarHalf, Sparkle, Sparkles, Trophy } from 'lucide-svelte';

    export let stars: number;
    const starObject = parseStars(stars);

    console.log(starObject)
</script>

<div class="flex flex-row items-center justify-center">

    {#each Array.from({ length: starObject.stars }) as _, i}
        <Star class="w-4 h-4 text-yellow-500" />
    {/each}

    {#each Array.from({ length: starObject.fiveStars }) as _, i}
        <StarHalf class="w-4 h-4 text-yellow-500" />
    {/each}

    {#each Array.from({ length: starObject.tenStars }) as _, i}
        <Sparkle class="w-4 h-4 text-yellow-500" />
    {/each}

    {#each Array.from({ length: starObject.fiftyStars }) as _, i}
        <Sparkles class="w-4 h-4 text-yellow-500" />
    {/each}

    {#each Array.from({ length: starObject.hundredStars }) as _, i}
        <Trophy class="w-4 h-4 text-yellow-500" />
    {/each}
</div>