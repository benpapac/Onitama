function handleClick(event) {
	console.log(event);
	if (pickMode) handlePick(event);
	else handleMove(event);

	// checkWinner(event);
	// newTurn();
}

function handlePick(event) {
	console.log(`we're in handlePick.`);
	// if it's not a pawn, or if it's my opponent's pawn, I can't pick it.
	if (!pawnNamesArray.includes(`${event.target.id}`)) return;
	if (event.target.classList.contains(`${opponent.class}`)) return;
	updateMovementStates(event);
}

function handleMove(event) {
	console.log(`we're in handleMove`);
	getNewSquare(event);
	targetPawn = document.querySelector(`#${event.target.id}`);
	console.log(`Target pawn is: ${targetPawn.id}`);
	checkTargetPawn(event);

	console.log(`${chosenCard.name} returns: ${chosenCard()}`);
	canMove = chosenCard();
	if (!canMove) return;

	canAttack = checkPawn();
	if (canAttack) takePawn();

	getWinner(targetPawn);
	render();
	newTurn();
}
