/*

En skøyen alv har gjemt pakkene til nissen og julaften står i fare! Alven etterlot seg et kart over med et rødt kryss midt på finnmarksvidda med tekst 'start here'. På baksiden av kartet er det instruksjoner som sier hvor du skal gå fra krysset. Du har fått som oppgave å hjelpe nissen med å finne pakkene og redde julaften.

Skattekartet har veldig mange steg, men du ser kjapt at det bare består av 4 forskjellige instruksjoner, å gå x antall meter nord (north), sør (south), øst (east), eller vest (west). Du bestemmer deg for å lage et program som samler disse stegene og returnerer antall meter nord og antall meter vest, hvor et negativt tall betyr motsatt retning.

Eksempel:
walk 10 meters north
walk 10 meters south
walk 10 meters west
walk 10 meters east
walk 3 meters north
walk 2 meters east

gir resultatet:
3,-2

Skattekart: http://pastebin.com/BZrAMcN2


 */



const http = require('http');
const url = 'http://pastebin.com/raw/BZrAMcN2';

let d = {};

http.get(url, function(res) {
  let data = '';
  res.on('data', buffer => data += buffer.toString().replace(/\s+/g, ' '));
  res.on('end', () => {
    data.split(' ').map((str, i, arr) => {
      if (str === 'north' || str === 'south' || str === 'west' || str === 'east') {
        d[str] = (d[str] || 0) + parseInt(arr[i - 2]);
      }
    });
    console.log((d['north'] - d['south']) + ',' + (d['west'] - d['east']));
  });
});