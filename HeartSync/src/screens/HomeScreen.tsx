import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={26} color="#444" />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="refresh-outline" size={24} color="#444" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>HeartSync</Text>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => navigation.navigate("FilterScreen" as never)}
        >
          <Ionicons name="options-outline" size={22} color="#5A6CF3" />
        </TouchableOpacity>
      </View>

      {/* ✅ Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* ✅ Main Card */}
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/65.jpg",
          }}
          style={styles.image}
        />

        {/* Overlay Text */}
        <View style={styles.overlay}>
          <View style={styles.topTextBox}>
            <Text style={styles.swipeTitle}>Swipe right if you like</Text>
            <Text style={styles.swipeDesc}>
              If the person also swipes right on you,{"\n"}
              it’s a match and you can connect.
            </Text>
          </View>

          <View style={styles.bottomTextBox}>
            <Text style={styles.swipeTitle}>Swipe left to pass</Text>
            <Text style={styles.swipeDesc}>
              If the person is not your cup of tea,{"\n"}
              simply pass. It’s that easy!
            </Text>
          </View>
        </View>

        {/* ✅ User info */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            Ava Jones, 25{" "}
            <Ionicons name="checkmark-circle" color="#62A3FF" size={16} />
          </Text>
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>she/ her/ hers</Text>
            </View>
            <View style={[styles.row, { marginTop: 4 }]}>
              <Ionicons
                name="briefcase-outline"
                size={16}
                color="#fff"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.jobText}>Business Analyst at Tech</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFE9FF", paddingHorizontal: 18 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 6,
  },

  progressBar: {
    width: "60%",
    height: 6,
    backgroundColor: "#D6D0FF",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  progressFill: {
    width: "35%",
    height: "100%",
    backgroundColor: "#7A6AF7",
    borderRadius: 10,
  },

  card: {
    marginTop: 18,
    backgroundColor: "#7A6AF7",
    borderRadius: 18,
    overflow: "hidden",
    height: "72%",
  },

  image: { width: "100%", height: "100%", opacity: 0.55 },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: 22,
    paddingHorizontal: 18,
  },

  swipeTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  swipeDesc: {
    color: "#fff",
    fontSize: 13,
    marginTop: 8,
    opacity: 0.9,
  },

  topTextBox: { marginTop: 15 },
  bottomTextBox: { marginBottom: 60 },

  userInfo: {
    position: "absolute",
    bottom: 10,
    left: 14,
  },

  name: { fontSize: 22, fontWeight: "700", color: "#fff" },

  row: { flexDirection: "row", alignItems: "center" },

  badgesRow: { marginTop: 6 },

  badge: {
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  badgeText: { fontSize: 11, color: "#fff", fontWeight: "600" },

  jobText: { fontSize: 12, color: "#fff" },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  filterBtn: {
    width: 34,
    height: 34,
    backgroundColor: "#F1EEFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  progressWrap: {
    alignItems: "center",
    marginTop: 10,
  },
});
