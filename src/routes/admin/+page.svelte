<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/ui/input/input.svelte';
    import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { PageData } from './$types';
	import { ChevronRight } from 'lucide-svelte';
	import EmptyCard from '$lib/components/custom/EmptyCard.svelte';
	import StarCard from '$lib/components/custom/StarCard.svelte';
	import ModifyUser from '$lib/components/custom/ModifyUser.svelte';

    let { data, form } = $props();

    let loggedIn = data.loggedIn;
    let players = $state(data.players ?? []);
    let tasks = $state(data.tasks);
    let page = "players";

    if(form){
        loggedIn = form.attemptSuccessful;
        players = form.players ?? [];
        tasks = form.tasks;
    }

</script>

{#if !data.loggedIn}
    <h1 class="text-4xl font-bold text-center mb-5">Admin Login</h1>
    <form action="?/login" method="post" use:enhance class="flex w-full max-w-sm items-center space-x-2">
        <Input type="password" name="password" placeholder="Enter admin password" />
        <Button type="submit">
            <ChevronRight class=""/>
        </Button>
    </form>
{:else}
    {#if page == "players"}
        <h1 class="text-4xl font-bold text-center mb-2">Champions</h1>
        <Dialog.Root>
            <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " mb-2"}
              >Add Champion</Dialog.Trigger
            >
            <Dialog.Content class="sm:max-w-[425px]">
              <Dialog.Header>
                <Dialog.Title class="dark">Add Champion</Dialog.Title>
                <Dialog.Description>
                  Add a Champion to the Starboard.
                </Dialog.Description>
              </Dialog.Header>
                <form action="?/addPlayer" method="POST">
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Input name="name" placeholder="Champion Name" class="col-span-3 text-white" />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Input name="stars" value="1" class="col-span-3 text-white" type="number" />
                  </div>
                </div>
                <Dialog.Footer>
                  <Button type="submit">Add</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        <div class="w-full md:w-1/3 mx-auto px-5 md:px-0">
            {#if (players ?? []).length == 0}
                <EmptyCard message="No champions have been added." />
            {:else}
                {#each players ?? [] as player, i}
                  <div class="flex flex-row">
                      <StarCard
                          player={player.name}
                          position={i + 1}
                          stars={player.stars}
                      />

                      <ModifyUser id={player.id} />
                    </div>
                {/each}
            {/if}
        </div>
    {:else if page == "tasks"}
    {/if}
{/if}