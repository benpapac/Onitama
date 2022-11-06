import Pawn from './class.Pawn.js';

export default class Player {
	constructor(color, hand) {
		this.color = color;
		this.hand = hand;
		this.pieces = [];
		this.capturedPieces = [];
	}

	createPieces() {
		let pieces = new Array(5).fill({});
		let color = this.color.substring(0, 1);
		let name = '';
		let x = color === 'p' ? 0 : 4;

		pieces = pieces.map((piece, i) => {
			if (i === 2) {
				name = `${color}king`;
			} else {
				name = `${color}${i + 1}`;
			}

			let square = [x, i];
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

	clone(instance) {
		let keys = Object.keys(instance);
		keys.forEach((key) => (this[key] = instance[key]));
		return this;
	}

	deleteCapturedPiece(piece) {
		let pieces = this.pieces.filter((el) => el.name !== piece.name);
		this.pieces = pieces;
		return pieces;
	}

	drawCard(chosenCard, drawnCard) {
		let newHand = this.hand.map((card) => {
			if (card === chosenCard) {
				return drawnCard;
			} else {
				return card;
			}
		});
		this.hand = newHand;
	}

	discard(chosenCard) {
		let disCard = this.hand.find((card) => card === chosenCard);
		return disCard;
	}

	get wins() {
		let currColor = this.color.substring(0, 1);
		let oppColor = currColor === 'p' ? 'b' : 'p';
		let temple = currColor === 'p' ? [4, 2] : [0, 2];
		let myKing = this.pieces.find((piece) => piece.name === `${currColor}king`);
		let capturedKing = this.capturedPieces.find(
			(pawn) => pawn.name === `${oppColor}king`
		);

		return (
			capturedKing.name === 'pking' ||
			(myKing.square[0] === temple[0] && myKing.square[1] === temple[1])
		);
	}
}
