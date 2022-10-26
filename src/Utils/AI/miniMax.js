import { getEval, getAllMoves } from './ai';
import { deepCopy } from './deepCopy';

export const evaluate = (board, cols, gameCards, graveYard) => {
	let pinkEval = getEval(board, 'pink', cols, gameCards, graveYard);
	let blueEval = getEval(board, 'blue', cols, gameCards, graveYard);
	let value =
		pinkEval.pawns -
		blueEval.pawns +
		200 * (pinkEval.king - blueEval.king) +
		2 * (pinkEval.kingThreat - blueEval.kingThreat) +
		10 * (pinkEval.templeThreat - blueEval.templeThreat) +
		(pinkEval.mobilityValue - blueEval.mobilityValue);
	return { evaluation: value };
};

export const copyMoveRes = (move) => {
	let keys = Object.keys(move);
	let copy = {};
	keys.forEach((key) => {
		if (key === 'winner') {
			copy[key] = move[key];
		} else if (key === 'cards') {
			copy[key] = {
				pink: deepCopy(move[key].pink),
				blue: deepCopy(move[key].blue),
				gameCards: deepCopy(move[key].gameCards),
			};
		} else copy[key] = deepCopy(move[key]);
	});
	return copy;
};

export const miniMax = (gameState, currentPlayer, depth) => {
	let gameCopy = {
		board: deepCopy(gameState.board),
		cols: deepCopy(gameState.cols),
		cards: {
			pink: deepCopy(gameState.cards.pink),
			blue: deepCopy(gameState.cards.blue),
			gameCards: deepCopy(gameState.cards.gameCards),
		},
		graveYard: deepCopy(gameState.graveYard),
	};

	let bestMove = {};

	if (depth === 0 || gameState.winner) {
		let evaluation = evaluate(
			gameCopy.board,
			gameCopy.cols,
			gameCopy.cards,
			gameCopy.graveYard
		).evaluation;
		return { evaluation: evaluation };
	}

	if (currentPlayer === 'pink') {
		let maxEval = -Infinity;
		let moves = getAllMoves(
			gameCopy.board,
			currentPlayer,
			gameCopy.cols,
			gameCopy.cards,
			gameCopy.graveYard
		);

		moves.forEach((move) => {
			gameCopy = copyMoveRes(move);

			let evaluation = miniMax(gameCopy, 'blue', depth - 1).evaluation;
			maxEval = Math.max(maxEval, evaluation);
			if (maxEval === evaluation) {
				bestMove = copyMoveRes(move);
			}
		});
		return {
			bestMove: bestMove,
			evaluation: maxEval,
		};
	} else {
		let minEval = Infinity;
		let moves = getAllMoves(
			gameCopy.board,
			currentPlayer,
			gameCopy.cols,
			gameCopy.cards,
			gameCopy.graveYard
		);

		moves.forEach((move) => {
			gameCopy = copyMoveRes(move);

			let evaluation = miniMax(gameCopy, 'pink', depth - 1).evaluation;

			minEval = Math.min(minEval, evaluation);
			if (minEval === evaluation) {
				bestMove = copyMoveRes(move);
			}
		});
		return {
			bestMove: bestMove,
			evaluation: minEval,
		};
	}
};
