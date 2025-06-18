import React from "react";
import {
  Modal,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { gameStyles } from "../styles/gameStyles";

const RulesModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={gameStyles.modal}>
        <View style={gameStyles.rulesModal}>
          <Image
            source={require("../assets/icon_main.png")}
            style={gameStyles.modalLogo}
          />
          <Text style={gameStyles.modalTitle}>F-UNO Rules</Text>
          <ScrollView style={gameStyles.rulesContent}>
            <Text style={gameStyles.sectionTitle}>How to Start the Game:</Text>
            <Text style={gameStyles.ruleText}>
              1. Enter player names (e.g., Player 1: Pratham, Player 2: Bhuvi)
            </Text>
            <Text style={gameStyles.ruleText}>
              2. Enter a 4-digit code for each player (e.g., Pratham: 1111,
              Bhuvi: 2222)
            </Text>
            <Text style={gameStyles.ruleText}>
              3. When starting each player's turn, enter your respective
              passwords
            </Text>
            <Text style={gameStyles.ruleText}>
              4. Pass and play the game following UNO rules
            </Text>

            <Text style={gameStyles.sectionTitle}>Goal:</Text>
            <Text style={gameStyles.ruleText}>
              Be the first to get rid of all your cards. Score points based on
              what other players are left holding. First to 500 points wins.
            </Text>

            <Text style={styles.sectionTitle}>Cards:</Text>
            <Text style={styles.ruleText}>• 108 total cards:</Text>
            <Text style={styles.ruleText}>
              {" "}
              - 0–9 in Red, Yellow, Green, Blue (19 each color)
            </Text>
            <Text style={styles.ruleText}>
              {" "}
              - 8 Draw Two, 8 Reverse, 8 Skip (2 of each in all 4 colors)
            </Text>
            <Text style={styles.ruleText}> - 4 Wild, 4 Wild Draw Four .</Text>
            <Text style={styles.sectionTitle}>rules:</Text>
            <Text style={styles.ruleText}>
              {" "}
              - Match the top discard card by "color", "number" or "symbol".
            </Text>
            <Text style={styles.ruleText}>
              - If no playable card, draw 1 card
            </Text>
            <Text style={styles.ruleText}>
              - When you play your second-last card, you must shout "F-UNO"
            </Text>
            <Text style={styles.ruleText}>
              - If you forget and someone catches you before your next turn,
              draw 2 cards.
            </Text>
            <Text style={styles.ruleText}>
              - When one player runs out of cards, the round ends
            </Text>
            <Text style={styles.ruleText}>
              - If a +2 or +4 is played last, the next player draws those cards.
            </Text>
            <Text style={styles.sectionTitle}>card rules:</Text>
            <Text style={styles.ruleText}>
              {" "}
              - "Draw Two (+2)": Next player draws 2 cards and skips a turn.
            </Text>
            <Text style={styles.ruleText}>
              - "Reverse (⟳)": Reverses the play direction.
            </Text>
            <Text style={styles.ruleText}>
              - "Skip (⨂)": Skips the next player's turn.
            </Text>
            <Text style={styles.ruleText}>
              - "Wild": Play any time, choose the next color.
            </Text>
            <Text style={styles.ruleText}>
              - "Wild Draw Four(+4)": Choose color + next player draws 4 cards
              and skips turn. Only playable if you don't have a card of the
              current color.
            </Text>
            {/* Rest of the rules content */}
          </ScrollView>
          <TouchableOpacity style={gameStyles.closeBtn} onPress={onClose}>
            <Text style={gameStyles.closeTxt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RulesModal;
