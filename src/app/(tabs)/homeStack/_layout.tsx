import { Stack } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeStackLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack initialRouteName={"Home"}  screenOptions={{
                headerShown: false,
            }} />
        </SafeAreaView>
    )
}
