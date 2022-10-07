export const gameStateReducer = (state, action) =>{
    switch (action.type) {
        
        case 'UPDATE_CHOSEN_SQUARE':
            return {
                ...state,
                chosenSquare: action.value,
            }

        case 'UPDATE_TARGET':
            return {
                ...state,
                target: action.value
            }
        
        case 'UPDATE_CURRENT':
            return {
                ...state,
                current: action.value,
            }
        
        case 'RESET': {
            return newGameState;
        }
        
        case 'MOVE_PIECE':
            return {
                ...state,
                board: {
                    ...state.board,
                   [state.target.square]: action.value,
                   [state.current.square]: null,
                }
            }

        case 'UPDATE_CARDS': 
        return {
            ...state,
            cards: action.value,
        }
            
            break;
    
        default:
            break;
    }
}

export const newGameState = {
	// board: an array of five  indeces (rows), at which will be an array (cols), each of which will hold five strings "pieces"
    cols: ['A','B','C','D','E'],
	board: [
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
	],
	current: {
		square: '',
		piece: '',
		player: 'pink',
	},
	target: {
		square: '',
		piece: '',
	},
	chosenSquare: {
        square: '',
        piece: ''
    },

	cards: {
		pink: ['',''],
		blue: ['',''],
		gameCards: ['','','','',''],
	},
};