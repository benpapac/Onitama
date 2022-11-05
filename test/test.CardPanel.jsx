import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Card from './test.Card';
import { CardPanelStyles } from '../src/StyleSheets/CardPanelStyles';
import { Context } from '../src/Utils/context';

// set up player hands before rendering CardPanels.
const CardPanel = ({ player }) => {
  const { game } = useContext(Context);
  

  
  
    return (
       <View style={CardPanelStyles.panel}>
         <Card player={player} idx={0} />
         <Card player={player} idx={1} />
       </View>
    );
};

export default CardPanel;