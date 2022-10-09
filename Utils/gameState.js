export const gameStateReducer = (state, action) => {
	switch (action.type) {

		case 'UPDATE_TARGET':
			return {
				...state,
				target: action.value,
			};

		case 'UPDATE_CURRENT':
			return {
				...state,
				current: action.value,
				newSquare: true,
			};

		case 'RESET': {
			return newGameState;
		}

		case 'MOVE':
			return {
				...state,
				board: action.value,
				newSquare: false,
			};

		case 'UPDATE_CARDS':
			return {
				...state,
				cards: action.value,
			};

		case 'NEW_GAME':
			return {
				...newGameState,
				cards: action.value,
				newGame: false,
			};

		case 'UPDATE_GLOW':
			return {
				...state,
				glowBoard: action.value,
				newSquare: false,
			}

		case 'NEW_TURN':
			return {
				...state,
				current: action.value,
				glowSquares: newGameState.glowSquares,
			};

		default:
			break;
	}
};

export const newGameState = {
	// board: an array of five  indeces (rows), at which will be an array (cols), each of which will hold five strings "pieces"
	cols: ['A', 'B', 'C', 'D', 'E'],
	board: [
		['P1', 'P2', 'PK', 'P4', 'P5'],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['B1', 'B2', 'BK', 'B4', 'B5'],
	],

	glowBoard: [
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
	],
	current: {
		square: '',
		piece: '',
		player: 'Pink',
		card: '',
	},

	newGame: true,
	newSquare: false,
	target: {
		square: '',
		piece: '',
	},

	cards: {
		pink: ['', ''],
		blue: ['', ''],
		gameCards: ['', '', '', '', ''],
	},
};
