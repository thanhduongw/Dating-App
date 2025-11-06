import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { Ionicons } from "@expo/vector-icons";

export default function SignInWithPhone() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "SignInWithPhone">>();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInWithPhone = () => navigation.replace("Home");
    const handleForgotPassword = () => navigation.navigate("ForgotPassword");
    const handleGoToSignIn = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoCircleOuter}>
                    <View style={styles.logoCircleInner}>
                        <Ionicons name="heart" size={48} color="#fff" />
                    </View>
                </View>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subtitle}>Login with your phone number 💜</Text>
            </View>

            <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

            <TouchableOpacity style={styles.button} onPress={handleSignInWithPhone}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoToSignIn}>
                <Text style={styles.link}>Back to Sign In options</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
    logoContainer: { alignItems: "center", marginBottom: 40 },
    logoCircleOuter: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#E1C9FF", alignItems: "center", justifyContent: "center" },
    logoCircleInner: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#9C4DFF", alignItems: "center", justifyContent: "center" },
    title: { fontSize: 26, fontWeight: "700", color: "#222", marginTop: 16 },
    subtitle: { fontSize: 14, color: "#777", textAlign: "center", marginTop: 4 },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 16 },
    button: { backgroundColor: "#6C63FF", borderRadius: 8, paddingVertical: 14, alignItems: "center", marginTop: 8 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    link: { textAlign: "center", color: "#6C63FF", marginTop: 16 }
});
