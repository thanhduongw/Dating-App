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
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { resetPassword } from "../../services/authApi";

type ResetPasswordScreenRouteProp = RouteProp<AuthStackParamList, "ResetPassword">;

export default function ResetPasswordScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "ResetPassword">>();
    const route = useRoute<ResetPasswordScreenRouteProp>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { phone } = route.params;

    const handleReset = async () => {
        if (!password || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu không khớp!");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setLoading(true);
        try {
            await resetPassword(phone, password);
            Alert.alert("Thành công", "Đặt lại mật khẩu thành công!");
            navigation.replace("SignInWithPhone");
        } catch (error: any) {
            Alert.alert("Lỗi", error.message || "Không thể đặt lại mật khẩu");
        } finally {
            setLoading(false);
        }
    };

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
                    <Text style={styles.title}>Đặt Lại Mật Khẩu</Text>
                    <Text style={styles.subtitle}>Số điện thoại: {phone}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu mới"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Xác nhận mật khẩu"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleReset}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Đang xử lý..." : "Đặt lại"}
                        </Text>
                    </TouchableOpacity>
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
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginBottom: 24
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
    }
});