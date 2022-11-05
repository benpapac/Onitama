import { expect } from 'chai';

import Pawn from '../src/Utils/classes/class.Pawn.js';
import Player from '../src/Utils/classes/class.Player.js';
import Game from '../src/Utils/classes/class.Game.js';
import { cards } from '../src/Utils/cards.js';

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
	const GAME = new Game();
	const PINK_PLAYER = GAME.pinkPlayer;
	const BLUE_PLAYER = GAME.bluePlayer;

	it('1. should have a pink player and a blue player', (done) => {
		expect(PINK_PLAYER).to.be.instanceof(Player);
		expect(BLUE_PLAYER.color).to.equal('blue');
		done();
	});

	it('2. should set up pieces and shuffle cards', (done) => {
		GAME.setUpBoard();
		expect(PINK_PLAYER.pieces).to.be.instanceof(Array);
		expect(BLUE_PLAYER.pieces).to.have.lengthOf(5);
		expect(GAME.currentPlayer).to.deep.equal(GAME.pinkPlayer);
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
		expect(GAME.drawPile).to.have.lengthOf(1);
		expect(PINK_PLAYER.hand).to.be.instanceOf(Array);
		expect(BLUE_PLAYER.hand).to.have.lengthOf(2);

		expect(PINK_PLAYER.hand.includes(BLUE_PLAYER.hand[0])).to.equal(false);
		expect(PINK_PLAYER.hand.includes(BLUE_PLAYER.hand[1])).to.equal(false);

		expect(PINK_PLAYER.hand.includes(GAME.drawPile[0])).to.equal(false);
		expect(BLUE_PLAYER.hand.includes(GAME.drawPile[0])).to.equal(false);
		done();
	});

	it('5. should keep track of the chosen card', (done) => {
		GAME.chooseCard('boar');
		expect(GAME.chosenCard).to.equal('boar');
		GAME.chooseCard('cobra');
		expect(GAME.chosenCard).to.equal('cobra');
		done();
	});

	it('6. should track the chosen piece', (done) => {
		GAME.choosePiece('bking');
		expect(GAME.chosenPiece).to.deep.equal(
			BLUE_PLAYER.pieces.find((piece) => piece.name === 'bking')
		);
		done();
	});

	it('7. should create and track threats for all pawns', (done) => {
		let game2 = new Game();
		const CARD = GAME.chosenCard;
		const COLOR = PINK_PLAYER.color;
		const CHANGES = cards[CARD].changes[COLOR];
		expect(CHANGES[0]).to.be.instanceof(Array);

		let pKing = new Pawn('pink', [0, 2], 'pking');
		game2.createThreats(CHANGES, pKing.square);

		const KING = GAME.pinkPlayer.pieces.find((piece) => piece.name === 'pking');
		GAME.createThreats(CHANGES, KING.square);
		expect(GAME.threats).to.deep.equal(game2.threats);
		done();
	});

	it('8. should track Pawn moves', (done) => {
		const SQUARE = GAME.threats[0];
		const PINK_KING = PINK_PLAYER.pieces.find(
			(piece) => piece.name === 'pking'
		);
		PINK_KING.move(SQUARE);
		expect(PINK_KING.square).to.deep.equal(SQUARE);
		done();
	});

	it('9. should update the drawPile and currentPlayer when a Player takes a turn.', (done) => {
		expect(GAME.currentPlayer).to.deep.equal(GAME.pinkPlayer);
		GAME.startNewTurn();
		expect(GAME.chosenCard).to.equal('');
		expect(GAME.currentPlayer).to.deep.equal(GAME.bluePlayer);
		done();
	});

	it('10. should get a pawn at a given square', (done) => {
		let square = [0, 0];
		const PAWN_1 = GAME.pawnAt(square);
		expect(PAWN_1).to.deep.equal(
			GAME.pinkPlayer.pieces.find((piece) => piece.name === 'p1')
		);
		square = [4, 4];
		const PAWN_2 = GAME.pawnAt(square);
		expect(PAWN_2).to.deep.equal(
			GAME.bluePlayer.pieces.find((piece) => piece.name === 'b5')
		);
		done();
	});

	it('11. should be able to set a current player', (done) => {
		expect(GAME.currentPlayer).to.deep.equal(GAME.bluePlayer);
		GAME.switchCurrentPlayer();
		expect(GAME.currentPlayer).to.deep.equal(GAME.pinkPlayer);
		done();
	});
});
