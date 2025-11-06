import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { Ionicons } from "@expo/vector-icons";
import { registerUser, requestOTP } from "../../services/authApi";

export default function SignUpScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "SignUp">>();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !phone || !password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await registerUser(name, phone, password);
            await requestOTP(phone);
            navigation.navigate("OTP", {
                fromSignUp: true,
                phone: phone
            });
        } catch (err: any) {
            Alert.alert("Register Failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToSignIn = () => navigation.navigate("SignIn");

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircleOuter}>
                            <View style={styles.logoCircleInner}>
                                <Ionicons name="heart" size={48} color="#fff" />
                            </View>
                        </View>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join HeartSync today 💜</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone number"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "Creating Account..." : "Sign Up"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleGoToSignIn}>
                            <Text style={styles.link}>Already have an account? Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 40
    },
    logoCircleOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#E1C9FF",
        alignItems: "center",
        justifyContent: "center"
    },
    logoCircleInner: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#9C4DFF",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#222",
        marginTop: 16
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginTop: 4
    },
    formContainer: {
        width: "100%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        marginBottom: 16
    },
    button: {
        backgroundColor: "#6C63FF",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 8
    },
    buttonDisabled: {
        backgroundColor: "#ccc"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    link: {
        textAlign: "center",
        color: "#6C63FF",
        marginTop: 16
    },
});