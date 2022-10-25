import React, { useContext, useEffect } from 'react';
import { View, ImageBackground, Pressable } from 'react-native';
import { Context } from '../Utils/context';
import { chooseNewSquare, newTurn, moveIsValid, glowSquares, rotateCards, gameIsOver, chooseNewCard} from '../Utils/dispatch';
import { cards, images } from '../Utils/cards';

import PlayerCards from './CardPanel';
import Pawn from './Pawn'

import { BoardStyles, BoardStyles as styles} from '../StyleSheets/BoardStyles';
import { miniMax } from '../Utils/AI/miniMax';

const Board = () => {
    const { gameState, dispatch} = useContext(Context);
    const squareBackground = 'https://i.imgur.com/fmofDFG.jpg';

    const showPossibleMoves = (gameState) => {
          let squares = [];
                if(gameState.newCurrent){
                    gameState.cols.forEach(el => {
                        for(let i=0; i<gameState.board[0].length; i++){
                            let res = moveIsValid(gameState.board, gameState.current, {square: `${el}${i}`, piece: gameState.board[gameState.cols.indexOf(el)][i], glow: true}, gameState.graveYard);
                            if(res.type === 'MOVE') {
                                squares.push(`${el}${i}`);
                            }
                        }
                    });
                    dispatch(glowSquares(gameState.cols, squares));
                }
        return squares;
    }

    const takeAiTurn = () => {
        let miniMaxRes = miniMax(gameState, gameState.current.player, 2);

            // the ai uses rotateCards to simulate card rotation as it searches each depth. 
            //The card left in the gameCards array is the card that was used to produce this move.
            let usedCard = miniMaxRes.bestMove.cards.gameCards[0];

            dispatch({
                type: 'MOVE', 
                value: {
                board: miniMaxRes.bestMove.board,
                graveYard: miniMaxRes.bestMove.graveYard,
                },
            })

            const gameOver = gameIsOver(gameState.board, miniMaxRes.bestMove.graveYard);

            if(gameOver.type === 'INVALID'){
                dispatch(rotateCards({...gameState.current, card: usedCard}, gameState.cards));
                dispatch(newTurn(gameState.current.player));
            } else {
                        dispatch(gameOver);
                    }
        return miniMaxRes;
    }

    const takePlayerTurn = () => {
         if(gameState.current.piece && gameState.current.card) showPossibleMoves(gameState);
            
        if(gameState.target.square && !gameState.newTurn ) {
            let move = moveIsValid(gameState.board, gameState.current, gameState.target, gameState.graveYard);
            dispatch(move);

            if(move.type === 'MOVE') {
                const gameOver = gameIsOver(gameState.board, gameState.graveYard);
                if(gameOver.type === 'INVALID'){
                    dispatch(rotateCards(gameState.current, gameState.cards));
                    dispatch(newTurn(gameState.current.player));
                }
                
                else {
                    dispatch(gameOver);
                }
            }
        }
    }
    
    useEffect(() => {
        if(gameState.current.player === 'blue') takeAiTurn();
        else takePlayerTurn();

        }, [ gameState] );
        return (
            <View style={styles.table}>
                <PlayerCards player={gameState.cards.pink} color='pink' />

                    <View style={styles.board}>

                    {
                    gameState.board 
                        && gameState.board.map( (col, colIdx) => col.map( (square, rowIdx) =>  
                        <ImageBackground style={BoardStyles.background} source={squareBackground}>

                                <Pressable 
                                        key={rowIdx} 
                                        style={{...styles[gameState.glowBoard[colIdx][rowIdx]], }} 
                                        nativeID={`${gameState.cols[colIdx]}${rowIdx}`}
                                        onPress={()=>{dispatch(chooseNewSquare(null, `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.target))}} 
                                        >
                                            <>
                                            {
                                                gameState.board[colIdx][rowIdx] && <Pawn colIdx={colIdx} rowIdx={rowIdx} />
                                            }
                                            </>
                            </Pressable>
                        </ImageBackground>
                            ))}

                    </View>

                <PlayerCards player={gameState.cards.blue} color='blue' />
            </View>
    );
};

export default Board;