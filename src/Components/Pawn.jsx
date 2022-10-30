import React, { useContext } from 'react';
import { Context } from '../Utils/context';
import { BoardStyles } from '../StyleSheets/BoardStyles';

import { Pressable, Image } from 'react-native';
import { chooseNewSquare } from '../Utils/dispatch';

const Pawn = ({colIdx, rowIdx}) => {
    const {images, gameState, dispatch} = useContext(Context);

    const getImage = (colIdx, rowIdx) => {
        let piece = gameState.board[colIdx][rowIdx] || 'empty';
        // need to include color  for kings
        if(!piece) return '';
        return piece[1] === 'K' ? images[piece] :  images[ piece[0] ]
    }
    return (
        <>
         <Pressable 
            style={BoardStyles.pawn} 
            onPress={()=>{dispatch(chooseNewSquare(gameState.board[colIdx][rowIdx], `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.target))}}
            >
            <Image source={ getImage(colIdx, rowIdx)}  style={BoardStyles.pawn}/>
        </Pressable>       
        </>
    );
};

export default Pawn;