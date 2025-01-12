<script lang="ts">
	import { parseStars } from '$lib';
	import { Star, StarHalf, Sparkle, Sparkles, Trophy } from 'lucide-svelte';

	let { stars, size = 4 }: { stars: number; size: number } = $props();

	const starObject = parseStars(Math.abs(stars));

	let colour = $state('text-yellow-500');
	let starSize = `h-${size} w-${size}`;

	if (stars < 0) {
		colour = 'text-red-500';
	}
</script>

<div class="flex flex-row items-center justify-center">
	{#each Array.from({ length: starObject.hundredStars }) as _}
		<Trophy class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.fiftyStars }) as _}
		<Sparkles class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.fiveStars }) as _}
		<StarHalf class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.tenStars }) as _}
		<Sparkle class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.stars }) as _}
		<Star class="{starSize} {colour}" />
	{/each}
</div>
