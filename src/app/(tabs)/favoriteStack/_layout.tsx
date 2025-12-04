import { Stack } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteStackLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack initialRouteName={"Favorite"}  screenOptions={{
                headerShown: false,
            }} />
        </SafeAreaView>
    )
}
