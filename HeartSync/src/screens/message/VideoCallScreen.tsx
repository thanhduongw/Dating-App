import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function VideoCallScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { target } = route.params as any;

  // fallback nếu target không có avatar:
  const avatar = target?.avatar || "https://i.imgur.com/3QF0u7y.png";

  return (
    <ImageBackground source={{ uri: avatar }} blurRadius={40} style={styles.bg}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-down" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Menu */}
      <TouchableOpacity style={styles.menuBtn}>
        <Ionicons name="ellipsis-vertical" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Avatar Center */}
      <View style={styles.centerBox}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.nameText}>{target?.name || "Unknown"}</Text>
        <Text style={styles.callingText}>Calling...</Text>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="refresh" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="mic-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconBtn, styles.hangupBtn]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="call-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 60,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  menuBtn: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  centerBox: {
    alignItems: "center",
    marginTop: 40,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#fff",
  },
  nameText: {
    marginTop: 16,
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  callingText: {
    color: "#eee",
    marginTop: 4,
    fontSize: 16,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
  },
  iconBtn: {
    width: 68,
    height: 68,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  hangupBtn: {
    backgroundColor: "rgba(255,0,0,0.6)",
  },
});
