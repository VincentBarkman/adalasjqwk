<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	let token = '';
	let result = '';
	let flag = '';
	let hint = '';
	onMount(async () => {
		const response = await fetch('/api/jwt');
		const data = await response.json();
		token = data.token;
		hint = data.hint;
	});
	async function verifyToken() {
		const response = await fetch('/api/jwt', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token })
		});
		const data = await response.json();
		result = data.message;
		flag = data.flag || '';
	}
</script>

<div class="container mx-auto max-w-2xl p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>🔑 JWT Token Challenge</Card.Title>
			<Card.Description>Manipulera token för admin-access</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div>
				<label for="token" class="text-sm font-medium">JWT Token:</label>
				<Input id="token" bind:value={token} placeholder="eyJ..." class="font-mono text-xs" />
			</div>
			<Button onclick={verifyToken} class="w-full">Verifiera Token</Button>
			{#if hint}
				<div class="rounded-lg bg-blue-50 p-3">
					<p class="text-sm text-blue-900">💡 {hint}</p>
				</div>
			{/if}
			{#if result}
				<div class="rounded-lg p-3 {flag ? 'bg-green-100' : 'bg-red-100'}">
					<p class="font-semibold">{result}</p>
					{#if flag}
						<p class="mt-2 font-mono text-green-700">{flag}</p>
					{/if}
				</div>
			{/if}
			<div class="text-xs text-muted-foreground space-y-1">
				<p>💡 Hint: Token är base64-encoded JSON</p>
				<p>💡 Dekoda, ändra role till "admin", och koda igen</p>
			</div>
		</Card.Content>
	</Card.Root>
</div>
