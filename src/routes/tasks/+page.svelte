<script lang="ts">
    import type { PageData } from './$types';
    import { TrophyFilled, Trophy, StarFilled, StarHalf, Star, TaskStar, ChartClusterBar, ChartCustom } from 'carbon-icons-svelte';
    import '$lib/css/base.css';
    import '$lib/css/layout/forms.css';
    import '$lib/css/colours/carbon-colours.css';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>
        Starboard - Tasks
    </title>
</svelte:head>

<div class="header">
    <h1 class="title large">
        Ruán's Taskboard
    </h1>

    <div class="key nogap">
        <button on:click={() => location.href="/tasks"}>
            <TaskStar size={16}  fill="var(--green-500)"/>
            Taskboard
        </button>

        <button on:click={() => location.href="/"}>
            <ChartClusterBar size={16}/>
            Starboard
        </button>
    </div>


    <div class="key">
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
    {#if data.tasks.length == 0}
        <div class="starbox">
            <div class="staree">
                <h1 class="staree-name">
                    No tasks to claim
                </h1>
            </div>
        </div>
    {:else}
        
    {/if}
</div>
