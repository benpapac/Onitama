import { cards } from './cards';

export const getRandomNumber = (length) => Math.floor(Math.random() * length);

const makeCoordinates = (currentSquare, targetSquare) => {
	let A = 'A'.charCodeAt(0);
	let currentRow = parseInt(currentSquare[1]);
	let currentCol = currentSquare.charCodeAt(0)-A;

	let targetRow = parseInt(targetSquare[1]);
	let targetCol = targetSquare.charCodeAt(0)-A;

	return {
		currentRow: currentRow,
		currentCol: currentCol,
		targetRow: targetRow,
		targetCol: targetCol,
	};
};

export const glowSquares = (cols, glowSquares) => {
	console.log('glowing squares');
	let board = [
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
	];

	glowSquares.forEach(el => {
		board[ cols.indexOf( el[0] ) ][ parseInt(el[1]) ] = 'glowSquare';
	})

	console.log(board);
	return {
		type: 'UPDATE_GLOW',
		value: board,
	}
}


export const moveIsValid = (board, current, target, graveYard) => {
	let coordinates = makeCoordinates(current.square, target.square);

	// when being called to glow squares, target arg will carry a bool glow: true.
	// this prevents the move validator from unwittingly changing the game board.
	if(!target.glow){
		board[coordinates.targetCol][coordinates.targetRow] = current.piece;
		board[coordinates.currentCol][coordinates.currentRow] = null;

		if(target.piece) graveYard.push(target.piece);
	}

	if (cards[current.card].move(current.player, target.piece, coordinates)){
		return {
			type: 'MOVE',
			value: {
				board: board,
				graveYard: graveYard,
			},
		};
	}
	else return { type: 'INVALID' };
};

export const rotateCards = (current, gameCards) => {
	let currentPlayer = current.player.toLowerCase();

	let rotatedCardIndex = gameCards[currentPlayer].indexOf(current.card);

	let playerCards = gameCards[currentPlayer];
	const playedCard = playerCards[rotatedCardIndex];    
	gameCards.gameCards.splice(0, 0, playedCard);
	playerCards.push(gameCards.gameCards.pop());
	playerCards.splice(0,1);

	return {
		type: 'UPDATE_CARDS',
		value: {
			...gameCards,
			[currentPlayer]: playerCards,
			gameCards: gameCards.gameCards,
		},
	};
};

export const chooseNewCard = (card, current) => {
	console.log('new card');
	return { type: 'UPDATE_CURRENT',
	value: {
		...current,
		card: card,
	}
	};
};

export const createHand = (deck) => {
	let hand = [];
	for (let i = 0; i < 2; i++) {
		let randomInt = getRandomNumber(deck.length - 1);
		//this side effect will change the deck arg.
		hand.push(deck.splice(randomInt, 1)[0]);
	}
	return hand;
};

export const gameIsOver = (board, graveYard) => {
	console.log(board, graveYard);
	if( board[0][2] === 'BK' || ( graveYard.length && graveYard.includes('PK') )) return {
		type: 'END_GAME',
		winner: 'Blue',
		gameOver: true,
		
	}
	else if(board[4][2] === 'PK' || graveYard.includes('BK')) return {
		type: 'END_GAME',
		winner: 'Pink',
		gameOver: true,
	};

	else return {
		type: 'INVALID'
	}
}

export const newGame = () => {
	//update the gameCards.
	let newGameDeck = Object.keys(cards);
	console.log('new game deck');
	console.log(newGameDeck)
	let randomInt = getRandomNumber(newGameDeck.length - 1);

	newGameDeck.splice(randomInt, 1);



	//these functions contain side effects that change newGameDeck.
	let pink = createHand(newGameDeck);
	let blue = createHand(newGameDeck);

	console.log(newGameDeck, pink, blue);

	return {
		type: 'NEW_GAME',
		value: {
			pink: pink,
			blue: blue,
			gameCards: newGameDeck,
		},
	};
};

//updateCurrent, or something...
export const newTurn = (player) => {
	console.log('new turn.')
	return {
		type: 'NEW_TURN',
		value: {
			square: '',
			piece: '',
			player: player === 'Pink' ? 'Blue' : 'Pink',
		},
	};
};

export const chooseNewSquare = ( pawn, location, current, target) => {
	console.log('new square');
	//logic to determing if we're picking new current or new target.

	//logic to grab square data.
	let piece = '',
		square = '',
		type = '',
		obj = {};

	if (/P/.test(pawn) || /B/.test(pawn)) {
		piece = pawn;
		square = location;
	} else {
		piece = '';
		square = location;
	}


	if ( pawn && pawn[0] === current.player[0]) {
		type = 'UPDATE_CURRENT';
		obj = current;
	} else if(current.piece && current.card) {
		type = 'UPDATE_TARGET';
		obj = target;
	} else type = "INVALID";

	console.log(type);

	return {
		type: type,
		value: {
			...obj,
			square: square,
			piece: piece,
		},
	};
};

// export const switchCards = () => {
// 	if (board.current.player === 'pink') {
// 		updateGameState({type: 'UPDATE_CARDS', value: {
//             pink:
//             blue:
//             gameCards:
//         }})
// 	} else {
// 		currentCards = player2.cards;
// 		opponentCards = player1.cards;
// 	}
// }
