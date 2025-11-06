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
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { requestOTP } from "../../services/authApi";

export default function ForgotPasswordScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "ForgotPassword">>();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        if (!phone) {
            Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
            return;
        }

        setLoading(true);
        try {
            const result = await requestOTP(phone);
            if (result.success) {
                navigation.navigate("OTP", {
                    fromForgotPassword: true,
                    phone: phone
                });
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể gửi OTP. Vui lòng thử lại.");
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
                    <View style={styles.content}>
                        <Text style={styles.title}>Quên Mật Khẩu</Text>
                        <Text style={styles.subtitle}>
                            Nhập số điện thoại đã đăng ký để nhận mã OTP đặt lại mật khẩu
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                            autoFocus={true}
                        />

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleSendOTP}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "Đang gửi..." : "Gửi mã OTP"}
                            </Text>
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
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
        color: "#333"
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 40,
        lineHeight: 22
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 24,
        backgroundColor: "#f9f9f9"
    },
    button: {
        backgroundColor: "#6C63FF",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "#6C63FF",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
        shadowColor: "transparent",
        elevation: 0,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    }
});