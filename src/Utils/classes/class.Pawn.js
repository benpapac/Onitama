export default class Pawn {
	constructor(color, square, name) {
		this.name = name;
		this.color = color;
		this.square = square;
		this.threats = [];
		this.captured = false;
	}

	move(target) {
		this.square = target;
		return this.square;
	}

	isCaptured() {
		this.captured = true;
	}
}
