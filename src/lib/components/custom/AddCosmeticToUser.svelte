<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	let { id, cosmetics, token } = $props();
	let selected: any = $state(-999);
	let hasUserInteracted = $state(false); // Track user interaction

	function handleSelectionChange(value: number) {
		if (hasUserInteracted && value !== -999) {
			fetch(`/api/setCosmetic`, {
				method: 'POST',
				body: JSON.stringify({
					id,
					selected: value,
					token
				})
			});
		}
	}

	$effect(() => {
		if (selected !== -999) {
			handleSelectionChange(selected.value);
		}
	});
</script>

<Select.Root bind:selected on:change={() => (hasUserInteracted = true)}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a cosmetic" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Item value="-998" label="None" on:click={() => (hasUserInteracted = true)} />
			{#each cosmetics as cosmetic}
				<Select.Item
					value={cosmetic.id}
					label={cosmetic.name}
					on:click={() => (hasUserInteracted = true)}
				>
					{cosmetic.name}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="favoriteFruit" />
</Select.Root>
