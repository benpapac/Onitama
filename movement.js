function updateMovementStates(event) {
	oldSquare = event.path[1];
	oldRow = oldSquare.dataset.row;
	oldColumn = oldSquare.dataset.column;
	activePawn = document.querySelector(`#${event.target.id}`);
	pickMode = !pickMode;
}

function checkMove() {
	if (newSquare.classList.contains(`${opponent.class}`)) return true;

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
	oldRow = null;
	oldColumn = null;
	activePawn = null;
	pickMode = !pickMode;
}

function getNewSquare(event) {
	newSquare = event.target;
	newRow = newSquare.dataset.row;
	newColumn = newSquare.dataset.column;
}

function takePawn() {
	if (!newSquare.classList.contains('pawn')) return;
	if (!newSquare.classList.contains(`${opponent.class}`)) return;
	targetPawn = document.querySelector(`#${newSquare.id}`);
	newSquare.remove();
}

function handleMove(event) {
	getNewSquare(event);
	canMove = checkMove();
	if (!canMove) return;
	takePawn();
	getWinner();
	render();
	newTurn();
}
