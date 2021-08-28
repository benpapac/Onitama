const movementCards = {
	boar: () => {
		if (blueCoreCards.blueForwardOne) return true;
		if (blueCoreCards.blueLateralOne) return true;

		if (pinkCoreCards.pinkForwardOne) return true;
		if (pinkCoreCards.pinkLateralOne) return true;
	},

	eel: () => {
		if (blueCoreCards.blueRightOne) return true;
		if (blueCoreCards.blueLeftOneForwardOne) return true;
		if (blueCoreCards.blueLeftOneBackwardOne) return true;

		if (pinkCoreCards.pinkRightOne) return true;
		if (pinkCoreCards.pinkLeftOneForwardOne) return true;
		if (pinkCoreCards.pinkLeftOneBackwardOne) return true;
	},

	mantis: () => {
		if (blueCoreCards.blueBackwardOne) return true;
		if (blueCoreCards.blueLeftOneForwardOne) return true;
		if (blueCoreCards.blueRightOneForwardOne) return true;

		if (pinkCoreCards.pinkBackwardOne) return true;
		if (pinkCoreCards.pinkLeftOneForwardOne) return true;
		if (pinkCoreCards.pinkRightOneForwardOne) return true;
	},

	ox: () => {
		if (blueCoreCards.blueForwardOne) return true;
		if (blueCoreCards.blueRightOne) return true;
		if (blueCoreCards.blueBackwardOne) return true;

		if (pinkCoreCards.pinkForwardOne) return true;
		if (pinkCoreCards.pinkRightOne) return true;
		if (pinkCoreCards.pinkBackwardOne) return true;
	},

	cobra: () => {
		if (blueCoreCards.blueLeftOne) return true;
		if (blueCoreCards.blueRightOneForwardOne) return true;
		if (blueCoreCards.blueRightOneBackwardOne) return true;

		if (pinkCoreCards.pinkLeftOne) return true;
		if (pinkCoreCards.pinkRightOneForwardOne) return true;
		if (pinkCoreCards.pinkRightOneBackwardOne) return true;
	},

	horse: () => {
		if (blueCoreCards.blueForwardOne) return true;
		if (blueCoreCards.blueLeftOne) return true;
		if (blueCoreCards.blueBackwardOne) return true;

		if (pinkCoreCards.pinkForwardOne) return true;
		if (pinkCoreCards.pinkLeftOne) return true;
		if (pinkCoreCards.pinkLeftOneBackwardOne) return true;
	},
};

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
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},

	pinkBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},

	pinkLateralOne: () => {
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

	pinkLeftOne: () => {
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

	pinkRightOne: () => {
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

	pinkLeftOneForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
			return true;
	},

	pinkRightOneForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
	},
	pinkLeftOneBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
			return true;
	},
	pinkRightOneBackwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
	},

	pinkForwardTwo: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 2 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		)
			return true;
	},
	pinkLateralTwo: () => {
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

	pinkRightTwoForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
		)
			return true;
	},
	pinkLeftTwoForwardOne: () => {
		if (
			opponent === player2 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
		)
			return true;
	},
};
