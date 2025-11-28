# CTF Nivåer - Struktur

## 📁 Filstruktur

Varje nivå har sin egen Svelte-komponent:

```
src/routes/ctf/level/[id]/
├── +page.svelte          # Huvudsida som laddar rätt nivå
└── levels/
    ├── Level1.svelte     # Nivå 1: Base64
    ├── Level2.svelte     # Nivå 2: Console Secrets
    ├── Level3.svelte     # Nivå 3: ROT13
    ├── Level7.svelte     # Nivå 7: SQL Injection
    └── ... (Level3-24)   # Resten av nivåerna
```

## 🎯 Hur det fungerar

### 1. Adventskalender (`/ctf`)

- Visar 24 rutor i ett grid
- Luckor öppnas baserat på december-datum
- Klicka på en lucka → navigerar till `/ctf/level/[nummer]`

### 2. Nivåsida (`/ctf/level/[id]/+page.svelte`)

- Dynamisk route som tar emot nivå-ID
- Laddar rätt `Level[X].svelte` komponent
- Hanterar flagg-submission
- Sparar progress till databas
- Navigerar tillbaka till kalendern efter korrekt svar

### 3. Nivå-komponenter (`levels/Level[X].svelte`)

- Varje nivå är en separat Svelte-fil
- Kan anpassas helt fritt med egen logik
- Får `submitFlag` funktion som prop
- Kan vara enkel text-utmaning eller komplex interaktiv

## ✏️ Skapa/Redigera en nivå

### Enkel nivå (text-baserad):

```svelte
<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	export let submitFlag: (flag: string) => void;
	let flagInput = '';
</script>

<div class="space-y-4">
	<!-- Berättelse -->
	<div class="rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
		<p class="text-sm font-semibold text-blue-900 mb-2">📖 Berättelse:</p>
		<p class="text-blue-800">Din story här...</p>
	</div>

	<!-- Utmaning -->
	<div class="rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
		<p class="text-sm font-semibold text-yellow-900 mb-2">🎯 Utmaning:</p>
		<p class="text-yellow-800">Din utmaning här...</p>
	</div>

	<!-- Ledtråd -->
	<div class="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
		<p class="text-sm font-semibold text-green-900 mb-2">💡 Ledtråd:</p>
		<p class="text-green-800">Din hint här...</p>
	</div>

	<!-- Flagg-input -->
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
```

### Interaktiv nivå (med extern sida):

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	export let submitFlag: (flag: string) => void;
</script>

<div class="space-y-4">
	<!-- Story, Challenge, Hint... -->

	<!-- Länk till interaktiv utmaning -->
	<Button href="/challenges/sql" class="mt-3">Öppna SQL Challenge →</Button>

	<!-- Instruktion -->
	<div class="rounded-lg bg-purple-50 p-4 border-l-4 border-purple-500">
		<p class="text-sm font-semibold text-purple-900 mb-2">🎁 När du har fått flaggan:</p>
		<p class="text-purple-800">Kopiera flaggan och klistra in den här.</p>
	</div>
</div>
```

### Nivå med egen logik:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	export let submitFlag: (flag: string) => void;

	let secretValue = '';

	onMount(() => {
		// Sätt window-variabel, manipulera DOM, etc.
		(window as any).secretFlag = 'XMAS{secret}';
	});
</script>

<!-- Din custom UI här -->
```

## 🔧 Flaggor

Alla flaggor definieras i `/ctf/level/[id]/+page.svelte`:

```typescript
const levels = [
	{ level: 1, title: '...', flag: 'XMAS{Hansen_ar_i_fara}' },
	{ level: 2, title: '...', flag: 'XMAS{console_ninja}' }
	// ...
];
```

## 📅 Datum-upplåsning

Nivåer öppnas automatiskt baserat på december-datum:

- Nivå 1 öppnas 1 december
- Nivå 2 öppnas 2 december
- osv.

För att låsa upp alla (development):

- Klicka på "🔒 Lås upp alla" knappen i kalendern

## 💾 Progress

- Sparas automatiskt i databasen när en nivå klaras
- Laddas när användaren besöker `/ctf`
- Synkas mellan enheter (samma användare)

## 🎨 Anpassa

Du kan göra varje nivå helt unik:

- Egen layout
- Interaktiva element
- API-anrop
- Canvas/WebGL
- Spel
- Allt som Svelte kan göra!

Bara se till att kalla `submitFlag(flagInput)` när användaren ska skicka in sitt svar.
