import React, { useState, useEffect, useContext } from 'react';
import { Pressable, Image, Text } from 'react-native';
import {CardPanelStyles} from '../src/StyleSheets/CardPanelStyles';
import { cards } from '../src/Utils/cards';
import { Context } from '../src/Utils/context';

const Card = ({player, idx}) => {
  console.log(player);
  const { images, game, setGame } = useContext(Context);
  const [card, setCard ] = useState('');
  const [chosenCard, setChosenCard] = useState('');

      const handleCardPress = (e)=>{
        if(game.currentPlayer === e.target.role) setChosenCard(card);
        return e.target.role;
    };

      useEffect(()=>{
        if(chosenCard){
          let clone = new Game();
          clone.clone(game);
          clone.chooseCard(chosenCard);
          setGame(clone);
        }
  }, [player, chosenCard]);


    return (game[player].hand &&
        <Pressable role={`${player.color}Card`} nativeID={game[player].hand[idx]} style={{...CardPanelStyles.image, backgroundImage: images[game[player].hand[idx]]}} onPress={handleCardPress} >
                        <Image title={game[player].hand[idx]} 
                    style={CardPanelStyles.image} 
                    source={{uri: images[game[player].hand[idx]]}}
                    />
                  <Text> { cards[ game[player].hand[idx] ].rule }</Text>

                </Pressable>
    );
};

export default Card;