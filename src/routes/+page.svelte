<script lang="ts">
    import type { PageData } from './$types';
    import Starbox from '$lib/starbox.svelte';
    import { Theme, Button } from 'carbon-components-svelte';
    import { TrophyFilled, Trophy, StarFilled, StarHalf, Star, TaskStar, ChartClusterBar } from 'carbon-icons-svelte';
    import "carbon-components-svelte/css/all.css";
    import '$lib/css/carbon-colours.css';
    import '$lib/css/style.css';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>
        Starboard
    </title>
</svelte:head>

<Theme theme="g100">
    <div class="header">
        <h1 class="title">
            Starboard
        </h1>

        <div class="horizontal">
            <Button class="starboard-buttons" kind="secondary" on:click={() => location.href="/tasks"}>
                <TaskStar size={16}/>
                <span class="button-span">Taskboard</span>
            </Button>

            <Button class="starboard-buttons" kind="primary" on:click={() => location.href="/"}>
                <ChartClusterBar size={16}/>
                <span class="button-span">Starboard</span>
            </Button>
        </div>

        <hr>

        <div class="horizontal">
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
            {#each data.starboard as {name, stars, position}}
                <Starbox
                    name={name}
                    position={position}
                    stars={stars}
                />
            {/each}
        {/if}
    </div>
</Theme>