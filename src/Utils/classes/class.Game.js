import deepEqual from '../deepEquals.js';
import { cards, deck } from '../cards.js';
import Player from './class.Player.js';
import Piece from './class.Piece.js';
import deepCopy from '../deepCopy.js';

//it would be lovey to reimagine these class methods in a declarative way.
// that way, I could simply setGame(game.<method>()), and get the new state!

export default class Game {
	constructor() {
		this.pinkPlayer = new Player('pink');
		this.bluePlayer = new Player('blue');
		this.drawPile = [];
		this.currentPlayer = 'pinkPlayer';
		this.chosenCard = '';
		this.chosenPiece = '';
		this.chosenSquare = '';
	}

	get threats() {
		if (!this.chosenCard || !this.chosenPiece) {
			return [];
		}
		let changes = cards[this.chosenCard].changes[this.currentPlayer];
		let piece = this[this.currentPlayer].pieces.find(
			(piece) => piece.name === this.chosenPiece
		);

		if (!piece) return;

		let square = piece.square;
		let threats = changes.map((change) => {
			let threat = change.map((coord, idx) => (coord += square[idx]));
			return threat;
		});
		//first, remove squares that are out of bounds.
		let inBounds = threats.filter((threat) => {
			return threat[0] > -1 && threat[0] < 5 && threat[1] > -1 && threat[1] < 5;
		});

		//then, remove squares that conflict with pieces on the same team.
		let currentSquares = this[this.currentPlayer].pieces.map(
			(piece) => piece.square
		);

		let legalThreats = inBounds.filter(
			(threat) => !deepEqual(currentSquares, threat)
		);

		if (!legalThreats.length) return [];
		else return legalThreats;
	}

	get gameOver() {
		if (this.wayOfStone('p')) {
			return { winner: 'pink', way: 'Stone' };
		} else if (this.wayOfStone('b')) {
			return { winner: 'blue', way: 'Stone' };
		} else if (this.wayOfWater('p')) {
			return { winner: 'pink', way: 'Water' };
		} else if (this.wayOfWater('b')) {
			return { winner: 'pink', way: 'Water' };
		} else return false;
	}

	capturePiece(square, nextPlayer) {
		console.log(nextPlayer);
		let deadPiece = this[nextPlayer].pieces.find((piece) =>
			deepEqual(piece.square, square)
		);

		if (deadPiece) {
			this[nextPlayer].deleteCapturedPiece(deadPiece);
		}

		return deadPiece;
	}

	dealCards() {
		let hand1 = this.drawPile.slice(3);
		let hand2 = this.drawPile.slice(1, 3);

		this.pinkPlayer.hand = hand1;
		this.bluePlayer.hand = hand2;

		this.drawPile = this.drawPile.slice(0, 1);

		return this.drawPile;
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

	rotateCards() {
		let drawnCard = this.drawPile[0];
		this.drawPile[0] = this.chosenCard;
		this[this.currentPlayer].drawCard(this.chosenCard, drawnCard);

		return this[this.currentPlayer];
	}

	setUpBoard() {
		this.pinkPlayer.createPieces();
		this.bluePlayer.createPieces();

		this.shuffleCards();
		this.dealCards();
		return this.drawPile;
	}

	shuffleCards() {
		let gameDeck = deck.map((card) => card);
		let randomNumber = Math.floor(Math.random() * gameDeck.length);
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
		return gameDeck;
	}

	startNewTurn() {
		this.rotateCards();
		this.currentPlayer =
			this.currentPlayer === 'pinkPlayer' ? 'bluePlayer' : 'pinkPlayer';
		this.chosenCard = '';
		this.chosenPiece = '';
		this.chosenSquare = '';
	}

	wayOfStone(color) {
		let opp = color === 'p' ? 'bluePlayer' : 'pinkPlayer';
		let oppKing = color === 'p' ? 'bking' : 'pking';

		return !this[opp].pieces.find((piece) => piece.name === oppKing);
	}

	wayOfWater(color) {
		let temple = color === 'p' ? [4, 2] : [0, 2];
		let player = color === 'p' ? 'pinkPlayer' : 'bluePlayer';

		let kingIndex = this[player].pieces.findIndex(
			(piece) => piece.name === `${color}king`
		);
		let king = this[player].pieces[kingIndex];

		return deepEqual(king.square, temple);
	}
}
