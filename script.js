///MENU///
/*
Constants: Lines 10-213.
	Core Constants: line 16
	Arrays: Line 33
	Movement Cards: Line 51
	Cashed Dome References: Line 206
	State Variables: Line 225
	Event Listeners: Line 255
	Core Functions: Line 269
	Core Card Mechanics: Line 371
	Core Event Handlers: Line 395
	Card Art & Info: Line 407
	Make & Delete Pawns: Line 464
*/
//Constants
const body = document.body;
const blurb = document.createElement('p');

const player1 = {
	name: 'player1',
	class: 'blue-pawn',
	number: 1,
	cards: [],
};
const player2 = {
	name: 'player2',
	class: 'pink-pawn',
	number: -1,
	cards: [],
};

const movementCardsArray = ['boar', 'mantis', 'ox', 'eel', 'cobra', 'horse'];

// MOVEMENT CARDS //
const movementCards = {
	boar: {
		name: 'boar',
		move: () => {
			if (!pickMode) {
				if (targetPawn.classList.contains(currentPlayer.class)) return;
			}

			if (blueCoreCards.blueForwardOne() || blueCoreCards.blueLateralOne()) {
				return true;
			} else if (
				pinkCoreCards.pinkForwardOne() ||
				pinkCoreCards.pinkLateralOne()
			) {
				return true;
			} else {
				false;
			}
		},
		link: './assets/boar.png',
		rule: `Move forward, left, or right.`,
	},

	eel: {
		name: 'eel',
		move: () => {
			if (!pickMode) {
				if (targetPawn.classList.contains(currentPlayer.class)) return;
			}

			if (
				blueCoreCards.blueRightOne() ||
				blueCoreCards.blueLeftOneForwardOne() ||
				blueCoreCards.blueLeftOneBackwardOne() ||
				pinkCoreCards.pinkRightOne() ||
				pinkCoreCards.pinkLeftOneForwardOne() ||
				pinkCoreCards.pinkLeftOneBackwardOne()
			) {
				return true;
			} else {
				return false;
			}
		},
		link: './assets/eel.png',
		rule: `Move to the right, or diagonally left.`,
	},

	mantis: {
		name: 'mantis',
		move: () => {
			if (!pickMode) {
				if (targetPawn.classList.contains(currentPlayer.class)) return;
			}

			if (
				blueCoreCards.blueBackwardOne() ||
				blueCoreCards.blueLeftOneForwardOne() ||
				blueCoreCards.blueRightOneForwardOne()
			) {
				return true;
			} else if (
				pinkCoreCards.pinkBackwardOne() ||
				pinkCoreCards.pinkLeftOneForwardOne() ||
				pinkCoreCards.pinkRightOneForwardOne()
			) {
				return true;
			} else {
				return false;
			}
		},
		link: './assets/praying-mantis.png',
		rule: `Move back, or diagonally forward.`,
	},

	ox: {
		name: 'ox',
		move: () => {
			if (!pickMode) {
				if (targetPawn.classList.contains(currentPlayer.class)) return;
			}

			if (
				blueCoreCards.blueForwardOne() ||
				blueCoreCards.blueRightOne() ||
				blueCoreCards.blueBackwardOne()
			) {
				return true;
			} else if (
				pinkCoreCards.pinkForwardOne() ||
				pinkCoreCards.pinkRightOne() ||
				pinkCoreCards.pinkBackwardOne()
			) {
				return true;
			} else return false;
		},
		link: './assets/bull.png',
		rule: `Move forward, right or backward.`,
	},

	cobra: {
		name: 'cobra',
		move: () => {
			if (!pickMode) {
				if (targetPawn.classList.contains(currentPlayer.class)) return;
			}

			if (
				blueCoreCards.blueLeftOne() ||
				blueCoreCards.blueRightOneForwardOne() ||
				blueCoreCards.blueRightOneBackwardOne()
			) {
				return true;
			} else if (
				pinkCoreCards.pinkLeftOne() ||
				pinkCoreCards.pinkRightOneForwardOne() ||
				pinkCoreCards.pinkRightOneBackwardOne()
			) {
				return true;
			} else {
				return false;
			}
		},
		link: './assets/cobra.png',
		rule: 'Move left, or diagonally right.',
	},

	horse: {
		name: 'horse',
		move: () => {
			if (!pickMode) {
				if (targetPawn.classList.contains(currentPlayer.class)) return;
			}

			if (
				blueCoreCards.blueForwardOne() ||
				blueCoreCards.blueLeftOne() ||
				blueCoreCards.blueBackwardOne()
			) {
				return true;
			} else if (
				pinkCoreCards.pinkForwardOne() ||
				pinkCoreCards.pinkLeftOne() ||
				pinkCoreCards.pinkBackwardOne()
			) {
				return true;
			} else {
				return false;
			}
		},
		link: './assets/horse-head.png',
		rule: `Move forward, left or backward.`,
	},
};

