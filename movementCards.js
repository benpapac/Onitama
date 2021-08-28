const blueCoreCards = {
	blueForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
	},

	blueBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
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
		) {
			return true;
		} else return false;
	},

	blueLeftOne: () => {
		if (
			opponent === player2 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						1
			)
		) {
			return true;
		} else return false;
	},

	blueRightOne: () => {
		if (
			opponent === player2 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						-1
			)
		) {
			return true;
		} else return false;
	},

	blueLeftOneForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		) {
			return true;
		} else return false;
	},

	blueRightOneForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		) {
			return true;
		} else return false;
	},
	blueLeftOneBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		) {
			return true;
		} else return false;
	},
	blueRightOneBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		) {
			return true;
		} else return false;
	},

	blueForwardTwo: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -2 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
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
		) {
			return true;
		} else return false;
	},

	blueRightTwoForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
		) {
			return true;
		} else return false;
	},
	blueLeftTwoForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
		) {
			return true;
		} else return false;
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
		) {
			return true;
		} else return false;
	},

	pinkBackwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
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
		) {
			return true;
		} else return false;
	},

	pinkLeftOne: () => {
		if (
			opponent === player1 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						1
			)
		) {
			return true;
		} else return false;
	},

	pinkRightOne: () => {
		if (
			opponent === player1 &&
			Math.abs(
				parseInt(oldRow) - parseInt(newRow) === 0 &&
					columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) ===
						-1
			)
		) {
			return true;
		} else return false;
	},

	pinkLeftOneForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		) {
			return true;
		} else return false;
	},

	pinkRightOneForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
		else return false;
	},
	pinkLeftOneBackwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		) {
			return true;
		} else return false;
	},
	pinkRightOneBackwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		) {
			return true;
		} else return false;
	},

	pinkForwardTwo: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 2 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
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
		) {
			return true;
		} else return false;
	},

	pinkRightTwoForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
		) {
			return true;
		} else return false;
	},
	pinkLeftTwoForwardOne: () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
		) {
			return true;
		} else return false;
	},
};

function switchCards() {
	if (opponent.number === 1) {
		currentCards = blueCardsArray;
	} else {
		currentCards = pinkCardsArray;
	}
}

function showCards() {
	cardOne.innerText = currentCards[0].name;
	cardTwo.innerText = currentCards[1].name;
}
