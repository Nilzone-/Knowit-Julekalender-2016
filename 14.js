/*

I påvente av hva som kan skje når Trump inntar presidentstolen, har Knowit begynt å regne på noen passende mot-tiltak. Den amerikanske regjeringen har allerede utredet mulighetene for å bygge en Death Star, og selv om Obama-administrasjonen sa nei til The Death Star Petition i 2012 så tror vi det er meget sannsynlig at Trump kommer til å bestille en. Energien i strålen fra en Death Star må nå ca 2.25 * 10^32 J for å ødelegge jorden [Boulderstone et al. 2011].

Knowits ingeniører har funnet ut at for å stoppe dette trenger vi en legering bestående av et partall antall metaller. Det kan maks være 16 metaller med i legeringen. Metallene det er snakk om er for øyeblikket ikke kjent for andre enn forskerne i Area 51 og oss i Knowit. Dere kan kalle dem metall-1, metall-2 osv opp til metall-16.

Metallene har en planet-killer-motstandskraft lik tallet opphøyd i seg selv (så metall 1 har en motstandskraft på 1, metall 16 har en motstandskraft på 16^16. Motstandskraften til en legering er produktet av kraften til metallene som er med i legeringen.

Så legeringen bestående av metall-2 og metall-4 vil ha en motstandskraft lik produktet av motstanden i metall-2 og metall-4. Det blir (2^2) * (4^4), eller 4*256 = 1024.

Finn metallene i den legeringen som har mostandskraft høyere enn energien som skal til for å ødelegge jorden, hvor summen av fakultetsverdiene av nummrene på metallene i legeringen er lavest mulig. For eksempel, om kandidatene er legeringen bestående av metall 13 og 14, eller metall 11 og 15, så må du sammenligne 13!+14! med 11!+15! og velge legeringen med lavest resultat.

Svaret vi er ute etter er numrene på metallene som er med i legeringen konkatenert i stigende rekkefølge (ikke i kommaseparert liste).

Eksempel: viser det seg at alt du trenger er elementene 1 og 16 i legeringen blir svaret 116.



 */


const deathStar = 2.25 * Math.pow(10, 32);
const metals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

console.log(combine(metals, 1)
  .filter(arr => product(arr) > deathStar && arr.length % 2 == 0)
  .sort((a, b) => factorial(a) - factorial(b))[0].join(''));

function product(arr) {
  let product = 1;
  for(let i = 0; i < arr.length; i++) product *= Math.pow(arr[i], arr[i]); 
  return product;
}

function factorial(arr) {
  let fct = 1;
  let f = function(n) {
    if(n <= 1) return 1;
    return n * f(n-1);
  }

  for(let i = 0; i < arr.length; i++) fct += f(arr[i]);
  return fct;
}

function combine(a, min) {
  let fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) all[all.length] = got;
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  
  let all = [];
  for (var i = min; i < a.length; i++) fn(i, a, [], all);
  
  all.push(a);
  return all;
}
