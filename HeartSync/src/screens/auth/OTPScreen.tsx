import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type OTPScreenNavigationProp = StackNavigationProp<AuthStackParamList, "OTP">;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, "OTP">;

export default function OTPScreen() {
    const navigation = useNavigation<OTPScreenNavigationProp>();
    const route = useRoute<OTPScreenRouteProp>();
    const [otp, setOtp] = useState("");

    const fromForgotPassword = route.params?.fromForgotPassword;
    const fromSignUp = route.params?.fromSignUp;

    const handleVerifyOTP = () => {
        if (fromForgotPassword) navigation.navigate("ResetPassword");
        else if (fromSignUp) navigation.replace("SignIn");
        else navigation.replace("Home");
    };

    const handleResendOTP = () => alert("OTP has been resent!");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>We sent a 6-digit code to your phone.</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
            />

            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.link}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "700", textAlign: "center" },
    subtitle: { fontSize: 14, color: "#777", textAlign: "center", marginBottom: 32 },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, fontSize: 18, textAlign: "center", letterSpacing: 8, marginBottom: 24 },
    button: { backgroundColor: "#6C63FF", borderRadius: 8, paddingVertical: 14, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    link: { textAlign: "center", color: "#6C63FF", marginTop: 16 }
});
