export const deck = ['boar', 'eel', 'mantis', 'ox', 'horse', 'cobra'];

export const cards = {
	boar: {
		name: 'boar',
		changes: {
			pink: [
				[0, -1],
				[1, 0],
				[0, 1],
			],
			blue: [
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
			pink: [
				[0, 1],
				[-1, -1],
				[1, -1],
			],
			blue: [
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
			pink: [
				[-1, 0],
				[1, -1],
				[1, 1],
			],
			blue: [
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
			pink: [
				[1, 0],
				[0, 1],
				[-1, 0],
			],
			blue: [
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
			pink: [
				[0, -1], //left
				[-1, 1], //for+right
				[1, 1], //back+right
			],
			blue: [
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
			pink: [
				[1, 0], //forward
				[0, -1], //left
				[-1, 0], //back
			],
			blue: [
				[-1, 0], //forward
				[0, 1], //left
				[1, 0], //backward
			],
		},
		rule: `Move forward, left or backward.`,
	},
};
