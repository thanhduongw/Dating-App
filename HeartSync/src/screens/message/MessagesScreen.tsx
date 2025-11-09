import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { currentUser } from "../../services/auth";
import { makeRoomId } from "../../services/room";
// 👈 helper tạo roomId

export default function MessagesScreen() {
  const navigation = useNavigation();

  // 🔹 Giả lập danh sách người từng match
  const matches = [
    {
      id: "userB",
      name: "Maria White",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
      online: true,
    },
    {
      id: "userC",
      name: "Anna Fernandez",
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
      online: false,
    },
    {
      id: "userD",
      name: "Jennifer Brown",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      online: true,
    },
  ];

  // 🔹 Giả lập danh sách chat gần đây
  const chats = [
    {
      id: "chat1",
      userId: "userB",
      name: "Maria White",
      message: "You: How was your day?",
      time: "2h ago",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
      online: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header + Search */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={28} color="#444" />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* MATCHES */}
        <Text style={styles.sectionTitle}>Matches ({matches.length})</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.matchesContainer}
        >
          {matches.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.matchItem}
              onPress={() => {
                const roomId = makeRoomId(currentUser.id, item.id);
                // ép kiểu navigation để tránh TS lỗi
                (navigation as any).navigate("ChatRoom", {
                  roomId,
                  target: item,
                });
              }}
            >
              <View>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.matchAvatar}
                />
                {item.online && <View style={styles.onlineDot} />}
              </View>
              <Text style={styles.matchName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.divider} />

        {/* CHATS */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Chats ({chats.length})</Text>
          <Ionicons name="filter-outline" size={22} color="#444" />
        </View>

        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatRow}
            onPress={() => {
              const targetUser = {
                id: chat.userId,
                name: chat.name,
                avatar: chat.avatar,
              };
              const roomId = makeRoomId(currentUser.id, chat.userId);
              (navigation as any).navigate("ChatRoom", {
                roomId,
                target: targetUser,
              });
            }}
          >
            <View>
              <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
              {chat.online && <View style={styles.onlineDotSmall} />}
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              <Text style={styles.chatMessage}>{chat.message}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

// 🎨 STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5FA",
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#444",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 10,
  },
  matchesContainer: {
    paddingBottom: 10,
    paddingLeft: 4,
  },
  matchItem: {
    alignItems: "center",
    width: 85,
    marginRight: 20,
  },
  matchAvatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  matchName: {
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
    width: 80,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFFF",
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
  },
  chatAvatar: {
    width: 52,
    height: 52,
    borderRadius: 30,
  },
  chatName: {
    fontSize: 15,
    fontWeight: "700",
  },
  chatMessage: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
  },
  onlineDot: {
    width: 14,
    height: 14,
    backgroundColor: "#34C759",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  onlineDotSmall: {
    width: 10,
    height: 10,
    backgroundColor: "#34C759",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
