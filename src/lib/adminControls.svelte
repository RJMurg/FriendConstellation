<script lang="ts">
    import { enhance } from '$app/forms';
    import { TrashCan, Send } from 'carbon-icons-svelte';
    import { Button, TextInput } from 'carbon-components-svelte';

    export let id = 0;
    export let name = "";
</script>

<div class="controlbox">
    <form method="post" action="?/deletePerson" use:enhance>
        <input type="hidden" name="id" value={id}>
        <Button kind="danger" class="controlbox-buttons" type="submit">
            <TrashCan size={32}/>
        </Button>
    </form>

    <form method="post" action="?/updatePerson" use:enhance>
        <div class="horizontal">
            <input type="hidden" name="id" value={id}>
            <TextInput size="xl" name="stars"/>
            <Button icon={Send} type="submit"/>
        </div>
    </form>
</div>