<script lang="ts">
	import { parseStars } from '$lib';
	import { Star, StarHalf, Sparkle, Sparkles, Trophy } from 'lucide-svelte';

	export let stars: number;
	const starObject = parseStars(Math.abs(stars));
	let colour = 'text-yellow-500';

	if (stars < 0) {
		colour = 'text-red-500';
	}
</script>

<div class="flex flex-row items-center justify-center">
	{#each Array.from({ length: starObject.stars })}
		<Star class="h-4 w-4 {colour}" />
	{/each}

	{#each Array.from({ length: starObject.fiveStars })}
		<StarHalf class="h-4 w-4 {colour}" />
	{/each}

	{#each Array.from({ length: starObject.tenStars })}
		<Sparkle class="h-4 w-4 {colour}" />
	{/each}

	{#each Array.from({ length: starObject.fiftyStars })}
		<Sparkles class="h-4 w-4 {colour}" />
	{/each}

	{#each Array.from({ length: starObject.hundredStars })}
		<Trophy class="h-4 w-4 {colour}" />
	{/each}
</div>
