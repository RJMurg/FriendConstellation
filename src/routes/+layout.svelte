<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="dark flex min-h-screen w-full flex-col items-center justify-center bg-black text-white">
	{@render children()}
</div>
