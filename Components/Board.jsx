import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Context } from '../Utils/context';
import {render, chooseNewSquare, newTurn, moveIsValid, newGame} from '../Utils/render';
import { cards } from '../Utils/cards';

import PlayerCards from './PlayerCards';

import {BoardStyles as styles} from '../StyleSheets/BoardStyles';

const Board = () => {
    const { gameState, dispatch} = useContext(Context);
    const restarting = gameState.newGame;
    const board = gameState.board;
    const cols = gameState.cols;
    const current = gameState.current;
    const target = gameState.target;
    const deck = Object.keys(cards);
    
    useEffect(() => {
        if(restarting) {
            dispatch(newGame(deck));
        }

        if(target.square ) {
            dispatch(moveIsValid(board, current, target));
            if(moveIsValid.type === 'MOVE') dispatch(newTurn(current.player));
        }
    }, [target.square, newGame])
    return (
        <View style={styles.table}>
            <PlayerCards player={gameState.cards.pink} color='pink' />
                <View  onClick={(e) => dispatch(chooseNewSquare(e, current, board))} style={styles.board}>
                {board && board.map( (col, colIdx) => {

                    return col.map( (square, rowIdx) => (
                    <View style={styles.square} nativeID={`${cols[colIdx]}${rowIdx}`}>
                        { board[colIdx][rowIdx] 
                        ?  <Text nativeID={board[colIdx][rowIdx]}>
                                {board[colIdx][rowIdx]}
                            </Text> 
                        : null 
                        }

                    </View>
                    ))
                })}
                </View>
            <PlayerCards player={gameState.cards.blue} color='blue' />
        </View>
    );
};

export default Board;