import { moveIsValid, rotateCards } from '../dispatch';
import { deepCopy } from './deepCopy';

export const getAllPieces = (board, currentPlayer, cols) => {
	let pieceData = {};
	for (let c = 0; c < board.length; c++) {
		for (let r = 0; r < board[0].length; r++) {
			let piece = board[c][r];
			if (piece && piece[0] === currentPlayer[0]) {
				pieceData[piece] = `${cols[c]}${r}`;
			}
		}
	}
	return pieceData;
};

const makeCurrentObject = (
	playerCards,
	pieces,
	pieceData,
	pieceIndex,
	cardIndex
) => {
	let piece = pieces[pieceIndex];
	let card = playerCards[cardIndex];

	return {
		card: card,
		piece: piece,
		player: pieces[pieceIndex][0] === 'p' ? 'pink' : 'blue',
		square: pieceData[piece],
	};
};

export const getAllMoves = (
	board,
	currentPlayer,
	cols,
	gameCards,
	graveYard
) => {
	let moves = [];
	const pieceData = getAllPieces(board, currentPlayer, cols);
	const pieces = Object.keys(pieceData);
	const playerCards = gameCards[currentPlayer];

	for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
		for (let cardIndex = 0; cardIndex < playerCards.length; cardIndex++) {
			let currentData = makeCurrentObject(
				playerCards,
				pieces,
				pieceData,
				pieceIndex,
				cardIndex
			);
			let boardCopy = deepCopy(board);
			let res = getValidMoves(
				boardCopy,
				currentData,
				cols,
				gameCards,
				graveYard
			);
			moves.push(...res);
		}
	}

	return moves;
};

export const getKingThreat = (moves, opposingKingSquare) => {
	let threats = 0;
	moves.forEach((move) => {
		if (move.square === opposingKingSquare) threats++;
	});
	return threats;
};

export const getOpposingKingSquare = (color, board, cols) => {
	let oppColor = color === 'Pink' ? 'B' : 'P';

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] === `${color}K`) return `${cols[i]}${j}`;
		}
	}
	return ``;
};

export const getValidMoves = (board, current, cols, gameCards, graveYard) => {
	let moves = [];
	cols.forEach((col) => {
		for (let i = 0; i < board[0].length; i++) {
			let target = {
				square: `${col}${i}`,
				piece: board[cols.indexOf(col)][i],
			};


			let res = moveIsValid(
				board,
				current,
				target,
				graveYard,
			);
			if (res.type === 'MOVE') {
				let newCards = rotateCards(current, gameCards).value;
				let winner = false;
				if (target.piece && target.piece[1] === 'K') winner = current.player;
				if(target.square === 'A2' && current.piece[1] === 'K') winner = current.player;
				moves.push({
					board: res.value.board,
					winner: winner,
					cards: newCards,
					graveYard: res.value.graveYard,
					cols: cols,
				});
			}
		}
	});
	return moves;
};

export const getEval = (board, currentPlayer, cols, gameCards, graveYard) => {
	let pieceData = getAllPieces(board, currentPlayer, cols);
	let pieces = Object.keys(pieceData);
	let pawns = pieces.filter((piece) => piece[1] !== 'K').length;
	let king = pieces.length - pawns;

	let allMoves = getAllMoves(board, currentPlayer, cols, gameCards, graveYard);
	let mobilityValue = allMoves.length;

	//create logic for squares here.
	// number of possible captures, and king attacks.
	let opposingKing = getOpposingKingSquare(currentPlayer, board, cols);
	let kingThreat = getKingThreat(allMoves, opposingKing);

	return {
		pawns: pawns,
		king: king,
		kingThreat: kingThreat,
		mobilityValue: mobilityValue,
	};
};
