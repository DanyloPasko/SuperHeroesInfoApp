import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FlatList, Text, View, } from "react-native";
import tw from "twrnc";
import SuperHeroCard from "../../components/SuperHeroCard";

export default function Favorites() {
    const favorites = useSelector((s: RootState) => s.heroes.items);

    return (
        <View style={tw`flex-1 bg-gray-100 pt-4`}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SuperHeroCard hero={item} />}
                contentContainerStyle={tw`pb-6`}
                ListEmptyComponent={
                    <View style={tw`items-center mt-8`}>
                        <Text style={tw`text-gray-500`}>No favorite heroes yet</Text>
                    </View>
                }
            />
        </View>
    );
}
