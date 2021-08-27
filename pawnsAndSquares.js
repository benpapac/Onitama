const pawnNamesArray = [
	'pink-pawn-A',
	'pink-pawn-B',
	'pink-pawn-C',
	'pink-pawn-D',
	'pink-pawn-E',
	'blue-pawn-A',
	'blue-pawn-B',
	'blue-pawn-C',
	'blue-pawn-D',
	'blue-pawn-E',
];

const rowsArray = [ 'one','two','three','four','five' ]
const columnsArray = [ 'A','B','C','D','E' ]

for (let i = 0; i < pawnNamesArray.length; i++) {
        newPawn = Pawn;
        newPawn.id = pawnNamesArray[i];
}
    
    const pinkPawnA = document.querySelector(`#${pawnNamesArray[0]}`)
    const pinkPawnB = document.querySelector(`#${pawnNamesArray[1]}`)
    const pinkPawnC = document.querySelector(`#${pawnNamesArray[2]}`)
    const pinkPawnD = document.querySelector(`#${pawnNamesArray[3]}`)
    const pinkPawnE = document.querySelector(`#${pawnNamesArray[4]}`)

    const bluePawnA = document.querySelector(`#${pawnNamesArray[5]}`)
    const bluePawnB = document.querySelector(`#${pawnNamesArray[6]}`)
    const bluePawnC = document.querySelector(`#${pawnNamesArray[7]}`)
    const bluePawnD = document.querySelector(`#${pawnNamesArray[8]}`)
    const bluePawnE = document.querySelector(`#${pawnNamesArray[9]}`)

console.log(pinkPawnA);



function checkForPawn(event) {
    if (!(event.target.dataset.color)) return;
    newPawn = event.target;
    return pawnHere = true;
}

function getPawnColor(event) {
    newPawn = event.target;
    newPawnColor = event.target.dataset.color;
}

function doPawnsMatch(newPawnColor){
    if(newPawnColor !== thisPawn.dataset.color) {
    return pawnsMatch = false;
    } else {
        return pawnsMatch = true;
    }
}

function biggerFunction(event) {
    let newPawnColor;
    let pawnHere = false;
    let pawnsMatch = false;
    pawnHere = checkForPawn(event);
    if (pawnHere) {
        getPawnColor(event);
        doPawnsMatch(newPawnColor);
    }

}