const movementCards = {
	boar: (event) => {
		targetPawn = document.querySelector(`#${event.target.id}`);
		console.log(`Current Player: ${currentPlayer.class}`);
		console.log(`Old Row: ${oldRow}`);
		console.log(`Old Column: ${oldColumn}`);
		console.log(`New Row ${newRow}`);
		console.log(`New Column ${newColumn}`);

		if (targetPawn.classList.contains(currentPlayer.class)) return;

		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;

		if (
			opponent === player2 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					Math.abs(
						columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
					) === 1
			)
		)
			return true;

		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;

		if (
			opponent === player1 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					Math.abs(
						columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
					) === 1
			)
		)
			return true;
	},
};
