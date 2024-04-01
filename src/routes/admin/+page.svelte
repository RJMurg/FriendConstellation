<script lang="ts">
	import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import Starbox from '$lib/starbox.svelte';
    import AdminControls from '$lib/adminControls.svelte';
    import "carbon-components-svelte/css/all.css";
    import '$lib/css/carbon-colours.css';
    import '$lib/css/style.css';
    import { Star, Home, ChooseItem, TrashCan, AddAlt, Send, Logout } from 'carbon-icons-svelte';
    import { Theme, Button, TextInput, NumberInput, PasswordInput } from 'carbon-components-svelte';

	export let form: ActionData;
	export let data: PageData;
	export let LoggedIn = false;

    if(data.loggedIn){
        LoggedIn = true;
    }

    $: if(form?.status == 200){
        LoggedIn = true;
    }

    $: if(form?.status == 500){
        LoggedIn = false;
    }
</script>

<svelte:head>
    <title>Starboard - Admin</title>
</svelte:head>

<Theme theme="g100">

    {#if !LoggedIn}
        <div>
            <h3>Please enter the Administrator Password:</h3>
            <form method="post" action="?/login" use:enhance>
                <PasswordInput name="password" placeholder="Enter the password..." required/>
            </form>
        </div>
    {:else}
        <div class="commandmodal horizontal">
            <form method="post" action="?/logout" use:enhance>
                <Button icon={Logout} kind="secondary" type="submit" style="width: 100%;">
                Logout
                </Button>
            </form>

            <form method="post" class="horizontal" action="?/addPerson" use:enhance>
                <TextInput size="xl" name="name" placeholder="Enter a name"/>
                <Button icon={AddAlt} type="submit"/>
            </form>
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
                {#each data.starboard as {id, name, stars, position}}
                    <div class="horizontal">
                        <Starbox
                            name={name}
                            position={position}
                            stars={stars}
                        />

                        <AdminControls
                            id={id}
                            name={name}
                        />
                    </div>
                {/each}
            {/if}
        </div>
    {/if}

</Theme>