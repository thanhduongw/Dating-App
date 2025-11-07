import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import OTPScreen from "../screens/auth/OTPScreen";
import SignInWithPhone from "../screens/auth/SignInWithPhone";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StackNavigator from "./StackNavigator";

export type AuthStackParamList = {
    SignIn: undefined;
    SignInWithPhone: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    OTP: {
        fromForgotPassword?: boolean;
        fromSignUp?: boolean;
        phone?: string;
    };
    ResetPassword: { phone: string };
    Tabs: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
    const defaultHeader = ({ navigation }: any, title: string) => ({
        headerShown: true,
        title,
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                <Ionicons name="chevron-back-circle-outline" size={32} />
            </TouchableOpacity>
        ),
    });

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignInWithPhone" component={SignInWithPhone} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={({ navigation }) => defaultHeader({ navigation }, "Forgot Password")}
            />
            <Stack.Screen
                name="OTP"
                component={OTPScreen}
                options={({ navigation }) => defaultHeader({ navigation }, "Verify OTP")}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={({ navigation }) => defaultHeader({ navigation }, "Reset Password")}
            />
            <Stack.Screen name="Tabs" component={StackNavigator} />
        </Stack.Navigator>
    );
}
