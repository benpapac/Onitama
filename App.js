import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';

//components
import Board from './Components/Board';
import PlayerCards from './Components/PlayerCards';

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

	const startGame = (e) => {
		e.preventDefault();
	};

	useEffect(() => {}, []);

	return (
		<Context.Provider
			value={{
				gameState: gameState,
				dispatch: dispatch,
			}}>

			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Welcome to Onitama!</Text>
				</View>
					
					<Board />
					
				<Button
					style={styles.button}
					onPress={() => {
						startGame;
					}}
					title="Let's play."
				/>
			</View>

		</Context.Provider>
	);
}
