import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useReducer } from 'react';
import { View } from 'react-native';

//components
import WinScreen from './Components/WinScreen';
import RuleBook from './Components/RuleBook';
import Board from './Components/Board';
import DrawPile from './Components/DrawPile';

//Utils
import images from './Utils/images';
import Game from './Utils/classes/class.Game';

//styles
import AppStyles from './StyleSheets/AppStyles.js';

//hooks
import { Context } from './Utils/context';

export default function App() {
	//TODO: refactor most state into a useReducer Hook. This will make code more maintainable.
	const [game, setGame] = useState(new Game());
	const [gameOver, setGameOver] = useState(false);
	const [rules, setRules] = useState(false);
	const [winner, setWinner] = useState('');
	const [winCondition, setWinCondition] = useState('');
	const [initiated, setInitiated] = useState(false);

	useEffect(() => {
		if (!initiated) {
			let clone = new Game();
			clone.setUpBoard();
			setGame(clone);
			//this could yield a bug, by decoupling currentPlayer from game.pinkPlayer. We will see.
			setInitiated(true);
		} else if (game.gameOver) {
			setWinner(game.gameOver.winner);
			setWinCondition(game.gameOver.way);
			setGameOver(true);
		}
	}, [game.currentPlayer]);
	return (
		<Context.Provider
			value={{
				game: game,
				setGame: setGame,
				images: images,
				setRules: setRules,
			}}>
			<View style={AppStyles.container}>
				{rules ? <RuleBook /> : <Board />}
				{gameOver && <WinScreen winner={winner} winCondition={winCondition} />}
			</View>
		</Context.Provider>
	);
}
