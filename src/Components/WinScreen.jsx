import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import  {WinScreenStyles}  from '../StyleSheets/WinScreenStyles.js';
import { Context } from '../Utils/context.js';
import Board from './Board.jsx';

const WinScreen = () => {
    const {gameState, templeBackground} = useContext(Context);
    return (
        <View style={WinScreenStyles.container}>
            <Text style={WinScreenStyles.headline}>{gameState.winner}</Text>
            <Text style={{...WinScreenStyles.headline, position: 'absolute', zIndex: -1}}>{gameState.winner}</Text>
        </View>
    );
};

export default WinScreen;