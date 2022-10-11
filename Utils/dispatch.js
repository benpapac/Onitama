import { cards } from './cards';

export const getRandomNumber = (length) => Math.floor(Math.random() * length);

export const chooseNewCard = (card, current) => {
	console.log('new card');
	return {
		type: 'UPDATE_CURRENT',
		value: {
			...current,
			card: card,
		},
	};
};

export const chooseNewSquare = (pawn, location, current, target) => {
	//logic to determing if we're picking new current or new target.

	//logic to grab square data.
	let piece = '',
		square = '',
		type = '',
		obj = {};

	if (/P/.test(pawn) || /B/.test(pawn)) {
		console.log('player chose a piece');
		piece = pawn;
		square = location;
	} else {
		console.log('player chose a square');
		piece = '';
		square = location;
	}

	if (pawn && pawn[0] === current.player[0]) {
		console.log('new current');
		type = 'UPDATE_CURRENT';
		obj = current;
	} else if (current.piece && current.card) {
		console.log('new target');
		type = 'UPDATE_TARGET';
		obj = target;
	} else type = 'INVALID';

	// console.log(type);

	return {
		type: type,
		value: {
			...obj,
			square: square,
			piece: piece,
		},
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

export const glowSquares = (cols, glowSquares) => {
	console.log('glowing squares');
	let board = [
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
		['square', 'square', 'square', 'square', 'square'],
	];

	glowSquares.forEach((el) => {
		board[cols.indexOf(el[0])][parseInt(el[1])] = 'glowSquare';
	});

	console.log(board);
	return {
		type: 'UPDATE_GLOW',
		value: board,
	};
};

const makeCoordinates = (currentSquare, targetSquare) => {
	let A = 'A'.charCodeAt(0);
	let currentRow = parseInt(currentSquare[1]);
	let currentCol = currentSquare.charCodeAt(0) - A;

	let targetRow = parseInt(targetSquare[1]);
	let targetCol = targetSquare.charCodeAt(0) - A;

	return {
		currentRow: currentRow,
		currentCol: currentCol,
		targetRow: targetRow,
		targetCol: targetCol,
	};
};

export const moveIsValid = (board, current, target, graveYard) => {
	let coordinates = makeCoordinates(current.square, target.square);

	// when being called to glow squares, target arg will carry a bool glow: true.
	// this prevents the move validator from unwittingly changing the game board.

	let move = cards[current.card].move(
		current.player,
		target.piece,
		coordinates
	);

	if (!target.glow && move) {
		board[coordinates.targetCol][coordinates.targetRow] = current.piece;
		board[coordinates.currentCol][coordinates.currentRow] = null;

		if (target.piece) graveYard.push(target.piece);

		return {
			type: 'MOVE',
			value: {
				board: board,
				graveYard: graveYard,
			},
		};
	} else if (move) {
		return {
			type: 'MOVE',
		};
	} else return { type: 'INVALID' };
};

export const rotateCards = (current, gameCards) => {
	let currentPlayer = current.player.toLowerCase();

	let rotatedCardIndex = gameCards[currentPlayer].indexOf(current.card);
	let newCards = gameCards.gameCards.map((el) => el);

	let playerCards = gameCards[currentPlayer].map((el) => el);
	const playedCard = playerCards[rotatedCardIndex];
	// put the played card at the bottom of the deck.
	newCards.splice(0, 0, playedCard);
	//out with the old, THEN in with the new, for the player cards.
	playerCards.splice(playerCards.indexOf(playedCard), 1, newCards.pop());

	return {
		type: 'UPDATE_CARDS',
		value: {
			...gameCards,
			[currentPlayer]: playerCards,
			gameCards: newCards,
		},
	};
};

export const gameIsOver = (board, graveYard) => {
	console.log(board, graveYard);
	if (board[0][2] === 'BK' || (graveYard.length && graveYard.includes('PK')))
		return {
			type: 'END_GAME',
			winner: 'Blue is the winner!',
			gameOver: true,
		};
	else if (board[4][2] === 'PK' || graveYard.includes('BK'))
		return {
			type: 'END_GAME',
			winner: 'Pink is the winner!',
			gameOver: true,
		};
	else
		return {
			type: 'INVALID',
		};
};

export const newGame = () => {
	//update the gameCards.
	let newGameDeck = Object.keys(cards);
	let randomInt = getRandomNumber(newGameDeck.length - 1);

	newGameDeck.splice(randomInt, 1);

	//these functions contain side effects that change newGameDeck.
	let pink = createHand(newGameDeck);
	let blue = createHand(newGameDeck);

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
	console.log('new turn.');
	return {
		type: 'NEW_TURN',
		value: {
			square: '',
			piece: '',
			player: player === 'Pink' ? 'Blue' : 'Pink',
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
