import React, { useContext, useEffect } from 'react';
import { View, ImageBackground, Pressable } from 'react-native';
import { Context } from '../Utils/context';
import { chooseNewSquare, newTurn, moveIsValid, glowSquares, rotateCards, gameIsOver} from '../Utils/dispatch';
import { cards, images } from '../Utils/cards';

import PlayerCards from './CardPanel';
import Pawn from './Pawn'

import { BoardStyles, BoardStyles as styles} from '../StyleSheets/BoardStyles';

const Board = () => {
    const { gameState, dispatch} = useContext(Context);
    const squareBackground = { uri: 'https://i.imgur.com/fmofDFG.jpg'}
    
    const deck = Object.keys(cards);
    
    useEffect(() => {
        if(gameState.current.piece && gameState.current.card){
            console.log('checking for glow squares...');
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
            console.log('validating move...');
            let res = moveIsValid(gameState.board, gameState.current, gameState.target, gameState.graveYard);
            dispatch(res);
            if(res.type === 'MOVE') {
                console.log('checking win conditions...')
                const gameOver = gameIsOver(gameState.board, gameState.graveYard);
                if(gameOver.type === 'INVALID'){
                    dispatch(rotateCards(gameState.current, gameState.cards))
                    dispatch(newTurn(gameState.current.player));
                }

                else {
                    console.log(res);
                    dispatch(gameOver);
                }
            }
        }
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
                                        style={{...styles[gameState.glowBoard[colIdx][rowIdx]], backgroundImage: 'https://i.imgur.com/wESlb39.jpg'}} 
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