import { expect } from 'chai';
import { Pawn } from '../src/Utils/classes.js';
import { cards } from '../src/Utils/cards.js';
// const expect = require('chai/expect');
// const Pawn = require('../Utils/classes');

describe('The Pawn Class', () => {
	let pawn;
	let target = [1, 1];
	let badTarget = [-1, -1];
	let badTarget2 = [5, 5];
	const THREATS = [
		[0, 1],
		[2, 0],
		[2, 2],
	];
	const CHANGES = cards.cobra.changes.pink;

	beforeEach(() => {
		pawn = new Pawn('pink', [0, 0], 'p1');
	});
	it('1. should have a color.', (done) => {
		expect(pawn.color).to.equal('pink');
		done();
	});

	it('2. should have a name.', (done) => {
		expect(pawn.name).to.equal('p1');
		done();
	});

	it('3. should be located at [0,0]'),
		(done) => {
			expect(pawn.square).to.deep.equal([0, 0]);
			done();
		};

	it('5. should have a threats array that includes [1,1]', (done) => {
		pawn.createThreats('cobra');
		expect(pawn.threats).to.be.instanceof(Array);
		expect(pawn.threats).to.have.lengthOf(1);
		expect(pawn.threats[0]).to.equal([1, 1]);
	});

	it('5. should move to square [1,1]', (done) => {
		pawn.move(target);
		expect(pawn.square).to.equal(target);
		done();
	});

	it('5. should have a threats array that includes [0,1], [2,0], and [2,2]', (done) => {
		pawn.createThreats(CHANGES);
		expect(pawn.threats).to.be.instanceof(Array);
		expect(pawn.threats).to.have.lengthOf(1);
		expect(pawn.threats).to.deep.equal(THREATS);
	});

	it('6. should not move', (done) => {
		pawn.move(badTarget);
		expect(pawn.square).to.equal([0, 0]);

		pawn.move(badTarget2);
		expect(pawn.square).to.equal([0, 0]);
		done();
	});

	it('7. should be captured.', (done) => {
		pawn.isCaptured();
		expect(pawn.captured).to.equal(true);
		done();
	});
});

// export {};
