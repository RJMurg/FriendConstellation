<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Trash2 } from 'lucide-svelte';
	import Card from '../ui/card/card.svelte';

	export let id: number;
</script>

<Card class="mb-2 ml-2">
	<div class="flex flex-col items-center justify-between p-5">
		<form action="?/deletePlayer" method="POST" class="mb-5">
			<input type="hidden" name="id" value={id} />
			<Button type="submit" variant="destructive" class="text-red-500">
				<Trash2 class="h-6 w-6 text-white" />
			</Button>
		</form>

		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Modify Stars</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title class="dark">Modify Stars</Dialog.Title>
				</Dialog.Header>
				<form action="?/updateStars" method="POST">
					<input type="hidden" name="id" value={id} />
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Input name="stars" value="1" class="col-span-3 text-white" type="number" />
						</div>

						<div class="grid grid-cols-4 items-center gap-4">
							<Input
								name="log"
								placeholder="Why were the stars modified?"
								class="col-span-3 text-white"
							/>
						</div>
					</div>
					<Dialog.Footer>
						<Button type="submit">Modify</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</Card>
