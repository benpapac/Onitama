import React, { useContext, useEffect } from 'react';
import { View, Image, Pressable } from 'react-native';
import { Context } from '../Utils/context';
import { chooseNewSquare, newTurn, moveIsValid, newGame, glowSquares} from '../Utils/dispatch';
import { cards, images } from '../Utils/cards';

import PlayerCards from './CardPanel';

import {BoardStyles, BoardStyles as styles} from '../StyleSheets/BoardStyles';

const Board = () => {
    const { images, gameState, dispatch} = useContext(Context);
    
    const deck = Object.keys(cards);
    
    useEffect(() => {
        if(gameState.newGame) {
            dispatch(newGame(deck));
        }

        if(gameState.newSquare && gameState.current.card){
            console.log('looking for glow squares...');
            let squares = [];

            gameState.cols.forEach(el => {
                for(let i=0; i<gameState.board[0].length; i++){
                    let res = moveIsValid(gameState.board, gameState.current, {square: `${el}${i}`, glow: true});
                    if(res.type === 'MOVE') {
                        squares.push(`${el}${i}`);
                    }
                }
            });

            console.log(squares);
            dispatch(glowSquares(gameState.cols, gameState.glowBoard, squares));
        }

        if(gameState.target.square.length ) {
            console.log('there is a target');
            let res = moveIsValid(gameState.board, gameState.current, gameState.target);
            dispatch(res);
            if(res.type === 'MOVE') dispatch(newTurn(gameState.current.player));
        }
    }, [ gameState])
    return (
        <View style={styles.table}>
            <PlayerCards player={gameState.cards.pink} color='pink' />
                <View style={styles.board}>
                {gameState.board && gameState.board.map( (col, colIdx) => {

                    return col.map( (square, rowIdx) => (
                    <Pressable 
                        key={rowIdx} 
                        style={styles[gameState.glowBoard[colIdx][rowIdx]]} 
                        nativeID={`${gameState.cols[colIdx]}${rowIdx}`}
                        onPress={()=>{dispatch(chooseNewSquare(null, `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.board))}} 
                    >
                        { gameState.board[colIdx][rowIdx][1] === 'K' 
                        ?  <Pressable 
                            style={BoardStyles.pawn} 
                            onPress={()=>{dispatch(chooseNewSquare(gameState.board[colIdx][rowIdx], `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.board))}}
                            >
                            <Image source={images[ gameState.board[colIdx][rowIdx] ]}  style={BoardStyles.pawn}/>
                        </Pressable>

                        : <Pressable 
                            style={BoardStyles.pawn } 
                            onPress={()=>{dispatch(chooseNewSquare(gameState.board[colIdx][rowIdx], `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.board))}} 
                            >
                            <Image source={images[ gameState.board[colIdx][rowIdx][0] ]}  style={BoardStyles.pawn}/>
                        </Pressable>
                        }

                    </Pressable>
                    ))
                })}
                </View>
            <PlayerCards player={gameState.cards.blue} color='blue' />
        </View>
    );
};

export default Board;