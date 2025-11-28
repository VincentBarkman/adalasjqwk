<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	export let story: string;
	export let challenge: string;
	export let hint: string;
	export let onComplete: (flag: string) => void;
	export let interactive: boolean = false;
	export let interactiveUrl: string = '';
	let flagInput = '';
</script>

<div class="space-y-4">
	<div class="rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
		<p class="text-sm font-semibold text-blue-900 mb-2">📖 Berättelse:</p>
		<p class="text-blue-800">{story}</p>
	</div>
	<div class="rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
		<p class="text-sm font-semibold text-yellow-900 mb-2">🎯 Utmaning:</p>
		<p class="text-yellow-800">{@html challenge}</p>
		{#if interactive && interactiveUrl}
			<Button href={interactiveUrl} class="mt-3">Öppna utmaning →</Button>
		{/if}
	</div>
	<div class="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
		<p class="text-sm font-semibold text-green-900 mb-2">💡 Ledtråd:</p>
		<p class="text-green-800">{@html hint}</p>
	</div>
	<div class="space-y-2">
		<label for="flag" class="text-sm font-medium">Ange flagga:</label>
		<div class="flex gap-2">
			<Input
				id="flag"
				bind:value={flagInput}
				placeholder="XMAS&#123;...&#125;"
				class="font-mono"
				onkeydown={(e) => e.key === 'Enter' && onComplete(flagInput)}
			/>
			<Button onclick={() => onComplete(flagInput)}>Skicka</Button>
		</div>
	</div>
</div>
