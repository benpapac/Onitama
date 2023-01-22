import { useContext } from 'react';
import { Pressable, Image } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Utils
import { Context } from '../Utils/context';
import makeClone from '../Utils/clone';

const Piece = ({ pawn }) => {
    const { game, setGame, images } = useContext(Context);
const compareToCurrPlayer = async () => {
    console.log(pawn.owner, game.currentPlayer);
    let clone = makeClone(game);

        if (pawn.owner === game.currentPlayer) {
            console.log('choosing piece...');
            clone.chosenPiece = pawn.name;
            clone.chosenSquare = [];
        } else {
            clone.chosenSquare = pawn.square;
        }
        setGame(clone);
        console.log(clone.chosenPiece);
        return pawn;
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