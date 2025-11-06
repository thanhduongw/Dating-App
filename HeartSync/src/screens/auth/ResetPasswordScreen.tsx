import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

export default function ResetPasswordScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "ResetPassword">>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = () => {
        if (password !== confirmPassword) return alert("Passwords do not match!");
        alert("Password reset successful!");
        navigation.replace("SignInWithPhone");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>

            <TextInput
                style={styles.input}
                placeholder="New password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 32 },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 16 },
    button: { backgroundColor: "#6C63FF", borderRadius: 8, paddingVertical: 14, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" }
});
