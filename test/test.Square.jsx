import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Pressable, Text } from 'react-native';
import { BoardStyles } from '../src/StyleSheets/BoardStyles';
import Pawn from './test.Pawn.jsx';
import { Context } from '../src/Utils/context';

const Square = ({square}) => {
    const { game, setGame, images } = useContext(Context);
    const [pawn, setPawn] = useState(game.pawnAt(square));
    const [pawnComponent, setPawnComponent] = useState(null);

    useEffect(()=>{
        setPawn(game.pawnAt(square));
        if(pawn) {
            setPawnComponent(<Pawn pawn={pawn} />);
        } else {
            setPawnComponent(null);
        }
    }, [game]);


    return (
        <Pressable 
            key={`${square}`} 
            title={`${square}`}
            // style={{...BoardStyles[gameState.glowBoard[colIdx][rowIdx]], }} 
            nativeID={`${square}`}
            onPress={()=> setGame( game.chooseSquare(square) ) } 
            >
             <ImageBackground style={BoardStyles.square} source={ images.square }>
                        { pawn && <Pawn pawn={pawn} /> }
            </ImageBackground>
        </Pressable>
    );
};

export default Square;