import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FilterScreen() {
  const navigation = useNavigation();

  const [gender, setGender] = useState("Female");
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [distance, setDistance] = useState(10);
  const [expandSearch, setExpandSearch] = useState(true);
  const [languages, setLanguages] = useState(["English", "Spanish"]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // 🆕 MockAPI endpoint
  const API_URL =
    "https://68e8d0d2f2707e6128cc55f3.mockapi.io/22639261_NguyenNhatDuong/filters";

  // 🆕 Giả lập user ID
  const USER_ID = "123";

  // 🧭 1️⃣ Load filters từ MockAPI khi vào màn hình
  useEffect(() => {
    fetch(`${API_URL}?userId=${USER_ID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const saved = data[0];
          setGender(saved.gender);
          setAgeRange(saved.ageRange);
          setDistance(saved.distance);
          setExpandSearch(saved.expandSearch);
          setLanguages(saved.languages);
        }
      })
      .catch((err) => console.log("❌ Fetch filters failed:", err));
  }, []);

  // 2️⃣ Lưu dữ liệu khi nhấn Apply
  const saveFilters = async () => {
    try {
      const body = {
        userId: USER_ID,
        gender,
        ageRange,
        distance,
        expandSearch,
        languages,
      };

      // Kiểm tra nếu user đã có filter thì PUT, ngược lại POST
      const existing = await fetch(`${API_URL}?userId=${USER_ID}`).then((r) =>
        r.json()
      );

      if (existing.length > 0) {
        await fetch(`${API_URL}/${existing[0].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      Alert.alert("✅ Saved!", "Your filters have been updated.");
      navigation.goBack();
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("❌ Error", "Unable to save filters.");
    }
  };

  // ✅ clear filters
  const clearAll = () => {
    setGender("");
    setAgeRange([18, 80]);
    setDistance(10);
    setExpandSearch(false);
    setLanguages([]);
  };

  const availableLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Vietnamese",
    "Chinese",
    "Japanese",
    "Korean",
  ];

  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((l) => l !== lang));
    } else {
      setLanguages([...languages, lang]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* gender */}
        <Text style={styles.label}>Preferred gender</Text>
        <View style={styles.box}>
          {["Male", "Female", "Nonbinary"].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.row}
              onPress={() => setGender(g)}
            >
              <Text>{g}</Text>
              <Ionicons
                name={gender === g ? "checkbox" : "square-outline"}
                size={22}
                color="#5a6cf3"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Age Range */}
        <Text style={styles.label}>Age range:</Text>
        <View style={styles.box}>
          <View style={styles.sliderTextRow}>
            <Text>{ageRange[0]}</Text>
            <Text>{ageRange[1]}</Text>
          </View>
          <Slider
            minimumValue={18}
            maximumValue={80}
            step={1}
            value={ageRange[0]}
            onValueChange={(v) => setAgeRange([v, ageRange[1]])}
          />
          <Slider
            minimumValue={18}
            maximumValue={80}
            step={1}
            value={ageRange[1]}
            onValueChange={(v) => setAgeRange([ageRange[0], v])}
          />
        </View>

        {/* Distance */}
        <Text style={styles.label}>Distance:</Text>
        <View style={styles.box}>
          <Text>{distance} km</Text>
          <Slider
            minimumValue={1}
            maximumValue={80}
            step={1}
            value={distance}
            onValueChange={setDistance}
          />
          <View style={styles.expandRow}>
            <Text>Expand search</Text>
            <Switch value={expandSearch} onValueChange={setExpandSearch} />
          </View>
        </View>

        {/* Languages */}
        <Text style={styles.label}>Languages:</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setShowLanguageModal(true)}
        >
          <Ionicons name="globe-outline" size={18} color="#333" />
          <Text style={styles.selectText}>Select languages</Text>
        </TouchableOpacity>

        <View style={styles.tagWrap}>
          {languages.map((l) => (
            <TouchableOpacity
              key={l}
              style={styles.tag}
              onPress={() => toggleLanguage(l)}
            >
              <Text style={{ color: "#5a6cf3" }}>{l}</Text>
              <Ionicons name="close" size={14} color="#5a6cf3" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal chọn ngôn ngữ */}
      <Modal visible={showLanguageModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select a language</Text>
            <FlatList
              data={availableLanguages}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    toggleLanguage(item);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text>{item}</Text>
                  {languages.includes(item) && (
                    <Ionicons name="checkmark" size={20} color="#5a6cf3" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
              <Text
                style={{ color: "#5a6cf3", textAlign: "center", marginTop: 10 }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ✅ Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
          <Text>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={saveFilters}>
          <Text style={{ color: "#fff" }}>Apply filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 18 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#222" },
  label: { fontSize: 13, color: "#666", marginTop: 18, marginBottom: 6 },
  box: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  text: { fontSize: 15, color: "#222" },
  sliderTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  expandRow: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  selectText: { fontSize: 15, marginLeft: 8, color: "#333" },
  tagWrap: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#efeaff",
    borderRadius: 12,
    gap: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 12,
  },
  clearBtn: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#5a6cf3",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: { color: "#666", fontWeight: "600" },
  applyText: { color: "#fff", fontWeight: "700" },

  // 🆕 Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalClose: {
    alignSelf: "center",
    marginTop: 10,
  },
});
