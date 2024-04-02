<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { TaskStar, ChartClusterBar } from 'carbon-icons-svelte';
	import 'carbon-components-svelte/css/all.css';
	import '$lib/css/carbon-colours.css';
	import '$lib/css/style.css';
	export let page = '';
</script>

{#if page == 'starboard'}
	<div class="horizontal">
		<Button
			class="starboard-buttons"
			kind="secondary"
			on:click={() => (page = 'taskboard')}
			data-sveltekit-preload-date="hover"
		>
			<TaskStar size={16} />
			<span class="button-span">Taskboard</span>
		</Button>

		<Button
			class="starboard-buttons"
			kind="primary"
			on:click={() => (page = 'starboard')}
			data-sveltekit-preload-date="hover"
		>
			<ChartClusterBar size={16} />
			<span class="button-span">Starboard</span>
		</Button>
	</div>
{:else if page == 'taskboard'}
	<div class="horizontal">
		<Button
			class="starboard-buttons"
			kind="primary"
			on:click={() => (page = 'taskboard')}
			data-sveltekit-preload-date="hover"
		>
			<TaskStar size={16} />
			<span class="button-span">Taskboard</span>
		</Button>

		<Button
			class="starboard-buttons"
			kind="secondary"
			on:click={() => (page = 'starboard')}
			data-sveltekit-preload-date="hover"
		>
			<ChartClusterBar size={16} />
			<span class="button-span">Starboard</span>
		</Button>
	</div>
{/if}
