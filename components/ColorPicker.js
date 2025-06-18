import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { CARD_COLORS } from "../constants/colors";
import { gameStyles } from "../styles/gameStyles";

const ColorPicker = ({ visible, onSelectColor, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={gameStyles.colorModal}>
        <View style={gameStyles.colorPicker}>
          <Text style={gameStyles.colorTitle}>Choose a color:</Text>
          <View style={gameStyles.colorOptions}>
            {["red", "blue", "green", "yellow"].map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  gameStyles.colorOption,
                  { backgroundColor: CARD_COLORS[color] },
                ]}
                onPress={() => {
                  onSelectColor(color);
                  onClose();
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ColorPicker;
