export default class Pawn {
	constructor(color, square, name) {
		this.name = name;
		this.color = color;
		this.square = square;
		this.captured = false;
	}

	clone(instance) {
		let keys = Object.keys(instance);
		keys.forEach(key => this[key] = instance[key]);
		return this;
	}

	move(target) {
		this.square = target;
		return this.square;
	}

	isCaptured() {
		this.captured = true;
	}
}
