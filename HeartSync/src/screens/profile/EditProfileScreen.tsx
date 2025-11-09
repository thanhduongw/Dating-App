import React, { useMemo, useState, useEffect } from "react";
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
  Alert,
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
  | "pets"
  | "zodiac"
  | "religion";

const BASE_URL =
  "https://68e8d0d2f2707e6128cc55f3.mockapi.io/22639261_NguyenNhatDuong";

export default function EditProfileScreen() {
  const navigation = useNavigation();

  // 🧩 States
  const [mainPhoto, setMainPhoto] = useState<string>(
    "https://randomuser.me/api/portraits/men/40.jpg"
  );
  const [sidePhotos, setSidePhotos] = useState<string[]>(["", "", ""]);

  const [occupation, setOccupation] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [gender, setGender] = useState<string>("Male");
  const [height, setHeight] = useState<string>("170 cm");
  const [smoking, setSmoking] = useState<string>("");
  const [drinking, setDrinking] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [pets, setPets] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>("");
  const [religion, setReligion] = useState<string>("");

  const [interestInput, setInterestInput] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState<string>("");

  const [linkInstagram, setLinkInstagram] = useState<boolean>(false);
  const [linkFacebook, setLinkFacebook] = useState<boolean>(false);
  const [linkTwitter, setLinkTwitter] = useState<boolean>(false);

  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);

  // 🧠 Load profile từ MockAPI
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profiles/1`);
        const data = await res.json();

        setMainPhoto(data.mainPhoto);
        setSidePhotos(data.sidePhotos || ["", "", ""]);
        setOccupation(data.occupation);
        setEducation(data.education);
        setLocation(data.location);
        setGender(data.gender);
        setHeight(data.height);
        setSmoking(data.smoking);
        setDrinking(data.drinking);
        setChildren(data.children);
        setPets(data.pets);
        setZodiac(data.zodiac);
        setReligion(data.religion);
        setInterests(data.interests || []);
        setLanguages(data.languages || []);
        setLinkInstagram(data.linkInstagram);
        setLinkFacebook(data.linkFacebook);
        setLinkTwitter(data.linkTwitter);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // 💾 Save to MockAPI
  const handleSave = async () => {
    try {
      const updated = {
        mainPhoto,
        sidePhotos,
        occupation,
        education,
        location,
        gender,
        height,
        smoking,
        drinking,
        children,
        pets,
        zodiac,
        religion,
        interests,
        languages,
        linkInstagram,
        linkFacebook,
        linkTwitter,
      };

      const res = await fetch(`${BASE_URL}/profiles/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) Alert.alert("✅ Success", "Profile updated successfully!");
      else Alert.alert("❌ Error", "Failed to update profile.");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // 📷 Pick image
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
      if (type === "main") setMainPhoto(uri);
      else {
        const updated = [...sidePhotos];
        updated[type] = uri;
        setSidePhotos(updated);
      }
    }
  };

  const saveTextField = (key: "occupation" | "education") => {
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

  // Dropdown data
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
        {/* ========== PHOTOS ========== */}
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

        {/* ========== MY DETAILS ========== */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>My details</Text>

        {/* Occupation */}
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
          </View>
        ) : (
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setEditingField("occupation")}
          >
            <Ionicons name="briefcase-outline" size={18} color="#555" />
            <Text style={styles.detailText}>Occupation</Text>
            <Text style={styles.addText}>{occupation || "Add"}</Text>
          </TouchableOpacity>
        )}

        {/* Gender */}
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => setOpenDropdown("gender")}
        >
          <Ionicons name="male-female-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Gender & Pronouns</Text>
          <Text style={styles.addText}>{gender}</Text>
        </TouchableOpacity>

        {/* Education */}
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
          </View>
        ) : (
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setEditingField("education")}
          >
            <Ionicons name="school-outline" size={18} color="#555" />
            <Text style={styles.detailText}>Education</Text>
            <Text style={styles.addText}>{education || "Add"}</Text>
          </TouchableOpacity>
        )}

        {/* Location */}
        <TouchableOpacity style={styles.detailRow}>
          <Ionicons name="location-outline" size={18} color="#555" />
          <Text style={styles.detailText}>Location</Text>
          <Text style={styles.addText}>{location || "Add"}</Text>
        </TouchableOpacity>

        {/* Subtitle */}
        <Text style={styles.sectionSubText}>
          Most people also want to know:
        </Text>

        {/* Height - Smoking - Drinking - Pets - Children - Zodiac - Religion */}
        {[
          ["Height", height, "barbell-outline", "height"],
          ["Smoking", smoking, "remove-circle-outline", "smoking"],
          ["Drinking", drinking, "beer-outline", "drinking"],
          ["Pets", pets, "paw-outline", "pets"],
          ["Children", children, "body-outline", "children"],
          ["Zodiac sign", zodiac, "star-outline", "zodiac"],
          ["Religion", religion, "sparkles-outline", "religion"],
        ].map(([label, value, icon, key]) => (
          <TouchableOpacity
            key={label}
            style={styles.detailRow}
            onPress={() => setOpenDropdown(key as DropdownKey)}
          >
            <Ionicons name={icon as any} size={18} color="#555" />
            <Text style={styles.detailText}>{label}</Text>
            <Text style={styles.addText}>{value || "Add"}</Text>
          </TouchableOpacity>
        ))}

        {/* I ENJOY */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>I enjoy</Text>
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

        {/* I COMMUNICATE IN */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
          I communicate in
        </Text>
        <Text style={styles.sectionSubText}>
          Add languages you speak to connect better with others.
        </Text>

        <View style={styles.tagInputRow}>
          <Ionicons name="globe-outline" size={18} color="#5A6CF3" />
          <TextInput
            placeholder="Add a language and press Enter"
            placeholderTextColor="#999"
            value={languageInput}
            onChangeText={setLanguageInput}
            onSubmitEditing={() => {
              if (!languageInput.trim()) return;
              if (!languages.includes(languageInput.trim()))
                setLanguages((prev) => [...prev, languageInput.trim()]);
              setLanguageInput("");
            }}
            style={styles.tagInput}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={() => {
              if (!languageInput.trim()) return;
              if (!languages.includes(languageInput.trim()))
                setLanguages((prev) => [...prev, languageInput.trim()]);
              setLanguageInput("");
            }}
            style={styles.tagAddBtn}
          >
            <Text style={styles.tagAddTxt}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tagRow}>
          {languages.map((lang) => (
            <View key={lang} style={styles.tag}>
              <Text style={styles.tagText}>{lang}</Text>
              <TouchableOpacity
                onPress={() =>
                  setLanguages((prev) => prev.filter((x) => x !== lang))
                }
              >
                <Ionicons name="close" size={14} color="#555" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* LINKED ACCOUNTS */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
          Linked accounts
        </Text>

        {(
          [
            ["Instagram", linkInstagram, setLinkInstagram, "logo-instagram"],
            ["Facebook", linkFacebook, setLinkFacebook, "logo-facebook"],
            ["Twitter", linkTwitter, setLinkTwitter, "logo-twitter"],
          ] as [
            string,
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>,
            keyof typeof Ionicons.glyphMap
          ][]
        ).map(([label, value, setFn, icon]) => (
          <View key={label} style={styles.switchRow}>
            <View style={styles.switchLeft}>
              <Ionicons name={icon} size={18} color="#555" />
              <Text style={styles.switchLabel}>{label}</Text>
            </View>
            <Switch value={value} onValueChange={setFn} />
          </View>
        ))}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* ========== DROPDOWNS ========== */}
      <DropdownModal
        visible={openDropdown === "gender"}
        title="Select gender"
        options={genderOptions}
        onSelect={setGender}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "height"}
        title="Select height"
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
        visible={openDropdown === "pets"}
        title="Pets"
        options={["No pets", "Dog", "Cat", "Multiple", "Other"]}
        onSelect={setPets}
        onClose={() => setOpenDropdown(null)}
      />
      <DropdownModal
        visible={openDropdown === "zodiac"}
        title="Zodiac"
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
  safe: { flex: 1, backgroundColor: "#fff" },
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
  headerTitle: { fontSize: 18, fontWeight: "700" },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  sectionSubText: { fontSize: 12, color: "#777", marginVertical: 6 },
  // --- photos ---
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
  sideImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  detailText: { flex: 1, marginLeft: 10, fontSize: 14 },
  addText: { fontSize: 14, color: "#5A6CF3" },
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
    borderBottomWidth: 1,
    borderColor: "#5A6CF3",
    color: "#333",
  },
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
  tagInput: { flex: 1, fontSize: 14, color: "#333" },
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
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  optionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  optionText: { fontSize: 15, color: "#333" },
  saveBtn: {
    backgroundColor: "#5A6CF3",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
