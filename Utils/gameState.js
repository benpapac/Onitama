export const gameStateReducer = (state, action) => {
	switch (action.type) {

		case 'UPDATE_TARGET':
			return {
				...state,
				target: action.value,
				newSquare: 'target',
			};

		case 'UPDATE_CURRENT':
			return {
				...state,
				current: action.value,
				newSquare: 'current',
				newTurn: false,
			};

		case 'RESET': {
			return newGameState;
		}

		case 'MOVE':
			return {
				...state,
				board: action.value.board,
				newSquare: false,
				graveYard: action.value.graveYard,
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
				gameOver: false,
			};
		
		case 'END_GAME':
			return {
				...state,
				winner: action.winner,
				gameOver: true,
			}

		case 'UPDATE_GLOW':
			return {
				...state,
				glowBoard: action.value,
				newSquare: false,
			}

		case 'RESET_GLOW':
			return {
				...state,
				glowBoard: [
					['square', 'square', 'square', 'square', 'square'],
					['square', 'square', 'square', 'square', 'square'],
					['square', 'square', 'square', 'square', 'square'],
					['square', 'square', 'square', 'square', 'square'],
					['square', 'square', 'square', 'square', 'square'],
				],
			};

		case 'NEW_TURN':
			return {
				...state,
				current: action.value,
				glowBoard: newGameState.glowBoard,
				newTurn: true,
				target: newGameState.target,
			};

		default:
			break;
	}
};

export const newGameState = {
	// board: an array of five  indeces (rows), at which will be an array (cols), each of which will hold five strings "pieces"
	board: [
		['P1', 'P2', 'PK', 'P4', 'P5'],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['B1', 'B2', 'BK', 'B4', 'B5'],
	],
	cards: {
		pink: ['', ''],
		blue: ['', ''],
		gameCards: ['', '', '', '', ''],
	},
	cols: ['A', 'B', 'C', 'D', 'E'],
	current: {
		square: '',
		piece: '',
		player: 'Pink',
		card: '',
	},


	glowBoard: [
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
	],

	graveYard: [],

	newGame: true,
	newSquare: false,
	newTurn: false,
	gameOver: true,

	target: {
		square: '',
		piece: '',
	},
};
