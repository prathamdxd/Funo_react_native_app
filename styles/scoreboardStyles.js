import { StyleSheet } from "react-native";
import { BOARD_COLORS } from "../constants/colors";

export const scoreboardStyles = StyleSheet.create({
  scoreboardButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
    width: 120,
    elevation: 3,
  },
  scoreboardTitle: {
    fontWeight: "bold",
    color: BOARD_COLORS.text,
    textAlign: "center",
    marginBottom: 5,
  },
  scoreboardEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  scoreboardRank: {
    fontWeight: "bold",
    color: BOARD_COLORS.text,
    width: 20,
  },
  scoreboardName: {
    fontWeight: "bold",
    color: BOARD_COLORS.text,
    flex: 1,
    marginHorizontal: 5,
  },
  scoreboardScore: {
    fontWeight: "bold",
    color: BOARD_COLORS.text,
    width: 30,
    textAlign: "right",
  },
  winnerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50",
    textAlign: "center",
  },
  scoreboard: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    padding: 30,
    elevation: 3,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  playerScore: {
    fontWeight: "bold",
    color: BOARD_COLORS.text,
  },
});
