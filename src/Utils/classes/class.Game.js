import { cards, deck } from '../cards.js';
import Player from './class.Player.js';

export default class Game {
	constructor() {
		this.pinkPlayer = new Player('pink');
		this.bluePlayer = new Player('blue');
		this.drawPile = [];
		this.chosenCard = '';
	}

	chooseCard(idx) {
		this.chosenCard = idx;
		return this.chosenCard;
	}

	setUpBoard() {
		this.pinkPlayer.createPieces();
		this.bluePlayer.createPieces();

		this.shuffleCards();
	}

	shuffleCards() {
		let gameDeck = deck.map((card) => card);
		let randomNumber = Math.floor(Math.random() * gameDeck.length - 1);
		gameDeck = gameDeck.filter((card, i) => i !== randomNumber);
		randomNumber = Math.floor(Math.random() * gameDeck.length - 1);

		gameDeck = gameDeck
			.slice(randomNumber)
			.concat(gameDeck.slice(0, randomNumber));

		this.drawPile = gameDeck;
	}

	dealCards() {
		let hand1 = this.drawPile.slice(3);
		let hand2 = this.drawPile.slice(1, 3);

		this.pinkPlayer.hand = hand1;
		this.bluePlayer.hand = hand2;

		this.drawPile = this.drawPile.slice(0, 1);

		return this.drawPile;
	}
}
