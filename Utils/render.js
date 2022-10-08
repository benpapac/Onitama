import { deck } from './cards';

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

export const getRandomNumber = (length) => Math.floor(Math.random() * length);

export const createHand = (deck) => {
	let hand = [];
	for (let i = 0; i < 2; i++) {
		randomInt = getRandomNumber(deck.length - 1);
		//this side effect will change the deck arg.
		hand.push(deck.splice(randInt, 1));
	}
	return hand;
};

export const newGame = () => {
	//update the gameCards.
	let randomInt = getRandomNumber(deck.length - 1);
	let newGameDeck = deck;

	let gameCards = newGameDeck.splice(randomInt, 1);

	//these functions contain side effects that change newGameDeck.
	let pink = createHand(newGameDeck);
	let blue = createHand(newGameDeck);

	updateGameState({
		type: 'UPDATE_CARDS',
		value: {
			pink: pink,
			blue: blue,
			gameCards: gameCards,
		},
	});
};

//updateCurrent, or something...
export const newTurn = () => {
	updateGameState({
		type: 'UPDATE_CURRENT',
		value: {
			square: '',
			piece: '',
			player: board.current.player === 'Pink' ? 'Blue' : 'Pink',
		},
	});
};

export const chooseNewSquare = (e, current, target) => {
	e.preventDefault();
	//logic to determing if we're picking new current or new target.

	//logic to grab square data.
	let piece = '',
		square = '',
		type = '',
		obj = {};

	if (/P/.test(e.target.id) || /B/.test(e.target.id)) {
		piece = e.target.id;
		square = e.target.parentElement.id;
	} else {
		piece = '';
		square = e.target.parentElement.id;
	}

    console.log(e.target.id)

	if (e.target.id[0] === current.player[0] ) {
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

	return e.target.id;
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
