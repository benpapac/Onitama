//Constants
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

// ARRAYS //
const rowsArray = ['one', 'two', 'three', 'four', 'five'];
const columnsArray = ['A', 'B', 'C', 'D', 'E'];

const pawnNamesArray = [
	'pink-pawn-A',
	'pink-pawn-B',
	'pink-pawn-Sage',
	'pink-pawn-D',
	'pink-pawn-E',
	'blue-pawn-A',
	'blue-pawn-B',
	'blue-pawn-Sage',
	'blue-pawn-D',
	'blue-pawn-E',
];
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
		link: '',
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
		link: '',
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
		link: '',
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
		link: '',
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
		link: '',
	},
};

//cached DOM references

const board = document.querySelector(`.board`);
const message = document.querySelector('#message');
const aboutModal = document.querySelector('.about');
const endModal = document.querySelector('#end-modal');
const textBox = document.querySelector('#modal-textbox');
const aboutButton = document.querySelector('#about');
const closeButton = document.querySelector(`#close`);
const resetButton = document.querySelector('#reset-button');
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

//start the game!
startGame();
makePawns();
// EVENT LISTENERS //
board.addEventListener('click', handleClick);
aboutButton.addEventListener('click', () => (textBox.style.display = 'block'));
closeButton.addEventListener('click', () => (textBox.style.display = 'none'));
resetButton.addEventListener('click', startGame);
moveMenu.addEventListener('click', handleMenu);

// CORE FUNCTIONS /

function startGame() {
	//update State Variables and render()

	winner = false;
	gameOver = false;
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
	getPlayCards();
	assignPlayCards();
	showCards();
	render();
	aboutModal.style.display = 'flex';
}

function render() {
	//update the DOM

	if (!activePawn) return;
	if (!targetPawn) return;
	oldSquare.removeChild(activePawn);
	newSquare.appendChild(activePawn);
	//  `Player (is winner greater than 0? print 1 otherwise, print 2)  wins!`,
	if (gameOver) {
		removeShadows();
		deletePawns();
		makePawns();
		message.textContent = `Player ${winner.number > 0 ? 1 : 2} wins!`;
		endModal.style.display = 'flex';
	} else {
		message.textContent = `Player ${opponent.number > 0 ? 1 : 2}'s turn.`;
		rotateCards();
		switchCards();
		removeShadows();
		showCards();
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
	if (targetPawn.id === pawnsList.pinkPawnSage.id) {
		winner = player1;
		return (gameOver = true);
	}

	if (targetPawn.id === pawnsList.bluePawnSage.id) {
		winner = player2;
		return (gameOver = true);
	}

	if (
		activePawn.id === pawnsList.bluePawnSage.id &&
		newSquare.id === 'pink-temple'
	) {
		winner = player1;
		return (gameOver = true);
	}

	if (
		activePawn.id === pawnsList.pinkPawnSage.id &&
		newSquare.id === 'blue-temple'
	) {
		winner = player2;
		return (gameOver = true);
	}
	return (winner = null);
}

function randomCard() {
	let randomCardIndex = Math.floor(Math.random() * movementCardsArray.length);

	return movementCards[`${movementCardsArray[randomCardIndex]}`];
}

function getPlayCards() {
	let cardArray = [];
	for (let i = 0; i < 5; i++) {
		let newCard = randomCard();
		if (!cardArray.includes(newCard)) {
			playCardsArray.push(newCard);
			cardArray.push(newCard);
		} else {
			i--;
		}
	}
}

function assignPlayCards() {
	for (let i = 0; i < 2; i++) {
		player1.cards.push(playCardsArray.pop());
		player2.cards.push(playCardsArray.pop());

		currentCards = player1.cards;
		opponentCards = player2.cards;
	}
}

// ALL CALLBACK HANDLERS ON eventHandlers.js //
function handleClick(event) {
	console.log(event);
	if (pickMode) handlePick(event);
	else {
		handleMove(event);
	}

	///SCOPE ISSUE WITH BELOW FUNCTIONS///
	// render();

	// checkWinner(event);
	// newTurn();
}

function handleMenu(event) {
	let cardChoice = event.target.dataset.number;

	chosenCard = currentCards[parseInt(cardChoice)].move;
	console.log(`Current card: ${chosenCard.name}`);
}

function showCards() {
	console.log(opponentCards);
	console.log(currentCards[0].name);
	cardOne.innerText = currentCards[0].name;
	// cardOne.style.backgroundImage= url(currentCards[0].name.link);
	cardTwo.innerText = currentCards[1].name;
	// cardOne.style.backgroundImage= url(currentCards[1].link});
	cardThree.innerText = opponentCards[0].name;
	// cardOne.style.backgroundImage= url(${opponentCards[0].link});
	cardFour.innerText = opponentCards[1].name;
	// cardOne.style.backgroundImage= url(${opponentCards[1].link});
}

function deletePawns() {
	let deadArray = [];
	for (let i = 0; i < pawnNamesArray.length; i++) {
		let deadPawn = document.querySelector(`#${pawnNamesArray[i]}`);
		deadArray.push(deadPawn);
	}
	deadArray.forEach((element) => {
		ghostPawn = element;
		if (ghostPawn === null) return;
		ghostPawn.remove();
	});
}

function makePawns() {
	for (let column = 0; column < columnsArray.length; column++) {
		let pinkSquare = document.querySelector(
			`[data-row= ${rowsArray[4]}] [data-column= ${columnsArray[column]}]`
		);
		let blueSquare = document.querySelector(
			`[data-row= ${rowsArray[0]}] [data-column= ${columnsArray[column]}]`
		);

		let pinkPawn = document.createElement('a');
		pinkPawn.classList.add('pink-pawn');
		pinkPawn.classList.add('pawn');
		pinkPawn.id = pawnNamesArray[column];

		let bluePawn = document.createElement('a');
		bluePawn.classList.add('blue-pawn');
		bluePawn.classList.add('pawn');
		bluePawn.id = pawnNamesArray[column + 5];

		pinkSquare.appendChild(pinkPawn);
		blueSquare.appendChild(bluePawn);
	}
}
