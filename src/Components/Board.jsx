import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import BoardStyles from '../StyleSheets/BoardStyles';
//Components
import Square from './Square';
import CardPanel from './CardPanel';
//Utils
import makeClone from '../Utils/clone';
import deepEqual from '../Utils/deepEquals';
import BOARD from '../Utils/board';
import { Context } from '../Utils/context';
import miniMax from '../Utils/AI/new-miniMax';
import createThreats from '../Utils/createThreats';
import deepCopy from '../Utils/deepCopy';

const Board = () => {
    const { game, setGame, chosenCard, setChosenCard, chosenSquare, setChosenSquare, chosenPiece, setChosenPiece } = useContext(Context);
    const [threats, setThreats] = useState([]);
    const [switched, setSwitched] = useState(false);

    const aiTurn =  () => {
        if (game.currentPlayer.color === 'blue') {
            console.log('taking ai turn...');

            let bestMove = miniMax(game, 1);
             setChosenCard(bestMove.bestMove.card);

             let clone = makeClone(game);
            let pieceIndex = clone.currentPlayer.pieces.findIndex(piece => piece.name === bestMove.bestMove.piece.name);
            let piece = clone.currentPlayer.pieces[pieceIndex];

            console.log(createThreats(game, bestMove.bestMove.card, piece.name));
		    console.log('Moving: ', piece.name, 'to', bestMove.bestMove.square);
            piece.move(bestMove.bestMove.square);
            clone.startNewTurn();
            setGame(clone);
            setSwitched(true);
        } 
        return null;
    }

    const resetState = () => {
        setChosenCard('');
        setChosenPiece('');
        setChosenSquare([]);
        setSwitched(false);
    }

    const render = async () => {
        console.log('rendering...')

        if(switched){
            resetState();
            return null;
        }
        else if( game.currentPlayer.color === 'blue'){
            aiTurn();
            return null;
        }

        else if (threats.length && deepEqual(threats, chosenSquare)) {
            console.log('moving...')
            let clone = makeClone(game);

            let pieceIndex = clone.currentPlayer.pieces.findIndex(piece => piece.name === chosenPiece);
            let piece = clone.currentPlayer.pieces[pieceIndex];
            piece.move(chosenSquare);

            clone.startNewTurn();
            setGame(clone);
            setSwitched(true);
        }  else if(chosenCard && chosenPiece){
            setThreats(createThreats(game, chosenCard, chosenPiece));
            return null;
        } else {
            console.log('nothing to render.');
            return null;
        }
    }


    useEffect(() => {
        render();
    }, [chosenSquare, chosenCard, chosenPiece, switched]);

    if (!game) return (<h1>Loading...</h1>)

    return (
        game &&
        <View style={BoardStyles.table}>
            <CardPanel player={'pinkPlayer'} />

            <View style={BoardStyles.board}>
                {BOARD.map((col) => col.map((square) =>
                    <Square key={`${square}`} square={square} />
                ))}
            </View>

            <CardPanel player={'bluePlayer'} />
        </View>
    )
};


//  test('testing state', ()=>{
//     //set variables here
//     const thing2 = null;
//     const thing3 = null;

//     //render the component to be tested.
//     render(<TestBoard />);

//     // make changes to state.
//     fireEvent.press(screen.getByRole('[0,2]') );


//     //grab DOM elements

//     //describe expected results.
//     expect(screen.findByRole('[0,2]')).to.equal('Hello from [0,2]');

//  });

export default Board;
