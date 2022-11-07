import deepEqual from '../deepEquals';
import { moveIsValid, rotateCards } from '../dispatch';
import { deepCopy } from './deepCopy';
import { cards } from '../cards';

export const getAllThreats = (clone) => {
	let threats = [];
	
	let color = clone.currentPlayer.color;
	const pieces = clone.currentPlayer.pieces;
	const hand = clone.currentPlayer.hand;

	threats = pieces.reduce((accum, piece) => {
		let square = piece.square;

		let newThreats = hand.reduce((accum, card) => {
			let changes = cards[card].changes[color];
			res = clone.createThreats(changes, square);
			accum = accum.concat(...res);
			return accum;
		},[]);

		accum = accum.concat(...newThreats);
		return accum;
	},[]);

	return threats;
};

export const getThreats = (threats, target) => {
	return threats.filter((threat) => deepEqual(threat, target)).length;
};

export const getEval = (clone) => {
	const pieces = clone.currentPlayer.pieces;
	const pawnCount = pieces.filter(
		(piece) => !piece.name.includes('king')
	).length;
	const kingCount = pieces.length - pawnCount;

	const allThreats = getAllThreats(clone);
	const mobilityValue = allThreats.length;

	let oppKing = clone.nextPlayer.pieces.find(piece => piece.name.includes('king'));
	const kingThreats = getThreats(allThreats, oppKing.square);

	let oppTemple = clone.currentPlayer.color === 'pink' ? [4,2] : [0,2];
	const templeThreats = getThreats(allThreats, oppTemple);

	return {
		pawnCount: pawnCount,
		kingCount: kingCount,
		kingThreat: kingThreats,
		templeThreat: templeThreats,
		mobilityValue: mobilityValue,
	};
};
