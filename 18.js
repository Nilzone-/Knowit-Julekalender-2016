/*

Du befinner deg i et rom der den eneste lyskilden er en gammel digital vekkerklokke (det er ingenting annet som gir lys i rommet enn denne). Sifrene på vekkerklokka er LEDs organisert i et såkalt 7-segments display. Klokkevisningen er på formatet hh:mm:ss, og er konfigurert opp til å vise klokkeslettet i 24 timersformat. Det første sifferet i timevisningen er blankt om tallet på timeplassen er mindre enn 10.

Anta at alle LEDene bidrar like mye til lysstyrken i rommet. Hvor lang tid går det fra rommet er på sitt mørkeste til det er på sitt lyseste? Svaret oppgis på formatet hh:mm:ss.

Eksempel: Tar dette 3 timer og 15 minutter og 3 sekunder blir svaret 03:15:03


 */

const m = { 0: 6, 1: 2, 2: 5, 3: 5, 4: 4, 5: 5, 6: 6, 7: 3, 8: 7, 9: 6 };

let lowerAnswer, lowerCount = 100;
let higherAnswer, higherCount = -100;

function pad(n) {
	return (n < 10) ? ('0' + n) : n;
}

function getRest(x, div, type) {
	switch (type) {
		case '/': return (x / div) - Math.floor(x / div);
		case '*': return (x * div) - Math.floor(x * div);
		default: break;
	}
}

function formatSeconds(x) {
	const hh = Math.floor(x / 3600), restHH = getRest(x, 3600, '/');
	const mi = Math.floor(restHH * 60), restMI = getRest(restHH, 60, '*');
	const sec = Math.round(restMI * 60);
	
	return hh + ':' + mi + ':' + sec;
}

for(let i = 0; i < 24; i++) {
	for(let j = 0; j < 60; j++) {
		for(let k = 0; k < 60; k++) {
			const clock = i + '' + pad(j) + '' + pad(k);
			const val = clock.split('').map(str => m[parseInt(str)]).reduce((a, b) => a+b);
			const seconds = i * 3600 + j * 60 + k;
			if(val < lowerCount) { lowerCount = val; lowerAnswer = seconds; }
			if(val > higherCount) { higherCount = val; higherAnswer = seconds; }
		}	
	}
}



console.log(formatSeconds(higherAnswer - lowerAnswer));
