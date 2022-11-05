import {useContext, useEffect, useState} from 'react';
import { Context } from '../src/Utils/context';
import { ImageBackground, View, Pressable, Text } from 'react-native-web';
import { BoardStyles } from '../src/StyleSheets/BoardStyles';
import Square from './test.Square';
import CardPanel from './test.CardPanel';

const TestBoard = () => {
    const { game } = useContext(Context);
    const [ initiated, setInitiated] = useState(false);
    const squareBackground = 'https://i.imgur.com/fmofDFG.jpg';
    const [square, setSquare] = useState([]);
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
        console.log(square);
        if(!initiated) {
            game.setUpBoard();
            setInitiated(true);
        }
    }, [square]);

    if(!game) return (<h1>Loading...</h1>)

    return (
        <View style={BoardStyles.table}>
         <CardPanel player={'pinkPlayer'} />

            <View style={BoardStyles.board}>

            
        { BOARD.map( (col, colIdx) => col.map( (square, rowIdx) =>  
               <Square square={BOARD[colIdx][rowIdx]} />  
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
