import Game from '../classes/class.Game';
import { getEval } from './ai';

export const evaluate = (clone) => {
	let pinkEval = getEval(clone, 'pink');
	let blueEval = getEval(clone, 'blue');
	let value =
		pinkEval.pawnCount -
		blueEval.pawnCount +
		200 * (pinkEval.kingCount - blueEval.kingCount) +
		2 * (pinkEval.kingThreats - blueEval.kingThreats) +
		10 * (pinkEval.templeThreats - blueEval.templeThreats) +
		(pinkEval.mobilityValue - blueEval.mobilityValue);
	return { evaluation: value };
};

const miniMax = (game, currentPlayer = game.currentPlayer, depth) => {
	let clone = new Game();
	clone.clone(game);

	if (depth === 0 || clone.pinkPlayer.wins || clone.bluePlayer.wins) {
		let evaluation = evaluate(clone).evaluation;
		return { evaluation: evaluation };
	}

	if (currentPlayer === 'pink')
		return findBestMove(clone, currentPlayer, depth);
	else return findBestMove(clone, currentPlayer, depth);
};
