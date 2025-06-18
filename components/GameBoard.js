import React from "react";
import { View, Text, Dimensions } from "react-native";
import { gameStyles } from "../styles/gameStyles";

const { width, height } = Dimensions.get("window");

const GameBoard = ({
  playerCount,
  playerNames,
  playerHands,
  currentPlayer,
}) => {
  const renderPlayerPos = (pIdx) => {
    const positions = {
      2: [
        { left: width / 2 - 110, top: height / 2 - 390 },
        { left: width / 2 - 110, top: height / 2 - 160 },
      ],
      3: [
        { left: width / 2 - 110, top: height / 2 - 390 },
        { left: width / 2 - 230, top: height / 2 - 260 },
        { left: width / 2, top: height / 2 - 260 },
      ],
      4: [
        { left: width / 2 - 110, top: height / 2 - 390 },
        { left: width / 2 - 230, top: height / 2 - 260 },
        { left: width / 2, top: height / 2 - 260 },
        { left: width / 2 - 110, top: height / 2 - 150 },
      ],
    };

    return {
      position: "absolute",
      ...positions[playerCount][pIdx],
      alignItems: "center",
    };
  };

  return (
    <View style={gameStyles.table}>
      {playerHands.map((hand, i) => (
        <View key={i} style={renderPlayerPos(i)}>
          <Text style={gameStyles.pName}>{playerNames[i]}</Text>
          <View
            style={[
              gameStyles.otherCards,
              {
                flexDirection:
                  (playerCount === 3 && (i === 1 || i === 2)) ||
                  (playerCount === 4 && (i === 1 || i === 2))
                    ? "row-reverse"
                    : "row",
              },
            ]}
          >
            {Array(Math.min(5, hand.length))
              .fill()
              .map((_, j) => (
                <View
                  key={j}
                  style={[
                    gameStyles.hiddenCard,
                    {
                      transform: [
                        { rotate: i === currentPlayer ? "0deg" : "180deg" },
                      ],
                    },
                  ]}
                />
              ))}
            {hand.length > 5 && (
              <Text style={gameStyles.moreCards}>+{hand.length - 5}</Text>
            )}
          </View>
          <Text style={gameStyles.cardCount}>{hand.length} Cards</Text>
        </View>
      ))}
    </View>
  );
};

export default GameBoard;
