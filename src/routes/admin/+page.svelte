<script lang="ts">
	import type { PageData, ActionData } from './$types';
    import '$lib/css/base.css';
    import '$lib/css/layout/forms.css';
    import '$lib/css/colours/carbon-colours.css';
    import { TrophyFilled, Trophy, StarFilled, StarHalf, Star, Home, ChooseItem, TrashCan, AddAlt, Send } from 'carbon-icons-svelte';

	export let form: ActionData;
	export let data: PageData;
	export let LoggedIn = false;

	if (form == null) {
		if (data.status == 200) {
			LoggedIn = true;
		} else if (data.status == 500) {
			LoggedIn = false;
		} else {
			LoggedIn = false;
		}
	} else {
		if (form?.status == 200) {
			LoggedIn = true;
		} else if (form?.status == 500) {
			LoggedIn = false;
		}
	}
</script>

{#if LoggedIn == false}
	<h2 class="subtitle medium">Please enter the Administrator Password:</h2>
	<form method="POST" action="?/login">
		<input type="password" name="password" class="form-medium" placeholder="Password" />
        <div class="form-buttons">
            <button class="form-element" type="submit">
                <ChooseItem size={32} />
            </button>
            <button class="form-element" type="button" on:click={() => (window.location.href = '/')}>
                <Home size={32} />
            </button>
        </div>
	</form>
{:else}
    <div class="header">
        <div class="form-buttons">
            <form method="post" action="?/logout">
                <button class="cspp" >
                    Log Out
                </button>
            </form>

            <form method="post" action="?/addPerson">
                <input type="text" id="name" name="name">
                <button type="submit" >
                    Send
                </button>
            </form>
        </div>
    </div>
    
    <div class="starlist">
        {#each data.starboard as {id, name, stars}, i}
            <div class="starbox">
                <div class="positionbox">
                    <h1 class="title medium">
                        {i + 1}
                    </h1>
                </div>
                <div class="staree">
                    <h1 class="staree-name">
                        {name} -
                        {#if stars.total < 0}
                            <span style="color: var(--red-500);">
                                {stars.total}
                            </span>
                        {:else}
                            <span>
                                {stars.total}
                            </span>
                        {/if}
                    </h1>
    
                    <div class="staree-stars">
                        {#if stars.total >= 0}
                            {#if stars.hundredStars >= 0}
                                {#each Array(Number(stars.hundredStars)) as _, i}
                                    <TrophyFilled fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiftyStars >= 0}
                                {#each Array(Number(stars.fiftyStars)) as _, i}
                                    <Trophy fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.tenStars >= 0}
                                {#each Array(Number(stars.tenStars)) as _, i}
                                    <StarFilled fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiveStars >= 0}
                                {#each Array(Number(stars.fiveStars)) as _, i}
                                    <StarHalf fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.stars >= 0}
                                {#each Array(Number(stars.stars)) as _, i}
                                    <Star fill="var(--yellow-500)" size={32}/>
                                {/each}
                            {/if}
                        {:else if stars.total < 0}
                            {#if stars.hundredStars >= 0}
                                {#each Array(Number(stars.hundredStars)) as _, i}
                                    <TrophyFilled fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiftyStars >= 0}
                                {#each Array(Number(stars.fiftyStars)) as _, i}
                                    <Trophy fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.tenStars >= 0}
                                {#each Array(Number(stars.tenStars)) as _, i}
                                    <StarFilled fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.fiveStars >= 0}
                                {#each Array(Number(stars.fiveStars)) as _, i}
                                    <StarHalf fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                            {#if stars.stars >= 0}
                                {#each Array(Number(stars.stars)) as _, i}
                                    <Star fill="var(--red-500)" size={32}/>
                                {/each}
                            {/if}
                        {:else}
                            <p>Unknown</p>
                        {/if}
                    </div>
                </div>

                <div class="admin-actions">
                    <form method="POST" action="?/deletePerson">
                        <input type="hidden" name="id" value="{id}">
                        <button>
                            <TrashCan fill="var(--red-500)" size={16}/>
                        </button>
                    </form>

                    <form  method="POST" action="?/updatePerson">
                        <input type="hidden" name="id" value="{id}">
                        <input type="text" inputmode="numeric" pattern="[-0-9]*" id="stars" name="stars">
                        <button>
                            <Send fill="var(--green-500)" size={16}/>
                        </button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
{/if}
