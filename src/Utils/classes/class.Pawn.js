export default class Pawn {
	constructor(color, square, name) {
		this.name = name;
		this.color = color;
		this.square = square;
		this.captured = false;
	}

	clone(pawn) {
		this.name = pawn.name;
		this.color = pawn.color;
		this.square = pawn.square;
		this.captured = pawn.captured;
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
