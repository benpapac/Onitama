import deepEqual from '../deepEquals';
import { cards } from '../cards';
import createThreats from '../createThreats';

export const getAllThreats = (game) => {
	let threats = [];

	const pieces = game.currentPlayer.pieces;
	const hand = game.currentPlayer.hand;

	threats = pieces.reduce((accum, piece) => {
		let newThreats = hand.reduce((accum, card) => {
			let threats = createThreats(game, card, piece.name);
			accum = accum.concat(...threats);
			return accum;
		}, []);

		accum = accum.concat(...newThreats);
		return accum;
	}, []);

	return threats;
};

export const getThreats = (threats, target) => {
	return threats.filter((threat) => deepEqual(threat, target)).length;
};

export const getEval = (game) => {
	const pieces = game.currentPlayer.pieces;
	const pawnCount = pieces.filter(
		(piece) => !piece.name.includes('king')
	).length;
	const kingCount = pieces.length - pawnCount;

	const allThreats = getAllThreats(game);
	const mobilityValue = allThreats.length;

	let oppKing = game.nextPlayer.pieces.find((piece) =>
		piece.name.includes('king')
	);
	const kingThreats = oppKing ? getThreats(allThreats, oppKing.square) : 1000;

	let oppTemple = game.currentPlayer.color === 'pink' ? [4, 2] : [0, 2];
	const templeThreats = getThreats(allThreats, oppTemple);

	return {
		pawnCount: pawnCount,
		kingCount: kingCount,
		kingThreats: kingThreats,
		templeThreats: templeThreats,
		mobilityValue: mobilityValue,
	};
};
