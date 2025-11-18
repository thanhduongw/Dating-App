import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/StackNavigator";

// ⚙️ Thay đổi IP này theo máy bạn
const SOCKET_URL = "http://192.168.1.9:5000";

type Nav = NativeStackNavigationProp<RootStackParamList, "ChatRoom">;

export default function ChatRoomScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const { roomId, target } = route.params as any;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  // ⚙️ Flag phân biệt 2 người
  const IS_USER_B = true; // 👉 Máy 2 để true

  const currentUser = IS_USER_B
    ? { id: "userB", name: "User B" }
    : { id: "userA", name: "User A" };

  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to server");
      socket.emit("joinRoom", roomId);
    });

    socket.on("messageHistory", (history) => {
      console.log("📜 History:", history);
      setMessages(history);
    });

    socket.on("receiveMessage", (msg) => {
      console.log("📩 New message:", msg);
      setMessages((prev) => {
        const exists = prev.some(
          (m) => m.time === msg.time && m.text === msg.text
        );
        if (exists) return prev;
        return [...prev, msg];
      });
      scrollRef.current?.scrollToEnd({ animated: true });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // ✅ Gửi tin nhắn
  const handleSend = () => {
    if (!text.trim()) return;
    const msg = {
      roomId,
      sender: currentUser.id,
      text: text.trim(),
    };
    console.log("🚀 Sending:", msg);
    socketRef.current?.emit("sendMessage", msg);
    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Header mới với avatar + video + menu */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#444" />
        </TouchableOpacity>

        <View style={styles.userRow}>
          <Image
            source={{
              uri:
                target?.avatar ||
                "https://randomuser.me/api/portraits/women/22.jpg",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>
              {target?.name || "Ava Jones"}, 25{" "}
              <Ionicons name="checkmark-circle" size={14} color="#5A6CF3" />
            </Text>
            <Text style={styles.subInfo}>she/ her/ hers</Text>
            <Text style={styles.jobTitle}>Business Analyst at Tech</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          {/* 👉 FIXED VIDEO CALL BUTTON */}
          <Ionicons
            name="videocam-outline"
            size={24}
            color="#444"
            style={{ marginRight: 12 }}
            onPress={() => navigation.navigate("VideoCall", { target })}
          />

          <Ionicons name="ellipsis-vertical" size={20} color="#444" />
        </View>
      </View>

      {/* 🔹 Danh sách tin nhắn */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesContainer}
      >
        <Text style={styles.dayText}>Today</Text>

        {messages.map((m, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              m.sender === currentUser.id
                ? styles.myBubble
                : styles.otherBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                m.sender === currentUser.id ? styles.myText : styles.otherText,
              ]}
            >
              {m.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* 🔹 Ô nhập tin nhắn */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Dòng icon phía dưới */}
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

// =========================
// 💅 STYLE
// =========================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 10 },
  userName: { fontSize: 16, fontWeight: "700", color: "#333" },
  subInfo: { fontSize: 12, color: "#5A6CF3" },
  jobTitle: { fontSize: 12, color: "#555" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  messagesContainer: { padding: 16 },
  dayText: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
  },
  myBubble: { backgroundColor: "#5A6CF3", alignSelf: "flex-end" },
  otherBubble: { backgroundColor: "#EDEDED", alignSelf: "flex-start" },
  messageText: { fontSize: 15 },
  myText: { color: "#fff" },
  otherText: { color: "#000" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    marginHorizontal: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  input: { flex: 1, fontSize: 15, color: "#000" },
  sendBtn: {
    backgroundColor: "#5A6CF3",
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});
