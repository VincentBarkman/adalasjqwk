export const levels = [
	{
		id: '1',
		level: 1,
		title: 'Prologen: Tomtens Försvinnande',
		story:
			'Det är julafton och tomten har försvunnit! Hans verkstad är låst och ingen vet var han är. Du hittar en mystisk lapp med ett kodat meddelande...',
		challenge: 'Dekryptera meddelandet: SGFuc2VuIGFyIGkgZmFyYQ==',
		hint: 'Detta ser ut som Base64-kodning',
		flag: 'XMAS{Hansen_ar_i_fara}',
		unlocked: true,
		interactive: false
	},
	{
		id: '2',
		level: 2,
		title: 'Kapitel 1: Verkstadens Hemlighet',
		story:
			'Du lyckas öppna dörren till verkstaden! Inuti hittar du tomtens dator. På skärmen blinkar en konsol med texten: "console.secret"',
		challenge: 'Öppna Developer Console och skriv: window.secretFlag',
		hint: 'Tryck F12 och gå till Console-fliken. Skriv window.secretFlag',
		flag: 'XMAS{console_ninja}',
		unlocked: false
	},
	{
		id: '3',
		level: 3,
		title: 'Kapitel 2: Julklappslistan',
		story:
			'På datorn hittar du julklappslistan, men den är krypterad! Tomten älskar gamla chiffer. Du ser texten: KZNV{whyvnccfyvfgna_xencgrenq}',
		challenge: 'Dekryptera Caesar-chiffret (ROT13)',
		hint: 'Varje bokstav är förskjuten 13 steg i alfabetet',
		flag: 'XMAS{julklappslistan_krypterad}',
		unlocked: false
	},
	{
		id: '4',
		level: 4,
		title: 'Kapitel 3: Renarna Försvinner',
		story:
			'Plötsligt hör du ett ljud från stallet! Renarna är borta, men Rudolf har lämnat ett meddelande: 01010010 01100101 01101110 01100001 01110010 01101110 01100001',
		challenge: 'Vad säger Rudolfs binära meddelande?',
		hint: 'Konvertera binärt till ASCII-text',
		flag: 'XMAS{Renarna}',
		unlocked: false
	},
	{
		id: '5',
		level: 5,
		title: 'Kapitel 4: Snöstormens Gåta',
		story:
			'Du följer spåren ut i snön. En gammal älva ger dig en matematisk gåta: "Vad är 2^5 + 3^3 - 5?"',
		challenge: 'Beräkna: 2^5 + 3^3 - 5 = ?',
		hint: '2^5 = 32, 3^3 = 27',
		flag: 'XMAS{54}',
		unlocked: false
	},
	{
		id: '6',
		level: 6,
		title: 'Kapitel 5: Pepparkakshuset',
		story:
			'Spåren leder till ett mystiskt pepparkakshus. På dörren står det: "Reverse mig: }akakrappep{SAMX"',
		challenge: 'Vänd på texten',
		hint: 'Läs texten baklänges',
		flag: 'XMAS{pepparkaka}',
		unlocked: false
	},
	{
		id: '7',
		level: 7,
		title: 'Kapitel 6: Älvornas Kod',
		story: 'Inne i huset hittar du en bok med hex-kod: 58 4D 41 53 7B 68 65 78 5F 6D 61 67 69 7D',
		challenge: 'Konvertera hex till text',
		hint: 'Detta är hexadecimal kod. Använd en hex-to-ASCII konverterare',
		flag: 'XMAS{hex_magi}',
		unlocked: false
	},
	{
		id: '8',
		level: 8,
		title: 'Kapitel 7: Julsångens Kod',
		story: 'I databasen hittar du en inspelning! Morse-kod: .--- ..- .-.. ... .- -. --.',
		challenge: 'Dekryptera Morse-koden',
		hint: 'Använd en Morse-dekoder online',
		flag: 'XMAS{JULSANG}',
		unlocked: false
	},
	{
		id: '9',
		level: 9,
		title: 'Kapitel 8: Nordpolens Koordinater',
		story: 'Du hittar en karta med koordinater i URL-kodning: XMAS%7Bnordpol%5Fkoordinater%7D',
		challenge: 'Dekoda URL-kodningen',
		hint: 'URL-decode texten. %7B = {, %7D = }, %5F = _',
		flag: 'XMAS{nordpol_koordinater}',
		unlocked: false
	},
	{
		id: '10',
		level: 10,
		title: 'Kapitel 9: Isslottets Cipher',
		story: 'Du når isslottet! På dörren står: "Atbash cipher: CZNH{zgyzhs_xrksvi}"',
		challenge: 'Dekryptera Atbash-chiffret',
		hint: 'Atbash: A↔Z, B↔Y, C↔X... Använd en Atbash-dekoder',
		flag: 'XMAS{atbash_cipher}',
		unlocked: false
	},
	{
		id: '11',
		level: 11,
		title: 'Kapitel 10: Julstjärnans Kraft',
		story:
			'I slottets torn hittar du julstjärnan! Den kräver en MD5-hash: "5d41402abc4b2a76b9719d911017c592"',
		challenge: 'Vad är MD5-hashen för?',
		hint: 'Använd en MD5 reverse lookup. Det är ett vanligt ord...',
		flag: 'XMAS{hello}',
		unlocked: false
	},
	{
		id: '12',
		level: 12,
		title: 'Epilog: Tomten Räddad!',
		story:
			'Julstjärnan lyser upp himlen och tomten teleporteras tillbaka! Han var fångad av den onda Snömannen. Tack vare dig är julen räddad!',
		challenge: 'Slutflagga: XMAS{grattis_julhjälte}',
		hint: 'Du har redan vunnit!',
		flag: 'XMAS{grattis_julhjälte}',
		unlocked: false
	}
];
