<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	export let onComplete: (flag: string) => void;
	let flagInput = '';
</script>

<div class="space-y-4">
	<div class="rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
		<p class="text-sm font-semibold text-blue-900 mb-2">📖 Berättelse:</p>
		<p class="text-blue-800">
			Du lyckas öppna dörren till verkstaden! Inuti hittar du tomtens dator. På skärmen blinkar en
			konsol med texten: "console.secret"
		</p>
	</div>
	<div class="rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
		<p class="text-sm font-semibold text-yellow-900 mb-2">🎯 Utmaning:</p>
		<p class="text-yellow-800">
			Öppna Developer Console (F12) och skriv: <code class="font-mono bg-white px-2 py-1 rounded"
				>window.secretFlag</code
			>
		</p>
	</div>
	<div class="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
		<p class="text-sm font-semibold text-green-900 mb-2">💡 Ledtråd:</p>
		<p class="text-green-800">
			Tryck F12 och gå till Console-fliken. Skriv window.secretFlag och tryck Enter.
		</p>
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
