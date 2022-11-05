import React, { useContext, useEffect } from 'react';
import { ImageBackground, Pressable, Text } from 'react-native';
import { BoardStyles } from '../src/StyleSheets/BoardStyles';
import Pawn from './test.Pawn.jsx';
import { Context } from '../src/Utils/context';

const Square = ({square}) => {
    const { game, images } = useContext(Context);

    return (
             <ImageBackground style={BoardStyles.square} source={ images.square }>
                <Pressable 
                        key={`${square}`} 
                        title={`${square}`}
                        // style={{...BoardStyles[gameState.glowBoard[colIdx][rowIdx]], }} 
                        nativeID={`${square}`}
                        onPress={()=> setSquare(square)} 
                        >
                        {game.pawnAt(square) && <Pawn pawn={game.pawnAt(square)} />}
                </Pressable>
            </ImageBackground>
    );
};

export default Square;