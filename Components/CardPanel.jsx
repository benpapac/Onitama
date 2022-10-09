import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Context } from '../Utils/context';
import { images } from '../Utils/cards';
import {CardPanelStyles} from '../StyleSheets/CardPanels.js';
import { chooseNewCard } from '../Utils/dispatch';

const playerCards = ({player, color}) => {
    const { gameState, dispatch} = useContext(Context);
    const current = gameState.current;
    const [chosenCard, setChosenCard] = useState('');
    const [prevCard, setPrevCard] = useState('');


    const [cardOne, setCardOne] = useState(images[player[0]]);
    const [cardTwo, setCardTwo] = useState(images[player[1]]);

    useEffect(()=>{
        if(prevCard !== chosenCard && color === gameState.current.player.toLowerCase()){
            dispatch( chooseNewCard(chosenCard, current) );
            setPrevCard(chosenCard);
        };

        if(cardOne !== images[player[0]]) {
            setCardOne(images[player[0]]);
            setCardTwo(images[player[1]]);
        };

    }, [chosenCard, gameState]);

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