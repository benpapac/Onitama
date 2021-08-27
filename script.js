//Constants
const player1 = 1;
const player2 = -1;

//cached DOM references

const board = document.querySelector(`#board`);
//message = the place where I'll display player messages
//resetButton = the button that appears to reset the game.

//State Variables
let winner;
let turn;
let pickMode;
let activePawn;

// EVENT LISTENER //

board.addEventListener('click', handleClick);

// FUNCTIONS //

function startGame() {}
//update State Variables and render()

//winner = false;
//turn = 1;
//render();
//pickMode = true;

function render() {}
//update the DOM

//update h2#turnMessage on DOM
//message.textContent =
//      `Player (is winner greater than 0? print 1 otherwise, print 2)  wins!`
//      `Player ${ winner > 0 ? 1: 2}

//      `Player ${ turn > 0 ? 1: 2}`

function handleClick(event) {
	console.log(event.target.id);
	// if it's pickmode, handlePick(0);

	//else handlePawn();

	// if square isn't valid, get out.
	// if there's a winner, get out.

	// winner = checkWinner() && turn;
	//turn += -1
}

function handlePick() {
	activePawn = evt.target.id;
	pickMode = !pickMode;
}

function handleMove(evt) {
	moves[activePawn] = null;
	moves[evt.target.id] = turn;
	pickMode = true;
	turn *= -1;
	render();
}

function checkWinner() {
	// if BKing is on PTemple || PKing is on BTemple
	// return true;
	//If BKing is gone || if PKing is gone
	//return true;
}
