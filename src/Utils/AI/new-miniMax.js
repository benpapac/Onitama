import Game from '../classes/class.Game';
import makeClone from '../clone';
import deepEqual from '../deepEquals';
import { getAllThreats, getEval } from './ai';
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
		pinkEval.pawnCount -
		blueEval.pawnCount +
		200 * (pinkEval.kingCount - blueEval.kingCount) +
		2 * (pinkEval.kingThreats - blueEval.kingThreats) +
		10 * (pinkEval.templeThreats - blueEval.templeThreats) +
		(pinkEval.mobilityValue - blueEval.mobilityValue)
	);
};

const evaluate = (game) => {
	if (Object.keys(game).length === 0) {
		return false;
	}
	let clone = makeClone(game);
	let currentEval = getEval(clone);

	clone.startNewTurn();
	let nextEval = getEval(clone);

	return value(currentEval, nextEval);
};

const findWinningMove = (game) => {
	return game.bluePlayer.wins;
};

const getAllMoves = (game) => {
	let allMoves = game.currentPlayer.pieces.reduce((accum, piece) => {
		let pieceMoves = game.currentPlayer.hand.reduce((accum, card) => {
			let threats = createThreats(game, card, piece.name);
			// responsible for looking at all threats, and filtering out the invalid ones.

			if (!threats.length) {
				return [];
			}
			let cardMoves = threats.reduce((accum, threat) => {
				let move = {
					card: card,
					piece: piece,
					square: threat,
				};

				accum = accum.concat(move);
				return accum;
			}, []);
			accum = accum.concat(cardMoves);
			return accum;
		}, []);

		accum = accum.concat(pieceMoves);
		return accum;
	}, []);
	return allMoves;
};

const getBestMove = (storedMove, depth, allMoves, operation, val, game) => {
	if (!allMoves.length) {
		return { bestMove: storedMove, evaluation: val };
	}
	let bestMove = allMoves.reduce(
		(accum, move) => {
			let pieceIndex = game.currentPlayer.pieces.findIndex(
				(piece) => piece.name === move.piece.name
			);
			let piece = game.currentPlayer.pieces[pieceIndex];
			let oldSquare = piece.square;
			piece.move(move.square);

			let evaluation = miniMax(game, depth - 1, move).evaluation; // recursive call
			piece.move(oldSquare);
			let bestEval = operation(accum.evaluation, evaluation);
			if (bestEval === evaluation) {
				return { bestMove: move, evaluation: evaluation };
			} else {
				return accum;
			}
		},
		{ bestMove: storedMove, evaluation: val }
	);

	return bestMove;
};

const miniMax = (game, depth, move = {}) => {
	// make changes to the mutable copy, leaving the original game state untouched.
	// once you identify the best move, THEN apply those changes to the game, before passing up.

	//edge cases.
	if (depth === 0 || game.pinkPlayer.wins || game.bluePlayer.wins) {
		return { bestMove: move, evaluation: evaluate(game) };
	}

	let color = game.currentPlayer.color;
	let operation = color === 'pink' ? Math.max : Math.min;
	let val = color === 'pink' ? -Infinity : Infinity;

	//findBestMove recursively seeks the best position through miniMax, to a given depth.
	let clone = makeClone(game);
	let allMoves = getAllMoves(clone);

	return getBestMove(move, depth, allMoves, operation, val, clone);
};

export default miniMax;
