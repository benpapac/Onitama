import { expect } from 'chai';
import Pawn from '../src/Utils/classes/class.Pawn.js';
import { cards } from '../src/Utils/cards.js';

describe('The Pawn Class', () => {
	let pawn = new Pawn('pink', [0, 0], 'p1');
	let target = [1, 1];
	const THREATS = [
		[1, 0],
		[0, 2],
		[2, 2],
	];
	const CHANGES = cards.cobra.changes.pink;

	it('1. should have a color.', (done) => {
		expect(pawn.color).to.equal('pink');
		done();
	});

	it('1.1 should not be a king', (done) => {
		expect(pawn.name).to.not.equal('pking');
		done();
	});

	it('1.2 should have name "p1".', (done) => {
		expect(pawn.name).to.equal('p1');
		done();
	});

	it('2. should have a name.', (done) => {
		expect(pawn.name).to.equal('p1');
		done();
	});

	// hangs as pending in test...
	it('3. should be located at [0,0]'),
		(done) => {
			let square = [0, 0];
			expect(pawn.square).to.deep.equal(square);
			done();
		};

	//passed up createThreats to Game.js
	// it('6. should create a threats array that includes [1,1]', (done) => {
	// 	pawn.createThreats(CHANGES);
	// 	expect(pawn.threats).to.be.instanceof(Array);
	// 	expect(pawn.threats).to.have.lengthOf(1);
	// 	expect(pawn.threats[0]).to.deep.equal([1, 1]);
	// 	done();
	// });

	it('5. should move to square [1,1]', (done) => {
		pawn.move(target);
		expect(pawn.square).to.equal(target);
		done();
	});

	// Passed up to Game Class
	// it('7. should have a threats array that includes [1,0], [2,0], and [2,2]', (done) => {
	// 	pawn.createThreats(CHANGES);
	// 	expect(pawn.threats).to.be.instanceof(Array);
	// 	expect(pawn.threats).to.have.lengthOf(3);
	// 	expect(pawn.threats).to.deep.equal(THREATS);
	// 	done();
	// });

	// REMOVED -- bad targets should not be passed to a move method
	// it('6. should not move', (done) => {
	// 	pawn.move(badTarget);
	// 	expect(pawn.square).to.equal([0, 0]);

	// 	pawn.move(badTarget2);
	// 	expect(pawn.square).to.equal([0, 0]);
	// 	done();
	// });

	it('8. should be captured.', (done) => {
		pawn.isCaptured();
		expect(pawn.captured).to.equal(true);
		done();
	});
});

// export {};
