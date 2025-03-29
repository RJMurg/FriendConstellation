<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let playersButtonVariant: buttonTypes = 'default';
	export let tasksButtonVariant: buttonTypes = 'secondary';
	export let webhooksButtonVariant: buttonTypes = 'secondary';
	export let tamperButtonVariant: buttonTypes = 'secondary';
	export let cosmeticButtonVariant: buttonTypes = 'secondary';
	export let gameButtonVariant: buttonTypes = 'secondary';
	export let page: string = 'players';
</script>

<div class="hidden flex-row md:flex">
	<Button variant={playersButtonVariant} on:click={() => (page = 'players')} class="mr-2">
		Champions
	</Button>

	<Button variant={tasksButtonVariant} on:click={() => (page = 'tasks')} class="mr-2">Tasks</Button>

	<Button variant={webhooksButtonVariant} on:click={() => (page = 'webhooks')} class="mr-2">
		Webhooks
	</Button>

	<Button variant={tamperButtonVariant} on:click={() => (page = 'tamper')} class="mr-2">
		Tamper Messages
	</Button>

	<Button variant={cosmeticButtonVariant} on:click={() => (page = 'cosmetics')} class="mr-2">
		Cosmetics
	</Button>

	<Button variant={gameButtonVariant} on:click={() => (page = 'game')} class="mr-2">
		Game Settings
	</Button>

	<form action="?/logout" method="POST">
		<Button variant="destructive" type="submit">Log out</Button>
	</form>
</div>

<Sheet.Root>
	<Sheet.Trigger class="absolute left-0 top-0 md:hidden">
		<Menu class="m-4 h-8 w-8" />
	</Sheet.Trigger>
	<Sheet.Content side="left" class="dark">
		<div class="mt-10 flex flex-col justify-center text-center">
			<Button variant={playersButtonVariant} on:click={() => (page = 'players')} class="mb-2">
				Champions
			</Button>

			<Button variant={tasksButtonVariant} on:click={() => (page = 'tasks')} class="mb-2">
				Tasks
			</Button>

			<Button variant={webhooksButtonVariant} on:click={() => (page = 'webhooks')} class="mb-2">
				Webhooks
			</Button>

			<Button variant={tamperButtonVariant} on:click={() => (page = 'tamper')} class="mb-2">
				Tamper Messages
			</Button>

			<Button variant={cosmeticButtonVariant} on:click={() => (page = 'cosmetics')} class="mb-2">
				Cosmetics
			</Button>

			<form action="?/logout" method="POST">
				<Button variant="destructive" type="submit" class="w-full">Log out</Button>
			</form>
		</div>
	</Sheet.Content>
</Sheet.Root>
