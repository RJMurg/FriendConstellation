<script lang="ts">
	import MessageCard from '$lib/components/custom/MessageCard.svelte';
	import NotFoundMessageCard from '$lib/components/custom/NotFoundMessageCard.svelte';
	import UnopenedMessageCard from '$lib/components/custom/UnopenedMessageCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto mt-32 w-full px-2 md:w-1/2 md:px-0">
	{#if data.exists}
		{#if data.opened}
			<MessageCard
				title={data.message.title}
				message={data.message.message}
				opened={data.message.opened}
				uuid={data.message.uuid}
				timestamp={data.message.timestamp ?? new Date()}
			/>
		{:else}
			<UnopenedMessageCard uuid={data.uuid} />
		{/if}
	{:else}
		<NotFoundMessageCard />
	{/if}
</div>
