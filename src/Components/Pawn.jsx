import { useContext } from 'react';
import { Pressable, Image } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Utils
import { Context } from '../Utils/context';

const Pawn = ({pawn}) => {
    const { game, setGame, images } = useContext(Context);

    const compareToCurrPlayer = () => {
        if(pawn.color === game.currentPlayer.color){
          return game.choosePiece(pawn);
        } else {
          return game.chooseSquare(pawn.square);
        }
    }

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
            onPress={() => setGame( compareToCurrPlayer() )}
            >
            <Image source={ getName() } style={BoardStyles.pawn}  />
        </Pressable> 
    );
};

export default Pawn;