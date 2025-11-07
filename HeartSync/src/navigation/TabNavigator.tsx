import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SubscriptionPlansScreen from "../screens/profile/SubscriptionPlansScreen";
import MessagesScreen from "../screens/message/MessagesScreen";
import { HomeScreen } from "../screens/HomeScreen";
// import HomeSwipeScreen from "../screens/HomeScreen";

function Placeholder({ label }: { label: string }) {
  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
    </View>
  );
}

export type RootTabParamList = {
  Subscription: undefined;
  Likes: undefined;
  Saved: undefined;
  Messages: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Subscription"
      screenOptions={({ route }: { route: RouteProp<RootTabParamList> }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          const icons: Record<
            keyof RootTabParamList,
            keyof typeof Ionicons.glyphMap
          > = {
            Subscription: "person-outline",
            Likes: "heart-outline",
            Saved: "bookmark-outline",
            Messages: "chatbubble-outline",
          };

          const icon = icons[route.name];
          const color = focused ? "#5A6CF3" : "#777";

          return (
            <View style={styles.iconWrap}>
              <Ionicons
                name={icon}
                size={28}
                color={color}
                style={{ opacity: focused ? 1 : 0.6 }}
              />
              {focused && <View style={styles.activeBar} />}
              {route.name === "Messages" && <View style={styles.badgeDot} />}
            </View>
          );
        },
        tabBarActiveTintColor: "#5A6CF3",
        tabBarInactiveTintColor: "#777",
      })}
    >
      <Tab.Screen name="Subscription" component={SubscriptionPlansScreen} />
      <Tab.Screen
        name="Likes"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="Saved" children={() => <Placeholder label="Saved" />} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
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
