import { Stack } from 'expo-router';

export default function HomeStackLayout() {
    return <Stack initialRouteName={"Home"}  screenOptions={{
        headerShown: false,
    }} />;
}
