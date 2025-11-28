<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	export let submitFlag: (flag: string) => void;
	let flagInput = '';
</script>

<div class="space-y-4">
	<div>
		<h3 class="font-semibold mb-2">Utmaning: MD5 Hash-crackning</h3>
		<p class="text-muted-foreground">Hitta det svaga lösenordet från denna MD5-hash:</p>
		<pre class="mt-2 p-2 bg-muted rounded text-xs">7ecc19e1a0be36ba2c6f05d06b5d3058</pre>
		<p class="text-sm text-muted-foreground mt-2">
			Prova vanliga svaga lösenord eller använd en online MD5-cracker.
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
