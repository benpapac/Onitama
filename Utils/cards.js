import * as pinkCoreCards from './pinkMovement';
import * as blueCoreCards from './blueMovement.js';

export const deck = ['boar', 'eel', 'mantis', 'ox', 'horse','cobra']

export const boar = {
	name: 'boar',
	move: () => {
		if (!pickMode) {
			if (targetPawn.classList.contains(currentPlayer.class)) return;
		}

		if (blueCoreCards.blueForwardOne() || blueCoreCards.blueLateralOne()) {
			return true;
		} else if (
			pinkCoreCards.pinkForwardOne() ||
			pinkCoreCards.pinkLateralOne()
		) {
			return true;
		} else {
			false;
		}
	},
	link: './assets/boar.png',
	rule: `Move forward, left, or right.`,
};

export const eel = {
	name: 'eel',
	move: () => {
		if (!pickMode) {
			if (targetPawn.classList.contains(currentPlayer.class)) return;
		}

		if (
			blueCoreCards.blueRightOne() ||
			blueCoreCards.blueLeftOneForwardOne() ||
			blueCoreCards.blueLeftOneBackwardOne() ||
			pinkCoreCards.pinkRightOne() ||
			pinkCoreCards.pinkLeftOneForwardOne() ||
			pinkCoreCards.pinkLeftOneBackwardOne()
		) {
			return true;
		} else {
			return false;
		}
	},
	link: './assets/eel.png',
	rule: `Move to the right, or diagonally left.`,
};

export const mantis = {
	name: 'mantis',
	move: () => {
		if (!pickMode) {
			if (targetPawn.classList.contains(currentPlayer.class)) return;
		}

		if (
			blueCoreCards.blueBackwardOne() ||
			blueCoreCards.blueLeftOneForwardOne() ||
			blueCoreCards.blueRightOneForwardOne()
		) {
			return true;
		} else if (
			pinkCoreCards.pinkBackwardOne() ||
			pinkCoreCards.pinkLeftOneForwardOne() ||
			pinkCoreCards.pinkRightOneForwardOne()
		) {
			return true;
		} else {
			return false;
		}
	},
	link: './assets/praying-mantis.png',
	rule: `Move back, or diagonally forward.`,
};

export const ox = {
	name: 'ox',
	move: () => {
		if (!pickMode) {
			if (targetPawn.classList.contains(currentPlayer.class)) return;
		}

		if (
			blueCoreCards.blueForwardOne() ||
			blueCoreCards.blueRightOne() ||
			blueCoreCards.blueBackwardOne()
		) {
			return true;
		} else if (
			pinkCoreCards.pinkForwardOne() ||
			pinkCoreCards.pinkRightOne() ||
			pinkCoreCards.pinkBackwardOne()
		) {
			return true;
		} else return false;
	},
	link: './assets/bull.png',
	rule: `Move forward, right or backward.`,
};

export const cobra = {
	name: 'cobra',
	move: () => {
		if (!pickMode) {
			if (targetPawn.classList.contains(currentPlayer.class)) return;
		}

		if (
			blueCoreCards.blueLeftOne() ||
			blueCoreCards.blueRightOneForwardOne() ||
			blueCoreCards.blueRightOneBackwardOne()
		) {
			return true;
		} else if (
			pinkCoreCards.pinkLeftOne() ||
			pinkCoreCards.pinkRightOneForwardOne() ||
			pinkCoreCards.pinkRightOneBackwardOne()
		) {
			return true;
		} else {
			return false;
		}
	},
	link: './assets/cobra.png',
	rule: 'Move left, or diagonally right.',
};

export const horse = {
	name: 'horse',
	move: () => {
		if (!pickMode) {
			if (targetPawn.classList.contains(currentPlayer.class)) return;
		}

		if (
			blueCoreCards.blueForwardOne() ||
			blueCoreCards.blueLeftOne() ||
			blueCoreCards.blueBackwardOne()
		) {
			return true;
		} else if (
			pinkCoreCards.pinkForwardOne() ||
			pinkCoreCards.pinkLeftOne() ||
			pinkCoreCards.pinkBackwardOne()
		) {
			return true;
		} else {
			return false;
		}
	},
	link: './assets/horse-head.png',
	rule: `Move forward, left or backward.`,
};
