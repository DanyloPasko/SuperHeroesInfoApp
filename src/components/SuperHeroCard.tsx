import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "expo-router";
import type { Hero } from "../store/slices/favoriteHeroesSlice";
import { RootState } from "../store/store";
import { addHero, removeHero } from "../store/slices/favoriteHeroesSlice";
import FallbackImage from "../../assets/Unknown_person.jpg";
import { useState } from "react";


type Props = {
    hero: Hero;
};

export default function SuperHeroCard({ hero }: Props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const currentStack = pathname.split("/")[1];

    const favorites = useSelector((s: RootState) => s.heroes.items);
    const isFavorite = favorites.some((h) => h.id === hero.id);

    const [imageUri, setImageUri] = useState<string | undefined>(hero.image?.url);


    const toggleFavorite = () => {
        isFavorite ? dispatch(removeHero(hero.id)) : dispatch(addHero(hero));
    };

    return (
        <View style={tw`flex-row bg-white rounded-lg p-3 my-2 mx-4 shadow`}>
            <Image
                source={imageUri ? { uri: imageUri } : FallbackImage}
                style={tw`w-20 h-20 rounded-md bg-gray-200`}
                resizeMode="cover"
                onError={() => setImageUri(undefined)}
            />
            <View style={tw`flex-1 ml-3 justify-between`}>
                <Text style={tw`text-base font-semibold text-black mb-1`}>{hero.name}</Text>
                {hero.powerstats && (
                    <View style={tw`flex-row flex-wrap`}>
                        {Object.entries(hero.powerstats).map(([key, value]) => (
                            <View key={key} style={tw`w-1/2 mb-1`}>
                                <Text style={tw`text-sm text-gray-600`}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value ?? "-"}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
            <View>
                <TouchableOpacity
                    onPress={toggleFavorite}
                    style={tw`p-2`}
                    accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <Ionicons
                        name={isFavorite ? "star" : "star-outline"}
                        size={24}
                        color={isFavorite ? "#f59e0b" : "#6b7280"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push(`/${currentStack}/heroDetails/${hero.id}`)}
                    style={tw`p-2`}
                    accessibilityLabel="View hero details"
                >
                    <Ionicons name="information-circle-outline" size={24} color="#3b82f6" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
