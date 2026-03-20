import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Color, fontFamily, PoppinsBold } from "../modules/themes"; // adjust if you have theme colors

const { width } = Dimensions.get("window");

interface AlertModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title = "Alert",
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.buttonRow}>
            {onCancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={[styles.buttonText, { color: "#007AFF" }]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: "#007AFF" }]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
     fontFamily: PoppinsBold,

  },
  message: {
    fontSize: 15,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
 fontFamily: fontFamily
},
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButton: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  confirmButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
     fontFamily: fontFamily

  },
});
