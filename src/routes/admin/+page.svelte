<script lang="ts">
	import type { PageData, ActionData } from './$types';
    import '$lib/css/base.css';
    import '$lib/css/layout/forms.css';
    import '$lib/css/colours/carbon-colours.css';
    import ChooseItem from 'carbon-icons-svelte/lib/ChooseItem.svelte';
    import Home from "carbon-icons-svelte/lib/Home.svelte";

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
	<h2 class="subtitle medium">Chose an option:</h2>

	<div class="container">
		<div class="row">
			<div class="col-lg-4">
				<button class="cspp" on:click={() => (window.location.href = '/admin/events')}>
					Events
				</button>
			</div>

			<div class="col-lg-4">
				<button class="cspp" on:click={() => (window.location.href = '/admin/stages')}>
					Stages
				</button>
			</div>

			<div class="col-lg-4">
				<button class="cspp" on:click={() => alert('Puzzles are not complete.')}>
					Puzzles (WIP)
				</button>
			</div>

			<div class="col-lg-6">
				<button class="cspp" on:click={() => alert('Leaderboards are not complete.')}>
					Leaderboard (WIP)
				</button>
			</div>

			<div class="col-lg-6">
				<button class="cspp" on:click={() => alert('Overall is not complete!')}>
					Overall (WIP)
				</button>
			</div>
		</div>
	</div>

	<form method="post" class="nocss" action="?/logout">
		<button class="cspp" >
			Log Out
		</button>
	</form>
{/if}
