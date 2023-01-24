const equal = (arr1, arr2) => {
	for (let j = 0; j < arr1.length; j++) {
		if (arr1[j] !== arr2[j]) {
			break;
		} else if (j === arr1.length - 1) {
			return true;
		}
	}
	return false;
};

const deepEqual = (arr1, arr2) => {
	if (!arr1 || !arr2) {
		return false;
	}

	if (arr1.length === arr2.length && typeof arr1[0] === 'number') {
		return equal(arr1, arr2);
	}

	for (let i = 0; i < arr1.length; i++) {
		if (!arr1[0] || arr1[0].length !== arr2.length) {
			return false;
		}
		if (equal(arr1[i], arr2)) {
			return true;
		}
	}

	return false;
};

export default deepEqual;