//cached DOM references
const board = document.querySelector(`#board`);
const message = document.querySelector('#message');

//Modals and buttons
const aboutModal = document.querySelector('.modal');
const endModal = document.querySelector('#end-modal');

const aboutButton = document.querySelector('#about-button');
const closeButton = document.querySelector(`#close`);
const resetButton = document.querySelector('#reset-button');

// CARD Constants
const moveMenu = document.querySelector('#move-menu');
const cardOne = document.querySelector('#move-card-1');
const cardTwo = document.querySelector('#move-card-2');
const cardThree = document.querySelector('#move-card-3');
const cardFour = document.querySelector('#move-card-4');

//State Variables
let winner;
let gameOver;
let turn;
let currentPlayer;
let opponent;

let playCardsArray = [];
let chosenCard;
let currentCards = []; //not currently in use.
let opponentCards = [];

let canMove;
let canAttack;
let pickMode;
let activePawn;
let targetPawn;

let newSquare;
let oldSquare;
let shadowSquare;
let oldRow;
let oldColumn;

let hoveredCard;
let ruleChoice;

//start the game!
startGame();
makePawns();
// EVENT LISTENERS //
board.addEventListener('click', handleClick);
aboutButton.addEventListener(
	'click',
	() => (aboutModal.style.display = 'block')
);
body.addEventListener('click', (event) => {
	if (event.target.classList.contains('about-modal')) {
		aboutModal.style.display = 'none';
	}
});

closeButton.addEventListener('click', () => {
	aboutModal.style.display = 'none';
});
resetButton.addEventListener('click', startGame);
moveMenu.addEventListener('mouseover', handleMenu);
body.addEventListener('mouseover', handleRules);

// CORE FUNCTIONS //

function startGame() {
	//update State Variables and render()

	winner = false;
	turn = 1;
	currentPlayer = player1;
	opponent = player2;

	canMove = false;
	canAttack = false;
	pickMode = true;
	activePawn = null;
	targetPawn = null;

	newSquare = null;
	oldSquare = null;
	oldRow = null;
	oldColumn = null;

	playCardsArray = [];
	player1.cards = [];
	player2.cards = [];
	getPlayCards();
	assignPlayCards();
	showCards();
	render();
	
	endModal.style.display = 'none';
}

//update the DOM
function render() {
	if (!activePawn) return;
	if (!targetPawn) return;
	oldSquare.removeChild(activePawn);
	newSquare.appendChild(activePawn);

	if (winner) {
		removeShadows();
		deletePawns();
		makePawns();
		message.textContent = `Player ${winner.number > 0 ? 1 : 2} wins!`;
		endModal.style.display = 'block';
		if (hoveredCard) hoveredCard.style.backgroundColor = null;
	} else {
		message.textContent = `Player ${opponent.number > 0 ? 1 : 2}'s turn.`;
		rotateCards();
		switchCards();
		removeShadows();
		showCards();
		if (hoveredCard) hoveredCard.style.backgroundColor = null;
		chosenCard = null;
	}
}
function newTurn() {
	resetMovementStates();
	turn *= -1;

	if (turn === 1) {
		currentPlayer = player1;
		opponent = player2;
	} else {
		currentPlayer = player2;
		opponent = player1;
	}
}
function getWinner(targetPawn) {
	// if either sage is gone, end game.
	if (targetPawn.id === 'pink-pawn-Sage') {
		winner = player1;
		return (gameOver = true);
	}

	if (targetPawn.id === 'blue-pawn-Sage') {
		winner = player2;
		return (gameOver = true);
	}

	if (activePawn.id === 'blue-pawn-Sage' && newSquare.id === 'pink-temple') {
		winner = player1;
		return (gameOver = true);
	}

	if (activePawn.id === 'pink-pawn-Sage' && newSquare.id === 'blue-temple') {
		winner = player2;
		return (gameOver = true);
	}
	return (winner = null);
}

function randomCard() {
	let randomCardIndex = Math.floor(Math.random() * movementCardsArray.length);

	return movementCards[`${movementCardsArray[randomCardIndex]}`];
}

