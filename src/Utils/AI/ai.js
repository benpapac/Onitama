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

export const getAllMoves = (gameCopy, currentPlayer) => {
	console.log('gameCopy: ', gameCopy);
	let moves = [];
	const pieceData = getAllPieces(gameCopy.board, currentPlayer, gameCopy.cols);
	const pieces = Object.keys(pieceData);
	const playerCards = gameCopy.cards[currentPlayer];

	for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
		for (let cardIndex = 0; cardIndex < playerCards.length; cardIndex++) {
			let currentData = makeCurrentObject(
				playerCards,
				pieces,
				pieceData,
				pieceIndex,
				cardIndex
			);
			let boardCopy = deepCopy(gameCopy.board);
			let res = getValidMoves(
				boardCopy,
				currentData,
				gameCopy.cols,
				gameCopy.cards,
				gameCopy.graveYard
			);
			moves.push(...res);
		}
	}

	return moves;
};

export const getKingThreat = (moves, opposingKingSquare) => {
	let threats = 0;
	moves.forEach((move) => {
		if (move.target.square === opposingKingSquare) threats++;
	});
	return threats;
};

export const getOpposingKingSquare = (oppColor, board, cols) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] === `${oppColor}K`) return `${cols[i]}${j}`;
		}
	}
	return ``;
};

export const getTempleThreat = (oppTemple, moves) => {
	//practicing a functional programming approach...
	return moves.filter((move) => move.target.square === oppTemple).length;
};

export const getValidMoves = (board, current, cols, gameCards, graveYard) => {
	let moves = [];
	cols.forEach((col) => {
		for (let i = 0; i < board[0].length; i++) {
			let target = {
				square: `${col}${i}`,
				piece: board[cols.indexOf(col)][i],
			};

			let res = moveIsValid(board, current, target, graveYard);
			if (res.type === 'MOVE') {
				console.log(target.square);
				let newCards = rotateCards(current, gameCards).value;
				let winner = false;
				if (target.piece && target.piece[1] === 'K') winner = current.player;
				if (target.square === 'A2' && current.piece[1] === 'K')
					winner = current.player;
				moves.push({
					current: current,
					board: res.value.board,
					winner: winner,
					cards: newCards,
					graveYard: res.value.graveYard,
					cols: cols,
					target: target,
				});
			}
		}
	});
	return moves;
};

export const getEval = (gameCopy, currentPlayer) => {
	let pieceData = getAllPieces(gameCopy.board, currentPlayer, gameCopy.cols);
	let pieces = Object.keys(pieceData);
	let pawns = pieces.filter((piece) => piece[1] !== 'K').length;
	let king = pieces.length - pawns;

	let allMoves = getAllMoves(gameCopy, currentPlayer);
	let mobilityValue = allMoves.length;

	//create logic for squares here.
	// number of possible captures, and king attacks.
	const oppColor = currentPlayer === 'pink' ? 'blue' : 'pink';
	let opposingKing = getOpposingKingSquare(
		oppColor,
		gameCopy.board,
		gameCopy.cols
	);
	let kingThreat = getKingThreat(allMoves, opposingKing);

	const oppTemple = currentPlayer === 'pink' ? 'E2' : 'A2';
	const templeThreat = getTempleThreat(oppTemple, allMoves);

	return {
		pawns: pawns,
		king: king,
		kingThreat: kingThreat,
		templeThreat: templeThreat,
		mobilityValue: mobilityValue,
	};
};
