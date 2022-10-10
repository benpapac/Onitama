import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';
import { newGame } from './Utils/dispatch';

//components
import WinScreen from './Components/WinScreen';
import Board from './Components/Board';

//styles
import { styles } from './StyleSheets/AppStyles.js';

//hooks
import { Text, View, Button } from 'react-native';
import { Context } from './Utils/context';
import { newGameState, gameStateReducer } from './Utils/gameState';

function Link(props) {
	return (
		<Text
			{...props}
			accessibilityRole='link'
			style={StyleSheet.compose(styles.link, props.style)}
		/>
	);
}

export default function App() {
	const [gameState, dispatch] = useReducer(gameStateReducer, newGameState);
	const images = {
		PK: 'https://i.imgur.com/Wj39fNp.png',
		BK: 'https://i.imgur.com/Bhxkard.png',
		P: 'https://i.imgur.com/TzZmzxf.png',
		B: 'https://i.imgur.com/6OUJdaN.png',
	};

	const startGame = (e) => {
		e.preventDefault();
		console.log('restarting...');
		dispatch(newGame());
	}


	useEffect(() => {}, []);

	return (
		<Context.Provider
			value={{
				gameState: gameState,
				dispatch: dispatch,
				images: images,
			}}>

			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Welcome to Onitama!</Text>
				</View>
					
					{gameState.gameOver ? <WinScreen /> : <Board />}

				<Button
					style={styles.button}
					onPress={startGame}
					title="Let's play."
				/>
			</View>

		</Context.Provider>
	);
}
