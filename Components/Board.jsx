import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Context } from '../Utils/context';
import {render, chooseNewSquare} from '../Utils/render';

import {BoardStyles as styles} from '../StyleSheets/BoardStyles';

const Board = () => {
    const { gameState, updateGameState, render} = useContext(Context);
    const board = gameState.board;
    const cols = gameState.cols;
    const current = gameState.current;
    const target = gameState.target;
    
    useEffect(() => {
        console.log(chooseNewSquare);
    })
    return (
        <View  onClick={(e) => render(chooseNewSquare(e, current, target))} style={styles.board}>
            {board && board.map( (col, colIdx) => {

                return col.map( (square, rowIdx) => (
                <View style={styles.square} nativeID={`${cols[colIdx]}${rowIdx}`}>
                     <Text nativeID={board[colIdx][rowIdx]}>
                        {board[colIdx][rowIdx] || 'empty'}
                    </Text>
                </View>
                    ))
            })}
        </View>
    );
};

export default Board;