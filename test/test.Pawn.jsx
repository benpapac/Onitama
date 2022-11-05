import { useContext, useEffect, useState } from 'react';
import { Pressable, Image, Text } from 'react-native';
import { Context } from '../src/Utils/context';
import { BoardStyles } from '../src/StyleSheets/BoardStyles';

const Pawn = ({pawn}) => {
    const { game, setGame, images } = useContext(Context);
    const [chosenPiece, setChosenPiece] = useState({});

    const getName = ()=>{
        if(!pawn) return '';
        if(pawn.name.includes('king')) {
            return images[pawn.name];
        } else {
            return images[pawn.name[0] ];
        }
    }

    return (
        <Pressable 
            onPress={()=>setGame(game.choosePiece(pawn))}
            >
            <Image source={ getName() } style={BoardStyles.pawn}  />
        </Pressable> 
    );
};

export default Pawn;