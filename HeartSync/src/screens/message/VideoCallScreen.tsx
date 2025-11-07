import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function VideoCallScreen() {
  const navigation = useNavigation();

  const remoteUser = {
    name: "Ava Jones",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    bg: "https://randomuser.me/api/portraits/men/40.jpg",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: remoteUser.bg }}
        blurRadius={8}
        style={styles.bgImage}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-down" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Avatar & Info */}
        <View style={styles.centerContainer}>
          <Image source={{ uri: remoteUser.avatar }} style={styles.avatar} />
          <Text style={styles.nameText}>{remoteUser.name}</Text>
          <Text style={styles.statusText}>Calling...</Text>
        </View>

        {/* Bottom Control Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="camera-reverse" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="mic-off" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.endCallBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="call" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  bgImage: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 22, // ✅ Không sát viền
    paddingBottom: 30,
  },
  topBar: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerContainer: {
    alignItems: "center",
    marginTop: -60,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 12,
  },
  nameText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
  },
  statusText: {
    color: "#ddd",
    fontSize: 15,
    marginTop: 4,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  controlBtn: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  endCallBtn: {
    width: 68,
    height: 68,
    backgroundColor: "#FF4B4B",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
