import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatRoomScreen() {
  const navigation = useNavigation();

  // ✅ State lưu tin nhắn
  const [messages, setMessages] = useState<string[]>(["Hi there!"]);
  const [inputText, setInputText] = useState("");

  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, inputText.trim()]);
    setInputText("");

    // ✅ Tự động scroll xuống cuối
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#444" />
        </TouchableOpacity>

        <View style={styles.userRow}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/22.jpg",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>
              Ava Jones, 25{" "}
              <Ionicons name="checkmark-circle" size={16} color="#5A6CF3" />
            </Text>
            <Text style={styles.subInfo}>she/ her/ hers</Text>
            <Text style={styles.jobTitle}>Business Analyst at Tech</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <Ionicons
            name="videocam-outline"
            size={26}
            color="#444"
            onPress={() => navigation.navigate("VideoCallScreen" as never)}
          />
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color="#444"
            style={{ marginLeft: 16 }}
          />
        </View>
      </View>

      <View style={styles.divider} />

      {/* ✅ Chat Messages */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        <Text style={styles.dayText}>Today</Text>

        {messages.map((msg, index) => (
          <View key={index}>
            <View style={styles.bubbleRight}>
              <Text style={styles.bubbleText}>{msg}</Text>
            </View>
            <Text style={styles.sentText}>Sent</Text>
          </View>
        ))}

        {/* Mini-Game Promo Box */}
        <View style={styles.gameBox}>
          <Ionicons name="bulb-outline" size={20} color="#5A6CF3" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.gameTitle}>
              Invite your match to play a mini-game.
            </Text>
            <Text style={styles.gameSub}>
              Break the ice and find out if you both sync on a deeper level.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ✅ Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="#bbb"
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ✅ Bottom Actions */}
      <View style={styles.bottomActions}>
        <Ionicons name="globe-outline" size={26} color="#5A6CF3" />
        <Ionicons name="bulb-outline" size={26} color="#5A6CF3" />
        <Ionicons name="image-outline" size={26} color="#5A6CF3" />
        <Ionicons name="camera-outline" size={26} color="#5A6CF3" />
        <Ionicons name="mic-outline" size={26} color="#5A6CF3" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    flex: 1,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
    marginRight: 12,
  },
  userName: {
    fontSize: 17,
    fontWeight: "700",
  },
  subInfo: { fontSize: 12, color: "#5A6CF3" },
  jobTitle: { fontSize: 12, color: "#555", marginTop: 2 },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  chatContent: {
    paddingBottom: 100,
  },
  dayText: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginVertical: 10,
  },
  bubbleRight: {
    alignSelf: "flex-end",
    backgroundColor: "#5A6CF3",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: "70%",
    marginTop: 8,
  },
  bubbleText: {
    color: "#fff",
    fontSize: 15,
  },
  sentText: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#777",
    marginTop: 2,
    marginRight: 4,
  },
  gameBox: {
    backgroundColor: "#EFEFFF",
    borderRadius: 14,
    padding: 12,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#443",
  },
  gameSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    width: "92%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5FA",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },
  sendBtn: {
    backgroundColor: "#5A6CF3",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
