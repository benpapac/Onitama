export default class Clone {
	constructor(instance) {
		let keys = Object.keys(instance);
		keys.forEach((key) => (this[key] = instance[key]));
	}
}
