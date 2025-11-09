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
import { RootStackParamList } from "../../navigation/StackNavigator";

type ProfileDetailRouteProp = RouteProp<RootStackParamList, "ProfileDetail">;

export const ProfileDetailScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<ProfileDetailRouteProp>();
    const { profile } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>

            <Image source={{ uri: profile.photos[0] }} style={styles.avatar} />
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
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>{profile.gender}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Occupation:</Text>
                    <Text style={styles.value}>{profile.occupation}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Education:</Text>
                    <Text style={styles.value}>{profile.education}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Height:</Text>
                    <Text style={styles.value}>{profile.height}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Smoking:</Text>
                    <Text style={styles.value}>{profile.smoking}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Drinking:</Text>
                    <Text style={styles.value}>{profile.drinking}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Children:</Text>
                    <Text style={styles.value}>{profile.children}</Text>
                </View>
            </View>

            {/* Sở thích */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>I enjoy</Text>
                <View style={styles.tagsContainer}>
                    {["Music", "Travel", "Cooking", "Movies", "Nature"].map((tag, idx) => (
                        <View key={idx} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
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
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 30,
        padding: 8,
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
