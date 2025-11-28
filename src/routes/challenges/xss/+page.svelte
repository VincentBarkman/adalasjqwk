<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	let comment = '';
	let comments: string[] = [];
	let flag = '';
	let message = '';
	onMount(async () => {
		await loadComments();
	});
	async function loadComments() {
		const response = await fetch('/api/comment');
		const data = await response.json();
		comments = data.comments;
	}
	async function postComment() {
		const response = await fetch('/api/comment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment })
		});
		const data = await response.json();
		message = data.message;
		flag = data.flag || '';
		comment = '';
		await loadComments();
	}
</script>

<div class="container mx-auto max-w-2xl p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>💬 Julkommentarer</Card.Title>
			<Card.Description>Lämna en kommentar om julen!</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div>
				<label for="comment" class="text-sm font-medium">Din kommentar:</label>
				<Input
					id="comment"
					bind:value={comment}
					placeholder="God Jul!"
					onkeydown={(e) => e.key === 'Enter' && postComment()}
				/>
			</div>
			<Button onclick={postComment} class="w-full">Skicka kommentar</Button>
			{#if message}
				<div class="rounded-lg p-3 {flag ? 'bg-green-100' : 'bg-blue-100'}">
					<p class="font-semibold">{message}</p>
					{#if flag}
						<p class="mt-2 font-mono text-green-700">{flag}</p>
					{/if}
				</div>
			{/if}
			<div class="space-y-2">
				<h3 class="font-semibold">Kommentarer:</h3>
				{#each comments as c}
					<div class="rounded border p-2 text-sm">
						{c}
					</div>
				{/each}
			</div>
			<div class="text-xs text-muted-foreground">
				<p>💡 Hint: Kan du injicera JavaScript-kod?</p>
			</div>
		</Card.Content>
	</Card.Root>
</div>
