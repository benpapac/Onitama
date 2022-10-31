import * as pinkCoreCards from './pinkMovement.js';
import * as blueCoreCards from './blueMovement.js';

export const deck = ['boar', 'eel', 'mantis', 'ox', 'horse', 'cobra'];

export const cards = {
	boar: {
		name: 'boar',
		changes: {
			pink: [
				[0, -1],
				[-1, 1],
				[1, 1],
			],
			blue: [
				[-1, -1],
				[1, -1],
				[0, 1],
			],
		},
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;
			if (player === 'blue') {
				if (
					blueCoreCards.blueForwardOne(coordinates) ||
					blueCoreCards.blueLateralOne(coordinates)
				)
					return true;
				else return false;
			} else if (
				pinkCoreCards.pinkForwardOne(coordinates) ||
				pinkCoreCards.pinkLateralOne(coordinates)
			)
				return true;
			else {
				return false;
			}
		},

		rule: `Move forward, left, or right.`,
	},

	eel: {
		name: 'eel',
		changes: {
			pink: [
				[1, 0],
				[-1, 1],
				[-1, -1],
			],
			blue: [
				[-1, 0],
				[1, -1],
				[1, 1],
			],
		},
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;
			if (player === 'blue') {
				if (
					blueCoreCards.blueRightOne(coordinates) ||
					blueCoreCards.blueLeftOneForwardOne(coordinates) ||
					blueCoreCards.blueLeftOneBackwardOne(coordinates)
				)
					return true;
				else return false;
			} else if (
				pinkCoreCards.pinkRightOne(coordinates) ||
				pinkCoreCards.pinkLeftOneForwardOne(coordinates) ||
				pinkCoreCards.pinkLeftOneBackwardOne(coordinates)
			)
				return true;
			else return false;
		},
		rule: `Move to the right, or diagonally left.`,
	},

	mantis: {
		name: 'mantis',
		changes: {
			pink: [
				[0, -1],
				[-1, 1],
				[1, 1],
			],
			blue: [
				[0, 1],
				[1, -1],
				[-1, -1],
			],
		},

		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'blue') {
				if (
					blueCoreCards.blueBackwardOne(coordinates) ||
					blueCoreCards.blueLeftOneForwardOne(coordinates) ||
					blueCoreCards.blueRightOneForwardOne(coordinates)
				)
					return true;
				else return false;
			} else if (
				pinkCoreCards.pinkBackwardOne(coordinates) ||
				pinkCoreCards.pinkLeftOneForwardOne(coordinates) ||
				pinkCoreCards.pinkRightOneForwardOne(coordinates)
			)
				return true;
			else return false;
		},
		rule: `Move back, or diagonally forward.`,
	},

	ox: {
		name: 'ox',
		changes: {
			pink: [
				[0, 1],
				[1, 0],
				[0, -1],
			],
			blue: [
				[0, -1],
				[-1, 0],
				[0, 1],
			],
		},

		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'blue') {
				if (
					blueCoreCards.blueForwardOne(coordinates) ||
					blueCoreCards.blueRightOne(coordinates) ||
					blueCoreCards.blueBackwardOne(coordinates)
				)
					return true;
				else return false;
			} else if (
				pinkCoreCards.pinkForwardOne(coordinates) ||
				pinkCoreCards.pinkRightOne(coordinates) ||
				pinkCoreCards.pinkBackwardOne(coordinates)
			)
				return true;
			else return false;
		},
		rule: `Move forward, right or backward.`,
	},

	cobra: {
		name: 'cobra',
		changes: {
			pink: [
				[0, -1],
				[-1, 1],
				[1, 1],
			],
			blue: [
				[-1, -1],
				[1, -1],
				[0, 1],
			],
		},

		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'blue') {
				if (
					blueCoreCards.blueLeftOne(coordinates) ||
					blueCoreCards.blueRightOneForwardOne(coordinates) ||
					blueCoreCards.blueRightOneBackwardOne(coordinates)
				)
					return true;
				else return false;
			} else if (
				pinkCoreCards.pinkLeftOne(coordinates) ||
				pinkCoreCards.pinkRightOneForwardOne(coordinates) ||
				pinkCoreCards.pinkRightOneBackwardOne(coordinates)
			)
				return true;
			else return false;
		},
		rule: 'Move left, or diagonally right.',
	},

	horse: {
		name: 'horse',
		changes: {
			pink: [
				[0, 1],
				[-1, 0],
				[0, -1],
			],
			blue: [
				[0, -1],
				[1, 0],
				[0, 1],
			],
		},

		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'blue') {
				if (
					blueCoreCards.blueForwardOne(coordinates) ||
					blueCoreCards.blueLeftOne(coordinates) ||
					blueCoreCards.blueBackwardOne(coordinates)
				)
					return true;
				else return false;
			} else if (
				pinkCoreCards.pinkForwardOne(coordinates) ||
				pinkCoreCards.pinkLeftOne(coordinates) ||
				pinkCoreCards.pinkBackwardOne(coordinates)
			)
				return true;
			else return false;
		},
		rule: `Move forward, left or backward.`,
	},
};
