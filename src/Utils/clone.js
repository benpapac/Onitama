import Game from '../Utils/classes/class.Game.js';
import Player from './classes/class.Player.js';
import Piece from './classes/class.Piece.js';
import deepCopy from './deepCopy.js';

const makeClone = (instance) => {
	let res;
	if (instance instanceof Game) {
		res = new Game();
	} else if (instance instanceof Player) {
		res = new Player();
	} else if (instance instanceof Piece) {
		res = new Piece();
	}

	let keys = Object.keys(instance);
	keys.forEach((key) => {
		// console.log(instance[key]);
		if (Array.isArray(instance[key])) {
			// console.log('deep copying ', key);
			res[key] = deepCopy(instance[key]);
		} else if (
			instance[key] instanceof Player ||
			instance[key] instanceof Piece
		) {
			// console.log('cloning ', key);
			res[key] = makeClone(instance[key]);
		} else {
			// console.log('copying ', key);
			res[key] = instance[key];
		}
	});
	return res;
};

export default makeClone;
