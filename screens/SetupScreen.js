import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { BOARD_COLORS } from "../constants/colors";
import { setupStyles } from "../styles/setupStyles";

const SetupScreen = ({ setupStep, setSetupStep, gameState, setGameState }) => {
  const [inputValues, setInputValues] = useState(
    Array(gameState.pCount).fill("")
  );

  const handleNext = () => {
    if (setupStep === 2) {
      if (inputValues.some((name) => !name.trim())) {
        Alert.alert("Error", "Please enter names for all players");
        return;
      }
      setGameState({ ...gameState, pNames: inputValues });
      setSetupStep(3);
    } else if (setupStep === 3) {
      const uniqueCodes = new Set(inputValues);
      if (uniqueCodes.size !== gameState.pCount) {
        Alert.alert(
          "Duplicate Codes",
          "Each player must have a unique 4-digit code"
        );
        return;
      }
      setGameState({ ...gameState, pCodes: inputValues });
      setSetupStep(4);
    } else {
      setSetupStep(setupStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (setupStep) {
      case 1:
        return (
          <>
            <Text style={setupStyles.title}>How Many Players?</Text>
            <View style={setupStyles.pCountCont}>
              {[2, 3, 4].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    setupStyles.pCountBtn,
                    gameState.pCount === num && setupStyles.pCountBtnSel,
                  ]}
                  onPress={() => setGameState({ ...gameState, pCount: num })}
                >
                  <Text style={setupStyles.pCountTxt}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={setupStyles.title}>Enter Player Names</Text>
            {Array(gameState.pCount)
              .fill()
              .map((_, i) => (
                <View key={i} style={setupStyles.inputCont}>
                  <Text style={setupStyles.inputLabel}>Player {i + 1}:</Text>
                  <TextInput
                    style={setupStyles.input}
                    placeholder={`Player ${i + 1} Name`}
                    value={inputValues[i] || ""}
                    onChangeText={(text) => {
                      const newValues = [...inputValues];
                      newValues[i] = text;
                      setInputValues(newValues);
                    }}
                  />
                </View>
              ))}
          </>
        );
      case 3:
        return (
          <>
            <Text style={setupStyles.title}>Enter Player Codes</Text>
            {Array(gameState.pCount)
              .fill()
              .map((_, i) => (
                <View key={i} style={setupStyles.inputCont}>
                  <Text style={setupStyles.inputLabel}>
                    {gameState.pNames[i]}:
                  </Text>
                  <TextInput
                    style={setupStyles.input}
                    placeholder="Enter 4-digit code"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    value={inputValues[i] || ""}
                    onChangeText={(text) => {
                      if (text === "" || /^[0-9]+$/.test(text)) {
                        const newValues = [...inputValues];
                        newValues[i] = text;
                        setInputValues(newValues);
                      }
                    }}
                  />
                  {inputValues[i]?.length > 0 &&
                    inputValues[i]?.length !== 4 && (
                      <Text style={setupStyles.errorText}>
                        Please enter exactly 4 digits
                      </Text>
                    )}
                </View>
              ))}
            <Text style={setupStyles.subtitle}>
              4-digit numeric codes for each player
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={setupStyles.container}>
      <TouchableOpacity
        style={setupStyles.backButton}
        onPress={() => setSetupStep(setupStep - 1)}
      >
        <Text style={setupStyles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      {renderStepContent()}

      <TouchableOpacity
        style={[
          setupStyles.nextBtn,
          setupStep === 3 &&
            !inputValues.every((code) => code?.length === 4) &&
            setupStyles.disabledBtn,
        ]}
        disabled={
          setupStep === 3 && !inputValues.every((code) => code?.length === 4)
        }
        onPress={handleNext}
      >
        <Text style={setupStyles.nextTxt}>
          {setupStep === 3 ? "Start Game" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetupScreen;
