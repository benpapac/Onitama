import React, { useContext } from 'react';
import { View, Image, Text } from 'react-native';
import { Context } from '../Utils/context';
import { images } from '../Utils/cards';
import {CardPanelStyles} from '../StyleSheets/CardPanels.js';
import mantis from '../assets/praying-mantis.png'

const playerCards = ({player, color}) => {
    let cardOne = images[player[0]];
    let cardTwo = images[player[1]];

    console.log(cardOne, cardTwo);

    const handleClick = (e) => {

    }

    return (
        <View style={CardPanelStyles.panel}>
            <Text style={CardPanelStyles.title}>{color}</Text>
                <Image nativeID={player[0]} 
                style={CardPanelStyles.image} 
                source={{uri: cardOne}}
                />

                <Image nativeID={player[1]} 
                style={CardPanelStyles.image} 
                source={{uri: cardTwo}}/>
                </View>
    );
};

export default playerCards;