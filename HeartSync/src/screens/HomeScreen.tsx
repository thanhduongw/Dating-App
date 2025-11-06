import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to HeartSync 💜</Text>
            <Text style={styles.subtitle}>You are now logged in.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: 24 },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#777" }
});
