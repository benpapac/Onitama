//Constants
const player1 = {
	name: 'player1',
	class: 'blue-pawn',
	number: 1,
};
const player2 = {
	name: 'player2',
	class: 'pink-pawn',
	number: -1,
};

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
//cached DOM references

const board = document.querySelector(`#board`);
const message = document.querySelector('#message');
const resetButton = document.querySelector('#reset-button');

//State Variables
let winner;
let gameOver;
let turn;
let currentPlayer;
let opponent;

let movementCard; //not currently in use.
let canMove;
let canAttack;
let pickMode;
let activePawn;
let targetPawn;

let newSquare;
let oldSquare;
let oldRow;
let oldColumn;

//start the game!
startGame();
makePawns();
// EVENT LISTENER //
board.addEventListener('click', handleClick);
resetButton.addEventListener('click', startGame);

// CORE FUNCTIONS //

function startGame() {
	//update State Variables and render()

    winner = false;
    gameOver = false;
	turn = 1;
	currentPlayer = player1;
	opponent = player2;
    
	canMove = false;
    canAttack= false;
	pickMode = true;
    activePawn = null;
    targetPawn = null;
    
	newSquare = null;
	oldSquare = null;
    oldRow = null;
    oldColumn = null;
	render();
}

function render() {
	//update the DOM

    if(!activePawn) return;
    oldSquare.removeChild(activePawn);
    newSquare.appendChild(activePawn);
	//  `Player (is winner greater than 0? print 1 otherwise, print 2)  wins!`,
	if (gameOver) {
        deletePawns();
        makePawns();
		message.textContent = `Player ${winner.number > 0 ? 1 : 2} wins!`;
		resetButton.style.display = 'block';
	} else message.textContent = `Player ${opponent.number > 0 ? 1 : 2}'s turn.`;

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

// ALL CALLBACK HANDLERS ON eventHandlers.js //
function handleClick(event) {
	console.log(event);
	if (pickMode) handlePick(event);
	else handleMove(event);

	// checkWinner(event);
	// newTurn();
}

function deletePawns() {
    let deadArray= [];
	for (let i = 0; i < pawnNamesArray.length; i++) {
		let deadPawn = document.querySelector(`#${pawnNamesArray[i]}`);
        deadArray.push(deadPawn);
    }
    deadArray.forEach(element => {
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
