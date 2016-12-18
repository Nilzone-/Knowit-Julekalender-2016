/*

Du befinner deg i et rom der den eneste lyskilden er en gammel digital vekkerklokke (det er ingenting annet som gir lys i rommet enn denne). 
Sifrene på vekkerklokka er LEDs organisert i et såkalt 7-segments display. 
Klokkevisningen er på formatet hh:mm:ss, og er konfigurert opp til å vise klokkeslettet i 24 timersformat. 
Det første sifferet i timevisningen er blankt om tallet på timeplassen er mindre enn 10.

Anta at alle LEDene bidrar like mye til lysstyrken i rommet. Hvor lang tid går det fra rommet er på sitt mørkeste til det er på sitt lyseste? Svaret oppgis på formatet hh:mm:ss.

Eksempel: Tar dette 3 timer og 15 minutter og 3 sekunder blir svaret 03:15:03


 */

const m = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6 ];
const pad = n => (n < 10) ? ('0' + n) : n;

const result = [...Array(24*60*60)]
	.map((u, i) => { 
		let a = [];
		const d = new Date();
		d.setUTCSeconds(i);
		const hh = d.getHours(), mi = pad(d.getMinutes()), sec = pad(d.getSeconds());
		let clock = hh + '' + mi + '' + sec;
		a.push(hh * 3600 + d.getMinutes() * 60 + d.getSeconds(), clock.split('').map(s => m[s]).reduce((a, b) => a+b));
		return a;
	})
	.sort((a, b) => b[1] - a[1]);

	
const totalSec = result[0][0] - result[result.length - 1][0];
const hours = parseInt(totalSec / 3600) % 24;
const minutes = parseInt(totalSec / 60) % 60;
const seconds = totalSec % 60;

console.log(hours + ':' + minutes + ':' + seconds);
