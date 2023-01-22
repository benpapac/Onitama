import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Pressable } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Components
import Piece from './Piece.jsx';
//Utils
import makeClone from '../Utils/clone';
import { Context } from '../Utils/context';
import deepEqual from '../Utils/deepEquals';

const Square = ({square}) => {
    const { game, setGame, images } = useContext(Context);
    const [pawn, setPawn] = useState(game.pawnAt(square));
    const [color, setColor] = useState('');


    //TODO: add glowSquares() function, which updates the square's backgroundColor if the square is a threat.

    //will likely need debugging
    const glowSquare = () => {
        if(!game.threats){
            return;   
        }
        if(deepEqual(game.threats, square)){
            setColor('antiquewhite');
        }
        else setColor('');
    }

    const handlePress = () => {
        let clone = makeClone(game);
        clone.chosenSquare = square;
        setGame(clone);
    }

    useEffect(()=>{
        setPawn(game.pawnAt(square));
        glowSquare();
    }, [game]);


    return (
        <Pressable 
            key={`${square}`} 
            title={`${square}`}
            nativeID={`${square}`}
            onPress={handlePress} 
            >
             <ImageBackground style={{...BoardStyles.square, backgroundColor: color}} source={ images.square }>
                        { pawn && <Piece pawn={pawn} /> }
            </ImageBackground>
        </Pressable>
    );
};

export default Square;