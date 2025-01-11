<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';

	export let title: string;
	export let description = '';
	export let trigger: string;
	export let action: string;
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + "mb-2"}>
		{trigger}
	</Dialog.Trigger>

	<Dialog.Content class="h-fit overflow-y-scroll sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title class="dark">{title}</Dialog.Title>
			<Dialog.Description>{description}</Dialog.Description>
		</Dialog.Header>

		<form action="?/{action}" method="POST">
			<div class="grid gap-4 py-4">
				<slot />
				<Dialog.Footer>
					<Button type="submit">Submit</Button>
				</Dialog.Footer>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
