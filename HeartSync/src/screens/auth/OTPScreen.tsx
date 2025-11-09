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
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { verifyOTP, requestOTP } from "../../services/authApi";

type OTPScreenNavigationProp = StackNavigationProp<AuthStackParamList, "OTP">;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, "OTP">;

export default function OTPScreen() {
    const navigation = useNavigation<OTPScreenNavigationProp>();
    const route = useRoute<OTPScreenRouteProp>();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const fromForgotPassword = route.params?.fromForgotPassword;
    const fromSignUp = route.params?.fromSignUp;
    const phone = route.params?.phone;

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            Alert.alert("Lỗi", "Vui lòng nhập mã OTP 6 chữ số");
            return;
        }

        if (!phone) {
            Alert.alert("Lỗi", "Không tìm thấy số điện thoại");
            return;
        }

        setLoading(true);
        try {
            const isValid = await verifyOTP(otp);
            if (isValid) {
                if (fromForgotPassword) {
                    navigation.navigate("ResetPassword", { phone });
                } else if (fromSignUp) {
                    Alert.alert("Thành công", "Tài khoản đã được tạo thành công!");
                    navigation.replace("SignIn");
                } else {
                    navigation.replace("Tabs");
                }
            } else {
                Alert.alert("Lỗi", "Mã OTP không hợp lệ");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể xác minh OTP. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (!phone) {
            Alert.alert("Lỗi", "Không tìm thấy số điện thoại");
            return;
        }

        try {
            const result = await requestOTP(phone);
            if (result.success) {
                Alert.alert("Thành công", "Mã OTP mới đã được gửi!");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể gửi lại OTP. Vui lòng thử lại.");
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
                    <Text style={styles.title}>Nhập Mã OTP</Text>
                    <Text style={styles.subtitle}>Chúng tôi đã gửi mã 6 chữ số đến {phone}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nhập OTP"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                        maxLength={6}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleVerifyOTP}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Đang xác minh..." : "Xác minh"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleResendOTP}>
                        <Text style={styles.link}>Gửi lại OTP</Text>
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
        textAlign: "center"
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginBottom: 32
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 14,
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 8,
        marginBottom: 24
    },
    button: {
        backgroundColor: "#6C63FF",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center"
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
    }
});