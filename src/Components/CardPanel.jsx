import React from 'react';
import { View, Text } from 'react-native';
import CardPanelStyles  from '../StyleSheets/CardPanelStyles';
//Components
import Card from './Card';

// set up player hands before rendering CardPanels.
const CardPanel = ({ player }) => {  
    return (
       <View style={CardPanelStyles.panel}>
        <Text>{player}</Text>
         <Card player={player} idx={0} />
         <Card player={player} idx={1} />
       </View>
    );
};

export default CardPanel;