export default class Piece {
	constructor(owner, square, name) {
		this.name = name;
		this.owner = owner;
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
