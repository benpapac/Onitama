function handleClick(event) {
	if (pickMode) handlePick(event);
	else handleMove(event);
}

function handlePick(event) {
	// if it's not a pawn, or if it's my opponent's pawn, I can't pick it.
	if (!event.target.id.includes(`pawn`)) return;
	if (event.target.classList.contains(`${opponent.class}`)) return;
	targetPawn = document.querySelector(`#${event.target.id}`);
	if (!chosenCard) return;

	updateMovementStates(event);
	glowShadowSquares();
	pickMode = !pickMode;
}

function handleMove(event) {
	getNewSquare(event);
	targetPawn = document.querySelector(`#${event.target.id}`);
	checkTargetPawn(event);

	canMove = chosenCard();
	if (!canMove) return;

	canAttack = checkPawn();
	if (canAttack) takePawn();

	getWinner(targetPawn);
	render();
	newTurn();
}
