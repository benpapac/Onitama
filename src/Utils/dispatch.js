import { deepCopy } from './AI/deepCopy';
import { cards } from './cards';
import { newGameState } from './gameState';

export const getRandomNumber = (length) => Math.floor(Math.random() * length);

export const chooseNewCard = (card, current) => {
	return {
		type: 'UPDATE_CURRENT',
		value: {
			...current,
			card: card,
		},
	};
};

export const chooseNewSquare = (pawn, location, current, target) => {
	let piece = '',
		square = '',
		type = '',
		obj = {};

	if (/p/.test(pawn) || /b/.test(pawn)) {
		piece = pawn;
		square = location;
	} else {
		piece = '';
		square = location;
	}

	if (pawn && pawn[0] === current.player[0]) {
		type = 'UPDATE_CURRENT';
		obj = current;
	} else if (current.piece && current.card) {
		type = 'UPDATE_TARGET';
		obj = target;
	} else type = 'INVALID';

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
	//this function currently produces a side effect on the argument, deck.
	let hand = [];
	for (let i = 0; i < 2; i++) {
		let randomInt = getRandomNumber(deck.length - 1);
		//this side effect will change the deck arg.
		hand.push(deck.splice(randomInt, 1)[0]);
	}
	return hand;
};

export const glowSquares = (cols, glowSquares) => {
	let board = deepCopy(newGameState.glowBoard);

	glowSquares.forEach((el) => {
		board[cols.indexOf(el[0])][parseInt(el[1])] = 'glowSquare';
	});

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

export const moveIsValid = (oldBoard, current, target, oldGraveYard) => {
	let coordinates = makeCoordinates(current.square, target.square);
	let board = deepCopy(oldBoard);
	let graveYard = oldGraveYard.length ? deepCopy(oldGraveYard) : [];

	let move = cards[current.card].move(
		current.player,
		target.piece,
		coordinates
	);

	// when being called to glow squares, target arg will carry a bool glow: true.
	// this prevents the move validator from unwittingly changing the game board.
	if (!target.glow && move) {
		board[coordinates.targetCol][coordinates.targetRow] = current.piece;
		board[coordinates.currentCol][coordinates.currentRow] = '';

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

export const rotateCards = (current, cards) => {
	let newCards = deepCopy(cards.gameCards);

	const currentPlayer = current.player;
	let playerCards = deepCopy(cards[currentPlayer]);
	let playedCardIndex = playerCards.indexOf(current.card);

	const playedCard = current.card;

	// put the played card at the bottom of the deck.
	newCards.splice(0, 0, playedCard);
	//out with the old, and in with the new, for the player cards.
	playerCards.splice(playedCardIndex, 1, newCards.pop());

	return {
		type: 'UPDATE_CARDS',
		value: {
			...cards,
			[currentPlayer]: playerCards,
			gameCards: newCards,
		},
	};
};

export const gameIsOver = (board, graveYard) => {
	if (board[0][2] === 'bK' || (graveYard.length && graveYard.includes('pK')))
		return {
			type: 'END_GAME',
			winner: 'Blue is the winner!',
		};
	else if (board[4][2] === 'pK' || graveYard.includes('bK'))
		return {
			type: 'END_GAME',
			winner: 'Pink is the winner!',
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

	console.log(newGameDeck);

	return {
		type: 'NEW_GAME',
		value: {
			pink: pink,
			blue: blue,
			gameCards: newGameDeck,
		},
	};
};

export const newTurn = (player) => {
	return {
		type: 'NEW_TURN',
		value: {
			square: '',
			piece: '',
			player: player === 'pink' ? 'blue' : 'pink',
		},
	};
};
