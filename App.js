import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import SetupScreen from "./screens/SetupScreen";
import GameScreen from "./screens/GameScreen";

const App = () => {
  const [setupStep, setSetupStep] = useState(0);
  const [gameState, setGameState] = useState({
    pCount: 2,
    pNames: [],
    pCodes: [],
    gameStarted: false,
    gameOver: false,
    rounds: 0,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {setupStep === 0 ? (
        <WelcomeScreen
          onStart={() => setSetupStep(1)}
          onShowRules={() => setShowRules(true)}
        />
      ) : setupStep < 4 ? (
        <SetupScreen
          setupStep={setupStep}
          setSetupStep={setSetupStep}
          gameState={gameState}
          setGameState={setGameState}
        />
      ) : (
        <GameScreen
          gameState={gameState}
          setGameState={setGameState}
          onExit={() => {
            setSetupStep(0);
            setGameState({
              pCount: 2,
              pNames: [],
              pCodes: [],
              gameStarted: false,
              gameOver: false,
              rounds: 0,
            });
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
