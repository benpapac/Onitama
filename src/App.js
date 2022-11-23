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
	const [chosenCard, setChosenCard] = useState();
	const [chosenPiece, setChosenPiece] = useState('');
	const [chosenSquare, setChosenSquare] = useState([]);

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
				chosenPiece: chosenPiece,
				setChosenPiece: setChosenPiece,
				chosenCard: chosenCard,
				setChosenCard: setChosenCard,
				chosenSquare: chosenSquare,
				setChosenSquare: setChosenSquare,
				images: images,
			}}>
			<View style={AppStyles.container}>
				{rules && <RuleBook />}
				{gameOver && <WinScreen winner={winner} winCondition={winCondition} />}
				<Board />
			</View>
		</Context.Provider>
	);
}
