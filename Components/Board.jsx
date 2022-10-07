import React, { useContext } from 'react';
import { View } from 'react-native';
import { Context } from '../Utils/context';

import {BoardStyles as styles} from '../StyleSheets/BoardStyles';

const Board = () => {
    const { gameState, updateGameState} = useContext(Context);
    const board = gameState.board;
    const cols = gameState.cols;
    return (
        <View style={styles.board}>
            {board.map( (col, colIdx) => {
                col.map( (square, idx) => (
                <View style={styles.square} id={`${cols[colIdx]}, ${idx}`}>
                    {board[colIdx][idx] || 'empty'}
                </View>
                    ))
            })}
        </View>
    );
};

export default Board;