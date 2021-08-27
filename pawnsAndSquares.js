const pawnNamesArray = [
	'pink-pawn-A',
	'pink-pawn-B',
	'pink-pawn-Sage',
	'pink-pawn-D',
	'pink-pawn-E',
	'blue-pawn-A',
	'blue-pawn-B',
	'blue-pawn-Sage',
	'blue-pawn-D',
	'blue-pawn-E',
];

const rowsArray = ['one', 'two', 'three', 'four', 'five'];
const columnsArray = ['A', 'B', 'C', 'D', 'E'];

makePawns();
const pawnsList = {
	pinkPawnA: document.querySelector(`#${pawnNamesArray[0]}`),
	pinkPawnB: document.querySelector(`#${pawnNamesArray[1]}`),
	pinkPawnSage: document.querySelector(`#${pawnNamesArray[2]}`),
	pinkPawnD: document.querySelector(`#${pawnNamesArray[3]}`),
	pinkPawnE: document.querySelector(`#${pawnNamesArray[4]}`),

	bluePawnA: document.querySelector(`#${pawnNamesArray[5]}`),
	bluePawnB: document.querySelector(`#${pawnNamesArray[6]}`),
	bluePawnSage: document.querySelector(`#${pawnNamesArray[7]}`),
	bluePawnD: document.querySelector(`#${pawnNamesArray[8]}`),
	bluePawnE: document.querySelector(`#${pawnNamesArray[9]}`),
};
function makePawns() {
	for (let column = 0; column < columnsArray.length; column++) {
		let pinkSquare = document.querySelector(
			`[data-row= ${rowsArray[4]}] [data-column= ${columnsArray[column]}]`
		);
		let blueSquare = document.querySelector(
			`[data-row= ${rowsArray[0]}] [data-column= ${columnsArray[column]}]`
		);
		console.log(pinkSquare);

		let pinkPawn = document.createElement('a');
		pinkPawn.classList.add('pink-pawn');
        pinkPawn.classList.add('pawn');
		pinkPawn.id = pawnNamesArray[column];

		let bluePawn = document.createElement('a');
		bluePawn.classList.add('blue-pawn');
        bluePawn.classList.add('pawn');
		bluePawn.id = pawnNamesArray[column + 5];

		pinkSquare.appendChild(pinkPawn);
		blueSquare.appendChild(bluePawn);
	}
}

function checkForPawn(event) {
	if (!event.target.dataset.color) return;
	newPawn = event.target;
	return (pawnHere = true);
}

function getPawnColor(event) {
	newPawn = event.target;
	newPawnColor = event.target.dataset.color;
}

function doPawnsMatch(newPawnColor) {
	if (newPawnColor !== thisPawn.dataset.color) {
		return (pawnsMatch = false);
	} else {
		return (pawnsMatch = true);
	}
}
