import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Pressable } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Components
import Pawn from './Pawn.jsx';
//Utils
import { Context } from '../Utils/context';

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