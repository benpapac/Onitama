/* //// MENU ////
MOVEMENT: 21-61
	line 22: updateMovementStates()
	line 29: checkMove()
	line 52: resetMovementStates()

PAWNS:  62 - 102
	line 63: pawnsList{}
	line 77: checkPawn()
	line 82: checkTargetPawn()
	line 95: takePawn()

SQUARES: 103 - 145
	line 104: getNewSquare()
	line 111: getShadowSquare()
	line 118: glowShadowSquares()
	line 134: removeShadows()
*/

function updateMovementStates(event) {
	oldSquare = event.path[1];
	oldRow = oldSquare.dataset.row;
	oldColumn = oldSquare.dataset.column;
	activePawn = document.querySelector(`#${event.target.id}`);
}

function checkMove() {
	if (targetPawn.classList.contains(currentPlayer.class)) return;

	if (
		opponent === player2 &&
		(parseInt(oldRow) - parseInt(newRow) !== -1 ||
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) > 1)
	)
		return;

	if (
		opponent === player1 &&
		(parseInt(oldRow) - parseInt(newRow) !== 1 ||
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) > 1)
	)
		return;
	return true;
}

function resetMovementStates() {
	oldSquare = null;
	shadowSquare = null;
	oldRow = null;
	oldColumn = null;
	activePawn = null;
	pickMode = !pickMode;
}

//// PAWNS ////

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

function checkPawn() {
	if (!targetPawn.classList.contains(`${opponent.class}`)) return;
	return true;
}

function checkTargetPawn(event) {
	if (targetPawn.classList.contains(currentPlayer.class)) {
		pickMode = !pickMode;
		removeShadows();
		handlePick(event);
		return true;
	}
	return true;
}

function takePawn() {
	if (!targetPawn.classList.contains('pawn')) return;
	if (!targetPawn.classList.contains(`${opponent.class}`)) return;
	targetPawn.remove();
	getWinner(targetPawn);
}

//// SQUARES ////

function getNewSquare(event) {
	if (event.target.classList.contains('square')) newSquare = event.target;
	if (event.target.classList.contains('pawn')) newSquare = event.path[1];
	newRow = newSquare.dataset.row;
	newColumn = newSquare.dataset.column;
}

function getShadowSquare() {
	if (shadowSquare.classList.contains('square')) newSquare = shadowSquare;
	if (shadowSquare.classList.contains('pawn')) newSquare = shadowSquare.path[1];
	newRow = newSquare.dataset.row;
	newColumn = newSquare.dataset.column;
}

function glowShadowSquares() {
	console.log(`we're in glow`);
	let goodShadow = false;

	for (let i = 0; i < rowsArray.length; i++) {
		for (let j = 0; j < columnsArray.length; j++) {
			shadowSquare = document.querySelector(
				`[data-row= ${rowsArray[i]}] [data-column= ${columnsArray[j]}]`
			);
			getShadowSquare(shadowSquare);
			goodShadow = chosenCard();
			if (goodShadow) shadowSquare.dataset.type = 'shadow';
		}
	}
}

function removeShadows() {
	for (let i = 0; i < rowsArray.length; i++) {
		for (let j = 0; j < columnsArray.length; j++) {
			shadowSquare = document.querySelector(
				`[data-row= ${rowsArray[i]}] [data-column= ${columnsArray[j]}]`
			);
			if (shadowSquare.dataset.type === 'shadow') {
				shadowSquare.dataset.type = '';
			}
		}
	}
}
