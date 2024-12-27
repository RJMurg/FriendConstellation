<script lang="ts">
    import { ChevronRight, Trash2 } from 'lucide-svelte';
	import Card from '../ui/card/card.svelte';
	import Button from '../ui/button/button.svelte';
	import Input from '../ui/input/input.svelte';

    export let id: number;
</script>

<Card>
    <div class="flex flex-col items-center justify-between p-5">
        <form action="?/deletePlayer" method="POST">
            <input type="hidden" name="id" value="{id}" />
            <Button type="submit" variant="destructive" class="text-red-500">
                <Trash2 class="w-6 h-6 text-white" />
            </Button>
        </form>

        <form action="?/updateStars" method="POST" class="flex flex-row">
            <input type="hidden" name="id" value="{id}" />
            <Input type="number" name="stars" value="1" class="text-white" />
            <Button type="submit" variant="outline" class="text-white">
                <ChevronRight class="w-6 h-6 text-white" />
            </Button>
        </form>
    </div>
</Card>