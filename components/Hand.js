import React from "react";
import { ScrollView, View, Text } from "react-native";
import Card from "./Card";
import { gameStyles } from "../styles/gameStyles";

const Hand = ({ cards, selectedCardIndex, onSelectCard, cardScale }) => {
  return (
    <ScrollView horizontal>
      <View style={gameStyles.hand}>
        {cards?.map((card, i) => (
          <Card
            key={i}
            card={card}
            index={i}
            selected={selectedCardIndex === i}
            onPress={onSelectCard}
            scale={cardScale}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Hand;
