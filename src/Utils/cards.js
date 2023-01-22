export const deck = ['boar', 'eel', 'mantis', 'ox', 'horse', 'cobra'];

export const cards = {
	boar: {
		name: 'boar',
		changes: {
			pinkPlayer: [
				[0, -1],
				[1, 0],
				[0, 1],
			],
			bluePlayer: [
				[0, 1],
				[-1, 0],
				[0, -1],
			],
		},
		rule: `Move forward, left, or right.`,
	},

	eel: {
		name: 'eel',
		changes: {
			pinkPlayer: [
				[0, 1],
				[-1, -1],
				[1, -1],
			],
			bluePlayer: [
				[0, -1],
				[1, 1],
				[-1, 1],
			],
		},
		rule: `Move to the right, or diagonally left.`,
	},

	mantis: {
		name: 'mantis',
		changes: {
			pinkPlayer: [
				[-1, 0],
				[1, -1],
				[1, 1],
			],
			bluePlayer: [
				[1, 0],
				[-1, 1],
				[-1, -1],
			],
		},
		rule: `Move back, or diagonally forward.`,
	},

	ox: {
		name: 'ox',
		changes: {
			pinkPlayer: [
				[1, 0],
				[0, 1],
				[-1, 0],
			],
			bluePlayer: [
				[-1, 0],
				[0, -1],
				[1, 0],
			],
		},
		rule: `Move forward, right or backward.`,
	},

	cobra: {
		name: 'cobra',
		changes: {
			pinkPlayer: [
				[0, -1], //left
				[-1, 1], //for+right
				[1, 1], //back+right
			],
			bluePlayer: [
				[0, 1], //left
				[-1, -1], //forw+right
				[1, -1], //back+right
			],
		},

		rule: 'Move left, or diagonally right.',
	},

	horse: {
		name: 'horse',
		changes: {
			pinkPlayer: [
				[1, 0], //forward
				[0, -1], //left
				[-1, 0], //back
			],
			bluePlayer: [
				[-1, 0], //forward
				[0, 1], //left
				[1, 0], //backward
			],
		},
		rule: `Move forward, left or backward.`,
	},
};
