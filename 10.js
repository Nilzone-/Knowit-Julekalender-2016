/*

I en fantasiverden skal en Trollmann, en Kriger, en Prest og en Tyv kjempe seg igjennom noen farlige tuneller og rom der en goblin-klan holder 17 mennesker fanget. 
Eventyrerene skal igjennom 100 rom før de finner fangene. I hvert rom må de nedkjempe eller snike seg forbi onde goblins. Det er like mange goblins i hvert rom som nummeret på rommet. 
Så i det første rommet er det en goblin, i det neste 2, osv frem til og med rom 100 der det er 100 goblins. Når de har kommet forbi rom 100 kan de befri fangene. 
I hvert rom går kampen i runder frem til det ikke er noen goblins igjen, etter følgende regler (i rekkefølge):

Hvis Tyven er i live og det er goblins igjen i dette rommet, dreper han 1 goblin.
Hvis Trollmannen er i live og det er goblins igjen i dette rommet, dreper han (opptil) 10 goblins.
Hvis Krigeren er i live og det er goblins igjen i dette rommet, dreper han 1 goblin.
Hvis Presten er i live og en annen eventyrer ikke er det, gjenoppliver presten en av de som ikke er i live. Hvis det er flere som ikke er i live velger han først Krigeren, så Trollmannen. Tyven vil han ikke gjenopplive, han har syndet for mye. Presten kan gjøre dette maks en gang per rom, og han kan ikke gjenopplive eventyrere som ble forlatt døde i et tidligere rom.
Hvis Tyven er den eneste som er i live, sniker han seg videre (til neste rom eller til fangene hvis dette er rom 100), og ignorerer de goblinene som var igjen i dette rommet. Goblinene som var igjen i rommet leter etter ham, men går seg bort i tunellene og starter et nytt og bedre liv et annet sted.
Hvis det fremdeles er både eventyrere og goblins i rommet, og det er minst 10 ganger flere goblins enn eventyrerene som er igjen, så dreper goblinene en av eventyrerene. De dreper først Krigeren om han er i live, deretter Trollmannen, så Presten. Tyven finner de ikke.
Hvis det fremdeles er både eventyrere og goblins i rommet, gå til punkt 1 (ny runde i samme rom). Hvis ikke, gå til neste rom og start en runde - med mindre dette var det siste rommet, i hvilket tilfelle de resterende eventyrerene finner fangene og befrir dem.
Hvor mange overlevde historien?


 */


const rooms = 100;
let survivers = 0;
let e = {
	trollman: {
		isAlive: 1,
		killedInRoom: null
	},
	kriger: {
		isAlive: 1,
		killedInRoom: null
	},
	prest: {
		hasRevived: 0,
		isAlive: 1,
		killedInRoom: null
	},
	tyv: {
		isAlive: 1,
		killedInRoom: null
	}
};

function heroAliveCount() {
	return e.prest.isAlive + e.kriger.isAlive + e.trollman.isAlive + e.tyv.isAlive;
}

function killHero(obj, room) {
	obj.isAlive = 0;
	obj.killedInRoom = (obj.killedInRoom || room);
}

for (let room = 1; room <= rooms; room++) {
	let goblins = room;
	e.prest.hasRevived = 0;
	while(goblins > 0) {
		if(e.tyv.isAlive && goblins > 0) goblins--;
		if(e.trollman.isAlive && goblins > 0) goblins -= Math.min(goblins, 10);
		if(e.kriger.isAlive && goblins > 0) goblins--;
		
		if(e.prest.isAlive && (!e.kriger.isAlive || !e.trollman.isAlive)) {
			if(!e.kriger.isAlive && !e.prest.hasRevived && e.kriger.killedInRoom === room) {
				e.prest.hasRevived = 1;
				e.kriger.isAlive = 1;
				e.kriger.killedInRoom = null;
			} 
			else if(!e.trollman.isAlive && !e.prest.hasRevived && e.trollman.killedInRoom === room) {
				e.prest.hasRevived = 1;
				e.trollman.isAlive = 1;
				e.trollman.killedInRoom = null;
			}
		}
		
		if(e.tyv.isAlive && !e.trollman.isAlive && !e.kriger.isAlive && !e.prest.isAlive) break;
				
		if(heroAliveCount() > 0 && (goblins / heroAliveCount()) >= 10) {
			if(e.kriger.isAlive) killHero(e.kriger, room);
			else if(e.trollman.isAlive) killHero(e.trollman, room);
			else if(e.prest.isAlive) killHero(e.prest, room);
		}
		
		if((!e.tyv.isAlive && !e.trollman.isAlive && !e.kriger.isAlive && !e.prest.isAlive) || goblins === 0) {
			break;
		}
	}
	survivers += goblins;
}


console.log(survivers + 17 + heroAliveCount());













