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
//message = the place where I'll display player messages
//resetButton = the button that appears to reset the game.

//State Variables
let winner;
let turn;
let opponent;
let canMove;
let pickMode;
let activePawn;
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
	opponent = player2;
	canMove = false;
	pickMode = true;
	newSquare = null;
	oldSquare = null;
	// render();
}

function render() {
	//update the DOM

	//update h2#turnMessage on DOM
	//message.textContent =
	//      `Player (is winner greater than 0? print 1 otherwise, print 2)  wins!`
	//      `Player ${ winner > 0 ? 1: 2}

	//      `Player ${ turn > 0 ? 1: 2}`

	oldSquare.removeChild(activePawn);
	newSquare.append(activePawn);
}
function newTurn() {
	resetMovementStates();

	turn *= -1;
	if (turn === 1) opponent = player2;
	else opponent = player1;
}



function handleClick(event) {
	console.log(event);
	if (pickMode) handlePick(event);
	else handleMove(event);

	// if square isn't valid, get out.
	// if there's a winner, get out.

	// winner = checkWinner() && turn;
	//turn += -1
}

function handlePick(event) {
	// if it's not a pawn, or if it's my opponent's pawn, I can't pick it.
	if (!pawnNamesArray.includes(`${event.target.id}`)) return;
	if (event.target.classList.contains(`${opponent.class}`)) return;

	updateMovementStates(event);
	console.log(`active Pawn id: ${activePawn.id}`);
	console.log(`pickMode is: ${pickMode}`);
}


function checkWinner() {
	// if BKing is on PTemple || PKing is on BTemple
	// return true;
	//If BKing is gone || if PKing is gone
	//return true;
}
