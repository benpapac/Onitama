export default class Pawn {
	constructor(color, square, name) {
		this.name = name;
		this.color = color;
		this.square = square;
		this.threats = [];
		this.captured = false;
	}

	createThreats(changes) {
		let threats = changes.map((change) => {
			let threat = change.map((coord, idx) => (coord += this.square[idx]));
			return threat;
		});

		threats = threats.filter((threat) => {
			return threat[0] > -1 && threat[0] < 5 && threat[1] > -1 && threat[1] < 5;
		});

		this.threats = threats;
		return this.threats;
	}

	move(target) {
		this.square = target;
		return this.square;
	}

	isCaptured() {
		this.captured = true;
	}
}
