



const blueCoreCards = {
	blueForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},

	blueBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},

	blueLateralOne: () => {
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
	},

	blueLeftOne: () => {
		if (
			opponent === player2 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						1
			)
		)
			return true;
	},

	blueRightOne: () => {
		if (
			opponent === player2 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						-1
			)
		)
			return true;
	},

	blueLeftOneForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
			return true;
	},

	blueRightOneForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
	},
	blueLeftOneBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
			return true;
	},
	blueRightOneBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
	},

	blueForwardTwo: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -2 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},
	blueLateralTwo: () => {
		if (
			opponent === player2 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					Math.abs(
						columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
					) === 2
			)
		)
			return true;
	},

	blueRightTwoForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
		)
			return true;
	},
	blueLeftTwoForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
		)
			return true;
	},
};

const pinkCoreCards = {
	pinkForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},

	pinkBackwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},

	pinkLateralOne: () => {
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

	pinkLeftOne: () => {
		if (
			opponent === player1 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						1
			)
		)
			return true;
	},

	pinkRightOne: () => {
		if (
			opponent === player1 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						-1
			)
		)
			return true;
	},

	pinkLeftOneForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
			return true;
	},

	pinkRightOneForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
	},
	pinkLeftOneBackwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
			return true;
	},
	pinkRightOneBackwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
	},

	pinkForwardTwo: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 2 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},
	pinkLateralTwo: () => {
		if (
			opponent === player1 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					Math.abs(
						columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
					) === 2
			)
		)
			return true;
	},

	pinkRightTwoForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
		)
			return true;
	},
	pinkLeftTwoForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
		)
			return true;
	},
};


function switchCards() {
	if (currentPlayer.number === 1) {
		currentCards = blueCardsArray
	} else {
		currentCards = pinkCardsArray;
	}
}

function showCards() {
	cardOne.innerText = currentCards[0].name;
	cardTwo.innerText = currentCards[1].name;
	
}

function updateCards() {
	switchCards();
	showCards();
}