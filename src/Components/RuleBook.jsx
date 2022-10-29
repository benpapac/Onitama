import React from 'react';
import {View, Text} from 'react-native';
import { cards } from '../Utils/cards';

const RuleBook = () => {

    const renderCard = (card) => {
        return (
            <View>
                <Text>
                    {card.name}
                </Text>
                <Text>
                    {card.rule}
                </Text>
            </View>
        )
    }


    return (
        <div>

            <View>
                <Text>
                    Designed by Shimpei Sato and published by Arcane Wonders in 2014, Onitama gives players a wonderfully unique experience. Any pawn can be moved, as long as it follows the rules of one of your movement cards! You rotate cards with your opponent, so be careful as you move.\n\n There are two ways to win:\nWay of Stone: Capture the opponent's Sage. \n Way of Water: Move your Sage to your opponent's temple.
                </Text>
                <Text>
                    THE CARDS. 
                    This simulation includes 6 movement cards. Each game, 5 cards will be drawn randomly, and two will be dealt to each player. Each turn, you'll play one of your cards and apply its rules to one of your pawns. Then, you'll discard that card and draw the card waiting by the side of the table. Your opponent will do the same. It's important to think ahead, and imagine what your opponent will do with the card you discard!

                    <FlatList
                        data={cards}
                        renderItem={renderCard}
                        keyExtractor={item =>item.name}
                        />
                </Text>
                <Text>

                </Text>
            </View>
            
        </div>
    );
};

export default RuleBook;