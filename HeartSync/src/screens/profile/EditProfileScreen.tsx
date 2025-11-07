import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  Switch,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

type DropdownKey =
  | "gender"
  | "height"
  | "smoking"
  | "drinking"
  | "children"
  | "zodiac"
  | "religion";

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [mainPhoto, setMainPhoto] = useState<string>(
    "https://randomuser.me/api/portraits/men/40.jpg"
  );

  const [sidePhotos, setSidePhotos] = useState<string[]>(["", "", ""]);

  const pickImage = async (type: "main" | number) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("We need gallery access!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      if (type === "main") {
        setMainPhoto(uri);
      } else {
        const updated = [...sidePhotos];
        updated[type] = uri;
        setSidePhotos(updated);
      }
    }
  };

  // Inline edit state
  const [editingField, setEditingField] = useState<string | null>(null);

  // Basic fields (1A)
  const [occupation, setOccupation] = useState<string>("");
  const [education, setEducation] = useState<string>("");

  // Dropdown fields (2A, 3A, 4A, 5A, 6A)
  const [gender, setGender] = useState<string>("Male");
  const [height, setHeight] = useState<string>("170 cm");
  const [smoking, setSmoking] = useState<string>("");
  const [drinking, setDrinking] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>("");
  const [religion, setReligion] = useState<string>("");

  // 7B: Interests tag input
  const [interestInput, setInterestInput] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([
    "Coffee brewing",
    "Trekking",
  ]);

  // 8A: Linked accounts fake toggles
  const [linkInstagram, setLinkInstagram] = useState<boolean>(false);
  const [linkFacebook, setLinkFacebook] = useState<boolean>(false);
  const [linkTwitter, setLinkTwitter] = useState<boolean>(false);

  // Dropdown modal
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  // Options
  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to say",
    "Custom…",
  ];
  const heightOptions = useMemo(
    () => Array.from({ length: 81 }, (_, i) => `${140 + i} cm`),
    []
  );
  const triOptions = ["No", "Occasionally", "Socially", "Often"];
  const zodiacOptions = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];
  const religionOptions = [
    "Buddhist",
    "Christian",
    "Hindu",
    "Muslim",
    "Jewish",
    "Atheist",
    "Agnostic",
    "Spiritual",
    "Other",
  ];

  const DropdownModal = ({
    visible,
    onClose,
    options,
    onSelect,
    title,
  }: {
    visible: boolean;
    onClose: () => void;
    options: string[];
    onSelect: (v: string) => void;
    title: string;
  }) => (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={{ maxHeight: 320 }}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.optionRow}
                onPress={() => {
                  onSelect(opt);
                  onClose();
                }}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );

  const saveTextField = (key: "occupation" | "education") => {
    // (Ở đây bạn có thể gọi API để lưu server)
    setEditingField(null);
    Keyboard.dismiss();
  };

  const addInterest = () => {
    const v = interestInput.trim();
    if (!v) return;
    if (!interests.includes(v)) setInterests((prev) => [...prev, v]);
    setInterestInput("");
  };

  const removeInterest = (v: string) => {
    setInterests((prev) => prev.filter((x) => x !== v));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit profile</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Profile Completion */}
        <Text style={styles.sectionTitle}>
          Profile completion: <Text style={styles.percent}>45%</Text>
        </Text>
        <View style={styles.progressBox}>
          <View style={styles.progressFill} />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Photos</Text>
        <Text style={styles.sectionSubText}>
          The main photo is how you appear to others on the swipe view.
        </Text>

        <View style={styles.photosContainer}>
          {/* Main Photo */}
          <TouchableOpacity
            style={styles.mainPhotoBox}
            onPress={() => pickImage("main")}
          >
            <Image source={{ uri: mainPhoto }} style={styles.mainPhoto} />
          </TouchableOpacity>

          {/* 3 Side Photos */}
          <View style={styles.sidePhotoColumn}>
            {sidePhotos.map((photo, i) => (
              <TouchableOpacity
                key={i}
                style={styles.addPhotoBox}
                onPress={() => pickImage(i)}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.sideImage} />
                ) : (
                  <Ionicons name="add" size={30} color="#aaa" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>About me</Text>
        <Text style={styles.sectionSubText}>
          Make it easy for others to get a sense of who you are.
        </Text>

        <View style={styles.aboutBox}>
          <TextInput
            placeholder="Share a few words about yourself, your interests, and what you're looking for..."
            placeholderTextColor="#999"
            multiline
            style={styles.aboutTextInput}
          />
        </View>

        {/* My details */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>My details</Text>

        {/* Occupation (1A Text) */}
        {editingField === "occupation" ? (
          <View style={styles.editRow}>
            <Ionicons name="briefcase-outline" size={18} color="#555" />
            <TextInput
              placeholder="Enter Occupation"
              style={styles.inputInline}
              value={occupation}
              onChangeText={setOccupation}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => saveTextField("occupation")}
            />
            <TouchableOpacity onPress={() => saveTextField("occupation")}>
              <Ionicons name="checkmark" size={22} color="#5A6CF3" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingField(null)}>
              <Ionicons name="close" size={22} color="#999" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setEditingField("occupation")}
          >
            <Ionicons name="briefcase-outline" size={18} color="#555" />
            <Text style={styles.detailText}>Occupation</Text>
            <Text style={styles.addText}>{occupation || "Add"}</Text>
            <Ionicons name="chevron-forward" size={18} color="#aaa" />
          </TouchableOpacity>
        )}

        {/* Gender (2A Dropdown) */}
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("gender")}
        >
          <Ionicons name="male-female-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Gender & Pronouns</Text>
          <Text style={styles.addText}>{gender}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        {/* Education (1A Text) */}
        {editingField === "education" ? (
          <View style={styles.editRow}>
            <Ionicons name="school-outline" size={18} color="#555" />
            <TextInput
              placeholder="Enter Education"
              style={styles.inputInline}
              value={education}
              onChangeText={setEducation}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => saveTextField("education")}
            />
            <TouchableOpacity onPress={() => saveTextField("education")}>
              <Ionicons name="checkmark" size={22} color="#5A6CF3" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingField(null)}>
              <Ionicons name="close" size={22} color="#999" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setEditingField("education")}
          >
            <Ionicons name="school-outline" size={18} color="#555" />
            <Text style={styles.detailText}>Education</Text>
            <Text style={styles.addText}>{education || "Add"}</Text>
            <Ionicons name="chevron-forward" size={18} color="#aaa" />
          </TouchableOpacity>
        )}

        {/* Height (3A Dropdown cm) */}
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("height")}
        >
          <Ionicons name="barbell-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Height</Text>
          <Text style={styles.addText}>{height || "Add"}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        {/* 4A: Smoking / Drinking / Children */}
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("smoking")}
        >
          <Ionicons name="remove-circle-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Smoking</Text>
          <Text style={styles.addText}>{smoking || "Add"}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("drinking")}
        >
          <Ionicons name="beer-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Drinking</Text>
          <Text style={styles.addText}>{drinking || "Add"}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("children")}
        >
          <Ionicons name="body-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Children</Text>
          <Text style={styles.addText}>{children || "Add"}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        {/* 5A, 6A: Zodiac, Religion */}
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("zodiac")}
        >
          <Ionicons name="star-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Zodiac sign</Text>
          <Text style={styles.addText}>{zodiac || "Add"}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("religion")}
        >
          <Ionicons name="sparkles-outline" size={18} color="#555" />

          <Text style={styles.detailText}>Religion</Text>
          <Text style={styles.addText}>{religion || "Add"}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        {/* I enjoy (7B Tag input) */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>I enjoy</Text>
        <Text style={styles.sectionSubText}>
          Adding your interest is a great way to find like-minded connections.
        </Text>

        <View style={styles.tagInputRow}>
          <Ionicons name="sparkles-outline" size={18} color="#5A6CF3" />
          <TextInput
            placeholder="Type an interest and press Enter"
            placeholderTextColor="#999"
            value={interestInput}
            onChangeText={setInterestInput}
            onSubmitEditing={addInterest}
            style={styles.tagInput}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={addInterest} style={styles.tagAddBtn}>
            <Text style={styles.tagAddTxt}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tagRow}>
          {interests.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeInterest(tag)}>
                <Ionicons name="close" size={14} color="#555" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Linked accounts (8A toggles) */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Linked accounts
        </Text>

        <View style={styles.switchRow}>
          <View style={styles.switchLeft}>
            <Ionicons name="logo-instagram" size={18} color="#555" />
            <Text style={styles.switchLabel}>Instagram</Text>
          </View>
          <Switch value={linkInstagram} onValueChange={setLinkInstagram} />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchLeft}>
            <Ionicons name="logo-facebook" size={18} color="#555" />
            <Text style={styles.switchLabel}>Facebook</Text>
          </View>
          <Switch value={linkFacebook} onValueChange={setLinkFacebook} />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchLeft}>
            <Ionicons name="logo-twitter" size={18} color="#555" />
            <Text style={styles.switchLabel}>Twitter</Text>
          </View>
          <Switch value={linkTwitter} onValueChange={setLinkTwitter} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* All dropdown modals */}
      <DropdownModal
        visible={openDropdown === "gender"}
        title="Select gender"
        options={genderOptions}
        onSelect={setGender}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "height"}
        title="Select height (cm)"
        options={heightOptions}
        onSelect={setHeight}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "smoking"}
        title="Smoking"
        options={triOptions}
        onSelect={setSmoking}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "drinking"}
        title="Drinking"
        options={triOptions}
        onSelect={setDrinking}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "children"}
        title="Children"
        options={["No", "Someday", "Have kids", "Prefer not to say"]}
        onSelect={setChildren}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "zodiac"}
        title="Zodiac sign"
        options={zodiacOptions}
        onSelect={setZodiac}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "religion"}
        title="Religion"
        options={religionOptions}
        onSelect={setReligion}
        onClose={() => setOpenDropdown(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: { paddingHorizontal: 18 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
  },
  sectionSubText: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
  },

  percent: { color: "#5A6CF3", fontWeight: "700" },
  progressBox: {
    width: "100%",
    height: 8,
    backgroundColor: "#ddd",
    marginTop: 6,
    borderRadius: 10,
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#5A6CF3",
    borderRadius: 10,
  },

  photosContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 15,
  },
  mainPhotoBox: {
    width: 200,
    height: 260,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#d7ccff",
    overflow: "hidden",
  },
  mainPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  sidePhotoColumn: { justifyContent: "space-between" },
  addPhotoBox: {
    width: 95,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },

  aboutBox: {
    backgroundColor: "#f6f6f6",
    padding: 12,
    borderRadius: 12,
  },
  aboutTextInput: {
    fontSize: 13,
    minHeight: 80,
    color: "#333",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  detailText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  addText: {
    fontSize: 14,
    color: "#5A6CF3",
    marginRight: 8,
  },

  // Inline edit row
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    gap: 10,
  },
  inputInline: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#5A6CF3",
    color: "#333",
  },

  // Tag input
  tagInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    gap: 8,
  },
  tagInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  tagAddBtn: {
    backgroundColor: "#5A6CF3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagAddTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },

  tagRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    gap: 6,
  },
  tagText: { fontSize: 13, color: "#333" },

  // Switch rows
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  switchLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  switchLabel: { fontSize: 14 },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  optionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  optionText: { fontSize: 15, color: "#333" },
  sideImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
