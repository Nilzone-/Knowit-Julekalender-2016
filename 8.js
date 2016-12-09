/*

Stigespillet er et enkelt turbasert brettspill der to eller flere spillere beveger seg gjennom et brett for å komme fra start til mål. Den første spilleren som havner i den siste ruta har vunnet. For hver tur kaster en spiller en terning, og må bevege seg fremover like mange steg som terningen viser. Rutene på brettet er fylt med stiger som går oppover eller nedover. Hvis spilleren lander på en rute hvor en stige starter flyttes spilleren til ruta stigen peker på.

Anta et brett med 10 ganger 9 ruter og følgende sett med stiger: [(3,17), (8,10), (15,44), (22,5), (39,56), (49,75), (62,45), (64,19), (65,73), (80,12), (87,79]
Formatet på denne lista er par med ruter i formatet [(fra, til), (fra, til) ...]

Videre vil denne runden av stigespillet bestå av 1337 spillere. Disse spillerne kaster følgende terningkast: http://pastebin.com/raw/dJ7cT4AF  Spiller 1 bruker linje 1 som kast, spiller 2 bruker linje 2, osv.

- Alle spillere starter i felt 1.
- Målfeltet er felt 90.
- Man spiller etter tur, og roterer til spiller 1 når man har kommet rundt. Spiller 1, 2, 3 ... 1336, 1337, 1, 2 ... 
- Runden er over når en spiller havner på siste felt i brettet.
- Man må slå et nøyaktig antall for å komme til siste felt. Slår man for høyt flyttes ikke brikken og man fortsetter med neste spiller.

Svaret du skal frem til kan finnes når en spiller lander i siste feltet på brettet. Tallet er **det totale** antallet stiger som er brukt av alle spillere * nummeret på spilleren som vant.

Eksempelvis om spiller 3 vinner og det totale antallet stiger som ble brukt var 13 blir svaret: 39


 */ 


const http = require('http');
const url = 'http://pastebin.com/raw/dJ7cT4AF';

const map = {
	3: 17,
	8: 10,
	15: 44,
	22: 5,
	39: 56,
	49: 75,
	62: 45,
	64: 19,
	65: 73,
	80: 12,
	87: 79
};

http.get(url, function(res) {
	let data = '';
	res.on('data', buffer => data += buffer.toString());
	res.on('end', () => {
		solve(data.split('\r\n').map(str => parseInt(str)));
	});
});

function solve(data) {
	let players = {},
		ladders = 0,
		moves = 0;
	for (let i = 1; i <= data.length; i++) {
		let p = (i % 1337), dice = data[i-1];
		
		players[p] = (players[p] || 1) + dice;
		if(map[players[p]]) { players[p] = map[players[p]]; ladders++}
		
		if(players[p] === 90) {
			console.log('Player: ' + p + ' with a score of ' + (p * ladders));
			break;
		}
	}	
}


