// src/components/ProgressBar.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const animatedValue = useRef(new Animated.Value(progress)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const widthInterpolated = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, { width: widthInterpolated }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: "#B2EBF2", // xanh nhạt
        borderRadius: 10,
        overflow: "hidden",
    },
    bar: {
        height: "100%",
        backgroundColor: "#00BCD4", // xanh ngọc
        borderRadius: 10,
    },
});

export default ProgressBar;
