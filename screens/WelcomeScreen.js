import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { BOARD_COLORS } from "../constants/colors";
import { welcomeStyles } from "../styles/welcomeStyles";

const WelcomeScreen = ({ onStart, onShowRules }) => {
  return (
    <View style={welcomeStyles.container}>
      <Image
        source={require("../assets/icon_main.png")}
        style={welcomeStyles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={welcomeStyles.button} onPress={onStart}>
        <Text style={welcomeStyles.buttonText}>Play and Pass</Text>
      </TouchableOpacity>

      <TouchableOpacity style={welcomeStyles.button} onPress={onShowRules}>
        <Text style={welcomeStyles.buttonText}>Rules 📝</Text>
      </TouchableOpacity>

      <Text style={welcomeStyles.copyrightText}>
        ©️ {new Date().getFullYear()} F-UNO Game. All rights reserved.
      </Text>
    </View>
  );
};

export default WelcomeScreen;
