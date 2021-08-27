function updateMovementStates(event) {
	oldSquare = event.path[1];
	oldRow = oldSquare.dataset.row;
	oldColumn = oldSquare.dataset.column;
	activePawn = document.querySelector(`#${event.target.id}`);
	pickMode = !pickMode;
}

function checkMove() {
	if (
		opponent === player2 &&
		(parseInt(oldRow) - parseInt(newRow) !== -1 ||
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) !== 0)
	)
		return;
	if (
		opponent === player1 &&
		(parseInt(oldRow) - parseInt(newRow) !== 1 ||
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) !== 0)
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


function handleMove(event) {
	getNewSquare(event);
	canMove = checkMove();
	if (!canMove) return;
	console.log(`canMove: ${canMove}`);
	checkWinner(event);
	render();
	newTurn();
}