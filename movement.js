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
	oldSquare = event.target.parentNode;
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
				columns.indexOf(oldColumn) - columns.indexOf(newColumn)
			) > 1)
	)
		return;

	if (
		opponent === player1 &&
		(parseInt(oldRow) - parseInt(newRow) !== 1 ||
			Math.abs(
				columns.indexOf(oldColumn) - columns.indexOf(newColumn)
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
	if (event.target.classList.contains('pawn')) newSquare = event.target.parentNode;
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
	let goodShadow = false;

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			shadowSquare = document.querySelector(
				`[data-row= ${rows[i]}] [data-column= ${columns[j]}]`
			);
			getShadowSquare(shadowSquare);
			goodShadow = chosenCard();
			if (goodShadow) shadowSquare.dataset.type = 'shadow';
		}
	}
}

function removeShadows() {
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			shadowSquare = document.querySelector(
				`[data-row= ${rows[i]}] [data-column= ${columns[j]}]`
			);
			if (shadowSquare.dataset.type === 'shadow') {
				shadowSquare.dataset.type = '';
			}
		}
	}
}
