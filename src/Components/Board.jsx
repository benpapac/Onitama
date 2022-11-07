import {useContext, useEffect, useState} from 'react';
import { View } from 'react-native-web';
import BoardStyles from '../StyleSheets/BoardStyles';
//Components
import Square from './Square';
import CardPanel from './CardPanel';
//Utils
import deepEqual from '../Utils/deepEquals';
import BOARD from '../Utils/board';
import { Context } from '../Utils/context';

const Board = () => {
    const { game, setGame } = useContext(Context);
    const [ initiated, setInitiated] = useState(false);

    const render = () =>{
        console.log('rendering...',game.currentPlayer);
        if(!game.chosenSquare || !game.chosenCard || !game.chosenPiece) {
            console.log('nothing to render.');
            return null;
        }

        console.log(game.threats, game.chosenSquare);
        if(deepEqual(game.threats, game.chosenSquare)){
            console.log('moving...')
            setGame( game.movePiece() );
            setGame( game.startNewTurn() );
        }
    }

    useEffect(()=>{
        if(!initiated) {
            setGame( game.setUpBoard() );
            setInitiated(true);
        }
        render();
    }, [game.chosenSquare, game.chosenCard, game.chosenPiece]);

    if(!game) return (<h1>Loading...</h1>)

    return (
        game &&
        <View style={BoardStyles.table}>
            <CardPanel player={'pinkPlayer'} />

            <View style={BoardStyles.board}>
                { BOARD.map( (col) => col.map( (square) =>  
                    <Square square={square} />  
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
