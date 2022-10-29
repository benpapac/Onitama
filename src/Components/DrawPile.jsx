import React, { useContext, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Context } from '../Utils/context';
import { CardPanelStyles } from '../StyleSheets/CardPanelStyles';

const DrawPile = () => {
    const {gameState, images} = useContext(Context);

    const [drawPile, setDrawPile] = useState('');
    const [prevCard, setPrevCard] = useState('');
    const [image, setImage] = useState('');


    useEffect(()=>{
        setDrawPile(gameState.cards.gameCards[0]);
            if(drawPile !== prevCard){
                setPrevCard(drawPile);
                setImage(images[drawPile]);
            }
    },[gameState])

    return (
        <View style={CardPanelStyles.drawPile}>
             <Image title={drawPile} 
                    style={CardPanelStyles.image} 
                    source={{uri: image}}
                    />
        </View>
    );
};

export default DrawPile;