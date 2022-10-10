import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import  {WinScreenStyles}  from '../StyleSheets/WinScreenStyles.js';
import { Context } from '../Utils/context.js';

const WinScreen = () => {
    const {gameState, dispatch} = useContext(Context);
    return (
        <View>
            <Text nativeID={WinScreenStyles.headline}>{gameState.winner} is the winner!</Text>
        </View>
    );
};

export default WinScreen;