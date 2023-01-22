import { cards } from './cards.js';
import deepEqual from './deepEquals.js';

const createThreats = (game, card, pieceName) => {
	let changes = cards[card].changes[game.currentPlayer];
	let piece = game[game.currentPlayer].pieces.find(
		(piece) => piece.name === pieceName
	);
	let square = piece.square;
	let threats = changes.map((change) => {
		let threat = change.map((coord, idx) => (coord += square[idx]));
		return threat;
	});
	//first, remove squares that are out of bounds.
	let inBounds = threats.filter((threat) => {
		return threat[0] > -1 && threat[0] < 5 && threat[1] > -1 && threat[1] < 5;
	});

	//then, remove squares that conflict with pieces on the same team.
	let currentSquares = game[game.currentPlayer].pieces.map(
		(piece) => piece.square
	);

	let legalThreats = inBounds.filter(
		(threat) => !deepEqual(currentSquares, threat)
	);

	if (!legalThreats.length) return [];
	else return legalThreats;
};

export default createThreats;
