import {useContext, useEffect, useState} from 'react';
import { Context } from '../src/Utils/context';
import { ImageBackground, View, Pressable, Text } from 'react-native-web';
import { BoardStyles } from '../src/StyleSheets/BoardStyles';
import Square from './test.Square';
import CardPanel from './test.CardPanel';
import { deepEqual } from './test.deepEquals';

import { cards } from '../src/Utils/cards';

const TestBoard = () => {
    const { game, setGame } = useContext(Context);
    const [ initiated, setInitiated] = useState(false);
    const squareBackground = 'https://i.imgur.com/fmofDFG.jpg';
    const [square, setSquare] = useState([]);
    const [ moved, setMoved] = useState(false);

    const render = () =>{
        console.log('rendering...',game.currentPlayer);
        if(!game.chosenSquare || !game.chosenCard || !game.chosenPiece) {
            console.log('nothing to render.');
            return null;
        }
        if(!game.threats.length ){
            let changes = cards[game.chosenCard].changes[game.currentPlayer.color];
            console.log('creating threats...', changes, game.chosenPiece)
            setGame( game.createThreats(changes, game.chosenPiece.square) );
        }

        console.log(game.threats, game.chosenSquare);
        if(deepEqual(game.threats, game.chosenSquare)){
            console.log('moving...')
            setGame( game.movePiece() );
            setGame( game.startNewTurn() );
        }
    }
    const BOARD = [
        [
            [0,0],
            [0,1],
            [0,2],
            [0,3],
            [0,4]
        ],
        [
            [1,0],
            [1,1],
            [1,2],
            [1,3],
            [1,4]
        ],
        [
            [2,0],
            [2,1],
            [2,2],
            [2,3],
            [2,4]
        ],
        [
            [3,0],
            [3,1],
            [3,2],
            [3,3],
            [3,4]
        ],
        [
            [4,0],
            [4,1],
            [4,2],
            [4,3],
            [4,4]
        ]
    ];

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

 export default TestBoard;
