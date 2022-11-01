import { expect } from 'chai';

import Pawn from '../src/Utils/classes/class.Pawn.js';
import Player from '../src/Utils/classes/class.Player.js';
import { cards } from '../src/Utils/cards.js';

// const Pawn = require('../Utils/classes.js');
// const Player = require('../Utils/classes.js');

//need to test Pink player, AND Blue Player...
// specify which color is being tested in each describe block.

describe('The Player class ', () => {
	let player = new Player('blue', ['ox', 'horse']);
	let pawn1 = new Pawn('blue', [4, 0], 'b1');
	let pawn2 = new Pawn('blue', [4, 1], 'b2');
	let king = new Pawn('blue', [4, 2], 'bking');
	let pawn4 = new Pawn('blue', [4, 3], 'b4');
	let pawn5 = new Pawn('blue', [4, 4], 'b5');
	const PIECES = [pawn1, pawn2, king, pawn4, pawn5];

	const OPP_PAWN = new Pawn('pink', [1, 3], 'p2');
	const OPP_KING = new Pawn('pink', [1, 2], 'pking');
	const CAPTURED_PIECES = [OPP_PAWN, OPP_KING];

	it('1. should have the color blue', (done) => {
		expect(player.color).to.equal('blue');
		done();
	});

	it('2. should be able to add pawns, and a king', (done) => {
		player.createPieces();
		expect(player.pieces).to.be.instanceof(Array);
		expect(player.pieces).to.deep.equal(PIECES);
		done();
	});

	it('3. should track the movement of its pieces', (done) => {
		player.pieces[0].move([1, 1]);
		expect(player.pieces[0].square).to.deep.equal([1, 1]);
		done();
	});

	it('4. should be able to capture opposing pieces', (done) => {
		player.capture(OPP_PAWN);
		expect(player.capturedPieces).to.be.instanceof(Array);
		expect(player.capturedPieces[0]).to.equal(OPP_PAWN);

		player.capture(OPP_KING);
		expect(player.capturedPieces).to.deep.equal(CAPTURED_PIECES);
		done();
	});

	it('5. should be able to delete its pieces, when they are captured', (done) => {
		player.deleteCapturedPiece(player.pieces[0]);
		expect(player.pieces[0].name).to.not.equal(PIECES[0].name);
		expect(player.pieces).have.lengthOf(4);
		done();
	});

	it('6. should be able to win', (done) => {
		expect(player.wins).to.equal(true);
		done();
	});
});

describe('The Player Hand', () => {
	let pinkHand = ['boar', 'mantis'];
	const PLAYER = new Player('pink', pinkHand);
	PLAYER.createPieces();

	it('1. should exist', (done) => {
		expect(PLAYER.hand).to.be.instanceof(Array);
		expect(PLAYER.hand).to.have.lengthOf(2);
		expect(PLAYER.hand).to.deep.equal(pinkHand);
		done();
	});

	// chooseCard() passed up to Game.js
	// it('2. should be chooseable', (done) => {
	// 	PLAYER.chooseCard(0);
	// 	expect(PLAYER.chosenCard).to.equal(0);
	// 	expect(PLAYER.hand[PLAYER.chosenCard]).to.equal('boar');
	// 	done();
	// });

	//passed up to Game.js
	// it('3. should properly pass card data to its pieces.', (done) => {
	// 	expect(PLAYER.pieces).to.have.lengthOf(5);
	// 	let newThreats = [[1, 1]];
	// 	PLAYER.pieces[0].createThreats(
	// 		cards[PLAYER.hand[PLAYER.chosenCard]].changes[PLAYER.color]
	// 	);
	// 	expect(PLAYER.pieces[0].threats).to.be.instanceOf(Array);
	// 	expect(PLAYER.pieces[0].threats).to.deep.equal(newThreats);
	// 	done();
	// });

	const IDX = 0;
	const TESTCARD = PLAYER.hand[IDX];
	const DISCARD = PLAYER.discard(IDX);
	it('2. should discard the card at thte chosen card index', (done) => {
		expect(DISCARD).to.equal(TESTCARD);
		done();
	});

	it('3. should replace the chosen card in its hand with the drawn card', (done) => {
		const DRAWN_CARD = 'cobra';
		PLAYER.drawCard(IDX, DRAWN_CARD);
		expect(PLAYER.hand).to.have.lengthOf(2);
		expect(PLAYER.hand.includes(DISCARD)).to.equal(false);
		expect(PLAYER.hand[IDX]).to.equal(DRAWN_CARD);
		done();
	});
});
