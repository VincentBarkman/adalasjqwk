#!/bin/bash

# Create all 24 level files
for i in {3..24}; do
  cat > "src/routes/ctf/level/[id]/levels/Level${i}.svelte" << 'EOF'
<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	
	export let submitFlag: (flag: string) => void;
	
	let flagInput = '';
</script>

<div class="space-y-4">
	<div class="rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
		<p class="text-sm font-semibold text-blue-900 mb-2">📖 Berättelse:</p>
		<p class="text-blue-800">TODO: Add story for this level</p>
	</div>

	<div class="rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
		<p class="text-sm font-semibold text-yellow-900 mb-2">🎯 Utmaning:</p>
		<p class="text-yellow-800">TODO: Add challenge description</p>
	</div>

	<div class="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
		<p class="text-sm font-semibold text-green-900 mb-2">💡 Ledtråd:</p>
		<p class="text-green-800">TODO: Add hint</p>
	</div>

	<div class="space-y-2">
		<label for="flag" class="text-sm font-medium">Ange flagga:</label>
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
EOF
done

echo "Created 22 level template files (Level3.svelte to Level24.svelte)"
