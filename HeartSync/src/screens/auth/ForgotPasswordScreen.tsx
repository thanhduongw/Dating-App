import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

export default function ForgotPasswordScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "ForgotPassword">>();
    const [phone, setPhone] = useState("");

    const handleSendOTP = () => {
        navigation.navigate("OTP", { fromForgotPassword: true });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your phone number to reset your password.</Text>

            <TextInput
                style={styles.input}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#777", textAlign: "center", marginBottom: 32 },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 24 },
    button: { backgroundColor: "#6C63FF", borderRadius: 8, paddingVertical: 14, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" }
});
