export default class Piece {
	constructor(color, square, name) {
		this.name = name;
		this.color = color;
		this.square = square;
		this.captured = false;
	}

	move(target) {
		this.square = target;
		return this;
	}

	isCaptured() {
		this.captured = true;
	}
}
