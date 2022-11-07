import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
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
	const [game, setGame] = useState(new Game());
	const [gameOver, setGameOver] = useState(false);
	const [rules, setRules] = useState(false);

	useEffect(() => {
		if (game.pinkPlayer.wins) {
			setWinner('pink');
			setWinCondition('TBD');
			setGameOver(true);
		} else if (game.bluePlayer.wins) {
			setWinner('blue');
			setWinCondition('TBD');
			setGameOver(true);
		}
	}, [game.currentPlayer]);
	return (
		<Context.Provider
			value={{
				game: game,
				setGame: setGame,
				images: images,
			}}>
			<View style={AppStyles.container}>
				{rules ? <RuleBook /> : null}
				{gameOver ? (
					<WinScreen winner={'pink'} winCondition={'stone'} />
				) : (
					<Board />
				)}
			</View>
		</Context.Provider>
	);
}
