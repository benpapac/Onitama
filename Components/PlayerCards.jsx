import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Context } from '../Utils/context';
import { images } from '../Utils/cards';
import {CardPanelStyles} from '../StyleSheets/CardPanels.js';
import mantis from '../assets/praying-mantis.png'

const playerCards = ({player, color}) => {
    let cardOne = images[player[0]];
    let cardTwo = images[player[1]];
    const [chosenCard, setChosenCard] = useState('');

    useEffect(()=>{
        console.log(chosenCard);
    }, [chosenCard]);

    return (
        <View style={CardPanelStyles.panel}>
            <Text style={CardPanelStyles.title}>{color}</Text>
                 
                <Pressable  nativeID={player[0]} style={{...CardPanelStyles.image, backgroundImage: cardOne}} onPress={() => setChosenCard(player[0])} >
                        <Image title={player[0]} 
                    style={CardPanelStyles.image} 
                    source={{uri: cardOne}}
                  />
                </Pressable>

                <Pressable  nativeID={player[1]} style={CardPanelStyles.image} onPress={() => setChosenCard(player[1])} >
                    <Image title={player[1]} 
                    style={CardPanelStyles.image} 
                    source={{uri: cardTwo}}
                />
                </Pressable>

                </View>
    );
};

export default playerCards;