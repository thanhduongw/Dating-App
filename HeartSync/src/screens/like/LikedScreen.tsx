import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { LikeContext } from "../../navigation/TabNavigator";
import LikeCard from "../../components/LikeCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/StackNavigator";

export default function LikedScreen() {
    const { likedProfiles } = useContext(LikeContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Liked Profiles</Text>
            </View>

            <FlatList
                data={likedProfiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LikeCard
                        profile={item}
                        onPress={() => navigation.navigate("ProfileDetail", { profile: item })}
                    />
                )}
                contentContainerStyle={{ paddingTop: 100 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    headerTitle: { fontSize: 24, fontWeight: "700", color: "#000" },
});
