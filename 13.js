/*

Hvert år greier naboen din å slå deg i årets juledekorasjon. Dette er noe du ikke finner deg i lengre og du har dermed gått drastisk til verks og kjøpt inn hundre millioner LED lys som er satt sammen i et 10.000x10.000 rutenett.

Julenissen har vært ganske snill med deg i år, så han har faktisk sendt deg de beste instruksjonene for hvordan å styre rutenettet med LED lys. Men hvordan fungerer virkelig dette?

LEDs i rutenettet ditt er nummerert fra 0 til 9999 i hvert retning, det vil si at hjørnene angis ved:
0,0 - øverst til venstre
0,9999 - nederst til venstre
9999,9999 - nederst til høyre
9999,0 - øverst til høyre
Instruksjonene har tre forskjellige måter å justere lysene på, "turn on", "turn off", "toggle" med koordinater for hvilke LEDs som skal endres.

Dette året skal du vinne konkurransen! For å greie dette trenger du kun å følge instruksjonene til julenissen og gjøre det i riktig rekkefølge.

Eksempler på hver linje av inputs:
turn on 0,0 through 9999,9999 kommer til å slå på (eller la de stå på) alle lys
toggle 0,0 through 9999,0 vil veksle første rad med 10000 lys
turn off 0,0 through 4999,4999 kommer til å slå av (eller la de være av) lysene i det rutenettet

Obs: Hvert koordinatpar representerer motsatt hjørne av et rektangel, som vil si at et par av koordinater 0,0 til 2,2 betyr 9 LEDs i et 3x3 firkant. Alle LEDs starter med å være slått av.

Eksempel på endring av lys:
Før endring:
0,0,0
0,0,0
0,0,0

turn on 0,0 through 1,1

Etter endring:
1,1,0
1,1,0
0,0,0

Etter å ha fulgt instruksjonene, hvor mange lys er på?
Input: http://pastebin.com/raw/aTeSBwR4



 */


const http = require('http');
const url = 'http://pastebin.com/raw/aTeSBwR4';
let lights = initArray();


http.get(url, res => {
		let data = '';
		res.on('data', buffer => data += buffer.toString('utf-8'));
		res.on('end', () => solve(data.split('\r\n')));
});

function initArray() {
	let arr = [];
	for(let i = 0; i < 10000; i++) {
		arr.push([]);
		for(let j = 0; j < 10000; j++) arr[i][j] = 0;
	}
	return arr;
}


function solve(data) {
	let lightsOn = 0;
	data.forEach(line => {
		let [input, type, i1, i2, j1, j2] = line.match(/(toggle|on|off) (\d+),(\d+) through (\d+),(\d+)/);
		let [x1, x2, y1, y2] = [i1, i2, j1, j2].map(Number);
		for(let i = x1; i <= y1; i++) {
			for(let j = x2; j <= y2; j++) {
				if(type === 'on') { lightsOn += (lights[i][j] === 0) ? 1 : 0; lights[i][j] = 1; }
				else if(type === 'off') { lightsOn -= (lights[i][j] === 1) ? 1 : 0; lights[i][j] = 0; }
				else {
					if(lights[i][j] === 0) { lights[i][j] = 1; lightsOn++; }
					else { lights[i][j] = 0; lightsOn--; }
				}
			}
		}
	});
	console.log(lightsOn);
}