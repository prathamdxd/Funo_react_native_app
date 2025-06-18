import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  Image,
} from "react-native";
import { CARD_COLORS, BOARD_COLORS } from "../constants/colors";
import { CARD_TYPES } from "../constants/game";
import {
  generateDeck,
  shuffleDeck,
  dealCards,
  getCardLabel,
  getCardPoints,
} from "../utils/deckUtils";
import { canPlayCard } from "../utils/gameLogic";
import Card from "../components/Card";
import ColorPicker from "../components/ColorPicker";
import DiscardPile from "../components/DiscardPile";
import GameBoard from "../components/GameBoard";
import PlayerArea from "../components/PlayerArea";
import Scoreboard from "../components/Scoreboard";
import RulesModal from "../components/RulesModal";
import { gameStyles } from "../styles/gameStyles";

const { width, height } = Dimensions.get("window");

const GameScreen = ({
  pCount,
  pNames,
  pCodes,
  onExitGame,
  initialScores = [],
  initialRounds = 0,
}) => {
  const [deck, setDeck] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [pHands, setPHands] = useState([]);
  const [currPlayer, setCurrPlayer] = useState(0);
  const [currColor, setCurrColor] = useState("");
  const [dir, setDir] = useState(1);
  const [scores, setScores] = useState(
    initialScores.length ? initialScores : Array(pCount).fill(0)
  );
  const [rounds, setRounds] = useState(initialRounds);
  const [gameOver, setGameOver] = useState(false);
  const [calledFUno, setCalledFUno] = useState(false);
  const [needCode, setNeedCode] = useState(true);
  const [codeInput, setCodeInput] = useState("");
  const [selCardIdx, setSelCardIdx] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [actionMsg, setActionMsg] = useState("");
  const [activePIdx, setActivePIdx] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lastAction, setLastAction] = useState({
    player: null,
    card: null,
    action: null,
  });

  // Animation refs
  const cardAnim = useRef(new Animated.Value(0)).current;
  const discardAnim = useRef(new Animated.Value(1)).current;
  const fUnoAnim = useRef(new Animated.Value(0)).current;
  const [showFUno, setShowFUno] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const animateCard = (anim, toValue, duration = 300) => {
    return Animated.timing(anim, {
      toValue,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });
  };

  const animateDiscard = () => {
    discardAnim.setValue(0);
    Animated.spring(discardAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const showMessage = (msg, duration = 2000) => {
    setActionMsg(msg);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), duration);
  };

  const startGame = () => {
    let newDeck = shuffleDeck(generateDeck());
    const hands = dealCards(pCount, newDeck);
    let firstCard = newDeck.pop();

    while (
      firstCard.color === "black" ||
      firstCard.type !== CARD_TYPES.NUMBER
    ) {
      newDeck.unshift(firstCard);
      firstCard = newDeck.pop();
    }

    if (firstCard.type === CARD_TYPES.REVERSE) {
      setDir(-1);
      showMessage("Direction reversed! Dealer starts, play goes right");
    }

    if (firstCard.type === CARD_TYPES.SKIP) {
      setCurrPlayer(1 % pCount);
      showMessage("First player skipped! Next player starts");
    }

    setDeck(newDeck);
    setDiscard([firstCard]);
    setPHands(hands);
    setCurrColor(firstCard.color);
    setNeedCode(true);
    setActivePIdx(firstCard.type === CARD_TYPES.SKIP ? 1 % pCount : 0);
    setScores(Array(pCount).fill(0));
    showMessage(
      `Game started! First card: ${firstCard.color} ${getCardLabel(firstCard)}`
    );
  };

  const startNewRound = (currentScores) => {
    setRounds((prev) => prev + 1);
    if (currentScores?.some((score) => score >= 500)) {
      setGameOver(true);
      return;
    }

    let newDeck = shuffleDeck(generateDeck());
    const hands = dealCards(pCount, newDeck);
    let firstCard = newDeck.pop();

    while (
      firstCard.color === "black" ||
      firstCard.type !== CARD_TYPES.NUMBER
    ) {
      newDeck.unshift(firstCard);
      firstCard = newDeck.pop();
    }

    setDeck(newDeck);
    setDiscard([firstCard]);
    setPHands(hands);
    setCurrColor(firstCard.color);
    setCurrPlayer((rounds + 1) % pCount);
    setDir(1);
    setCalledFUno(false);
    setSelCardIdx(null);
    setNeedCode(true);
    setActivePIdx((rounds + 1) % pCount);

    if (firstCard.type === CARD_TYPES.REVERSE) {
      setDir(-1);
      showMessage("Direction reversed! Dealer starts, play goes right");
    }

    if (firstCard.type === CARD_TYPES.SKIP) {
      setCurrPlayer((rounds + 2) % pCount);
      showMessage("First player skipped! Next player starts");
    }

    showMessage(
      `New round! First card: ${firstCard.color} ${getCardLabel(firstCard)}`
    );
  };

  const verifyCode = () => {
    if (pCodes[activePIdx] === codeInput) {
      setCodeInput("");
      setNeedCode(false);
      setCurrPlayer(activePIdx);
      showMessage(`${pNames[activePIdx]}'s turn`);
      return true;
    }
    Alert.alert("Invalid Code", "Incorrect code");
    return false;
  };

  const drawCards = async (pIdx, count) => {
    const newHands = [...pHands];
    const newDeck = [...deck];
    const drawnCards = [];

    if (newDeck.length === 0 && discard.length > 1) {
      const topCard = discard.pop();
      const shuffled = shuffleDeck([...discard]);
      newDeck.push(...shuffled);
      setDiscard([topCard]);
      showMessage("Deck reshuffled from discard pile!");
    }

    for (let i = 0; i < count && newDeck.length > 0; i++) {
      const card = newDeck.pop();
      drawnCards.push(card);
      newHands[pIdx].push(card);
    }

    setPHands(newHands);
    setDeck(newDeck);

    const nextPlayer = (currPlayer + dir + pCount) % pCount;
    setCurrPlayer(nextPlayer);
    setNeedCode(true);
    setActivePIdx(nextPlayer);
    showMessage(`${pNames[nextPlayer]}'s turn`);

    animateCard(cardAnim, 1).start(() => {
      cardAnim.setValue(0);
    });
  };

  const handleColorSelect = (color) => {
    if (
      selCardIdx === null ||
      !pHands[currPlayer] ||
      !pHands[currPlayer][selCardIdx]
    ) {
      Alert.alert("Error", "No card selected");
      setShowColorPicker(false);
      return;
    }

    const card = pHands[currPlayer][selCardIdx];
    const newHands = [...pHands];
    newHands[currPlayer] = newHands[currPlayer].filter(
      (_, i) => i !== selCardIdx
    );

    const newDiscard = [...discard, card];
    let nextPlayer = (currPlayer + dir + pCount) % pCount;
    let drawCount = 0;

    const cardPoints = getCardPoints(card);
    const newScores = [...scores];
    newScores[currPlayer] += cardPoints;
    setScores(newScores);

    if (card.type === CARD_TYPES.WILD_DRAW_FOUR) {
      drawCount = 4;
      nextPlayer = (currPlayer + dir + pCount) % pCount;
      showMessage(`${pNames[nextPlayer]} draws 4!`);
    }

    setPHands(newHands);
    setDiscard(newDiscard);
    setSelCardIdx(null);
    setCalledFUno(false);
    setCurrColor(color);
    setShowColorPicker(false);

    setLastAction({
      player: pNames[currPlayer],
      card,
      action: `played ${card.type} (${color})`,
    });

    if (drawCount > 0) {
      drawCards(nextPlayer, drawCount);
    } else {
      setCurrPlayer(nextPlayer);
      setNeedCode(true);
      setActivePIdx(nextPlayer);
      showMessage(`Turn: ${pNames[nextPlayer]}`);
    }

    animateDiscard();
  };

  const handlePlayCard = () => {
    if (selCardIdx === null) {
      Alert.alert("No Card Selected", "Please select a card to play");
      return;
    }

    const card = pHands[currPlayer][selCardIdx];
    const topCard = discard[discard.length - 1];

    if (card.color === "black") {
      if (card.type === CARD_TYPES.WILD_DRAW_FOUR) {
        const hasMatchingCard = pHands[currPlayer].some(
          (c) => c.color === currColor && c.color !== "black"
        );

        if (hasMatchingCard) {
          Alert.alert(
            "Invalid Move",
            "You must play a matching color card if you have one"
          );
          return;
        }
      }
      setShowColorPicker(true);
      return;
    }

    if (!canPlayCard(topCard, card, currColor)) {
      Alert.alert(
        "Invalid Move",
        `You can only play:
    - current color: ${currColor} cards
    - top card color: ${topCard.color} cards
    - matching value/symbol`
      );
      return;
    }

    if (pHands[currPlayer].length === 2 && !calledFUno) {
      Alert.alert("F-UNO!", "You didn't call F-UNO! Draw 2");
      drawCards(currPlayer, 2);
      return;
    }

    const newHands = [...pHands];
    newHands[currPlayer] = newHands[currPlayer].filter(
      (_, i) => i !== selCardIdx
    );

    const cardPoints = getCardPoints(card);
    const newScores = [...scores];
    newScores[currPlayer] += cardPoints;
    setScores(newScores);

    setLastAction({
      player: pNames[currPlayer],
      card,
      action: `played ${card.color}`,
    });

    if (newHands[currPlayer].length === 0) {
      const newScores = [...scores];
      newScores[currPlayer] += 108;
      setScores(newScores);

      setTimeout(() => {
        Alert.alert(
          "Round Over!",
          `${pNames[currPlayer]} wins with 108 points this round!`,
          [
            {
              text: "Next Round",
              onPress: () => startNewRound(newScores),
            },
          ]
        );
      }, 500);
      return;
    }

    const newDiscard = [...discard, card];
    let nextPlayer = (currPlayer + dir + pCount) % pCount;
    let newDir = dir;
    let drawCount = 0;

    switch (card.type) {
      case CARD_TYPES.SKIP:
        nextPlayer = (nextPlayer + dir + pCount) % pCount;
        break;

      case CARD_TYPES.REVERSE:
        newDir *= -1;
        if (pCount === 2) {
          nextPlayer = (currPlayer + newDir + pCount) % pCount;
        } else {
          nextPlayer = (currPlayer - dir + pCount) % pCount;
        }
        break;

      case CARD_TYPES.DRAW_TWO:
        drawCount = 2;
        nextPlayer = (currPlayer + dir + pCount) % pCount;
        break;

      case CARD_TYPES.WILD_DRAW_FOUR:
        drawCount = 4;
        nextPlayer = (currPlayer + dir + pCount) % pCount;
        break;
    }

    setDir(newDir);

    if (drawCount > 0) {
      drawCards(nextPlayer, drawCount);
      nextPlayer = (nextPlayer + dir + pCount) % pCount;
    }

    setPHands(newHands);
    setDiscard(newDiscard);
    setCurrColor(card.color);
    setDir(newDir);
    setSelCardIdx(null);
    setCalledFUno(false);
    setCurrPlayer(nextPlayer);
    setNeedCode(true);
    setActivePIdx(nextPlayer);
    showMessage(`${pNames[nextPlayer]}'s turn`);

    animateDiscard();
  };

  const handleCallFUno = () => {
    if (pHands[currPlayer].length === 2) {
      setCalledFUno(true);
      setShowFUno(true);
      fUnoAnim.setValue(0);

      Animated.sequence([
        Animated.timing(fUnoAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fUnoAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => setShowFUno(false));
    } else {
      Alert.alert("Too Early", "Call F-UNO when you have exactly 2 cards left");
    }
  };

  if (gameOver) {
    let winnerIndex = 0;
    scores.forEach((score, i) => {
      if (score > scores[winnerIndex]) winnerIndex = i;
    });
    return (
      <View style={[styles.container, { backgroundColor: BOARD_COLORS.bg }]}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.winnerTxt}>
          {pNames[winnerIndex]} wins with {scores[winnerIndex]} points!
        </Text>
        <View style={styles.scoreboard}>
          {scores.map((s, i) => (
            <View key={i} style={styles.scoreRow}>
              <Text style={styles.pName}>{pNames[i]}</Text>
              <Text style={styles.pScore}>{s}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.playAgainBtn} onPress={onExitGame}>
          <Text style={styles.nextTxt}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[gameStyles.container, { backgroundColor: BOARD_COLORS.bg }]}>
      <Scoreboard pNames={pNames} scores={scores} />

      <ColorPicker
        visible={showColorPicker}
        onSelect={handleColorSelect}
        onClose={() => setShowColorPicker(false)}
      />

      {lastAction.card && (
        <View style={gameStyles.lastActionContainer}>
          <Text style={gameStyles.lastActionText}>
            {lastAction.player} played:{" "}
            {lastAction.card.type === CARD_TYPES.WILD ||
            lastAction.card.type === CARD_TYPES.WILD_DRAW_FOUR
              ? `${lastAction.card.type} (${currColor})`
              : `${lastAction.card.color}`}
          </Text>
          <View
            style={[
              gameStyles.lastActionCard,
              { backgroundColor: CARD_COLORS[lastAction.card.color] },
            ]}
          >
            <Text style={gameStyles.lastActionCardText}>
              {getCardLabel(lastAction.card)}
            </Text>
          </View>
          <Text style={gameStyles.lastActionText}>{lastAction.action}</Text>
        </View>
      )}

      <TouchableOpacity
        style={gameStyles.exitBtn}
        onPress={() =>
          Alert.alert("Quit?", "Are you sure?", [
            { text: "Cancel" },
            { text: "Quit", onPress: onExitGame },
          ])
        }
      >
        <Text style={gameStyles.exitTxt}>Exit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          gameStyles.currentColorButton,
          { backgroundColor: CARD_COLORS[currColor] },
        ]}
        onPress={() =>
          Alert.alert(
            "Current Color",
            `The current playing color is: ${currColor.toUpperCase()}`
          )
        }
      >
        <Text style={gameStyles.currentColorText}>
          {currColor.toUpperCase()}
        </Text>
      </TouchableOpacity>

      <GameBoard
        pCount={pCount}
        pNames={pNames}
        pHands={pHands}
        currPlayer={currPlayer}
        discard={discard}
        currColor={currColor}
        discardAnim={discardAnim}
      />

      {showFUno && (
        <Animated.View
          style={[
            gameStyles.funoContainer,
            {
              opacity: fUnoAnim,
              transform: [
                {
                  scale: fUnoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1.5],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={gameStyles.funoMessage}>
            <Text style={gameStyles.funoText}>F-UNO!</Text>
          </View>
        </Animated.View>
      )}

      {needCode ? (
        <View style={gameStyles.codeCont}>
          <Text style={gameStyles.codePrompt}>{pNames[activePIdx]}, code:</Text>
          <View style={gameStyles.passwordInputContainer}>
            <TextInput
              style={gameStyles.codeInput}
              placeholder="4-digit"
              placeholderTextColor="black"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={!showPassword}
              value={codeInput}
              onChangeText={setCodeInput}
            />
            <TouchableOpacity
              style={gameStyles.eyeIcon}
              onPress={togglePasswordVisibility}
            >
              <Image
                source={
                  showPassword
                    ? require("../assets/eye_open.png")
                    : require("../assets/eye_closed.png")
                }
                style={gameStyles.eyeIconImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={gameStyles.codeBtn} onPress={verifyCode}>
            <Text style={gameStyles.codeTxt}>Start</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PlayerArea
          playerName={pNames[currPlayer]}
          hand={pHands[currPlayer]}
          selCardIdx={selCardIdx}
          onSelectCard={setSelCardIdx}
          onDrawCard={() => {
            drawCards(currPlayer, 1);
            showMessage(`You drew a card`);
          }}
          onPlayCard={handlePlayCard}
          onCallFUno={handleCallFUno}
          cardAnim={cardAnim}
        />
      )}

      <RulesModal visible={showRules} onClose={() => setShowRules(false)} />
    </View>
  );
};

export default GameScreen;
