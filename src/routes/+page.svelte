<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import Details from '$lib/details.json';
</script>

<h1
	class="absolute top-0 flex w-full flex-row items-center justify-center text-center text-4xl font-bold md:text-6xl"
>
	<img src="favicon.webp" alt="Starboard logo" class="mr-5 w-16" />
	{Details.title}
	<img src="favicon.webp" alt="Starboard logo" class="ml-5 w-16" />
</h1>

<Card>
	<h2 class="text-2xl font-bold">Welcome to Starboard!</h2>
	<p class="text-lg">
		Starboard is a simple, lightweight, and fast URL shortener. It's designed to be easy to use and
		easy to deploy.
	</p>
</Card>
