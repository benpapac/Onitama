
function handleClick(event) {
	console.log(event);
	if (pickMode) handlePick(event);
	else handleMove(event);

	// checkWinner(event);
	// newTurn();
}

function handlePick(event) {
	// if it's not a pawn, or if it's my opponent's pawn, I can't pick it.
	if (!pawnNamesArray.includes(`${event.target.id}`)) return;
	if (event.target.classList.contains(`${opponent.class}`)) return;

	updateMovementStates(event);
}

function handleMove(event) {
	getNewSquare(event);
	canMove = checkMove(event);
	if (!canMove) return;
	canAttack = checkPawn();
	if (canAttack) takePawn();
	getWinner(targetPawn);
	render();
	newTurn();
}
