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
		this.chosenPiece = {};
		this.currentPlayer = this.pinkPlayer;
	}

	pawnAt(square) {
		let pinkPiece = this.pinkPlayer.pieces.find((piece) => {
			return piece.square[0] === square[0] && piece.square[1] === square[1];
		});

		let bluePiece = this.bluePlayer.pieces.find((piece) => {
			return piece.square[0] === square[0] && piece.square[1] === square[1]
		});

		return pinkPiece || bluePiece;
	}

	chooseCard(card) {
		this.chosenCard = card;
		return this.chosenCard;
	}

	choosePiece(name) {
		let clone = new Game();
		clone.clone(this);

		let chosenPiece =
			this.pinkPlayer.pieces.find((piece) => piece.name === name) ||
			this.bluePlayer.pieces.find((piece) => piece.name === name);

		clone.chosenPiece = chosenPiece;
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

		this.threats = threats;
		return this.threats;
	}

	dealCards() {
		let hand1 = this.drawPile.slice(3);
		let hand2 = this.drawPile.slice(1, 3);

		this.pinkPlayer.hand = hand1;
		this.bluePlayer.hand = hand2;

		this.drawPile = this.drawPile.slice(0, 1);

		return this.drawPile;
	}

	switchCurrentPlayer() {
		this.currentPlayer =
			this.currentPlayer.color === 'pink' ? this.bluePlayer : this.pinkPlayer;
		return this.currentPlayer;
	}

	setUpBoard() {
		this.pinkPlayer.createPieces();
		this.bluePlayer.createPieces();

		this.shuffleCards();
		this.dealCards();
	}

	shuffleCards() {
		let gameDeck = deck.map((card) => card);
		let randomNumber = Math.floor(Math.random() * gameDeck.length - 1);
		gameDeck = gameDeck
			.slice(0, randomNumber)
			.concat(gameDeck.slice(randomNumber + 1));
		let pivot = Math.floor((gameDeck.length - 1) / 2);

		let left = gameDeck.slice(0, pivot);
		let right = gameDeck.slice(pivot);

		for (let i = 0; i < gameDeck.length; i++) {
			let half = left.length > right.length ? left : right;
			gameDeck[i] = half.pop();
		}

		this.drawPile = gameDeck;
	}

	startNewTurn(name) {
		let nextPlayer = name === 'pink' ? this.pinkPlayer : this.bluePlayer;
		let drawnCard = this.drawPile[0];
		this.drawPile[0] = this.chosenCard;
		nextPlayer.drawCard(this.chosenCard, drawnCard);
		this.chosenCard = '';
		this.chosenPiece = {};
		this.switchCurrentPlayer();
		return nextPlayer;
	}
}
