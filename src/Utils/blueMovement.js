export const blueForwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === 1 &&
		Math.abs(coordinates.currentRow - coordinates.targetRow) === 0
	) {
		return true;
	} else return false;
};

export const blueBackwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === -1 &&
		Math.abs(coordinates.currentRow - coordinates.targetRow) === 0
	) {
		return true;
	} else return false;
};

export const blueLateralOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentCol - coordinates.targetCol === 0 &&
				Math.abs(coordinates.currentRow - coordinates.targetRow) === 1
		)
	) {
		return true;
	} else return false;
};

export const blueLeftOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentCol - coordinates.targetCol === 0 &&
				coordinates.currentRow - coordinates.targetRow === -1
		)
	) {
		return true;
	} else return false;
};

export const blueRightOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentCol - coordinates.targetCol === 0 &&
				coordinates.currentRow - coordinates.targetRow === 1
		)
	) {
		return true;
	} else return false;
};

export const blueLeftOneForwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === 1 &&
		coordinates.currentRow - coordinates.targetRow === -1
	) {
		return true;
	} else return false;
};

export const blueRightOneForwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === 1 &&
		coordinates.currentRow - coordinates.targetRow === 1
	) {
		return true;
	} else return false;
};
export const blueLeftOneBackwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === -1 &&
		coordinates.currentRow - coordinates.targetRow === -1
	) {
		return true;
	} else return false;
};
export const blueRightOneBackwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === -1 &&
		coordinates.currentRow - coordinates.targetRow === 1
	) {
		return true;
	} else return false;
};

export const blueForwardTwo = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === 2 &&
		Math.abs(coordinates.currentRow - coordinates.targetRow) === 0
	) {
		return true;
	} else return false;
};
export const blueLateralTwo = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentCol - coordinates.targetCol === 0 &&
				Math.abs(coordinates.currentRow - coordinates.targetRow) === 2
		)
	) {
		return true;
	} else return false;
};

export const blueRightTwoForwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === 1 &&
		coordinates.currentRow - coordinates.targetRow === 2
	) {
		return true;
	} else return false;
};
export const blueLeftTwoForwardOne = (coordinates) => {
	if (
		coordinates.currentCol - coordinates.targetCol === 1 &&
		coordinates.currentRow - coordinates.targetRow === -2
	) {
		return true;
	} else return false;
};
