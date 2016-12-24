/*

I regnearkprogrammer er ofte kolonner angitt ved strenger bestående av bokstavene A til Z. Kolonnenummer 1 er angitt med bokstaven A, 2 er B osv. Flere, og mer komplekse eksempler:

1 -> A
2 -> B
3 -> C
…
26 -> Z
27 -> AA
28 -> AB
...
52 -> AZ
53 -> BA
...
79 -> CA

Hva blir kolonnetittelen på kolonne nummer 90101894?

*/

const n = 90101894;
const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function solve(n) {
	n--;
	if (n >= 0 && n < 26) return a[n];
	return solve(Math.floor(n / 26)) + solve(n % 26 + 1);
}

console.log(solve(n));