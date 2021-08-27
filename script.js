//Constants
const player1 = {
	class: 'blue-pawn',
	number: 1,
};
const player2 = {
	class: 'pink-pawn',
	number: -1,
};
//cached DOM references

const board = document.querySelector(`#board`);
const message = document.querySelector('#message');
//message = the place where I'll display player messages
//resetButton = the button that appears to reset the game.

//State Variables
let winner;
let gameOver;
let turn;
let currentPlayer;
let opponent;
let canMove;
let pickMode;
let activePawn;
let targetPawn;
let newSquare;
let oldSquare;
let oldRow;
let oldColumn;

//start the game!
startGame();
// EVENT LISTENER //
board.addEventListener('click', handleClick);

// FUNCTIONS //

function startGame() {
	//update State Variables and render()
	winner = false;
	turn = 1;
	currentPlayer = player1;
	opponent = player2;
	canMove = false;
	pickMode = true;
	newSquare = null;
	oldSquare = null;
	// render();
}

function render() {
	//update the DOM

	//  `Player (is winner greater than 0? print 1 otherwise, print 2)  wins!`,
	if (gameOver) message.textContent = `Player ${winner > 0 ? 1 : 2} wins!`;
	else message.textContent = `Player ${opponent.number > 0 ? 1 : 2}'s turn.`;

	oldSquare.removeChild(activePawn);
	newSquare.appendChild(activePawn);
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
function handleClick(event) {
	console.log(event);
	if (pickMode) handlePick(event);
	else handleMove(event);

	// checkWinner(event);
	// newTurn();
}

function handlePick(event) {
	// if it's not a pawn, or if it's my opponent's pawn, I can't pick it.
	if (!pawnNamesArray.includes(`${event.target.id}`)) return;
	if (event.target.classList.contains(`${opponent.class}`)) return;

	updateMovementStates(event);
}

function getWinner() {
	// if either sage is gone, end game.

	if (
		activePawn.id === pawnsList.bluePawnSage.id &&
		newSquare.id === 'pink-temple'
	) {
		winner = player1;
		gameOver = true;
	} else if (
		activePawn.id === pawnsList.pinkPawnSage.id &&
		newSquare.id === 'blue-temple'
	) {
		winner = player2;
		gameOver = true;
	} else winner = null;
}
