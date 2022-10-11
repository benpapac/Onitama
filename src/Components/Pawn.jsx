import React, { useContext } from 'react';
import { Context } from '../Utils/context';
import { BoardStyles } from '../StyleSheets/BoardStyles';

import { Pressable, Image } from 'react-native';
import { chooseNewSquare } from '../Utils/dispatch';

const Pawn = ({colIdx, rowIdx}) => {
    const {images, gameState, dispatch} = useContext(Context);
    return (
        <>
        { gameState.board[colIdx][rowIdx][1] === 'K'
        ?  <Pressable 
                    style={BoardStyles.pawn} 
                    onPress={()=>{dispatch(chooseNewSquare(gameState.board[colIdx][rowIdx], `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.target))}}
                    >
                    <Image source={images[ gameState.board[colIdx][rowIdx] ]}  style={BoardStyles.pawn}/>
            </Pressable>

         :   <Pressable  
                 style={BoardStyles.pawn } 
                 onPress={()=>{dispatch(chooseNewSquare(gameState.board[colIdx][rowIdx], `${gameState.cols[colIdx]}${rowIdx}`, gameState.current, gameState.target))}} 
                >
                <Image source={images[ gameState.board[colIdx][rowIdx][0] ]}  style={BoardStyles.pawn}/>
             </Pressable>   
        }
        
        </>
    );
};

export default Pawn;