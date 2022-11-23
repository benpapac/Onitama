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
		this.currentPlayer = this.pinkPlayer;
	}

	get nextPlayer() {
		if (this.currentPlayer.color === 'pink') {
			return this.bluePlayer;
		} else {
			return this.pinkPlayer;
		}
	}

	get gameOver() {
		let pinkKingIndex = this.pinkPlayer.pieces.findIndex(
			(piece) => piece.name === 'pking'
		);
		let pinkKing = this.pinkPlayer.pieces[pinkKingIndex];

		if (!pinkKing) {
			return { winner: 'blue', way: 'stone' };
		}

		let blueKingIndex = this.bluePlayer.pieces.findIndex(
			(piece) => piece.name === 'bking'
		);

		let blueKing = this.bluePlayer.pieces[blueKingIndex];
		if (!blueKing) {
			return { winner: 'pink', way: 'stone' };
		}

		let pinkTemple = [0, 2];
		let blueTemple = [4, 2];

		if (deepEqual(pinkKing.square, blueTemple)) {
			return { winner: 'pink', way: 'water' };
		} else if (deepEqual(blueKing.square, pinkTemple)) {
			return { winner: 'blue', way: 'water' };
		} else {
			return false;
		}
	}

	capturePiece(square) {
		let deadPiece = false;
		let deadPieceIndex = this.nextPlayer.pieces.findIndex((piece) => {
			return deepEqual(piece.square, square);
		});
		
		if (deadPieceIndex > -1) {
			let deadPiece = this.nextPlayer.pieces[deadPieceIndex];
			this.nextPlayer.deleteCapturedPiece(deadPiece);
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

	setUpBoard() {
		this.pinkPlayer.createPieces();
		this.bluePlayer.createPieces();

		this.shuffleCards();
		this.dealCards();
		return this.drawPile;
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
		return gameDeck;
	}

	startNewTurn() {
		let drawnCard = this.drawPile[0];
		this.drawPile[0] = this.chosenCard;
		this.currentPlayer.drawCard(this.chosenCard, drawnCard);

		this.currentPlayer = this.nextPlayer;
		return this.currentPlayer;
	}
}
