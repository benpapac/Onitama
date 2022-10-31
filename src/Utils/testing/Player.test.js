import { expect } from 'chai';

import { Pawn, Player } from '../classes';

describe('The Player class ', () => {
	let player = new Player('blue', ['ox', 'horse']);
	let pawn1 = new Pawn('blue', [0, 0]);
	let pawn2 = new Pawn('blue', [0, 1]);
	let king = new Pawn('blue', [0, 2], true);
	let pawn4 = new Pawn('blue', [0, 3]);
	let pawn5 = new Pawn('blue', [0, 4]);
	const PIECES = [pawn1, pawn2, king, pawn4, pawn5];

	const OPP_PAWN = new Pawn('pink', [1, 3]);
	const OPP_KING = new Pawn('pink', [1, 2], true);
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

	it('3. should track the movement of its pawns.', (done) => {
		player.pawns[0].move([1, 1]);
		expect(player.pawns[0].square).to.equal([1, 1]);
		done();
	});

	it('4. should be able to capture opposing pieces.', (done) => {
		player.capture(OPP_PAWN);
		expect(player.capturedPieces).to.be.instanceof(Array);
		expect(player.capturedPieces[0]).to.equal(OPP_PAWN);

		player.capture(OPP_KING);
		expect(player.capturedPieces).to.deep.equal(CAPTURED_PIECES);
		done();
	});

	it('5. should be able to delete its pieces, when they are captured.', (done) => {
		player.pawns[0].isCaptured();
		player.deleteCapturedPawn();
		expect(player.pawns[0].name).to.not.equal(PIECES[0].name);
		expect(player.pawns).have.lengthOf(4);
		done();
	});

	it('6. should be able to win.', (done) => {
		expect(player.wins).to.equal(true);
		done();
	});
});

describe('The Player Hand', () => {
	const PLAYER = new Player('pink', ['boar', 'mantis']);

	it('1. should exist.', (done) => {
		expect(PLAYER.hand).to.be.instanceof(Array);
		expect(PLAYER.hand).to.have.lengthOf(2);
		expect(PLAYER.hand[0]).to.be.instanceof(String);
		done();
	});

	it('2. should be chooseable.', (done) => {
		PLAYER.chooseCard(0);
		expect(PLAYER.chosenCard).to.equal(PLAYER.hand[0]);
		done();
	});

	it('3. should replace the chosen card in its hand with the drawn card.', (done) => {
		const DISCARD = player.chosenCard;
		const DRAWN_CARD = 'cobra';
		player.replaceCard(DRAWN_CARD);
		expect(player.hand).to.have.lengthOf(2);
		expect(player.hand.includes(DISCARD)).to.equal(false);
		expect(player.hand.includes(DRAWN_CARD)).to.equal(true);
		expect(player.chosenCard).to.equal({});
		done();
	});
});
