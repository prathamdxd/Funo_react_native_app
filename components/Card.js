import React from "react";
import { TouchableOpacity, Animated, Text } from "react-native";
import { CARD_COLORS } from "../constants/colors";
import { getCardLabel } from "../utils/deckUtils";
import { gameStyles } from "../styles/gameStyles";

const Card = ({ card, index, selected, onPress, scale }) => {
  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <Animated.View
        style={[
          gameStyles.card,
          {
            backgroundColor: CARD_COLORS[card.color],
            borderColor: selected ? "gold" : "#000",
            borderWidth: selected ? 3 : 1,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={gameStyles.cardTxt}>{getCardLabel(card)}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Card;