// Core Card Mechanics //
function getPlayCards() {
	let deck = new Set();
	for (let i = 0; i < 5; i++) {
		let newCard = randomCard();
		if (!deck.has(newCard)) {
			playCardsArray.push(newCard);
			deck.add(newCard);
		} else {
			i--;
		}
	}
}

function assignPlayCards() {
	for (let i = 0; i < 2; i++) {
		player1.cards.push(playCardsArray.pop());
		player2.cards.push(playCardsArray.pop());
	}

	currentCards = player1.cards;
	opponentCards = player2.cards;
}

// ALL CALLBACK HANDLERS ON eventHandlers.js //
function handleClick(event) {
	if (pickMode) handlePick(event);
	else {
		handleMove(event);
	}
}

function handleMenu(event) {
	event.preventDefault();
	if (!event.target.classList.contains('card')) return;
	let cardChoice = parseInt(event.target.dataset.number) - 1;
	chosenCard = currentCards[parseInt(cardChoice)].move;
	
	removeShadows();
	if (activePawn) {
		glowShadowSquares();
	}
}



/// MAKE CARD ART & INFO
function handleRules(event) {
	if (!event.target.classList.contains('card')) return;
	if (event.target.classList.contains('hovered')) return;
	if (hoveredCard) hoveredCard.style.backgroundColor = null;

	let cardChoice = parseInt(event.target.dataset.number);

	prepBlurb(cardChoice, hoveredCard, ruleChoice);

	setBlurbStyles(cardChoice);
	hoveredCard.appendChild(blurb);
}

function setBlurbStyles(cardChoice) {
	blurb.innerText = ruleChoice;
	blurb.style.fontSize = '18px';
	blurb.style.fontWeight = '500';
	blurb.style.color = 'rgba(255,255,255,1)';
	hoveredCard.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
	blurb.dataset.number = `${cardChoice}`;
}

function prepBlurb(cardChoice) {
	if (cardChoice === 1) {
		hoveredCard = cardOne;
		ruleChoice = currentCards[cardChoice - 1].rule;
	} else if (cardChoice === 2) {
		hoveredCard = cardTwo;
		ruleChoice = currentCards[cardChoice - 1].rule;
	} else if (cardChoice === 3) {
		hoveredCard = cardThree;
		ruleChoice = opponentCards[cardChoice - 3].rule;
	} else {
		hoveredCard = cardFour;
		ruleChoice = opponentCards[cardChoice - 3].rule;
	}
}

function showCards() {
	currentCards.forEach((card, idx) => {
		const node = document.querySelector(`#move-card-${idx + 1}`);
		node.innerText = card.name;
		node.style.backgroundImage = `url(${card.link})`;
		node.style.backgroundSize = 'cover';
	});

	opponentCards.forEach((card, idx) => {
		const node = document.querySelector(`#move-card-${idx + 3}`);
		node.innerText = card.name;
		node.style.backgroundImage = `url(${card.link})`;
		node.style.backgroundSize = 'cover';
	});
}

/// MAKE AND DELETE PAWNS ///
function deletePawns() {
	for (let i = 0; i < 5; i++) {
		let deadPinkPawn = document.querySelector(`#pink-pawn-${i === 2 ? 'Sage' : columns[i]}`);
		let deadBluePawn = document.querySelector(`#blue-pawn-${i === 2 ? 'Sage' : columns[i]}`);

		
		if (deadPinkPawn !== null) {
			deadPinkPawn.remove();
		}

		if (deadBluePawn !== null) {
			deadBluePawn.remove();
		}
	}
}

function makePawns() {
	for (let column = 0; column < columns.length; column++) {
		let pinkSquare = document.querySelector(
			`[data-row= ${rows[4]}] [data-column= ${columns[column]}]`
		);
		let blueSquare = document.querySelector(
			`[data-row= ${rows[0]}] [data-column= ${columns[column]}]`
		);

		let pinkPawn = document.createElement('a');
		pinkPawn.classList.add('pink-pawn');
		pinkPawn.classList.add('pawn');
		pinkPawn.id = `pink-pawn-${column === 2 ? 'Sage' : columns[column]}`;

		let bluePawn = document.createElement('a');
		bluePawn.classList.add('blue-pawn');
		bluePawn.classList.add('pawn');
		bluePawn.id = `blue-pawn-${column === 2 ? 'Sage' : columns[column]}`;

		pinkSquare.appendChild(pinkPawn);
		blueSquare.appendChild(bluePawn);
	}
}
