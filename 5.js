/*

Kongen av Indonesia har som tradisjon å sende sine julehilsener kryptert til sine venner. I år skjedde det en glipp og kongen sendte meldingen til alle i hele verden med en email adresse, vi har også fått meldingen og trenger hjelp til å dekryptere den. Med meldingen fulgte også følgende instruksjoner på hvordan den kan dekrypteres:

For å dekryptere meldingen må man først legge sammen parene i listen, ett par er første og siste element, andre og nest siste element og så videre. Når du har alle verdiene kan du oversette disse til bokstaver, hvor a = 1 og z = 26.
Kryptertmelding: http://pastebin.com/xfX3msCL

 */



const http = require('http');
const url = 'http://pastebin.com/raw/xfX3msCL';
const values = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };

http.get(url, res => {
    let data = '';
    res.on('data', buffer => {
        data += buffer.toString('utf-8');
    });

    res.on('end', () => {
        solve(data.replace(/[\[\]\s]+/g, '').split(','));
    });
});


let solve = (data) => {
    const n = data
        .map(roman => {
            let sum = 0;
            roman.split('').forEach(n => sum = (sum >= values[n]) ? sum + values[n] : values[n] - sum);
            return isNaN(sum) ? 0 : sum;
        })
        .map((n, i, arr, h = arr.length / 2) => {
            let result = '';
            result += (i < h) ? String.fromCharCode(96 + (n + arr[arr.length - 1 - i])) : '';
            return result;
        }).join('');

    console.log(n);

}
