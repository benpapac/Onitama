import deepEqual from '../deepEquals.js';
import { cards, deck } from '../cards.js';
import Player from './class.Player.js';

//it would be lovey to reimagine these class methods in a declarative way.
// that way, I could simply setGame(game.<method>()), and get the new state!

export default class Game {
	constructor() {
		this.pinkPlayer = new Player('pink');
		this.bluePlayer = new Player('blue');
		this.drawPile = [];
		this.chosenCard = '';
		this.chosenPiece = null;
		this.chosenSquare = [];
		this.currentPlayer = this.pinkPlayer;
		this.threats = [];
	}

	get threatenedPiece() {
		let threatenedPiece = this.nextPlayer.pieces.find((piece) => {
			return deepEqual(piece.square, this.chosenSquare);
		});

		if (threatenedPiece === undefined) return null;
		return threatenedPiece;
	}

	get nextPlayer() {
		if (this.currentPlayer.color === 'pink') {
			return this.bluePlayer;
		} else {
			return this.pinkPlayer;
		}
	}

	capturePiece() {
		let clone = new Game();
		clone.clone(this);

		let deadPiece = this.threatenedPiece;
		clone.currentPlayer.capture(deadPiece);
		clone.nextPlayer.deleteCapturedPiece(deadPiece);

		return clone;
	}

	chooseCard(card) {
		let clone = new Game();
		clone.clone(this);
		clone.chosenCard = card;
		return clone;
	}

	chooseSquare(square) {
		let clone = new Game();
		clone.clone(this);
		clone.chosenSquare = square;
		return clone;
	}

	choosePiece(piece) {
		let clone = new Game();
		clone.clone(this);
		clone.chosenPiece = piece;
		return clone;
	}

	clone(instance) {
		let keys = Object.keys(instance);
		keys.forEach((key) => (this[key] = instance[key]));
		return this;
	}

	createThreats(changes, square) {
		let threats = changes.map((change) => {
			let threat = change.map((coord, idx) => (coord += square[idx]));
			return threat;
		});

		threats = threats.filter((threat) => {
			return threat[0] > -1 && threat[0] < 5 && threat[1] > -1 && threat[1] < 5;
		});

		let clone = new Game();
		clone.clone(this);

		clone.threats = threats;
		console.log('new threats: ', clone.threats);
		return clone;
	}

	dealCards() {
		let hand1 = this.drawPile.slice(3);
		let hand2 = this.drawPile.slice(1, 3);

		this.pinkPlayer.hand = hand1;
		this.bluePlayer.hand = hand2;

		this.drawPile = this.drawPile.slice(0, 1);

		return this.drawPile;
	}

	movePiece() {
		let clone = new Game();
		clone.clone(this);
		clone.chosenPiece.move(clone.chosenSquare);

		if (this.capturedPiece) {
			clone.currentPlayer.capture(this.capturedPiece);
			clone.nextPlayer.deleteCapturedPiece(this.capturedPiece);
		}

		return clone;
	}

	pawnAt(square) {
		let pinkPiece = this.pinkPlayer.pieces.find((piece) => {
			return piece.square[0] === square[0] && piece.square[1] === square[1];
		});

		let bluePiece = this.bluePlayer.pieces.find((piece) => {
			return piece.square[0] === square[0] && piece.square[1] === square[1];
		});

		return pinkPiece || bluePiece || false;
	}

	setUpBoard() {
		let clone = new Game();
		clone.clone(this);
		clone.pinkPlayer.createPieces();
		clone.bluePlayer.createPieces();

		clone.shuffleCards();
		clone.dealCards();
		return clone;
	}

	shuffleCards() {
		let gameDeck = deck.map((card) => card);
		let randomNumber = Math.floor(Math.random() * (gameDeck.length - 1));
		gameDeck = gameDeck
			.slice(0, randomNumber)
			.concat(gameDeck.slice(randomNumber + 1));
		let pivot = Math.floor(gameDeck.length / 2);

		let left = gameDeck.slice(0, pivot);
		let right = gameDeck.slice(pivot);

		for (let i = 0; i < gameDeck.length; i++) {
			let half = left.length > right.length ? left : right;
			gameDeck[i] = half.pop();
		}

		this.drawPile = gameDeck;
	}

	startNewTurn() {
		let clone = new Game();
		clone.clone(this);

		let drawnCard = clone.drawPile[0];
		clone.drawPile[0] = clone.chosenCard;
		clone.currentPlayer.drawCard(clone.chosenCard, drawnCard);

		clone.currentPlayer = clone.nextPlayer;
		clone.chosenSquare = [];
		clone.chosenCard = '';
		clone.chosenPiece = null;
		clone.threats = [];
		return clone;
	}
}
