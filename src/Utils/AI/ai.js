import deepEqual from '../deepEquals.js';
import createThreats from '../createThreats.js';
import miniMax from './new-miniMax.js';

import makeClone from '../clone.js';

const getAllThreats = (game) => {
	let threats = [];

	const pieces = game[game.currentPlayer].pieces;
	const hand = game[game.currentPlayer].hand;

	threats = pieces.reduce((accum, piece) => {
		let newThreats = hand.reduce((accum, card) => {
			let threats = createThreats(game, card, piece.name);
			accum = accum.concat(threats);
			return accum;
		}, []);

		accum = accum.concat(newThreats);
		return accum;
	}, []);

	return threats;
};

const getThreats = (threats, target) => {
	return threats.filter((threat) => deepEqual(threat, target)).length;
};

const getCenterThreats = (allThreats) => {
	let centerThreats = allThreats.reduce((count, threat) => {
		if (threat[0] === 2) {
			if (threat[1] >= 1 && threat[1] <= 3) {
				count++;
			}
		}
		return count;
	}, 0);

	return centerThreats;
};

const getKingVal = (game) => {
	if (!game.pinkPlayer.pieces.find((piece) => piece.name.includes('king'))) {
		return -1000;
	} else if (
		!game.bluePlayer.pieces.find((piece) => piece.name.includes('king'))
	) {
		return 1000;
	} else {
		return 0;
	}
};

export const getEval = (game, player, opponent) => {
	const pieces = game[player].pieces;
	const pawnCount = pieces.filter(
		(piece) => !piece.name.includes('king')
	).length;
	const kingCount = pieces.length - pawnCount;

	const allThreats = getAllThreats(game);
	const mobilityValue = allThreats.length;

	const centerThreats = getCenterThreats(allThreats);

	let oppKingIndex = game[opponent].pieces.findIndex((piece) =>
		piece.name.includes('king')
	);
	let oppKing = game[opponent].pieces[oppKingIndex];
	const kingThreats = oppKing ? getThreats(allThreats, oppKing.square) : 1000;

	let oppTemple = player === 'pinkPlayer' ? [4, 2] : [0, 2];
	const templeThreats = getThreats(allThreats, oppTemple);

	let kingVal = getKingVal(game);

	return {
		pawnCount: pawnCount,
		kingVal: kingVal,
		kingThreats: kingThreats,
		centerThreats: centerThreats,
		templeThreats: templeThreats,
		mobilityValue: mobilityValue,
	};
};

export const aiTurn = (game, depth) => {
	console.log('taking ai turn...');
	let clone = makeClone(game);

	let minimax = miniMax(game, depth);
	console.log('minimax: ', minimax);

	// this allows the ai to rotate cards.
	clone.chosenCard = minimax.bestMove.card;
	// clone.chosenPiece = minimax.bestMove.piece;
	let piece = clone[game.currentPlayer].pieces.find(
		(piece) => piece.name === minimax.bestMove.piece
	);

	let nextPlayer =
		game.currentPlayer === 'pinkPlayer' ? 'bluePlayer' : 'pinkPlayer';

	piece.move(minimax.bestMove.threat);
	clone.capturePiece(minimax.bestMove.threat, nextPlayer);
	clone.startNewTurn();
	return clone;
};
