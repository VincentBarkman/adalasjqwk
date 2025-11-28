<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	const UNLOCK_ALL_LEVELS = false;
	const levelId = parseInt($page.params.id || '1');
	let LevelComponent: any = null;
	let message = '';
	let isLevelAccessible = false;
	const levels = [
		{ level: 1, title: 'Base64-avkodning', flag: 'XMAS{base64_decoded}' },
		{ level: 2, title: 'Konsol-hemligheter', flag: 'XMAS{console_ninja}' },
		{ level: 3, title: 'ROT13-chiffer', flag: 'XMAS{rot13_cracked}' },
		{ level: 4, title: 'Binärt till ASCII', flag: 'XMAS{binary_master}' },
		{ level: 5, title: 'Matte-utmaning', flag: 'XMAS{54}' },
		{ level: 6, title: 'Sträng-reversering', flag: 'XMAS{reversed}' },
		{ level: 7, title: 'SQL-injektion', flag: 'XMAS{sql_injection_master}' },
		{ level: 8, title: 'XSS-attack', flag: 'XMAS{xss_hacker}' },
		{ level: 9, title: 'HTTP-headers', flag: 'XMAS{hidden_headers}' },
		{ level: 10, title: 'Robots.txt', flag: 'XMAS{robots_txt_secrets}' },
		{ level: 11, title: 'JWT-manipulation', flag: 'XMAS{jwt_manipulation}' },
		{ level: 12, title: 'Caesar-chiffer', flag: 'XMAS{caesar_shift}' },
		{ level: 13, title: 'Hex-avkodning', flag: 'XMAS{path_traversal}' },
		{ level: 14, title: 'URL-avkodning', flag: 'XMAS{command_injection}' },
		{ level: 15, title: 'MD5 Hash-crackning', flag: 'XMAS{weak_passwords}' },
		{ level: 16, title: 'Atbash-chiffer', flag: 'XMAS{cookie_monster}' },
		{ level: 17, title: 'ASCII-värden', flag: 'XMAS{local_file_inclusion}' },
		{ level: 18, title: 'Vigenère-chiffer', flag: 'XMAS{idor_vulnerability}' },
		{ level: 19, title: 'Oktal-avkodning', flag: 'XMAS{open_redirect}' },
		{ level: 20, title: 'Substitutionschiffer', flag: 'XMAS{exposed_api_key}' },
		{ level: 21, title: 'Morsekod', flag: 'XMAS{race_condition}' },
		{ level: 22, title: 'Bacon-chiffer', flag: 'XMAS{xxe_injection}' },
		{ level: 23, title: 'Rail Fence-chiffer', flag: 'XMAS{ssrf_attack}' },
		{ level: 24, title: 'Slutlig utmaning', flag: 'XMAS{master_hacker_2024}' }
	];
	const currentLevel = levels.find((l) => l.level === levelId);
	if (!currentLevel) {
		goto('/ctf');
	}
	async function checkLevelAccess() {
		if (!browser) return;
		if (UNLOCK_ALL_LEVELS) {
			isLevelAccessible = true;
			return;
		}
		try {
			const response = await fetch(`/api/unlock-status?level=${levelId}`);
			if (response.ok) {
				const data = await response.json();
				if (data.unlocked) {
					isLevelAccessible = true;
					return;
				}
			}
		} catch (error) {
			console.error('Error checking unlock status:', error);
		}
		if (!isLevelAccessible) {
			goto('/ctf');
		}
	}
	if (browser) {
		checkLevelAccess();
	}
	async function submitFlag(flagInput: string) {
		if (!currentLevel) return;
		const normalizeFlag = (flag: string) => flag.trim().toUpperCase().replace(/\s+/g, '_');
		if (normalizeFlag(flagInput) === normalizeFlag(currentLevel.flag)) {
			message = '✅ Rätt! Nivån klarad!';
			if (browser) {
				await fetch('/api/progress', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ level: levelId, completed: true })
				});
			}
			setTimeout(() => {
				goto('/ctf');
			}, 2000);
		} else {
			message = '❌ Fel flagga! Försök igen.';
		}
	}
	if (browser) {
		import(`./levels/Level${levelId}.svelte`)
			.then((module) => {
				LevelComponent = module.default;
			})
			.catch(() => {
				console.log('No specific component for level', levelId);
			});
	}
</script>

{#if isLevelAccessible}
	<div class="container mx-auto p-4 max-w-3xl">
		<Button variant="ghost" href="/ctf" class="mb-4">← Tillbaka till kalendern</Button>
		<Card.Root>
			<Card.Header>
				<Card.Title>Nivå {levelId}: {currentLevel?.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if LevelComponent}
					<svelte:component this={LevelComponent} {submitFlag} />
				{:else}
					<p class="text-muted-foreground">Laddar nivå...</p>
				{/if}
				{#if message}
					<Alert.Root class="mt-4" variant={message.includes('✅') ? 'default' : 'destructive'}>
						<Alert.Description>
							{message}
						</Alert.Description>
					</Alert.Root>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<div class="container mx-auto p-4 max-w-3xl">
		<Button variant="ghost" href="/ctf" class="mb-4">← Tillbaka till kalendern</Button>
		<Card.Root>
			<Card.Content class="pt-6">
				<p class="text-muted-foreground">Kontrollerar åtkomst...</p>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
