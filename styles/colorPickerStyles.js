import { StyleSheet } from "react-native";
import { BOARD_COLORS, CARD_COLORS } from "../constants/colors";

export const colorPickerStyles = StyleSheet.create({
  colorModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  colorPicker: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  colorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 3,
  },
});
