import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/StackNavigator";

type ProfileDetailRouteProp = RouteProp<RootStackParamList, "ProfileDetail">;

export const ProfileDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileDetailRouteProp>();
  const { profile } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ HEADER được chỉnh lại cho hợp lý */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#00BCD4" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>HeartSync</Text>

        <TouchableOpacity onPress={() => console.log("Open filter")}>
          <Ionicons name="options-outline" size={26} color="#00BCD4" />
        </TouchableOpacity>
      </View>

      {/* ✅ Bọc toàn bộ nội dung trong ScrollView */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Ảnh đại diện */}
        <Image source={{ uri: profile.photos[0] }} style={styles.avatar} />

        {/* Thông tin cơ bản */}
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.pronouns}>{profile.pronouns}</Text>
        <Text style={styles.job}>{profile.job}</Text>
        <Text style={styles.distance}>{profile.distance} km away</Text>

        {/* About me */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About me</Text>
          <Text style={styles.text}>
            {profile.aboutMe || "No information provided."}
          </Text>
        </View>

        {/* My details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My details</Text>

          {[
            ["Gender", profile.gender],
            ["Occupation", profile.occupation],
            ["Education", profile.education],
            ["Height", profile.height],
            ["Smoking", profile.smoking],
            ["Drinking", profile.drinking],
            ["Children", profile.children],
          ].map(([label, value], idx) => (
            <View key={idx} style={styles.detailRow}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value || "—"}</Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I enjoy</Text>
          <View style={styles.tagsContainer}>
            {["Music", "Travel", "Cooking", "Movies", "Nature"].map(
              (tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Ảnh khác */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photoList}>
            {profile.photos.slice(1).map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.extraPhoto} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 🎨 STYLE
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  // ✅ Header gọn, rõ ràng hơn
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000ff",
  },
  avatar: {
    width: "100%",
    height: 400,
    borderRadius: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },
  pronouns: {
    fontSize: 14,
    color: "#666",
  },
  job: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
  distance: {
    marginVertical: 8,
    color: "#999",
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  label: {
    color: "#555",
    fontWeight: "500",
  },
  value: {
    color: "#222",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#E8F7FA",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    margin: 4,
  },
  tagText: {
    color: "#3C9EC5",
    fontSize: 14,
  },
  photoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  extraPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
});
