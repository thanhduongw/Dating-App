import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import ChatRoomScreen from "../screens/message/ChatRoomScreen";
import VideoCallScreen from "../screens/message/VideoCallScreen";
//import FilterScreen from "../screens/FilterScreen";

export type RootStackParamList = {
  Tabs: undefined;
  EditProfile: undefined;
  ChatRoomScreen: undefined;
  VideoCallScreen: undefined;
  FilterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
