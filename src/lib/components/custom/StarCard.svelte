<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
    import { stringifyPosition } from '$lib';
    import { Crown, Equal } from 'lucide-svelte';
	import StarsGenerator from './StarsGenerator.svelte';

	export let player: string;
	export let position: number;
	export let stars: number;
</script>

<Card class="w-full mb-2 p-2">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="ml-5 w-1/4 font-mono text-2xl" id="Position">
            {stringifyPosition(position)}
        </div>

		<div class="flex w-3/4 flex-col items-start" id="Player">
			<h1 class="text-4xl font-bold flex flex-row items-center">
                {#if position === 1}
                    <Crown class="w-8 h-8 mr-5 text-yellow-500" />
                {/if}

                {player}
            </h1>

            <div class="flex flex-row">
                <StarsGenerator {stars}/>
                
                {#if stars > 1}
                    - {stars} stars
                {:else}
                    - {stars} star
                {/if}
            </div>
		</div>
	</div>
</Card>
