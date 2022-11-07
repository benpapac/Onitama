import React, { useContext,  } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { RuleBookStyles } from '../StyleSheets/RuleBookStyles';
//Utils
import { cards } from '../Utils/cards';
import { Context } from '../Utils/context';

const RuleBook = () => {
    const {rules, setRules, images} = useContext(Context);

    const CARD_KEYS = Object.keys(cards)
      const DATA = CARD_KEYS.reduce((accum, key) => {
        accum.push(cards[key]);
        return accum;
      },[]);
    
    const renderCard = (item) => {
        console.log(item);
        return (
            <ImageBackground style={RuleBookStyles.cardBackground} source={images[item.name] }>
                <View style={RuleBookStyles.card}>
                <Text style={RuleBookStyles.title}>
                    {item.name}
                </Text>
                <Text style={RuleBookStyles.text}>
                    {item.rule}
                </Text>
            </View>
            </ImageBackground>
        )
    }

    return (
            <View style={RuleBookStyles.container}>
                <Text style ={RuleBookStyles.title}>
                    THE RULES
                </Text>
                <Text style={RuleBookStyles.text}>
                    Any pawn can be moved, as long as it follows the rules of one of your movement cards. Select a card from the pink player card panel on the left by clicking it. Then, choose one of your pawns, and all legal moves will glow. To switch pawns, or switch cards, just click a new one. Once you're ready to move, select the glowing square, and the ai will automatically take its turn.
                </Text>
                <Text style ={RuleBookStyles.title}>
                    HOW TO WIN
                </Text>
                <Text style={RuleBookStyles.text}>
                    There are two ways to win: Way of Stone: Capture the opponent's Sage. Way of Water: Move your Sage to your opponent's temple.
                </Text>
                <Text style ={RuleBookStyles.title}>
                    THE CARDS
                </Text>
                <Text style={RuleBookStyles.text}>
                    This simulation includes 6 movement cards. Each game, 5 cards will be drawn randomly, and two will be dealt to each player. Each turn, you'll play one of your cards and apply its rules to one of your pawns. Then, you'll discard that card and draw the card waiting by the side of the table. Your opponent will do the same. It's important to think ahead, and imagine what your opponent will do with the card you discard!
                </Text>

                <View style={RuleBookStyles.cardBox}>
                {DATA && DATA.map(card => renderCard(card) )}
                </View>

                <Pressable  style={RuleBookStyles.button} onPress={()=> setRules(!rules)}>
                    <Text>Back to the game.</Text>
                </Pressable>
            </View>
    );
};

export default RuleBook;