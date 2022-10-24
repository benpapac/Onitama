import React, { useContext, useEffect } from 'react';
import { View, ImageBackground, Pressable } from 'react-native';
import { Context } from '../Utils/context';
import { chooseNewSquare, newTurn, moveIsValid, glowSquares, rotateCards, gameIsOver} from '../Utils/dispatch';
import { cards, images } from '../Utils/cards';

import PlayerCards from './CardPanel';
import Pawn from './Pawn'

import { BoardStyles, BoardStyles as styles} from '../StyleSheets/BoardStyles';
import { miniMax } from '../Utils/AI/miniMax';

const Board = () => {
    const { gameState, dispatch} = useContext(Context);
    const squareBackground = { uri: 'https://i.imgur.com/fmofDFG.jpg'}
    
    const deck = Object.keys(cards);
    
    useEffect(() => {

        if(gameState.current.player === 'blue') {
            let miniMaxRes = miniMax(gameState, gameState.current.player, 2);
            console.log('miniMax: ', miniMaxRes);

            dispatch({
                type: 'MOVE', 
                value: {
                board: miniMaxRes.bestMove.board,
                graveYard: miniMaxRes.bestMove.graveYard,
                },
            })
            console.log(gameState);

            const gameOver = gameIsOver(gameState.board, gameState.graveYard);

            if(gameOver.type === 'INVALID'){
                dispatch(rotateCards(gameState.current, gameState.cards));
                dispatch(newTurn(gameState.current.player));
            }
        }
        else{

            if(gameState.current.piece && gameState.current.card){
                let squares = [];
                if(gameState.newCurrent){
                    gameState.cols.forEach(el => {
                        for(let i=0; i<gameState.board[0].length; i++){
                            let res = moveIsValid(gameState.board, gameState.current, {square: `${el}${i}`, piece: gameState.board[gameState.cols.indexOf(el)][i], glow: true});
                            if(res.type === 'MOVE') {
                                squares.push(`${el}${i}`);
                            }
                        }
                    });
                    dispatch(glowSquares(gameState.cols, squares));
                }
                
            }
            
            if(gameState.target.square && !gameState.newTurn ) {
                let res = moveIsValid(gameState.board, gameState.current, gameState.target, gameState.graveYard);
                dispatch(res);
                if(res.type === 'MOVE') {
                    const gameOver = gameIsOver(gameState.board, gameState.graveYard);
                    if(gameOver.type === 'INVALID'){
                        dispatch(rotateCards(gameState.current, gameState.cards));
                        dispatch(newTurn(gameState.current.player));
                    }
                    
                    else {
                        console.log(res);
                        dispatch(gameOver);
                    }
                }
            }
        };
        }, [ gameState])
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