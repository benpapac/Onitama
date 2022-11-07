import { expect } from 'chai';

import Pawn from '../src/Utils/classes/class.Pawn.js';
import Player from '../src/Utils/classes/class.Player.js';
import Game from '../src/Utils/classes/class.Game.js';
import { cards } from '../src/Utils/cards.js';
import deepEqual from '../src/Utils/deepEquals.js';

// Thinking about declarative vs imperative programming...
//React needs state to be updated declaratively. In other words, I can't just say:
// const [player1, setPlayer1] = useState( new Player('pink'));
// player1.pieces[0].square = [1,1];
// This would not work. Instead, I need to do this:
// let newPlayerState = <deepCopyFunction>(player1);
// newPlayerState.pieces[0].square = [1,1];
// setPlayer1(newPlayerState);

// Although, could I just do this?
// setPlayer1(player1.move()) // where move() returns an altered player1?
// I bet I can. I bet this is what Obi was talking about. There's a way to find out!

// Let's think about memory efficiency.
// I only need one array of threats at a time.
// passing that function and property from Pawn up to Game seems unnecessary. Let's refactor that.

describe('The Game ', () => {
	let game = new Game();
	const PINK_PLAYER = game.pinkPlayer;
	const BLUE_PLAYER = game.bluePlayer;

	it('1. should have a pink player and a blue player', (done) => {
		expect(PINK_PLAYER).to.be.instanceof(Player);
		expect(BLUE_PLAYER.color).to.equal('blue');
		done();
	});

	game = game.setUpBoard();
	it('2. should set up pieces and shuffle cards', (done) => {
		expect(game.pinkPlayer.pieces).to.be.instanceof(Array);
		expect(game.bluePlayer.pieces).to.have.lengthOf(5);
		expect(game.currentPlayer).to.deep.equal(game.pinkPlayer);
		done();
	});

	it("3. should have access to each Player's pieces", (done) => {
		let pinkPawn = new Pawn('pink', [0, 0], 'p1');
		let blueKing = new Pawn('blue', [4, 2], 'bking');

		expect(PINK_PLAYER.pieces[0]).to.deep.equal(pinkPawn);
		expect(BLUE_PLAYER.pieces[2]).to.deep.equal(blueKing);
		done();
	});

	it('4. should deal unique hands to each player', (done) => {
		expect(game.drawPile).to.have.lengthOf(1);
		expect(game.pinkPlayer.hand).to.be.instanceOf(Array);
		expect(game.bluePlayer.hand).to.have.lengthOf(2);

		expect(game.pinkPlayer.hand.includes(BLUE_PLAYER.hand[0])).to.equal(false);
		expect(game.pinkPlayer.hand.includes(BLUE_PLAYER.hand[1])).to.equal(false);

		expect(game.pinkPlayer.hand.includes(game.drawPile[0])).to.equal(false);
		expect(game.bluePlayer.hand.includes(game.drawPile[0])).to.equal(false);
		done();
	});

	it('5. should keep track of the chosen card', (done) => {
		game = game.chooseCard('boar');
		expect(game.chosenCard).to.equal('boar');
		game = game.chooseCard('cobra');
		expect(game.chosenCard).to.equal('cobra');
		done();
	});

	const PINK_KING = game.pinkPlayer.pieces.find(
		(piece) => piece.name === 'pking'
	);
	it('6. should track the chosen piece', (done) => {
		game = game.choosePiece(PINK_KING);
		expect(game.chosenPiece).to.deep.equal(
			PINK_PLAYER.pieces.find((piece) => piece.name === 'pking')
		);
		done();
	});

	it('7. should create and track threats for all pawns', (done) => {
		let game2 = new Game();
		game2.setUpBoard();
		const CARD = game.chosenCard;
		const COLOR = game2.currentPlayer.color;
		const CHANGES = cards[CARD].changes[COLOR];

		game2 = game2.chooseCard(CARD);
		game2 = game2.choosePiece(PINK_KING);

		expect(CHANGES[0]).to.be.instanceof(Array);
		expect(game.currentPlayer.color).to.equal(game2.currentPlayer.color);
		expect(game.chosenCard).to.equal(game2.chosenCard);
		expect(game.chosenPiece.square).to.deep.equal(game2.chosenPiece.square);
		expect(game.threats).to.deep.equal(game2.threats);
		done();
	});

	it('8. should track Pawn moves', (done) => {
		const SQUARE = game.threats[0];
		const PINK_KING = game.pinkPlayer.pieces.find(
			(piece) => piece.name === 'pking'
		);

		game = game.chooseSquare(SQUARE);
		game = game.choosePiece(PINK_KING);
		game = game.movePiece();

		expect(PINK_KING.square).to.deep.equal(SQUARE);
		done();
	});

	it('9. should update the drawPile and currentPlayer when a Player takes a turn.', (done) => {
		expect(game.currentPlayer).to.deep.equal(game.pinkPlayer);
		game = game.startNewTurn();
		expect(game.chosenCard).to.equal('');
		expect(game.currentPlayer).to.deep.equal(game.bluePlayer);
		done();
	});

	it('10. should get a pawn at a given square', (done) => {
		let square = [0, 0];
		const PAWN_1 = game.pawnAt(square);
		expect(PAWN_1).to.deep.equal(
			game.pinkPlayer.pieces.find((piece) => piece.name === 'p1')
		);
		square = [4, 4];
		const PAWN_2 = game.pawnAt(square);
		expect(PAWN_2).to.deep.equal(
			game.bluePlayer.pieces.find((piece) => piece.name === 'b5')
		);
		done();
	});

	it('11. should be able to set a current player', (done) => {
		expect(game.currentPlayer).to.deep.equal(game.bluePlayer);
		expect(game.nextPlayer).to.deep.equal(game.pinkPlayer);
		done();
	});

	it('12. should track pawn captures', (done) => {
		game = new Game();
		game = game.setUpBoard();
		game = game.startNewTurn();
		const PAWN_B5 = game.currentPlayer.pieces.find(
			(piece) => piece.name === 'b5'
		);
		let square = [0, 2];
		game = game.choosePiece(PAWN_B5);
		game = game.chooseSquare(square);

		expect(game.chosenSquare).to.deep.equal(square);
		expect(game.threatenedPiece).to.deep.equal(
			game.nextPlayer.pieces.find((piece) => {
				return deepEqual(piece.square, game.chosenSquare);
			})
		);
		expect(game.threatenedPiece.square).to.deep.equal(square);

		let deadPawn = game.threatenedPiece;
		expect(deadPawn.name).to.equal('pking');

		game = game.movePiece();

		expect(game.threatenedPiece).to.equal(false);

		let testKing = new Pawn('pink', [0, 2], 'pking');

		expect(game.bluePlayer.capturedPieces.length).to.equal(1);

		expect(game.bluePlayer.capturedPieces[0]).to.deep.equal(testKing);
		expect(
			game.pinkPlayer.pieces.includes((piece) => piece.name === deadPawn.name)
		).to.equal(false);

		done();
	});
});
