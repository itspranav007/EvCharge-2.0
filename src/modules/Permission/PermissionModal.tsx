// PermissionModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Permissions from "./Permission";
import { openSettings } from "react-native-permissions";


interface PermissionModalProps {
  visible: boolean;
  type: string;               // "camera" | "location" | "notification" ...etc.
  title: string;
  message: string;
  onClose: () => void;
  onResult?: (granted: boolean) => void;
}

const PermissionModal = ({
  visible,
  type,
  title,
  message,
  onClose,
  onResult,
}: PermissionModalProps) => {
  
  const handleAllow = async () => {
    // Call your central permission system
    const granted = await Permissions.checkAndRequest(type as any);

    if (!granted) {
      // Check if permission is BLOCKED
      const platformCheck = await Permissions.checkAndRequest(type as any);
      if (platformCheck === false) {
        openSettings();
      }
    }

    onClose();
    onResult && onResult(granted);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.noBtn} onPress={onClose}>
              <Text style={styles.noText}>Not Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.allowBtn} onPress={handleAllow}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PermissionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  box: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 14,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  noBtn: {
    padding: 10,
    marginRight: 10,
  },
  noText: {
    fontSize: 15,
    color: "#555",
  },
  allowBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  allowText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
