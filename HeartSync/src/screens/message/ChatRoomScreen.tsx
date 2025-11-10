import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import { useRoute, useNavigation } from "@react-navigation/native";

// ⚙️ Thay đổi IP này theo máy bạn
const SOCKET_URL = "http://192.168.1.114:5000";

export default function ChatRoomScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomId, target } = route.params as any;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  // ✅ user hiện tại (mock tạm)

  // ⚙️ Flag phân biệt 2 người
  // 👉 App đầu tiên để false (userA)
  // 👉 App thứ hai đổi thành true (userB)
  const IS_USER_B = true;

  const currentUser = IS_USER_B
    ? { id: "userB", name: "User B" }
    : { id: "userA", name: "User A" };

  // ✅ Tạo socket 1 lần duy nhất
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to server");
      socket.emit("joinRoom", roomId);
    });

    // 🔹 Nhận lại lịch sử tin nhắn từ server
    socket.on("messageHistory", (history) => {
      console.log("📜 History:", history);
      setMessages(history);
    });

    // 🔹 Khi nhận tin nhắn mới
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

    // Chỉ emit, KHÔNG thêm local (tránh hiển thị 2 lần)
    socketRef.current?.emit("sendMessage", msg);
    setText("");
  };

  // ✅ Auto scroll xuống cuối khi có tin mới
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Chat with {target?.name || "userB"}
        </Text>
        <View style={styles.statusDot} />
      </View>

      {/* 🔹 Danh sách tin nhắn */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesContainer}
      >
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

      {/* 🔹 Nhập tin nhắn */}
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
    </SafeAreaView>
  );
}

// =========================
// 💅 STYLE
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#EFEFFF",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  statusDot: {
    width: 10,
    height: 10,
    backgroundColor: "#34C759",
    borderRadius: 5,
    marginRight: 10,
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  myBubble: {
    backgroundColor: "#5A6CF3",
    alignSelf: "flex-end",
  },
  otherBubble: {
    backgroundColor: "#EDEDED",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 15,
  },
  myText: {
    color: "#fff",
  },
  otherText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },
  sendBtn: {
    backgroundColor: "#5A6CF3",
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});
