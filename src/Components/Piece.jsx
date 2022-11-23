import { useContext } from 'react';
import { Pressable, Image } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Utils
import { Context } from '../Utils/context';
import makeClone from '../Utils/clone';

const Piece = ({ pawn }) => {
    const { game, setChosenSquare, setChosenPiece, images } = useContext(Context);

    const compareToCurrPlayer = () => {

        if (pawn.color === game.currentPlayer.color) {
            setChosenPiece(pawn.name);
            return pawn;
        } else {
            setChosenSquare(pawn.square);
            return square;
        }
    }

    const getName = () => {
        if (!pawn) return '';
        if (pawn.name.includes('king')) {
            return images[pawn.name];
        } else {
            return images[pawn.name[0]];
        }
    }

    return (
        <Pressable onPress={() => compareToCurrPlayer()} >
            <Image source={getName()} style={BoardStyles.pawn} />
        </Pressable>
    );
};

export default Piece;