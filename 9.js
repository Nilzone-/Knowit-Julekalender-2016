/*

I en cryptocurrency som f. eks. Bitcoin bestemmes balansen til en konto ut av historikken av transaksjoner. Det vil si at hvis historikken kun består av én transaksjon hvor addresse X mottok 10 penger, så sier vi at balansen til X er 10.Dersom det kommer en ny transaksjon fra X til Y hvor det sendes 7 penger, så er balansen til Y: 7 og X: 3.

I filen det lenkes til finnes det to typer transaksjoner. Den ene typen er som den første beskrevet her, hvor penger trykkes ut av intet, og en heldig adresse mottar en viss sum penger. I den andre typen går pengene fra en adresse til en annen.

Ved å holde rede på alle transaksjoner i filen http://pastebin.com/raw/2vstb018, hvor mange adresser har en balanse på mer enn 10 penger når samtlige transaksjoner er utført?

Alle transaksjoner er gyldige, så du slipper å validere dem.

Formatet i filen er:

None,9251b282-e1bc-4221-80d8-36b25826ebac,50
9251b282-e1bc-4221-80d8-36b25826ebac,73b2dc61-24f4-4b0b-aca6-8c2d50b0e66c,38

Linje 1 sender 50 penger fra None til 9251b282-e1bc-4221-80d8-36b25826ebacLinje 2 sender 38 penger fra 9251b282-e1bc-4221-80d8-36b25826ebac til 73b2dc61-24f4-4b0b-aca6-8c2d50b0e66c


 */


const http = require('http');
const url = 'http://pastebin.com/raw/2vstb018';

http.get(url, res => {
    let data = '';
    res.on('data', buffer => {
        data += buffer.toString('utf-8');
    });

    res.on('end', () => {
        const result = data.split('\r\n').reduce((t, line) => {
            const a = line.split(','), sum = parseInt(a[2]);
            t[a[0]] = (t[a[0]] || 0) - sum;
            t[a[1]] = (t[a[1]] || 0) + sum;
            return t;
        }, {});

        console.log(Object.keys(result).filter(id => result[id] > 10).length);
    });
});
