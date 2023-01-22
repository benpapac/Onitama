import Game from '../classes/class.Game';
import makeClone from '../clone';
import deepEqual from '../deepEquals';
import { getEval } from './ai';
import createThreats from '../createThreats';

/*
I want to grab a piece and look at each of the possible moves for that piece.
Of those moves, I want to find the most optimal choice.
Then, I want to dive deeper, and repeat the process.


let's take our current position.
	let's look at each piece belonging to the currentPlayer:
		For this piece, look at each possible threat:
			For this threat:
				evaluate the position created by the threat.
				return the position with the best evaluation.
	
		Evaluate the position created by the piece's best move.
		return the position with the best evaluation.


the only info I need to return is the chosen material: square, piece, and card.
I don't need to return an entire board.
*/

const value = (pinkEval, blueEval) => {
	return (
		3 * (pinkEval.pawnCount - blueEval.pawnCount) +
		(pinkEval.kingVal - blueEval.kingVal) +
		2 * (pinkEval.centerThreats - blueEval.centerThreats) +
		2 * (pinkEval.kingThreats - blueEval.kingThreats) +
		2 * (pinkEval.templeThreats - blueEval.templeThreats) +
		0.5 * (pinkEval.mobilityValue - blueEval.mobilityValue)
	);
};

const evaluate = (game) => {
	if (Object.keys(game).length === 0) {
		return false;
	}
	let clone = makeClone(game);
	let pinkEval = getEval(clone, 'pinkPlayer', 'bluePlayer');
	let blueEval = getEval(clone, 'bluePlayer', 'pinkPlayer');
	return value(pinkEval, blueEval);
};

const preserveState = (game, piece) => {
	return {
		drawPile: game.drawPile,
		hand: game[game.currentPlayer].hand,
		currentPlayer: game.currentPlayer,
		square: piece.square,
	};
};

//side effects
const resetState = (game, piece, preservedState) => {
	game.currentPlayer = preservedState.currentPlayer;
	game.drawPile = preservedState.drawPile;
	game[game.currentPlayer].hand = preservedState.hand;
	piece.move(preservedState.square);
};

const getBestEval = (game, operation, val, depth) => {
	let bestEval = {
		bestMove: {},
		evaluation: val,
	};

	// iterate through pieces ( max 5)
	for (let i = 0; i < game[game.currentPlayer].pieces.length; i++) {
		game.chosenPiece = game[game.currentPlayer].pieces[i].name;
		// iterate through cards (always 2)
		for (let j = 0; j < game[game.currentPlayer].pieces.length; j++) {
			game.chosenCard = game[game.currentPlayer].hand[i];

			if (!game.threats.length) {
				continue;
			}

			for (let k = 0; k < game.threats.length; k++) {
				let clone = makeClone(game);
				let piece = clone[game.currentPlayer].pieces[i];
				let preservedState = preserveState(game, piece);

				let move = {
					piece: game.chosenPiece,
					card: game.chosenCard,
					threat: game.threats[k],
				};

				piece.move(game.threats[k]);
			
				clone.startNewTurn();
				let evaluation = miniMax(game, depth - 1, move).evaluation; // recursive call
				resetState(clone, piece, preservedState);

				// console.log(move, evaluation);

				let newEval = operation(bestEval.evaluation, evaluation);

				if (newEval === evaluation) {
					bestEval = {
						bestMove: move,
						evaluation: evaluation,
					};
				}
			}
		}
	}

	return bestEval;
};

const miniMax = (game, depth, move = {}) => {
	// make changes to the mutable copy, leaving the original game state untouched.
	// once you identify the best move, THEN apply those changes to the game, before passing up.

	//edge cases.
	console.log('game over? ', game.gameOver);
	if (depth === 0 || game.gameOver) {
		return { bestMove: move, evaluation: evaluate(game) };
	}

	let operation = game.currentPlayer === 'pinkPlayer' ? Math.max : Math.min;
	let val = game.currentPlayer === 'pinkPlayer' ? -Infinity : Infinity;

	//getBestEval recursively seeks the best position through miniMax, to a given depth.
	return getBestEval(game, operation, val, depth, move);
};

export default miniMax;
