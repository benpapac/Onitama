export const pinkForwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === 1 &&
		Math.abs(
			coordinates.currentCol - coordinates.targetCol
		) === 0
	) {
		return true;
	} else return false;
};

export const pinkBackwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === -1 &&
		Math.abs(
			coordinates.currentCol - coordinates.targetCol
		) === 0
	) {
		return true;
	} else return false;
};

export const pinkLateralOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentRow - coordinates.targetRow === 0 &&
				Math.abs(
					coordinates.currentCol - coordinates.targetCol
				) === 1
		)
	) {
		return true;
	} else return false;
};

export const pinkLeftOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentRow - coordinates.targetRow === 0 &&
				coordinates.currentCol - coordinates.targetCol === 1
		)
	) {
		return true;
	} else return false;
};

export const pinkRightOne = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentRow - coordinates.targetRow === 0 &&
				coordinates.currentCol - coordinates.targetCol === -1
		)
	) {
		return true;
	} else return false;
};

export const pinkLeftOneForwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === 1 &&
		coordinates.currentCol - coordinates.targetCol === 1
	) {
		return true;
	} else return false;
};

export const pinkRightOneForwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === 1 &&
		coordinates.currentCol - coordinates.targetCol === -1
	)
		return true;
	else return false;
};
export const pinkLeftOneBackwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === -1 &&
		coordinates.currentCol - coordinates.targetCol === 1
	) {
		return true;
	} else return false;
};
export const pinkRightOneBackwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === -1 &&
		coordinates.currentCol - coordinates.targetCol === -1
	) {
		return true;
	} else return false;
};

export const pinkForwardTwo = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === 2 &&
		Math.abs(
			coordinates.currentCol - coordinates.targetCol
		) === 0
	) {
		return true;
	} else return false;
};
export const pinkLateralTwo = (coordinates) => {
	if (
		Math.abs(
			coordinates.currentRow - coordinates.targetRow === 0 &&
				Math.abs(
					coordinates.currentCol - coordinates.targetCol
				) === 2
		)
	) {
		return true;
	} else return false;
};

export const pinkRightTwoForwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === 1 &&
		coordinates.currentCol - coordinates.targetCol === -2
	) {
		return true;
	} else return false;
};
export const pinkLeftTwoForwardOne = (coordinates) => {
	if (
		coordinates.currentRow - coordinates.targetRow === 1 &&
		coordinates.currentCol - coordinates.targetCol === 2
	) {
		return true;
	} else return false;
};
