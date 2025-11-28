<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	let leaderboardData: any[] = [];
	let loading = true;
	onMount(async () => {
		try {
			const response = await fetch('/api/leaderboard/daily-first');
			if (response.ok) {
				leaderboardData = await response.json();
			}
		} catch (error) {
			console.error('Error loading leaderboard:', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="container mx-auto p-4 max-w-6xl">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold">Leaderboard</h1>
		<Button variant="ghost" href="/ctf">← Tillbaka till CTF</Button>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Första att klara varje nivå (per dag)</Card.Title>
			<Card.Description
				>Visar vem som klarade varje nivå först på dess upplåsningsdag</Card.Description
			>
		</Card.Header>
		<Card.Content>
			{#if loading}
				<p class="text-muted-foreground">Laddar...</p>
			{:else if leaderboardData.length === 0}
				<p class="text-muted-foreground">Ingen har klarat några nivåer än.</p>
			{:else}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Nivå</Table.Head>
							<Table.Head>Användare</Table.Head>
							<Table.Head>Klarad</Table.Head>
							<Table.Head class="text-right">Tid</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each leaderboardData as entry}
							<Table.Row>
								<Table.Cell class="font-medium">Nivå {entry.level}</Table.Cell>
								<Table.Cell>{entry.userName}</Table.Cell>
								<Table.Cell>{new Date(entry.completedAt).toLocaleDateString('sv-SE')}</Table.Cell>
								<Table.Cell class="text-right"
									>{new Date(entry.completedAt).toLocaleTimeString('sv-SE')}</Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
