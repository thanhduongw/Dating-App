import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SubscriptionPlansScreen from "../screens/profile/SubscriptionPlansScreen";
import MessagesScreen from "../screens/message/MessagesScreen";
import HomeScreen from "../screens/HomeScreen";


function Placeholder({ label }: { label: string }) {
  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
    </View>
  );
}

export type RootTabParamList = {
  Home: undefined;
  Likes: undefined;
  Messages: undefined;
  Subscription: undefined;
  Saved: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse-outline";

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Likes":
              iconName = "heart-outline";
              break;
            case "Messages":
              iconName = "chatbubble-outline";
              break;
            case "Subscription":
              iconName = "person-outline";
              break;
            case "Saved":
              iconName = "bookmark-outline";
              break;
          }

          const color = focused ? "#5A6CF3" : "#777";

          return (
            <View style={styles.iconWrap}>
              <Ionicons name={iconName} size={28} color={color} />
              {focused && <View style={styles.activeBar} />}
              {route.name === "Messages" && <View style={styles.badgeDot} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" children={() => <Placeholder label="Likes" />} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Subscription" component={SubscriptionPlansScreen} />
      <Tab.Screen name="Saved" children={() => <Placeholder label="Saved" />} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
    borderTopWidth: 0,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: "100%",
  },
  activeBar: {
    width: 30,
    height: 4,
    backgroundColor: "#5A6CF3",
    borderRadius: 6,
    position: "absolute",
    bottom: -8,
  },
  badgeDot: {
    position: "absolute",
    top: 8,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 8,
  },
});
