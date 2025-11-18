import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ChatRoomScreen from "../screens/message/ChatRoomScreen";
import VideoCallScreen from "../screens/message/VideoCallScreen";
import { SwipeProfile } from "../types";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import { ProfileDetailScreen } from "../screens/profile/ProfileDetailScreen";
import FilterScreen from "../screens/profile/FilterScreen";

export type RootStackParamList = {
  Tabs: undefined;
  EditProfile: undefined;
  ChatRoom: undefined;
  VideoCall: { target: any };
  ProfileDetail: { profile: SwipeProfile };
  FilterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  );
}
