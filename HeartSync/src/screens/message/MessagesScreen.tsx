import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MessagesScreen() {
  const navigation = useNavigation();

  const matches = [
    {
      id: 1,
      name: "Maria White",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
      online: true,
    },
    {
      id: 2,
      name: "Anna Fernandez",
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
      online: false,
    },
    {
      id: 3,
      name: "Jennifer Brown",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      online: true,
    },
    {
      id: 4,
      name: "Charlotte Dane",
      avatar: "https://randomuser.me/api/portraits/women/18.jpg",
      online: true,
    },
  ];

  const chats = [
    {
      id: "1",
      name: "Ava Jones",
      message: "You: Hello!",
      time: "1 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      online: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER + SEARCH */}
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
        {/* MATCHES SECTION */}
        <Text style={styles.sectionTitle}>Matches ({matches.length})</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.matchesContainer}
        >
          {matches.map((item) => (
            <View key={item.id} style={styles.matchItem}>
              <View>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.matchAvatar}
                />
                {item.online && <View style={styles.onlineDot} />}
              </View>
              <Text style={styles.matchName}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.divider} />

        {/* CHATS SECTION */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Chats ({chats.length})</Text>
          <Ionicons name="filter-outline" size={22} color="#444" />
        </View>

        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatRow}
            onPress={() => navigation.navigate("ChatRoomScreen" as never)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20, // ✅ Không sát viền
    paddingTop: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
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
