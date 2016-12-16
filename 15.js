/*

Du er en gjeng på hytta som er lei av å spille alias og vri-åtter. En i gjengen foreslår at vi skal spille noe som heter Look-and-Say (her).

Spillet går ut på at en person velger en vilkårlig sekvens, som for eksempel 1131. En annen i gjengen skal lese tallet og skrive den nye sekvensen ut ifra måten det er sagt på høyt.

For å demonstrere eksempelet over, så leser du det første tallet høyt => to enere, en treer, en ener, som da blir => 211311. Grunnen til dette er at slike sekvenser er generert iterativt. Hvis det kommer flere tall etter hverandre, som 11 i tallet over, så teller man hvor mange av samme tall det er (2) og legger ved selve tallet (1) etterpå.

Eksempel:
3 => 13 (en 3er)
13 => 1113 (en 1er, en 3er)
1113 => 3113 (tre 1ere, en 3er)
3113 => 132113 (en 3er, to 1ere, en 3er)
132113 => 1113122113 (en 1er, en 3er, en 2er, to 1ere, en 3er) osv.
Du skal ta tallet 1111321112321111 som input og kjøre det 50 ganger! Hva er lengden (antall siffer) på det nye tallet?


 */

console.log([...Array(50)].reduce(n => n.match(/(\d)\1*/g).map(n => n.length + n[0]).join(''), '1111321112321111').length);
