import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { gameStyles } from "../styles/gameStyles";

const Scoreboard = ({ playerNames, scores }) => {
  return (
    <TouchableOpacity style={gameStyles.lbBtn}>
      <Text style={gameStyles.lbTitle}>Scores</Text>
      {playerNames.map((name, i) => (
        <View key={i} style={gameStyles.lbEntry}>
          <Text style={gameStyles.lbRank}>{i + 1}.</Text>
          <Text style={gameStyles.lbName}>{name || `Player ${i + 1}`}</Text>
          <Text style={gameStyles.lbScore}>{scores[i] || 0}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

export default Scoreboard;
