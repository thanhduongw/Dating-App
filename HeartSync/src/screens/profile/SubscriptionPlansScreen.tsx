import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SubscriptionPlansScreen() {
  const navigation = useNavigation();

  const features = [
    { title: "Unlimited swipes", free: true, premium: true },
    { title: "Advanced filters", free: true, premium: true },
    { title: "Remove ads", free: false, premium: true },
    { title: "Undo accidental left swipes", free: false, premium: true },
    { title: "Push your profile to more viewers", free: false, premium: true },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="menu-outline" size={28} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.row}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/40.jpg",
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.userName}>Joshua Edwards, 29</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile" as never)}
              >
                <Text style={styles.editBtn}>Edit your profile ➜</Text>
              </TouchableOpacity>

              {/* Progress */}
              <View style={{ marginTop: 10 }}>
                <Text style={styles.progressText}>45% complete</Text>
                <View style={styles.progressBox}>
                  <View style={styles.progressFill} />
                </View>
              </View>
            </View>
          </View>

          {/* Verify */}
          <TouchableOpacity style={styles.verifyCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#5A6CF3"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.verifyBold}>
                Verification adds trust to your profile.
              </Text>
              <Text style={styles.verifyTxt}>Verify your account now!</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#5A6CF3" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>Plans</Text>
          <Text style={styles.tab}>Safety</Text>
        </View>

        {/* Premium Card */}
        <View style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>HeartSync Premium</Text>
          <Text style={styles.premiumDesc}>
            Unlock exclusive features and supercharge your dating experience.
          </Text>

          <TouchableOpacity style={styles.upgradeBtn}>
            <Text style={styles.upgradeTxt}>Upgrade from $7.99</Text>
          </TouchableOpacity>
        </View>

        {/* Features Table */}
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeadLeft}>What's included</Text>
            <Text style={styles.tableHead}>Free</Text>
            <Text style={styles.tableHead}>Premium</Text>
          </View>

          {features.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.featureTxt}>{item.title}</Text>
              <Ionicons
                name={item.free ? "checkbox" : "square-outline"}
                size={22}
                color="#5A6CF3"
              />
              <Ionicons
                name={item.premium ? "checkbox" : "square-outline"}
                size={22}
                color="#5A6CF3"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5edff",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10, // ✅ tránh bị che bởi StatusBar
  },
  profileSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 16,
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 70, height: 70, borderRadius: 50, marginRight: 15 },
  userName: { fontSize: 19, fontWeight: "700" },
  editBtn: { fontSize: 12, color: "#5A6CF3", marginTop: 4 },

  progressText: {
    fontSize: 11,
    color: "#5A6CF3",
    fontWeight: "600",
    marginBottom: 4,
  },
  progressBox: {
    width: 150,
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#5A6CF3",
    borderRadius: 10,
  },

  verifyCard: {
    marginTop: 22,
    padding: 14,
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  verifyBold: { color: "#5A6CF3", fontWeight: "700", fontSize: 13 },
  verifyTxt: { color: "#5A6CF3", fontSize: 12 },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
    marginTop: 25,
  },
  tab: { fontSize: 16, color: "#777" },
  activeTab: {
    color: "#5A6CF3",
    fontWeight: "700",
    borderBottomWidth: 2,
  },

  premiumCard: {
    backgroundColor: "#5A6CF3",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },
  premiumTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  premiumDesc: { color: "#e6e4ff", marginTop: 10, lineHeight: 18 },
  upgradeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  upgradeTxt: { color: "#5A6CF3", fontWeight: "700" },

  table: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 10,
    marginTop: 20,
  },
  tableRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    alignItems: "center",
  },
  tableHeadLeft: {
    fontWeight: "600",
    width: "50%",
    fontSize: 12,
    color: "#666",
  },
  tableHead: {
    width: "25%",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    color: "#666",
  },
  featureTxt: { width: "50%", fontSize: 13 },
});
