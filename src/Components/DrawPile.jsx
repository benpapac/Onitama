import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { Context } from '../Utils/context';
import CardPanelStyles from '../StyleSheets/CardPanelStyles';

const DrawPile = () => {
    const {game, images} = useContext(Context);

    return (
        <View style={CardPanelStyles.drawPile}>
             <Image title={game.drawPile[0]} 
                    style={CardPanelStyles.image} 
                    source={{uri: images[game.drawPile[0]]}}
                    />
            <Text>Next Card.</Text>
        </View>
    );
};

export default DrawPile;