import { getEval, getAllMoves } from './ai';
import { deepCopy } from './deepCopy';

export const evaluate = (gameCopy) => {
	let pinkEval = getEval(gameCopy, 'pink');
	let blueEval = getEval(gameCopy, 'blue');
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
		} else if (key === 'current' || key === 'target')
			copy[key] = {
				square: move[key].square,
				piece: move[key].piece,
				player: move[key].player,
			};
		else copy[key] = deepCopy(move[key]);
	});
	return copy;
};

const findBestMove = (gameCopy, currentPlayer, depth) => {
	let bestMove = {};
	let op = 'max';
	let val = -Infinity;
	let oppPlayer = 'blue';
	if (currentPlayer === 'blue') {
		(op = 'min'), (val = Infinity), (oppPlayer = 'pink');
	}

	let moves = getAllMoves(gameCopy, currentPlayer);

	moves.forEach((move) => {
		gameCopy = copyMoveRes(move);

		let evaluation = miniMax(gameCopy, oppPlayer, depth - 1).evaluation;
		val = Math[op](val, evaluation);

		if (val === evaluation) bestMove = copyMoveRes(move);
	});
	return {
		bestMove: bestMove,
		evaluation: val,
	};
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

	if (depth === 0 || gameState.winner) {
		let evaluation = evaluate(gameCopy).evaluation;
		return { evaluation: evaluation };
	}

	if (currentPlayer === 'pink')
		return findBestMove(gameCopy, currentPlayer, depth);
	else return findBestMove(gameCopy, currentPlayer, depth);
};
