import { deck, cards } from './cards';

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

export const glowSquares = (cols, glowBoard, glowSquares) => {
	console.log('glowing squares');
	let board = glowBoard;

	glowSquares.forEach(el => {
		board[ cols.indexOf( el[0] ) ][ parseInt(el[1]) ] = 'glowSquare';
	})
	return {
		type: 'UPDATE_GLOW',
		value: board,
	}
}


export const moveIsValid = (board, current, target) => {
	console.log('checking move');
	let newBoard = board;
	let coordinates = makeCoordinates(current.square, target.square);

	// when being called to glow squares, target arg will carry a bool glow: true.
	// this prevents the move validator from unwittingly changing the game board.
	if(!target.glow){
		newBoard[coordinates.targetRow][coordinates.targetCol] = current.piece;
		newBoard[coordinates.currentRow][coordinates.currentCol] = null;
	}

	if (cards[current.card].move(current.player, coordinates)){
		return {
			type: 'MOVE',
			value: newBoard,
		};
	}
	else return { type: 'INVALID' };
};

export const rotateCards = () => {
	let currentPlayer = board.current.player;
	let rotatedCardIndex = board.cards[currentPlayer].indexOf(chosenCard);

	let gameCards = board.gameCards;
	let playerCards = board.cards[board.current.player];

	const playedCard = playerCards.splice(player1.cards[rotatedCardIndex], 1)[0];
	gameCards.splice(0, 0, playedCard);
	playerCards.push(gameCards.pop());

	updateGameState({
		type: 'UPDATE_CARDS',
		value: {
			...board.cards,
			[currentPlayer]: playerCards,
			gameCards: gameCards,
		},
	});

	console.log(`Play Cards Array has ${playCardsArray.length} cards.`);
	console.log(playCardsArray);
	console.log(`Player 1 has ${player1.cards.length} cards.`);
	console.log(`Player 2 has ${player2.cards.length} cards.`);

	console.log(currentCards);
};

export const chooseNewCard = (card, current) => {
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

export const newGame = (deck) => {
	//update the gameCards.
	let randomInt = getRandomNumber(deck.length - 1);
	let newGameDeck = deck;

	let gameCards = newGameDeck.splice(randomInt, 1);

	//these functions contain side effects that change newGameDeck.
	let pink = createHand(newGameDeck);
	let blue = createHand(newGameDeck);

	return {
		type: 'NEW_GAME',
		value: {
			pink: pink,
			blue: blue,
			gameCards: gameCards,
		},
	};
};

//updateCurrent, or something...
export const newTurn = (player) => {
	console.log('new turn.')
	updateGameState({
		type: 'NEW_TURN',
		value: {
			square: '',
			piece: '',
			player: player === 'Pink' ? 'Blue' : 'Pink',
		},
	});
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


	if (pawn[0] === current.player[0]) {
		type = 'UPDATE_CURRENT';
		obj = current;
	} else {
		type = 'UPDATE_TARGET';
		obj = target;
	}

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
