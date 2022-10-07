export const blueForwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === -1 &&
		Math.abs(
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
		) === 0
	) {
		return true;
	} else return false;
};

export const blueBackwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === 1 &&
		Math.abs(
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
		) === 0
	) {
		return true;
	} else return false;
};

export const blueLateralOne = () => {
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
};

export const blueLeftOne = () => {
	if (
		opponent === player2 &&
		Math.abs(
			parseInt(oldRow) - parseInt(newRow) === 0 &&
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		)
	) {
		return true;
	} else return false;
};

export const blueRightOne = () => {
	if (
		opponent === player2 &&
		Math.abs(
			parseInt(oldRow) - parseInt(newRow) === 0 &&
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
	) {
		return true;
	} else return false;
};

export const blueLeftOneForwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === -1 &&
		columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
	) {
		return true;
	} else return false;
};

export const blueRightOneForwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === -1 &&
		columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
	) {
		return true;
	} else return false;
};
export const blueLeftOneBackwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === 1 &&
		columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
	) {
		return true;
	} else return false;
};
export const blueRightOneBackwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === 1 &&
		columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
	) {
		return true;
	} else return false;
};

export const blueForwardTwo = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === -2 &&
		Math.abs(
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
		) === 0
	) {
		return true;
	} else return false;
};
export const blueLateralTwo = () => {
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
};

export const blueRightTwoForwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === -1 &&
		columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
	) {
		return true;
	} else return false;
};
export const blueLeftTwoForwardOne = () => {
	if (
		opponent === player2 &&
		parseInt(oldRow) - parseInt(newRow) === -1 &&
		columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
	) {
		return true;
	} else return false;
};
