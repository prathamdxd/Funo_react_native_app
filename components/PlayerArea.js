import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { gameStyles } from "../styles/gameStyles";

const PlayerArea = ({
  playerName,
  selectedCardIndex,
  onDrawCard,
  onPlayCard,
  onCallFUno,
}) => {
  return (
    <View style={gameStyles.playerArea}>
      <Text style={gameStyles.yourCards}>{playerName}:</Text>
      <View style={gameStyles.controls}>
        <TouchableOpacity style={gameStyles.ctrlBtn} onPress={onDrawCard}>
          <Text style={gameStyles.ctrlTxt}>Draw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            gameStyles.ctrlBtn,
            selectedCardIndex === null && gameStyles.disabled,
          ]}
          onPress={onPlayCard}
          disabled={selectedCardIndex === null}
        >
          <Text style={gameStyles.ctrlTxt}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={gameStyles.FunoBtn} onPress={onCallFUno}>
          <Text style={gameStyles.FunoTxt}>F-UNO!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerArea;
