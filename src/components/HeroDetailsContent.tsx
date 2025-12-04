import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import type { Hero } from "../store/slices/favoriteHeroesSlice";
import tw from "twrnc";
import { API_KEY } from "../utils/constans";
import FallbackImage from "../../assets/Unknown_person.jpg";
import { addHero, removeHero } from "../store/slices/favoriteHeroesSlice";
import { Ionicons } from "@expo/vector-icons";

type Props = { hero?: Hero };

export default function HeroDetailsContent({ hero: propHero }: Props) {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dispatch = useDispatch();

    const storedHero = useSelector((state: RootState) =>
        state.heroes.items.find(h => h.id === id)
    ) as Hero | undefined;

    const favorites = useSelector((s: RootState) => s.heroes.items);
    const isFavorite = favorites.some(h => h.id === id);

    const [hero, setHero] = useState<Hero | undefined>(propHero || storedHero);
    const [loading, setLoading] = useState(!hero);
    const [imageUri, setImageUri] = useState<string | undefined>(hero?.image?.url);

    const toggleFavorite = () => {
        if (!hero) return;
        isFavorite ? dispatch(removeHero(hero.id)) : dispatch(addHero(hero));
    };

    useEffect(() => {
        if (!hero && id) {
            setLoading(true);
            fetch(`https://www.superheroapi.com/api/${API_KEY}/${id}`)
                .then(res => res.json())
                .then(data => {
                    setHero(data);
                    setImageUri(data?.image?.url);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading)
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );

    if (!hero)
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-gray-500 text-lg`}>Hero not found</Text>
            </View>
        );

    const sections = [
        {
            title: "Power Stats",
            data: {
                Combat: hero.powerstats?.combat,
                Durability: hero.powerstats?.durability,
                Intelligence: hero.powerstats?.intelligence,
                Power: hero.powerstats?.power,
                Speed: hero.powerstats?.speed,
                Strength: hero.powerstats?.strength,
            },
        },
        {
            title: "Biography",
            data: {
                "Full Name": hero.biography?.["full-name"],
                "Alter Egos": hero.biography?.["alter-egos"],
                "Place of Birth": hero.biography?.["place-of-birth"],
                Publisher: hero.biography?.publisher,
            },
        },
        {
            title: "Appearance",
            data: {
                Gender: hero.appearance?.gender,
                Race: hero.appearance?.race,
                Height: hero.appearance?.height?.[1],
                Weight: hero.appearance?.weight?.[1],
                "Eye Color": hero.appearance?.["eye-color"],
                "Hair Color": hero.appearance?.["hair-color"],
            },
        },
        {
            title: "Work",
            data: {
                Occupation: hero.work?.occupation,
                Base: hero.work?.base,
            },
        },
        {
            title: "Connections",
            data: {
                "Group Affiliation": hero.connections?.["group-affiliation"],
                Relatives: hero.connections?.relatives,
            },
        },
    ];

    return (
        <FlatList
            data={sections}
            keyExtractor={item => item.title}
            ListHeaderComponent={
                <View>
                    {/* Image */}
                    <Image
                        source={imageUri ? { uri: imageUri } : FallbackImage}
                        style={tw`w-full h-86 rounded-xl mb-4`}
                        resizeMode="cover"
                        onError={() => setImageUri(undefined)}
                    />

                    {/* Name + Favorite button */}
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-3xl font-bold text-black`}>{hero.name}</Text>

                        <TouchableOpacity onPress={toggleFavorite} style={tw`p-2`}>
                            <Ionicons
                                name={isFavorite ? "star" : "star-outline"}
                                size={30}
                                color={isFavorite ? "#f59e0b" : "#6b7280"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            }
            renderItem={({ item }) => (
                <View style={tw`bg-gray-50 rounded-lg p-4 mb-4`}>
                    <Text style={tw`text-lg font-semibold mb-2`}>{item.title}</Text>

                    {Object.entries(item.data).map(([key, value]) => (
                        <Text key={key} style={tw`text-base text-gray-700`}>
                            {key}: {value ?? "-"}
                        </Text>
                    ))}
                </View>
            )}
            contentContainerStyle={tw`p-4`}
            showsVerticalScrollIndicator={false}
        />
    );
}
