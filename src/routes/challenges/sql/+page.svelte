<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	let username = '';
	let password = '';
	let result = '';
	let query = '';
	let flag = '';
	async function attemptLogin() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		const data = await response.json();
		result = data.message;
		query = data.query;
		flag = data.flag || '';
	}
</script>

<div class="container mx-auto max-w-2xl p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>🔐 Älvornas Inloggning</Card.Title>
			<Card.Description>Logga in som admin för att få flaggan</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div>
				<label for="username" class="text-sm font-medium">Användarnamn:</label>
				<Input id="username" bind:value={username} placeholder="admin" />
			</div>
			<div>
				<label for="password" class="text-sm font-medium">Lösenord:</label>
				<Input id="password" type="password" bind:value={password} placeholder="password" />
			</div>
			<Button onclick={attemptLogin} class="w-full">Logga in</Button>
			{#if query}
				<div class="rounded-lg bg-gray-100 p-3">
					<p class="text-xs font-mono text-gray-700">SQL Query:</p>
					<p class="text-xs font-mono">{query}</p>
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
			<div class="text-xs text-muted-foreground">
				<p>💡 Hint: Försök med SQL injection...</p>
			</div>
		</Card.Content>
	</Card.Root>
</div>
