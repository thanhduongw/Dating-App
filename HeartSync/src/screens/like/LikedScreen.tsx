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
            <FlatList
                data={likedProfiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LikeCard
                        profile={item}
                        onPress={() =>
                            navigation.navigate("ProfileDetail", { profile: item })
                        }
                    />
                )}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Liked Profiles</Text>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text>No liked profiles yet.</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        paddingTop: 60,
        paddingBottom: 16,
        alignItems: "center",
    },
    headerTitle: { fontSize: 24, fontWeight: "700", color: "#000" },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },
});
