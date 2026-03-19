import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ChatScreen from "../screens/ChatScreen";
import DisclaimerScreen from "../screens/DisclaimerScreen";
import DocumentFormScreen from "../screens/DocumentFormScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import HomeScreen from "../screens/HomeScreen";
import LawyersScreen from "../screens/LawyersScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import TopicsScreen from "../screens/TopicsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Topics" component={TopicsScreen} />
        <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
        <Stack.Screen name="Lawyers" component={LawyersScreen} />
        <Stack.Screen name="Documents" component={DocumentsScreen} />
        <Stack.Screen name="DocumentForm" component={DocumentFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
