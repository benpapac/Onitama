import { cards, deck } from '../cards.js';
import Player from './class.Player.js';

export default class Game {
	constructor() {
		this.pinkPlayer = new Player('pink');
		this.bluePlayer = new Player('blue');
		this.drawPile = [];
		this.chosenCardIndex = '';
		this.chosenPiece = {};
	}

	chooseCard(idx) {
		this.chosenCardIndex = idx;
		return this.chosenCardIndex;
	}

	choosePiece(name) {
		let chosenPiece =
			this.pinkPlayer.pieces.find((piece) => piece.name === name) ||
			this.bluePlayer.pieces.find((piece) => piece.name === name);

		this.chosenPiece = chosenPiece;
		return chosenPiece;
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

	setUpBoard() {
		this.pinkPlayer.createPieces();
		this.bluePlayer.createPieces();

		this.shuffleCards();
	}

	shuffleCards() {
		let gameDeck = deck.map((card) => card);
		let randomNumber = Math.floor(Math.random() * gameDeck.length - 1);
		gameDeck = gameDeck
			.slice(0, randomNumber)
			.concat(gameDeck.slice(randomNumber + 1));
		randomNumber = Math.floor(Math.random() * gameDeck.length - 1);

		gameDeck = gameDeck
			.slice(randomNumber)
			.concat(gameDeck.slice(0, randomNumber));

		this.drawPile = gameDeck;
	}

	startNewTurn(name) {
		let nextPlayer = name === 'pink' ? this.pinkPlayer : this.bluePlayer;
		let drawnCard = this.drawPile[0];
		this.drawPile[0] = nextPlayer.discard(
			this.chosenCardIndex,
			this.drawPile[0]
		);
		nextPlayer.drawCard(this.chosenCardIndex, drawnCard);
		this.chosenCardIndex = -1;
		this.chosenPiece = {};
		return nextPlayer;
	}
}
