<script lang="ts">
	import { parseStars } from '$lib';
	import { Star, StarHalf, Sparkle, Sparkles, Trophy } from 'lucide-svelte';

	export let stars: number = 0;
	export let size: number = 4;
	const starObject = parseStars(Math.abs(stars));

	let colour = 'text-yellow-500';
	let starSize = `h-${size} w-${size}`;

	if (stars < 0) {
		colour = 'text-red-500';
	}
</script>

<div class="flex flex-row items-center justify-center">
	{#each Array.from({ length: starObject.stars })}
		<Star class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.fiveStars })}
		<StarHalf class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.tenStars })}
		<Sparkle class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.fiftyStars })}
		<Sparkles class="{starSize} {colour}" />
	{/each}

	{#each Array.from({ length: starObject.hundredStars })}
		<Trophy class="{starSize} {colour}" />
	{/each}
</div>
