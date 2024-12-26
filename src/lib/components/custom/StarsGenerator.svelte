<script lang="ts">
	import { parseStars } from '$lib';
	import { Star, StarHalf, Sparkle, Sparkles, Trophy } from 'lucide-svelte';

	export let stars: number;
	const starObject = parseStars(stars);

	console.log(starObject);
</script>

<div class="flex flex-row items-center justify-center">
	{#each Array.from({ length: starObject.stars })}
		<Star class="h-4 w-4 text-yellow-500" />
	{/each}

	{#each Array.from({ length: starObject.fiveStars })}
		<StarHalf class="h-4 w-4 text-yellow-500" />
	{/each}

	{#each Array.from({ length: starObject.tenStars })}
		<Sparkle class="h-4 w-4 text-yellow-500" />
	{/each}

	{#each Array.from({ length: starObject.fiftyStars })}
		<Sparkles class="h-4 w-4 text-yellow-500" />
	{/each}

	{#each Array.from({ length: starObject.hundredStars })}
		<Trophy class="h-4 w-4 text-yellow-500" />
	{/each}
</div>
