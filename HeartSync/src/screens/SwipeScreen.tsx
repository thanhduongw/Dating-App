import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Animated,
    PanResponder,
    Dimensions,
} from "react-native";
import { SwipeProfile, SwipeAction } from "../types";
import { fakeSwipeService } from "../services/userApi";
import SwipeCard from "../components/SwipeCard";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.25;

export const HomeScreen: React.FC = () => {
    const [profiles, setProfiles] = useState<SwipeProfile[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [actions, setActions] = useState<SwipeAction[]>([]);
    const [loading, setLoading] = useState(true);

    const position = new Animated.ValueXY();

    useEffect(() => {
        const loadProfiles = async () => {
            const data = await fakeSwipeService.getSwipeProfiles();
            setProfiles(data);
            setLoading(false);
        };
        loadProfiles();
    }, []);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
            Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10,
        onPanResponderMove: (_, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                handleSwipe("like");
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
                handleSwipe("pass");
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const handleSwipe = (type: "like" | "pass") => {
        const profile = profiles[currentIndex];
        if (!profile) return;

        const direction = type === "like" ? width : -width;

        Animated.timing(position, {
            toValue: { x: direction, y: 0 },
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setActions((prev) => [
                ...prev,
                { type, profileId: profile.id, timestamp: new Date() },
            ]);
            position.setValue({ x: 0, y: 0 });
            setCurrentIndex((prev) => prev + 1);
        });
    };

    const rotate = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: ["-15deg", "0deg", "15deg"],
        extrapolate: "clamp",
    });

    const animatedStyle = {
        transform: [...position.getTranslateTransform(), { rotate }],
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#ff5a90" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {profiles
                .map((profile, index) => {
                    if (index < currentIndex) return null;

                    const isTop = index === currentIndex;

                    return (
                        <Animated.View
                            key={profile.id}
                            {...(isTop ? panResponder.panHandlers : {})}
                            style={[
                                styles.cardContainer,
                                isTop && animatedStyle,
                                { zIndex: profiles.length - index },
                            ]}
                        >
                            <SwipeCard profile={profile} />
                        </Animated.View>
                    );
                })
                .reverse()}

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Swiped: {actions.length} ({actions.filter((a) => a.type === "like").length} likes)
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        alignItems: "center",
        justifyContent: "center",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        position: "absolute",
        top: 80,
    },
    footer: {
        position: "absolute",
        bottom: 40,
    },
    footerText: {
        fontSize: 16,
        color: "#555",
    },
});
