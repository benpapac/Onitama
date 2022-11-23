import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Pressable } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Components
import Piece from './Piece.jsx';
//Utils
import makeClone from '../Utils/clone';
import { Context } from '../Utils/context';

const Square = ({square}) => {
    const { game, setChosenSquare, images } = useContext(Context);
    const [pawn, setPawn] = useState(game.pawnAt(square));



    useEffect(()=>{
        setPawn(game.pawnAt(square));
    }, [game]);


    return (
        <Pressable 
            key={`${square}`} 
            title={`${square}`}
            nativeID={`${square}`}
            onPress={()=> setChosenSquare(square) } 
            >
             <ImageBackground style={BoardStyles.square} source={ images.square }>
                        { pawn && <Piece pawn={pawn} /> }
            </ImageBackground>
        </Pressable>
    );
};

export default Square;