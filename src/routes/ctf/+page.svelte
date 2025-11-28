<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	const UNLOCK_ALL_LEVELS = false;
	if (browser) {
		(window as any).secretFlag = 'XMAS{console_ninja}';
	}
	const session = authClient.useSession();
	$effect(() => {
		if (browser && !$session.data) {
			goto('/');
		}
	});
	async function loadProgress() {
		if (!browser) return {};
		try {
			const response = await fetch('/api/progress');
			if (response.ok) {
				const data = await response.json();
				const progressMap: Record<number, { completed: boolean }> = {};
				data.progress.forEach((p: any) => {
					progressMap[p.level] = { completed: p.completed };
				});
				return progressMap;
			}
		} catch (error) {
			console.error('Error loading progress:', error);
		}
		return {};
	}
	let levels = $state([
		{
			level: 1,
			title: 'Prologen: Tomtens Försvinnande',
			story:
				'Det är julafton och tomten har försvunnit! Hans verkstad är låst och ingen vet var han är. Du hittar en mystisk lapp med ett kodat meddelande...',
			challenge:
				'Dekryptera meddelandet: <code class="font-mono bg-white px-2 py-1 rounded">SGFuc2VuIGFyIGkgZmFyYQ==</code>',
			hint: 'Detta ser ut som Base64-kodning. Använd en online Base64-dekoder.',
			flag: 'XMAS{Hansen_ar_i_fara}',
			unlocked: true,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 2,
			title: 'Kapitel 1: Verkstadens Hemlighet',
			story:
				'Du lyckas öppna dörren till verkstaden! Inuti hittar du tomtens dator. På skärmen blinkar en konsol med texten: "console.secret"',
			challenge:
				'Öppna Developer Console (F12) och skriv: <code class="font-mono bg-white px-2 py-1 rounded">window.secretFlag</code>',
			hint: 'Tryck F12 och gå till Console-fliken. Skriv window.secretFlag och tryck Enter.',
			flag: 'XMAS{console_ninja}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 3,
			title: 'Kapitel 2: Julklappslistan',
			story:
				'På datorn hittar du julklappslistan, men den är krypterad! Tomten älskar gamla chiffer. Du ser texten: KZNV{whyvnccfyvfgna_xencgrenq}',
			challenge:
				'Dekryptera Caesar-chiffret (ROT13): <code class="font-mono bg-white px-2 py-1 rounded">KZNV{whyvnccfyvfgna_xencgrenq}</code>',
			hint: 'Varje bokstav är förskjuten 13 steg i alfabetet. Använd en ROT13-dekoder online.',
			flag: 'XMAS{julklappslistan_krypterad}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 4,
			title: 'Kapitel 3: Renarna Försvinner',
			story:
				'Plötsligt hör du ett ljud från stallet! Renarna är borta, men Rudolf har lämnat ett meddelande: 01010010 01100101 01101110 01100001 01110010 01101110 01100001',
			challenge:
				'Vad säger Rudolfs binära meddelande? <code class="font-mono bg-white px-2 py-1 rounded text-xs">01010010 01100101 01101110 01100001 01110010 01101110 01100001</code>',
			hint: 'Konvertera binärt till ASCII-text med en online-konverterare',
			flag: 'XMAS{Renarna}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 5,
			title: 'Kapitel 4: Snöstormens Gåta',
			story:
				'Du följer spåren ut i snön. En gammal älva ger dig en matematisk gåta: "Vad är 2^5 + 3^3 - 5?"',
			challenge:
				'Beräkna: <code class="font-mono bg-white px-2 py-1 rounded">2^5 + 3^3 - 5 = ?</code>',
			hint: '2^5 = 32, 3^3 = 27. Räkna ut: 32 + 27 - 5',
			flag: 'XMAS{54}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 6,
			title: 'Kapitel 5: Pepparkakshuset',
			story:
				'Spåren leder till ett mystiskt pepparkakshus. På dörren står det: "Reverse mig: }akakrappep{SAMX"',
			challenge:
				'Vänd på texten: <code class="font-mono bg-white px-2 py-1 rounded">}akakrappep{SAMX</code>',
			hint: 'Läs texten baklänges eller använd en text-reverse tool',
			flag: 'XMAS{pepparkaka}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 7,
			title: 'Kapitel 6: Älvornas Databas',
			story:
				'Inne i huset hittar du älvornas databas. Ett inloggningsformulär blockerar dig. Kan du komma förbi säkerheten?',
			challenge: 'Använd SQL injection för att logga in som admin',
			hint: "Prova: <code class='font-mono bg-white px-2 py-1 rounded'>admin' OR '1'='1</code> i användarnamn",
			flag: 'XMAS{sql_injection_master}',
			unlocked: false,
			completed: false,
			interactive: true,
			interactiveUrl: '/challenges/sql'
		},
		{
			level: 8,
			title: 'Kapitel 7: Kommentarsfältet',
			story:
				'Du hittar ett kommentarsfält där älvorna diskuterar julen. Systemet verkar osäkert...',
			challenge: 'Injicera JavaScript-kod i kommentarsfältet',
			hint: 'Prova: <code class="font-mono bg-white px-2 py-1 rounded">&lt;script&gt;alert(1)&lt;/script&gt;</code>',
			flag: 'XMAS{xss_hacker}',
			unlocked: false,
			completed: false,
			interactive: true,
			interactiveUrl: '/challenges/xss'
		},
		{
			level: 9,
			title: 'Kapitel 8: Hemliga Headers',
			story: 'Du hittar en API-endpoint: /api/secret. Men svaret verkar tomt...',
			challenge:
				'Kolla response headers från <code class="font-mono bg-white px-2 py-1 rounded">/api/secret</code>',
			hint: 'Använd Developer Tools > Network > Headers. Leta efter X-Secret-Flag',
			flag: 'XMAS{hidden_headers}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 10,
			title: 'Kapitel 9: Robots.txt Hemligheter',
			story: 'Du hittar en robots.txt fil. Vad gömmer sig där?',
			challenge:
				'Besök <code class="font-mono bg-white px-2 py-1 rounded">/api/robots.txt</code> och hitta flaggan',
			hint: 'robots.txt innehåller ofta hemlig information. Läs igenom hela filen.',
			flag: 'XMAS{robots_txt_secrets}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 11,
			title: 'Kapitel 10: JWT Token Manipulation',
			story: 'Du hittar ett JWT-baserat system. Kan du manipulera token för admin-access?',
			challenge: 'Manipulera JWT token för att få admin-rättigheter',
			hint: 'Dekoda base64, ändra <code class="font-mono bg-white px-2 py-1 rounded">role</code> till <code class="font-mono bg-white px-2 py-1 rounded">admin</code>, koda igen',
			flag: 'XMAS{jwt_manipulation}',
			unlocked: false,
			completed: false,
			interactive: true,
			interactiveUrl: '/challenges/jwt'
		},
		{
			level: 12,
			title: 'Kapitel 11: Caesar Cipher',
			story: 'Du hittar en gammal pergamentrulle med ett meddelande: "Wrod dv Fdhvdu!"',
			challenge:
				'Dekryptera Caesar-chiffret (shift 3): <code class="font-mono bg-white px-2 py-1 rounded">Wrod dv Fdhvdu!</code>',
			hint: 'Caesar cipher med shift 3. Varje bokstav är förskjuten 3 steg bakåt.',
			flag: 'XMAS{Time to Caesar}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 13,
			title: 'Kapitel 12: Directory Traversal',
			story: 'Du hittar en fil-läsare på servern. Kan du läsa filer utanför mappen?',
			challenge: 'Använd path traversal för att läsa känsliga filer',
			hint: 'Prova: <code class="font-mono bg-white px-2 py-1 rounded">../../etc/passwd</code> eller liknande',
			flag: 'XMAS{path_traversal}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 14,
			title: 'Kapitel 13: Command Injection',
			story: 'En ping-tjänst låter dig testa anslutningar. Verkar osäker...',
			challenge: 'Injicera kommandon i ping-tjänsten',
			hint: 'Prova: <code class="font-mono bg-white px-2 py-1 rounded">127.0.0.1; ls</code> eller <code class="font-mono bg-white px-2 py-1 rounded">127.0.0.1 && cat flag.txt</code>',
			flag: 'XMAS{command_injection}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 15,
			title: 'Kapitel 14: Weak Password',
			story: 'Ett admin-konto med svagt lösenord. Kan du gissa det?',
			challenge: 'Brute force eller gissa admin-lösenordet',
			hint: 'Vanliga lösenord: admin, password, 123456, christmas, santa...',
			flag: 'XMAS{weak_passwords}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 16,
			title: 'Kapitel 15: Cookie Manipulation',
			story: 'Du är inloggad som "user". Kan du bli "admin" genom att ändra cookies?',
			challenge: 'Manipulera cookie-värdet för att få admin-access',
			hint: 'Öppna Developer Tools > Application > Cookies och ändra role-cookien',
			flag: 'XMAS{cookie_monster}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 17,
			title: 'Kapitel 16: Local File Inclusion',
			story: 'En sida laddar templates dynamiskt. Kan du inkludera andra filer?',
			challenge: 'Använd LFI för att läsa känsliga filer',
			hint: 'Prova: <code class="font-mono bg-white px-2 py-1 rounded">?page=../../../flag</code>',
			flag: 'XMAS{local_file_inclusion}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 18,
			title: 'Kapitel 17: IDOR (Insecure Direct Object Reference)',
			story: 'Du kan se din profil på /user/1. Vad händer om du ändrar numret?',
			challenge: 'Få tillgång till andra användares data genom IDOR',
			hint: 'Prova olika user IDs: /user/2, /user/admin, etc.',
			flag: 'XMAS{idor_vulnerability}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 19,
			title: 'Kapitel 18: Open Redirect',
			story: 'En redirect-funktion verkar osäker. Kan du utnyttja den?',
			challenge: 'Hitta och utnyttja open redirect-sårbarheten',
			hint: 'Leta efter redirect-parametrar i URL:en',
			flag: 'XMAS{open_redirect}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 20,
			title: 'Kapitel 19: API Key Exposure',
			story: 'JavaScript-koden innehåller något intressant...',
			challenge: 'Hitta den exponerade API-nyckeln i källkoden',
			hint: 'Inspektera JavaScript-filer och leta efter API-nycklar',
			flag: 'XMAS{exposed_api_key}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 21,
			title: 'Kapitel 20: Race Condition',
			story: 'Ett kupong-system ger 100kr rabatt. Men bara en gång per användare...',
			challenge: 'Utnyttja race condition för att använda kupongen flera gånger',
			hint: 'Skicka flera requests samtidigt innan servern hinner validera',
			flag: 'XMAS{race_condition}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 22,
			title: 'Kapitel 21: XXE (XML External Entity)',
			story: 'En XML-parser accepterar användarinput. Kan du injicera externa entiteter?',
			challenge: 'Använd XXE för att läsa filer',
			hint: 'XML payload: <code class="font-mono bg-white px-2 py-1 rounded text-xs">&lt;!DOCTYPE foo [&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;]&gt;</code>',
			flag: 'XMAS{xxe_injection}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 23,
			title: 'Kapitel 22: SSRF (Server-Side Request Forgery)',
			story:
				'En URL-fetcher kan hämta innehåll från URLs. Kan du få den att hämta interna resurser?',
			challenge: 'Använd SSRF för att komma åt interna endpoints',
			hint: 'Prova: <code class="font-mono bg-white px-2 py-1 rounded">http://localhost/admin</code> eller <code class="font-mono bg-white px-2 py-1 rounded">http://127.0.0.1/secret</code>',
			flag: 'XMAS{ssrf_attack}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		},
		{
			level: 24,
			title: 'Epilog: Tomten Räddad!',
			story:
				'Grattis! Du har klarat alla 24 nivåer och räddat julen! Tomten är fri och alla presenter kan delas ut i tid. Du är en sann cybersäkerhetshjälte! 🎅🎄',
			challenge:
				'Slutflagga: <code class="font-mono bg-white px-2 py-1 rounded">XMAS{master_hacker_2024}</code>',
			hint: 'Du har redan vunnit! Skriv bara in flaggan för att fira din seger!',
			flag: 'XMAS{master_hacker_2024}',
			unlocked: false,
			completed: false,
			interactive: false,
			interactiveUrl: ''
		}
	]);
	let progressLoaded = $state(false);
	if (browser) {
		loadProgress().then((savedProgress) => {
			levels = levels.map((level) => {
				const saved = savedProgress[level.level];
				return {
					...level,
					completed: saved ? saved.completed : false
				};
			});
			progressLoaded = true;
		});
	}
	let unlockStatus = $state<Record<number, boolean>>({});
	async function loadUnlockStatus() {
		if (!browser) return;
		const promises = Array.from({ length: 24 }, (_, i) => i + 1).map(async (level) => {
			try {
				const response = await fetch(`/api/unlock-status?level=${level}`);
				if (response.ok) {
					const data = await response.json();
					return { level, unlocked: data.unlocked };
				}
			} catch (error) {
				console.error(`Error checking unlock status for level ${level}:`, error);
			}
			return { level, unlocked: false };
		});
		const results = await Promise.all(promises);
		const statusMap: Record<number, boolean> = {};
		results.forEach(({ level, unlocked }) => {
			statusMap[level] = unlocked;
		});
		unlockStatus = statusMap;
	}
	if (browser) {
		loadUnlockStatus();
	}
	function isLevelUnlocked(levelNum: number) {
		if (UNLOCK_ALL_LEVELS) return true;
		return unlockStatus[levelNum] || false;
	}
	function openLevel(level: (typeof levels)[0]) {
		if (level.completed) {
			return;
		}
		if (!isLevelUnlocked(level.level)) {
			return;
		}
		goto(`/ctf/level/${level.level}`);
	}
</script>

<div class="container mx-auto p-4">
	<div class="flex justify-end mb-4">
		<a href="/leaderboard" class="text-primary hover:underline">Leaderboard →</a>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-6 gap-2">
		{#each levels as level, i}
			{@const unlocked = isLevelUnlocked(level.level)}
			{@const completed = level.completed}
			<button
				onclick={() => openLevel(level)}
				disabled={!unlocked || completed}
				class="aspect-square flex items-center justify-center text-white font-bold text-3xl relative bg-primary hover:bg-primary/80 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{#if completed}
					<span class="absolute inset-0 flex items-center justify-center text-5xl">⭐</span>
				{:else if !unlocked}
					<span class="absolute inset-0 flex items-center justify-center text-4xl">🔒</span>
				{:else}
					{level.level}
				{/if}
			</button>
		{/each}
	</div>
</div>
