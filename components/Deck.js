import React from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { gameStyles } from "../styles/gameStyles";

const Deck = ({ deckCount, onDrawCard }) => {
  return (
    <TouchableOpacity onPress={onDrawCard} style={gameStyles.deckContainer}>
      <View style={gameStyles.deck}>
        <Text style={gameStyles.deckCount}>{deckCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Deck;
