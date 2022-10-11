import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, Pressable, ImageBackground } from 'react-native';
import { Context } from '../Utils/context';
import { images } from '../Utils/cards';
import {CardPanelStyles} from '../StyleSheets/CardPanelStyles.js';
import { chooseNewCard } from '../Utils/dispatch';

const playerCards = ({player, color}) => {
    const { gameState, dispatch} = useContext(Context);
    const current = gameState.current;
    const [chosenCard, setChosenCard] = useState('');
    const [prevCard, setPrevCard] = useState('');


    const [cardOne, setCardOne] = useState(images[player[0]]);
    const [cardTwo, setCardTwo] = useState(images[player[1]]);

    const panelBackground = { uri: 'https://i.imgur.com/MM6wckg.jpg'};

    useEffect(()=>{
        if(prevCard !== chosenCard && color === gameState.current.player.toLowerCase()){
            dispatch( chooseNewCard(chosenCard, current) );
            setPrevCard(chosenCard);
        };

        if(cardOne !== images[player[0]] || cardTwo !== images[player[1]]) {
            setCardOne(images[player[0]]);
            setCardTwo(images[player[1]]);
        };

    }, [chosenCard, gameState]);

    return (
        <ImageBackground style={CardPanelStyles.background} source={panelBackground}>

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
        </ImageBackground>
    );
};

export default playerCards;