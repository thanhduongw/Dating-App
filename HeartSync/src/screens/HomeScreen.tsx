import React, { useEffect, useState, useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { LikeContext } from "../navigation/TabNavigator";
import { SwipeProfile, SwipeAction } from "../types";
import { fakeSwipeService } from "../services/userApi";
import SwipeCard from "../components/SwipeCard";
import ProgressBar from "../components/ProgressBar";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.25;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { likedProfiles, setLikedProfiles } = useContext(LikeContext);
    const [profiles, setProfiles] = useState<SwipeProfile[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [actions, setActions] = useState<SwipeAction[]>([]);

    const totalProfiles = profiles.length;
    const progress = totalProfiles > 0 ? currentIndex / totalProfiles : 0;
    const position = new Animated.ValueXY();

    // Load danh sách hồ sơ từ service
    const loadProfiles = async () => {
        setLoading(true);
        const data = await fakeSwipeService.getSwipeProfiles();
        setProfiles(data);
        setCurrentIndex(0);
        setActions([]);
        setLoading(false);
    };

    useEffect(() => {
        loadProfiles();
    }, []);

    // Xử lý swipe
    const handleSwipe = async (type: "like" | "pass") => {
        const profile = profiles[currentIndex];
        if (!profile) return;

        const direction = type === "like" ? width : -width;

        Animated.timing(position, {
            toValue: { x: direction, y: 0 },
            duration: 150,
            useNativeDriver: true,
        }).start(async () => {
            // Lưu action
            setActions((prev) => [
                ...prev,
                { type, profileId: profile.id, timestamp: new Date() },
            ]);

            // Nếu like thì lưu hồ sơ
            if (type === "like") {
                setLikedProfiles((prev) => {
                    const exists = prev.some((p) => p.id === profile.id);
                    if (exists) return prev;
                    return [...prev, profile];
                });

                // Kiểm tra match từ service
                const isMatch = await fakeSwipeService.addLike(profile.id);
                if (isMatch) {
                    alert(`🎉 You matched with ${profile.name}!`);

                    // Chuyển sang MessagesScreen
                    navigation.navigate("Messages"); // <-- sửa ở đây
                }
            }

            // Reset vị trí và tăng index
            position.setValue({ x: 0, y: 0 });
            setCurrentIndex((prev) => prev + 1);
        });
    };


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
                <Ionicons name="options-outline" size={26} color="#00BCD4" />
            </View>

            {/* Progress Bar */}
            <View style={styles.progressWrapper}>
                <ProgressBar progress={progress} />
            </View>

            {/* Swipe Cards */}
            {[...profiles].reverse().map((profile, index) => {
                const realIndex = profiles.length - 1 - index;
                if (realIndex < currentIndex) return null;
                const isTop = realIndex === currentIndex;
                return (
                    <Animated.View
                        key={profile.id}
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
    },
    headerTitle: { fontSize: 24, fontWeight: "700", color: "#000" },
    progressWrapper: { position: "absolute", top: 110, width: "50%" },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    cardContainer: { position: "absolute", top: 150 },
});

export default HomeScreen;
