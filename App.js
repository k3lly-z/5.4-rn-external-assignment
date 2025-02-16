import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2196F3",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", gestureEnabled: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: "Camera" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
