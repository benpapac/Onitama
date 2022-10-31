import { expect } from 'chai';
import { Pawn } from '../classes';


describe('The Pawn Class', ()=>{
    let pawn;
    let target = [1,1];
    let badTarget = [-1,-1];
    let badTarget2 = [5,5];

    beforeEach(()=>{
        pawn = new Pawn('pink', [0,0], 'p1');
    })
    it('1. should have a color.', (done)=>{
        expect(pawn.color).to.equal('pink');
        done();
    });

    it('2. should have a name.', (done)=>{
        expect(pawn.name).to.equal('p1');
        done();
    })

    it('3. should be located at [0,0]'), (done)=>{
        expect(pawn.square).to.deep.equal([0,0]);
        done();
    }

    it('4. should move to square [1,0]', (done)=>{
        pawn.move(target);
        expect(pawn.square).to.equal(target);
        done();
    });

    it('5. should not move', (done)=> {
        pawn.move(badTarget);
        expect(pawn.square).to.equal([0, 0]);

        pawn.move(badTarget2);
        expect(pawn.square).to.equal([0,0]);
        done();
    });

    it('6. should be captured.', (done) => {
        pawn.isCaptured();
        expect(pawn.captured).to.equal(true);
        done();
    });

});