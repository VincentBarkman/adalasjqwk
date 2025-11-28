<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	export let onComplete: (flag: string) => void;
	let flagInput = '';
	let message = '';
	function submit() {
		onComplete(flagInput);
	}
</script>

<div class="space-y-4">
	<div class="rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
		<p class="text-sm font-semibold text-blue-900 mb-2">📖 Berättelse:</p>
		<p class="text-blue-800">
			Det är julafton och tomten har försvunnit! Hans verkstad är låst och ingen vet var han är. Du
			hittar en mystisk lapp med ett kodat meddelande...
		</p>
	</div>
	<div class="rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
		<p class="text-sm font-semibold text-yellow-900 mb-2">🎯 Utmaning:</p>
		<p class="text-yellow-800">
			Dekryptera meddelandet: <code class="font-mono bg-white px-2 py-1 rounded"
				>SGFuc2VuIGFyIGkgZmFyYQ==</code
			>
		</p>
	</div>
	<div class="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
		<p class="text-sm font-semibold text-green-900 mb-2">💡 Ledtråd:</p>
		<p class="text-green-800">Detta ser ut som Base64-kodning. Använd en online Base64-dekoder.</p>
	</div>
	<div class="space-y-2">
		<label for="flag" class="text-sm font-medium">Ange flagga:</label>
		<div class="flex gap-2">
			<Input
				id="flag"
				bind:value={flagInput}
				placeholder="XMAS&#123;...&#125;"
				class="font-mono"
				onkeydown={(e) => e.key === 'Enter' && submit()}
			/>
			<Button onclick={submit}>Skicka</Button>
		</div>
	</div>
</div>
