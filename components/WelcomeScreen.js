import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { gameStyles } from "../styles/gameStyles";

const WelcomeScreen = ({ onStartGame, onShowRules }) => {
  return (
    <View
      style={[
        gameStyles.welcomeContainer,
        { backgroundColor: BOARD_COLORS.bg },
      ]}
    >
      <Image
        source={require("../assets/icon_main.png")}
        style={gameStyles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={gameStyles.welcomeButton} onPress={onStartGame}>
        <Text style={gameStyles.welcomeButtonText}>Play and Pass</Text>
      </TouchableOpacity>

      <TouchableOpacity style={gameStyles.welcomeButton} onPress={onShowRules}>
        <Text style={gameStyles.welcomeButtonText}>Rules 📝</Text>
      </TouchableOpacity>
      <Text style={gameStyles.copyrightText}>
        ©️ {new Date().getFullYear()} F-UNO Game. All rights reserved.
      </Text>
    </View>
  );
};

export default WelcomeScreen;
