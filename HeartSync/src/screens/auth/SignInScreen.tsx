import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

export default function SignInScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "SignIn">>();

    const handleAppleLogin = () => navigation.replace("Home");
    const handleFacebookLogin = () => navigation.replace("Home");
    const handlePhoneLogin = () => navigation.navigate("SignInWithPhone");
    const handleGoToSignUp = () => navigation.navigate("SignUp");

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoCircleOuter}>
                    <View style={styles.logoCircleInner}>
                        <Ionicons name="heart" size={48} color="#fff" />
                    </View>
                </View>
                <Text style={styles.title}>HeartSync</Text>
                <Text style={styles.subtitle}>Where Hearts Connect, Love Finds Its Sync.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={handleAppleLogin}>
                    <Ionicons name="logo-apple" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Continue with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFacebookLogin}>
                    <Ionicons name="logo-facebook" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.phoneButton]} onPress={handlePhoneLogin}>
                    <Ionicons name="call-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Use phone number</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleGoToSignUp}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
    logoContainer: { alignItems: "center", marginBottom: 40 },
    logoCircleOuter: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#E1C9FF", alignItems: "center", justifyContent: "center" },
    logoCircleInner: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#9C4DFF", alignItems: "center", justifyContent: "center" },
    title: { fontSize: 26, fontWeight: "700", color: "#222", marginTop: 16 },
    subtitle: { fontSize: 14, color: "#777", textAlign: "center", marginTop: 4 },
    buttonContainer: { width: "100%", gap: 12, marginBottom: 20 },
    button: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, borderRadius: 30 },
    appleButton: { backgroundColor: "#000" },
    facebookButton: { backgroundColor: "#1877F2" },
    phoneButton: { backgroundColor: "#6C63FF" },
    icon: { marginRight: 8 },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    link: { textAlign: "center", color: "#6C63FF", marginTop: 16 }
});
