import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SwipeProfile } from "../types";

interface Props {
    profile: SwipeProfile;
    onPress: () => void;
}

const LikeCard: React.FC<Props> = ({ profile, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: profile.photos[0] }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.age}>{profile.age} tuổi</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    info: { flex: 1 },
    name: { fontSize: 18, fontWeight: "bold", color: "#333" },
    age: { fontSize: 14, color: "#666" },
});

export default LikeCard;
