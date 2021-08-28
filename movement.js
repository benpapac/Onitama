




function updateMovementStates(event) {
	oldSquare = event.path[1];
	oldRow = oldSquare.dataset.row;
	oldColumn = oldSquare.dataset.column;
	activePawn = document.querySelector(`#${event.target.id}`);
	pickMode = !pickMode;
}

function checkMove(event) {
	targetPawn = document.querySelector(`#${event.target.id}`);
	if (targetPawn.classList.contains(currentPlayer.class)) return;

	if (
		opponent === player2 &&
		(parseInt(oldRow) - parseInt(newRow) !== -1 ||
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) > 1)
	)
		return;

	console.log(`opponent is: ${opponent.name}`);
	console.log(`old row is: ${parseInt(oldRow)}`);
	console.log(`new row is: ${parseInt(newRow)}`);
	console.log(`parent of new Square is ${newSquare.parentElemet}`);
	// console.log(parseInt(oldRow) - parseInt(newRow));

	if (
		opponent === player1 &&
		(parseInt(oldRow) - parseInt(newRow) !== 1 ||
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) > 1)
	)
		return;
	console.log(`current player: ${currentPlayer.class}`);
	console.log(`new square classes: ${newSquare.classList}`);
	console.log(`can attack: ${canAttack}`);
	return true;
}

function checkPawn() {
	if (!targetPawn.classList.contains(`${opponent.class}`)) return;
	return true;
}

function resetMovementStates() {
	oldSquare = null;
	oldRow = null;
	oldColumn = null;
	activePawn = null;
	pickMode = !pickMode;
}

function getNewSquare(event) {
	if (event.target.classList.contains('square')) newSquare = event.target;
	if (event.target.classList.contains('pawn')) newSquare = event.path[1];
	newRow = newSquare.dataset.row;
	newColumn = newSquare.dataset.column;
}

function takePawn() {
	if (!targetPawn.classList.contains('pawn')) return;
	if (!targetPawn.classList.contains(`${opponent.class}`)) return;
	targetPawn.remove();
	getWinner(targetPawn);
}


