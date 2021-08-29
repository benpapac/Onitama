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

function checkPawn() {
	if (!targetPawn.classList.contains(`${opponent.class}`)) return;
	return true;
}

function checkTargetPawn(event) {
	if (targetPawn.classList.contains(currentPlayer.class)) {
		pickMode = !pickMode;
		removeShadows();
		handlePick(event);
		console.log(
			` after checkTargetPawn(), the new active pawn is: ${activePawn.id}`
		);
		return true;
	}
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
	console.log(`we're in glowShadowSquares.`);
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

function takePawn() {
	if (!targetPawn.classList.contains('pawn')) return;
	if (!targetPawn.classList.contains(`${opponent.class}`)) return;
	targetPawn.remove();
	getWinner(targetPawn);
}
