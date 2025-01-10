<script lang="ts">
	import AbstractCard from './AbstractCard.svelte';

	export let title: string;
	export let message: string;
	export let opened: boolean = false;
	export let uuid: string;
	export let timestamp: Date;
	export let showLink: boolean = false;

	const link = '/tamper/' + uuid;
	let openedMessage = 'Not opened';

	if (opened) {
		const dateString = timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString();
		openedMessage = 'Opened at ' + dateString;
	}
</script>

<AbstractCard>
	<div class="flex w-full flex-col items-start" id="Message">
		<h1 class="flex items-center justify-center text-2xl font-bold lg:text-4xl">
			{title} <span class="ml-5 h-full text-xl font-normal">{openedMessage}</span>
		</h1>

		<p>
			{message}
		</p>

		{#if showLink}
			<a href={link} class="text-blue-500"> Link to Message </a>
		{/if}
	</div>
</AbstractCard>