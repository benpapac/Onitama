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
				newTurn: false,
				newCurrent: action.value.piece || action.value.card ? true : false,
			};

		case 'RESET': {
			return newGameState;
		}

		case 'MOVE':
			return {
				...state,
				board: action.value.board,
				newCurrent: false,
				graveYard: action.value.graveYard,
			};

		case 'UPDATE_CARDS':
			return {
				...state,
				cards: action.value,
			};

		case 'NEW_GAME':
			return {
				// board: an array of five  indeces (rows), at which will be an array (cols), each of which will hold five strings "pieces"
				board: [
					['p1', 'p2', 'pK', 'p4', 'p5'],
					['', '', '', '', ''],
					['', '', '', '', ''],
					['', '', '', '', ''],
					['b1', 'b2', 'bK', 'b4', 'b5'],
				],
				cards: {
					pink: action.value.pink,
					blue: action.value.blue,
					gameCards: action.value.gameCards,
				},
				cols: ['A', 'B', 'C', 'D', 'E'],
				current: {
					square: '',
					piece: '',
					player: 'pink',
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

				newGame: false,
				newCurrent: false,
				newTurn: false,
				gameOver: false,
				winner: false,

				target: {
					square: '',
					piece: '',
				},
			};

		case 'END_GAME':
			return {
				...state,
				winner: action.winner,
				gameOver: true,
			};

		case 'UPDATE_GLOW':
			return {
				...state,
				glowBoard: action.value,
				newCurrent: false,
			};

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

		case 'INVALID':
			return state;

		default:
			break;
	}
};

export const newGameState = {
	// board: an array of five  indeces (rows), at which will be an array (cols), each of which will hold five strings "pieces"
	board: [
		['p1', 'p2', 'pK', 'p4', 'p5'],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['b1', 'b2', 'bK', 'b4', 'b5'],
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
		player: 'pink',
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

	winner:
		"Designed by Shimpei Sato and published by Arcane Wonders in 2014, Onitama gives players a wonderfully unique experience. Any pawn can be moved, as long as it follows the rules of one of your movement cards! You rotate cards with your opponent, so be careful as you move.\n\n There are two ways to win:\nWay of Stone: Capture the opponent's Sage. \n Way of Water: Move your Sage to your opponent's temple.",
};
