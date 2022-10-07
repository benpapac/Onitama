export const pinkForwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
	};

    export const pinkBackwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
	};

	export const pinkLateralOne = () => {
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
	};

	export const pinkLeftOne = () => {
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
	};

	export const pinkRightOne = () => {
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
	};

	export const pinkLeftOneForwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		) {
			return true;
		} else return false;
	};

	export const pinkRightOneForwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		)
			return true;
		else return false;
	};
	export const pinkLeftOneBackwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 1
		) {
			return true;
		} else return false;
	};
	export const pinkRightOneBackwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === -1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -1
		) {
			return true;
		} else return false;
	};

	export const pinkForwardTwo = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 2 &&
			Math.abs(
				columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn)
			) === 0
		) {
			return true;
		} else return false;
	};
	export const pinkLateralTwo = () => {
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
	};

	export const pinkRightTwoForwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === -2
		) {
			return true;
		} else return false;
	};
	export const pinkLeftTwoForwardOne = () => {
		if (
			opponent === player1 &&
			parseInt(oldRow) - parseInt(newRow) === 1 &&
			columnsArray.indexOf(oldColumn) - columnsArray.indexOf(newColumn) === 2
		) {
			return true;
		} else return false;
	};
