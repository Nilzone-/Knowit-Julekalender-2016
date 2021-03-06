/*

Som alle vet ligger vi an til et nytt Y2K i 2038. Da vil mange datostempel basert på unix epoch begynne å overflowe en standard 32 bit integer.

Unix epoch er definert som antallet sekunder siden 1970-01-01T00:00:00Z. Dette er en dato i formatet ISO 8601, du kan lese mer om dette her: https://en.wikipedia.org/wiki/ISO_8601

Her i Knowit er vi veldig interessert i å vite hva som skjer når det er en time ekstra i døgnet. Derfor lurer vi på når vi overflower en integerverdi hvis vi regner med at alle døgn siden starten av unix epoch hadde hatt 25 timer i stedet for 24.

Vi bruker den gregorianske kalenderen for oppgaven, og hvis det må gjøres antakelser om historikk og formater kan du ta utgangspunkt i historikk fra den norske kalenderen.

Svaret skal oppgis som et datostempel i samme format (og tidssone) som unix epoch er oppgitt ovenfor.


 */


const maxInt = Math.pow(2, 31) - 1;
const hours25inSeconds = 90000;

const days = (maxInt / hours25inSeconds),
    hours = (days - Math.floor(days)) * 25,
    minutes = (hours - Math.floor(hours)) * 60,
    seconds = (minutes - Math.floor(minutes)) * 60;

let d = new Date(0);

d.setUTCDate(Math.round(days));
d.setUTCHours(hours);
d.setUTCMinutes(minutes);
d.setUTCSeconds(seconds);

console.log(d.toISOString().replace(/\.000Z/g, 'Z'));