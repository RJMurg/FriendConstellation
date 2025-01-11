<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

    let { id, cosmetics, token } = $props();

    $effect(() => {
		// fetch(`/api/setCosmetic`, {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		id,
		// 		selected,
		// 		token
		// 	})
		// });

	});

    let selected: any = $state('none');

</script>

<Select.Root bind:selected>
    <Select.Trigger class="w-[180px]">
      <Select.Value placeholder="Select a cosmetic" />
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        <Select.Item value="none" label="None" />
        {#each cosmetics as cosmetic}
          <Select.Item value={cosmetic.id} label={cosmetic.name}
            >{cosmetic.name}</Select.Item
          >
        {/each}
      </Select.Group>
    </Select.Content>
    <Select.Input name="favoriteFruit" />
  </Select.Root>