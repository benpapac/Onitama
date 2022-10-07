import { deck } from './cards';


export const rotateCards = () => {
    let currentPlayer = board.current.player;
	let rotatedCardIndex = board.cards[currentPlayer].indexOf(chosenCard);

    let gameCards = board.gameCards;
    let playerCards = board.cards[board.current.player];

    const playedCard = playerCards.splice(player1.cards[rotatedCardIndex], 1)[0];
    gameCards.splice(0,0,playedCard);
    playerCards.push(gameCards.pop());

    updateGameState({type: 'UPDATE_CARDS', value: {
        ...board.cards,
        [currentPlayer]: playerCards,
        gameCards: gameCards,
    }});

	console.log(`Play Cards Array has ${playCardsArray.length} cards.`);
	console.log(playCardsArray);
	console.log(`Player 1 has ${player1.cards.length} cards.`);
	console.log(`Player 2 has ${player2.cards.length} cards.`);

	console.log(currentCards);
};

export const getRandomNumber = (length) => Math.floor( Math.random()*length);

export const createHand = (deck) => {
    let hand = [];
       for(let i = 0; i < 2; i++){
        randomInt = getRandomNumber(deck.length-1);
        //this side effect will change the deck arg.
        hand.push(deck.splice(randInt, 1));
    }
    return hand;
}

export const newGame = () => {
    //update the gameCards.
    let randomInt = getRandomNumber(deck.length-1);
    let newGameDeck = deck;

    let gameCards = newGameDeck.splice(randomInt, 1);

    //these functions contain side effects that change newGameDeck.
    let pink = createHand(newGameDeck);
    let blue = createHand(newGameDeck);

    updateGameState({type: 'UPDATE_CARDS', value: {
        pink: pink,
        blue: blue,
        gameCards: gameCards,
    }})

//updateCurrent, or something...
export const newTurn = () => {

    updateGameState({type: 'UPDATE_CURRENT', value:{
        square: '',
        piece: '',
        player: board.current.player === 'pink' ? 'blue' : 'pink',
    }})
}

export const chooseNewSquare = () => {
    //logic to grab square data.
    let piece = '', square = '';

    if(e.target.id.includes('/[A-F]/') ) {
        piece = e.target.id.substring(2);
        square = e.target.id.substring(0,2);
    } else {
        piece ='';
        square = e.target.parent.id;
    }

    updateGameState({type: "UPDATE_CURRENT", value: {
        ...board.current,
        square: square,
        piece: piece,
    }})
}

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
// };