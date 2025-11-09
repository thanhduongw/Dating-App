import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Animated,
    PanResponder,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SwipeProfile, SwipeAction, Match } from "../types";
import { fakeSwipeService } from "../services/userApi";
import SwipeCard from "../components/SwipeCard";
import ProgressBar from "../components/ProgressBar";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.25;

const currentUserId = "user-0"; // giả lập user hiện tại

const HomeScreen: React.FC = () => {
    const [profiles, setProfiles] = useState<SwipeProfile[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [actions, setActions] = useState<SwipeAction[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    const totalProfiles = profiles.length;
    const progress = currentIndex / totalProfiles;

    const position = new Animated.ValueXY();

    const loadProfiles = async () => {
        setLoading(true);
        const data = await fakeSwipeService.getSwipeProfiles();
        setProfiles(data);
        setCurrentIndex(0);
        setMatches([]); // reset matches khi reload
        setLoading(false);
    };

    useEffect(() => {
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
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setActions((prev) => [
                ...prev,
                { type, profileId: profile.id, timestamp: new Date() },
            ]);

            // Kiểm tra match
            if (type === "like" && fakeSwipeService.addLike(profile.id)) {
                setMatches((prev) => [...prev, { profile, timestamp: new Date() }]);
                alert(`🎉 You matched with ${profile.name}!`);
            }

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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={loadProfiles}>
                    <Ionicons name="refresh" size={26} color="#00BCD4" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>HeartSync</Text>
                <TouchableOpacity onPress={() => console.log("Open filter")}>
                    <Ionicons name="options-outline" size={26} color="#00BCD4" />
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressWrapper}>
                <ProgressBar progress={progress} />
            </View>

            {/* Swipe Cards */}
            {[...profiles].reverse().map((profile, index) => {
                const realIndex = profiles.length - 1 - index; // index tương ứng với profiles gốc
                if (realIndex < currentIndex) return null;

                const isTop = realIndex === currentIndex;

                return (
                    <Animated.View
                        key={`${profile.id}-${realIndex}`} // đảm bảo key duy nhất
                        {...(isTop ? panResponder.panHandlers : {})}
                        style={[
                            styles.cardContainer,
                            isTop && animatedStyle,
                            { zIndex: profiles.length - realIndex },
                        ]}
                    >
                        <SwipeCard profile={profile} />
                    </Animated.View>
                );
            })}

            {/* Matches */}
            <View style={styles.matchContainer}>
                {matches.map((m) => (
                    <View key={m.profile.id} style={styles.matchCard}>
                        <Text style={styles.matchText}>💖 {m.profile.name} matched!</Text>
                    </View>
                ))}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fafafa", alignItems: "center" },
    header: {
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerTitle: { fontSize: 24, fontWeight: "700", color: "#000" },
    progressWrapper: { position: "absolute", top: 110, width: "50%", alignSelf: "center" },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    cardContainer: { position: "absolute", top: 150 },
    matchContainer: {
        position: "absolute",
        bottom: 20,
        width: "90%",
        alignItems: "center",
    },

    matchCard: {
        backgroundColor: "#ffebf0", // màu hồng nhạt
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    matchText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ff5a90",
    },

});
export default HomeScreen;
