export const blueForwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === -1 &&
		Math.abs(coordinates.currentCol - coordinates.targetCol) === 0
	) {
		return true;
	} else return false;
};

export const blueBackwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === 1 &&
		Math.abs(coordinates.currentCol - coordinates.targetCol) === 0
	) {
		return true;
	} else return false;
};

export const blueLateralOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currenRow - coordinates.targetRow === 0 &&
				Math.abs(coordinates.currentCol - coordinates.targetCol) === 1
		)
	) {
		return true;
	} else return false;
};

export const blueLeftOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currenRow - coordinates.targetRow === 0 &&
				coordinates.currentCol - coordinates.targetCol === 1
		)
	) {
		return true;
	} else return false;
};

export const blueRightOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currenRow - coordinates.targetRow === 0 &&
				coordinates.currentCol - coordinates.targetCol === -1
		)
	) {
		return true;
	} else return false;
};

export const blueLeftOneForwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === -1 &&
		coordinates.currentCol - coordinates.targetCol === 1
	) {
		return true;
	} else return false;
};

export const blueRightOneForwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === -1 &&
		coordinates.currentCol - coordinates.targetCol === -1
	) {
		return true;
	} else return false;
};
export const blueLeftOneBackwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === 1 &&
		coordinates.currentCol - coordinates.targetCol === 1
	) {
		return true;
	} else return false;
};
export const blueRightOneBackwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === 1 &&
		coordinates.currentCol - coordinates.targetCol === -1
	) {
		return true;
	} else return false;
};

export const blueForwardTwo = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === -2 &&
		Math.abs(coordinates.currentCol - coordinates.targetCol) === 0
	) {
		return true;
	} else return false;
};
export const blueLateralTwo = (coordinates) => {
	if (
		Math.abs(
			coordinates.currenRow - coordinates.targetRow === 0 &&
				Math.abs(coordinates.currentCol - coordinates.targetCol) === 2
		)
	) {
		return true;
	} else return false;
};

export const blueRightTwoForwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === -1 &&
		coordinates.currentCol - coordinates.targetCol === -2
	) {
		return true;
	} else return false;
};
export const blueLeftTwoForwardOne = (coordinates) => {
	if (
		coordinates.currenRow - coordinates.targetRow === -1 &&
		coordinates.currentCol - coordinates.targetCol === 2
	) {
		return true;
	} else return false;
};
