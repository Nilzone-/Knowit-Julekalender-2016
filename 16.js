/*

Julenissen er glad i å leke med tall og å kombinere det med en gjettelek er alltid en slager. I dagens luke tenker han på et sekssifret tall hvor summen av sifrene er 43. Og hvor bare to av de tre påstandene under er sanne:
det er et kvadratisk tall
det er et kubisk tall
tallet er mindre enn 500 000

Hvilket tall er det Julenissen tenker på?

 */

for(let i = 199000; i <= 500000; i++) {
	if(Math.sqrt(i) % 1 === 0 && i.toString().split('').map(Number).reduce((a,b) => a+b) === 43) {
		console.log(i); break;
	}
}


