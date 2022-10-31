export class Pawn {
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

export class Player {
	constructor(color, hand) {
		this.color = color;
		this.hand = hand;
		this.pieces = [];
		this.capturedPieces = [];
		this.chosenCard = -1;
	}

	createPieces() {
		let pieces = new Array(5).fill({});
		let color = this.color.substring(0, 1);
		let name = '';

		pieces = pieces.map((piece, i) => {
			if (i === 2) {
				name = `${color}king`;
			} else {
				name = `${color}${i + 1}`;
			}

			let square = [0, i];
			return new Pawn(this.color, square, name);
		});

		this.pieces = pieces;
		return this.pieces;
	}

	capture(piece) {
		let newArr = this.capturedPieces.concat([piece]);
		this.capturedPieces = newArr;
		return piece;
	}

	chooseCard(idx) {
		this.chosenCard = idx;
		return this.chosenCard;
	}

	deleteCapturedPiece(piece) {
		let pieces = this.pieces.filter((el) => el.name !== piece.name);
		this.pieces = pieces;
		return pieces;
	}

	replaceCard(drawnCard) {
		let newHand = this.hand.map((card, i) => {
			if (i === this.chosenCard) {
				return drawnCard;
			} else {
				return card;
			}
		});
        this.chosenCard = -1;
		this.hand = newHand;
		return this.hand;
	}

	get wins() {
		let currColor = this.color.substring(0, 1);
		let oppColor = currColor === 'p' ? 'b' : 'p';
		let temple = currColor === 'p' ? [4, 2] : [0, 2];
		let myKing = this.pieces.find((piece) => piece.name === `${currColor}king`);

		return (
			this.capturedPieces.find((pawn) => pawn.name === `${oppColor}king`) ||
			(myKing.square[0] === temple[0] && myKing.square[1] === temple[1])
		);
	}
}
