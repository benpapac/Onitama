import React, { useContext, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Context } from '../Utils/context';
import { CardPanelStyles } from '../StyleSheets/CardPanelStyles';

const DrawPile = () => {
    const {gameState, images} = useContext(Context);
    return (
        <View style={CardPanelStyles.drawPile}>
             <Image title={gameState.cards.gameCards[0]} 
                    style={CardPanelStyles.image} 
                    source={{uri: images[gameState.cards.gameCards[0]]}}
                    />
        </View>
    );
};

export default DrawPile;