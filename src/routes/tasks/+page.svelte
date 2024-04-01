<script lang="ts">
    import type { PageData } from './$types';
    import Taskbox from '$lib/taskbox.svelte';
    import { Theme, Button } from 'carbon-components-svelte';
    import { TrophyFilled, Trophy, StarFilled, StarHalf, Star, TaskStar, ChartClusterBar } from 'carbon-icons-svelte';
    import "carbon-components-svelte/css/all.css";
    import '$lib/css/carbon-colours.css';
    import '$lib/css/style.css';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>
        Starboard - Tasks
    </title>
</svelte:head>

<Theme theme="g100">
    <div class="header">
        <h1 class="title">
            Taskboard
        </h1>

        <div class="horizontal">
            <Button class="starboard-buttons" kind="primary" on:click={() => location.href="/tasks"}  data-sveltekit-preload-date="hover">
                <TaskStar size={16}/>
                <span class="button-span">Taskboard</span>
            </Button>

            <Button class="starboard-buttons" kind="secondary" on:click={() => location.href="/"}  data-sveltekit-preload-date="hover">
                <ChartClusterBar size={16}/>
                <span class="button-span">Starboard</span>
            </Button>
        </div>

        <h4>
            Send a photo or video of the relevant task once you have completed it
        </h4>

        <hr>
    </div>

    <div class="starlist">
        {#if data.tasks.length == 0}
            <div class="starbox">
                <div class="staree">
                    <h1 class="staree-name">
                        No tasks available yet...
                    </h1>
                </div>
            </div>
        {:else}
            {#each data.tasks as {title, description, reward}}
                <Taskbox
                    title={title}
                    description={description}
                    reward={reward}
                />
            {/each}
        {/if}
    </div>
</Theme>