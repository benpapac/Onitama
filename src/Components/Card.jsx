import React, { useState, useEffect, useContext } from 'react';
import { Pressable, Image, Text } from 'react-native';
import CardPanelStyles from '../StyleSheets/CardPanelStyles';
//Utils
import { cards } from '../Utils/cards';
import { Context } from '../Utils/context';
import makeClone from '../Utils/clone.js';

const Card = ({player, idx}) => {
  const { game, images, setChosenCard } = useContext(Context);

    return (game[player].hand &&
        <Pressable 
        role={`${player.color}Card`} 
        nativeID={game[player].hand[idx]} 
        style={{...CardPanelStyles.image, backgroundImage: images[game[player].hand[idx]]}} 
        onPress={() => setChosenCard(game[player].hand[idx])} 
        >
                        <Image title={game[player].hand[idx]} 
                    style={CardPanelStyles.image} 
                    source={{uri: images[game[player].hand[idx]]}}
                    />
                  <Text> { cards[ game[player].hand[idx] ].rule }</Text>

                </Pressable>
    );
};

export default Card;