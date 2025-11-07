// src/components/SwipeCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { SwipeProfile } from "../types";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "../navigation/StackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

interface SwipeCardProps {
    profile: SwipeProfile;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ profile }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate("ProfileDetail", { profile });
    };
    const photo = profile.photos?.[0];

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
            <View style={styles.card}>
                <Image source={{ uri: photo }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>
                        {profile.name}, {profile.age}
                    </Text>
                    <Text style={styles.job}>{profile.job}</Text>
                    {profile.distance && (
                        <Text style={styles.distance}>{profile.distance} km away</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.9,
        height: height * 0.7,
        borderRadius: 20,
        backgroundColor: "#fff",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    name: {
        fontSize: 26,
        color: "#fff",
        fontWeight: "700",
    },
    job: {
        fontSize: 18,
        color: "#fff",
        marginTop: 2,
    },
    distance: {
        fontSize: 16,
        color: "#eee",
        marginTop: 4,
    },
});

export default SwipeCard;
