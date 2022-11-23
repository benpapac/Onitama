import React from 'react';
import { View, Text } from 'react-native';
import WinScreenStyles from '../StyleSheets/WinScreenStyles.js';

const WinScreen = ({winner, winCondition}) => {
    return (
        <View style={WinScreenStyles.container}>
            <Text style={WinScreenStyles.headline}>{winner} wins by the Way of {winCondition}</Text>
            <Text style={{...WinScreenStyles.headline, position: 'absolute', zIndex: -1}}>{winner} wins by the Way of {winCondition}</Text>
        </View>
    );
};

export default WinScreen;