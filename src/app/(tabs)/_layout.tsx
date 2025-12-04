import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            initialRouteName="homeStack"
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen
                name="homeStack"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons
                            name="home-outline"
                            size={size}
                            color={focused ? "green" : "black"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "grey", fontSize: 12 }}>
                            Home
                        </Text>
                    ),
                }}
            />

            <Tabs.Screen
                name="favoriteStack"
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons
                            name="heart-outline"
                            size={size}
                            color={focused ? "green" : "black"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "grey", fontSize: 12 }}>
                            Favorites
                        </Text>
                    ),
                }}
            />
        </Tabs>
    );
}
