import { cards } from './cards.js';
import deepEqual from './deepEquals.js';

const createThreats = (game, chosenCard, chosenPiece) => {
	let changes = cards[chosenCard].changes[game.currentPlayer.color];
	let piece = game.currentPlayer.pieces.find(
		(piece) => piece.name === chosenPiece
	);
	let square = piece.square;
	let threats = changes.map((change) => {
		let threat = change.map((coord, idx) => (coord += square[idx]));
		return threat;
	});
	//first, remove squares that are out of bounds.
	console.log('threats before filtering...', threats);
	let inBounds = threats.filter((threat) => {
		return threat[0] > -1 && threat[0] < 5 && threat[1] > -1 && threat[1] < 5;
	});
	console.log('threats after out of bounds: ', inBounds);

	//then, remove squares that conflict with pieces on the same team.
	// FLAG: currentPlayer could be the error here.

	let currentSquares = game.currentPlayer.pieces.map((piece) => piece.square);
	// console.log('current squares: ', currentSquares);

	let legalThreats = inBounds.filter(
		(threat) => !deepEqual(currentSquares, threat)
	);
	console.log('threats after same team...', legalThreats);

	if (!legalThreats.length) return [];
	else return legalThreats;
};

export default createThreats;
