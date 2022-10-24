export const deepCopy = (arr) =>
	arr.map((el) => (Array.isArray(el) ? deepCopy(el) : el));
