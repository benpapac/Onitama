import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useReducer } from 'react';
import { Text, View, Button, ImageBackground } from 'react-native';

//components
import WinScreen from './Components/WinScreen';
import Board from './Components/Board';

//styles
import { styles } from './StyleSheets/AppStyles.js';

//hooks
import { newGame } from './Utils/dispatch';
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
	const [initiated, setInitiated] = useState(false);
	const templeBackground = { uri: 'https://i.imgur.com/r2eosVK.jpg' };
	const images = {
		pK: 'https://i.imgur.com/Wj39fNp.png',
		bK: 'https://i.imgur.com/Bhxkard.png',
		p: 'https://i.imgur.com/TzZmzxf.png',
		b: 'https://i.imgur.com/6OUJdaN.png',
	};

	const startGame = (e) => {
		e.preventDefault();
		dispatch(newGame());
	};


	return (
		<Context.Provider
			value={{
				gameState: gameState,
				dispatch: dispatch,
				images: images,
				templeBackground: templeBackground,
			}}>
			<ImageBackground source={templeBackground} style={styles.background}>
				<View style={styles.container}>
					{gameState.gameOver ? (
						<View style={styles.header}>
							<Text style={styles.title}>Welcome to Onitama!</Text>
						</View>
					) : null}

					{gameState.gameOver ? <WinScreen /> : <Board />}

					{gameState.gameOver ? (
						<Button
							style={styles.button}
							onPress={startGame}
							title="Let's play."
						/>
					) : null}
				</View>
			</ImageBackground>
		</Context.Provider>
	);
}
