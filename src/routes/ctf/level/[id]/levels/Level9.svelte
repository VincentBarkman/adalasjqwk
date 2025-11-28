<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	export let submitFlag: (flag: string) => void;
	let flagInput = '';
</script>

<div class="space-y-4">
	<div>
		<h3 class="font-semibold mb-2">Utmaning: HTTP-headers</h3>
		<p class="text-muted-foreground">Kolla HTTP response headers från <code>/api/secret</code></p>
		<p class="text-sm text-muted-foreground mt-2">
			Öppna Developer Tools → Network → Besök endpointen → Kolla Response Headers
		</p>
	</div>
	<div class="space-y-2">
		<Label for="flag">Flagga</Label>
		<div class="flex gap-2">
			<Input
				id="flag"
				bind:value={flagInput}
				placeholder="XMAS&#123;...&#125;"
				class="font-mono"
				onkeydown={(e) => e.key === 'Enter' && submitFlag(flagInput)}
			/>
			<Button onclick={() => submitFlag(flagInput)}>Skicka</Button>
		</div>
	</div>
</div>
