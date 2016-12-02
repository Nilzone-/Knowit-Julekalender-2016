/*

Fibonaccirekken er en tallrekke som genereres ved at man adderer de to foregående tallene i rekken. f.eks. om man starter med 1 og 2 blir de første 10 termene 1, 1, 2, 3, 5, 8, 13, 21, 34 og 55 

Finn summen av alle partall i denne rekken som er mindre enn 4.000.000.000

*/


(function() {
	var a = 1, b = 1, c = 1, sum = 0;

	while (a < 4000000000) {
		if ((a & 1) === 0) sum += a;
		c = a;
		a = b;
		b = c + b;
	}

	console.log(sum);
})();

