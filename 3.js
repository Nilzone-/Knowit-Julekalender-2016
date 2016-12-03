/*

Finn kameleonen!

Noen personer har venner de egentlig hater, men fremdeles virker greie mot. Disse menneskene kalles for kameleoner. Din oppgave er å finne den største kameleonen i en venneflokk.

Forholdet mellom en person X og Y som definerer en kameleon X ser sånn ut:
1. Person X er venn med Person Y - dette forholdet er symmetrisk, så Y er nå også venn med X
2. Person X hater Person Y
3. Person Y hater ikke Person X

Altså, et forhold mellom 2 personer, hvor begge er venner, men den ene av dem hater egentlig den andre (ikke symmetrisk!).

Hvilken person (definert ved navn) har flest venner som han/hun egentlig hater?

Link til vennelista: http://pastebin.com/raw/e0bE4naA 

 */



var http = require('http');
var url = 'http://pastebin.com/raw/e0bE4naA';

var friends = {};
var enemies = {};
var cameleons = {};

http.get(url, function (response) {
    var data = '';
    response.on('data', function (buffer) {
        data += buffer.toString('utf-8').replace(/\s+/g, ' ');
    });

    response.on('end', function () {
        solve(data);
    });
});


function solve(data) {
    var arr = data.replace(/\s+/g, ' ').split(/\s+/);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === 'hates') addToEnemies(arr, i);
        if (arr[i] === 'friends') addToFriends(arr, i);
    }

    findCameleon(Object.keys(friends));
}

function addToFriends(arr, i) {
    var personWhoLikes = arr[i + 1];
    var personWhoAlsoLikes = arr[i + 2];

    addPropertiesAndValues(friends, personWhoLikes, personWhoAlsoLikes)
    addPropertiesAndValues(friends, personWhoAlsoLikes, personWhoLikes)
}

function addToEnemies(arr, i) {
    var personWhoHates = arr[i - 1];
    var personToBeHated = arr[i + 1];

    addPropertiesAndValues(enemies, personWhoHates, personToBeHated);
}

function addPropertiesAndValues(obj, prop, value) {
    if (!obj.hasOwnProperty(prop)) {
        obj[prop] = [];
        obj[prop].push(value);
    } else {
        obj[prop].push(value);
    }
}

Array.prototype.isFound = function (val) {
    var found = false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            found = true;
            break;
        }
    }
    return found;
}

function findCameleon(names) {
    names.forEach(X => {
        enemies[X].forEach(Y => {
            if (friends[X].isFound(Y) && enemies[X].isFound(Y) && !enemies[Y].isFound(X)) {
                cameleons[X] = (cameleons[X] || 0) + 1;
            }
        });
    });

    var sortable = [];
    for (var cameleon in cameleons)
        sortable.push([cameleon, cameleons[cameleon]])

    console.log(sortable.sort(function (a, b) {
        return b[1] - a[1]
    }));
}
