import React from "react";
import { View, Text, Animated } from "react-native";
import { CARD_COLORS } from "../constants/colors";
import { getCardLabel } from "../utils/deckUtils";
import { gameStyles } from "../styles/gameStyles";

const DiscardPile = ({ topCard, scale }) => {
  return (
    <Animated.View style={[gameStyles.discard, { transform: [{ scale }] }]}>
      {topCard && (
        <View
          style={[
            gameStyles.card,
            {
              backgroundColor:
                topCard.color === "black"
                  ? CARD_COLORS.black
                  : CARD_COLORS[topCard.color],
            },
          ]}
        >
          <Text style={gameStyles.cardTxt}>{getCardLabel(topCard)}</Text>
        </View>
      )}
    </Animated.View>
  );
};

export default DiscardPile;
