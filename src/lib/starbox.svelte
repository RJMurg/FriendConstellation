<script lang="ts">
	import { TrophyFilled, Trophy, StarFilled, StarHalf, Star } from 'carbon-icons-svelte';

	let starBreakdown = {
		hundredStars: 0,
		fiftyStars: 0,
		tenStars: 0,
		fiveStars: 0,
		stars: 0,
		negative: false,
		total: 0
	};

	export let name = '';
	export let position = '0th';
	export let stars = starBreakdown;
</script>

<div class="starbox">
	<div class="positionbox">
		<h1 class="position">
			{position}
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
						<TrophyFilled fill="var(--yellow-500)" size={32} />
					{/each}
				{/if}
				{#if stars.fiftyStars >= 0}
					{#each Array(Number(stars.fiftyStars)) as _, i}
						<Trophy fill="var(--yellow-500)" size={32} />
					{/each}
				{/if}
				{#if stars.tenStars >= 0}
					{#each Array(Number(stars.tenStars)) as _, i}
						<StarFilled fill="var(--yellow-500)" size={32} />
					{/each}
				{/if}
				{#if stars.fiveStars >= 0}
					{#each Array(Number(stars.fiveStars)) as _, i}
						<StarHalf fill="var(--yellow-500)" size={32} />
					{/each}
				{/if}
				{#if stars.stars >= 0}
					{#each Array(Number(stars.stars)) as _, i}
						<Star fill="var(--yellow-500)" size={32} />
					{/each}
				{/if}
			{:else if stars.total < 0}
				{#if stars.hundredStars >= 0}
					{#each Array(Number(stars.hundredStars)) as _, i}
						<TrophyFilled fill="var(--red-500)" size={32} />
					{/each}
				{/if}
				{#if stars.fiftyStars >= 0}
					{#each Array(Number(stars.fiftyStars)) as _, i}
						<Trophy fill="var(--red-500)" size={32} />
					{/each}
				{/if}
				{#if stars.tenStars >= 0}
					{#each Array(Number(stars.tenStars)) as _, i}
						<StarFilled fill="var(--red-500)" size={32} />
					{/each}
				{/if}
				{#if stars.fiveStars >= 0}
					{#each Array(Number(stars.fiveStars)) as _, i}
						<StarHalf fill="var(--red-500)" size={32} />
					{/each}
				{/if}
				{#if stars.stars >= 0}
					{#each Array(Number(stars.stars)) as _, i}
						<Star fill="var(--red-500)" size={32} />
					{/each}
				{/if}
			{:else}
				<p>Unknown</p>
			{/if}
		</div>
	</div>
</div>
