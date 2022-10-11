import * as pinkCoreCards from './pinkMovement';
import * as blueCoreCards from './blueMovement.js';

export const deck = ['boar', 'eel', 'mantis', 'ox', 'horse', 'cobra'];
export const images = {
	boar: 'https://i.imgur.com/D0vyLD5.png',
	eel: 'https://i.imgur.com/I1teSub.png',
	mantis: 'https://i.imgur.com/HlbdsEj.png',
	ox: 'https://i.imgur.com/ZWGhxru.png',
	cobra: 'https://i.imgur.com/BvcAIxE.png',
	horse: 'https://i.imgur.com/AFi6ZrC.png',
};

export const cards = {
	boar: {
		name: 'boar',
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;
			if (player === 'Blue') {
				console.log('checking blue');
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
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;
			if (player === 'Blue') {
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
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'Blue') {
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
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'Blue') {
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
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'Blue') {
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
		move: (player, piece, coordinates) => {
			if (piece && piece[0] === player[0]) return false;

			if (player === 'Blue') {
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
