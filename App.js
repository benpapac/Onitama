import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Board from './Components/Board';
import {styles} from './StyleSheets/AppStyles.js';
import { Context } from './Utils/context';
import {newGameState, gameStateReducer} from './Utils/gameState';

function Link(props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />;
}

export default function App() {


  const startGame = (e) => {
    e.preventDefault();

  }

  const [gameState, updateGameState] = useReducer(gameStateReducer, newGameState);


useEffect(()=>{
  if(gameState.newGame){
    setUpBoard();
    setCards();
    setPlayerTurn();
  }
},[gameState])

  return (
    <Context.Provider value={{
      gameState: gameState,
      updateGameState: updateGameState,
    }
    }>
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Welcome to Onitama!</Text>
			</View>
			<Board />
			<Button onPress={() => {startGame}} title="Let's play." />
		</View>
    </Context.Provider>
	);
}
