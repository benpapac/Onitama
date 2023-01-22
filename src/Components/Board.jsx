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
import { aiTurn } from '../Utils/AI/ai';
import createThreats from '../Utils/createThreats';
import DrawPile from './DrawPile';
import ErrorBoundary from '../Utils/ErrorBoundary';

const Board = () => {
    const { game, setGame } = useContext(Context);

    const [depth, setDepth] = useState(3);


    const render = async () => {
        console.log('rendering...');
        if( !game.gameOver && game.currentPlayer === 'bluePlayer'){
            let clone = aiTurn(game, depth);
            console.log( clone.bluePlayer.pieces );
            setGame(clone);
            return null;
        }

        else if (game.threats.length && deepEqual(game.threats, game.chosenSquare)) {
            let clone = makeClone(game);

            let piece = game[game.currentPlayer].pieces.find(piece => piece.name === game.chosenPiece);

            let nextPlayer = game.currentPlayer === 'pinkPlayer' ? 'bluePlayer' : 'pinkPlayer';

            piece.move(game.chosenSquare);
            clone.capturePiece(game.chosenSquare, nextPlayer);
            clone.startNewTurn();
            
            setGame(clone);
        } else {
            console.log('nothing to render.')
            return null;
        }
    }

    useEffect(() => {
        render();
    }, [game]);

    if (!game) return (<h1>Loading...</h1>);

    return (
        <>
            <View style={BoardStyles.table}>
                <CardPanel player={'pinkPlayer'} />

                <View style={BoardStyles.board}>
                    {BOARD.map((col) => col.map((square) => (
                        <ErrorBoundary>
                            <Square key={`${square}`} square={square} />
                        </ErrorBoundary>
                    )
                        ))}
                </View>

                <CardPanel player={'bluePlayer'} />
            </View>

            <DrawPile />
        </>
    )
};


//  test('testing game', ()=>{
//     //set variables here
//     const thing2 = null;
//     const thing3 = null;

//     //render the component to be tested.
//     render(<TestBoard />);

//     // make changes to game.
//     fireEvent.press(screen.getByRole('[0,2]') );


//     //grab DOM elements

//     //describe expected results.
//     expect(screen.findByRole('[0,2]')).to.equal('Hello from [0,2]');

//  });

export default Board;
