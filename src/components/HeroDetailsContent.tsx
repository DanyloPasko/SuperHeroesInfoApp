import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { Hero } from "../store/slices/favoriteHeroesSlice";
import tw from "twrnc";
import { API_KEY } from "../utils/constans";
import FallbackImage from "../../assets/Unknown_person.jpg";

type Props = { hero?: Hero };

export default function HeroDetailsContent({ hero: propHero }: Props) {
    const { id } = useLocalSearchParams<{ id: string }>();
    const storedHero = useSelector((state: RootState) => state.heroes.items.find(h => h.id === id)) as Hero | undefined;
    const [hero, setHero] = useState<Hero | undefined>(propHero || storedHero);
    const [loading, setLoading] = useState(!hero);
    const [imageUri, setImageUri] = useState<string | undefined>(hero?.image?.url);

    useEffect(() => {
        if (!hero && id) {
            setLoading(true);
            fetch(`https://www.superheroapi.com/api/${API_KEY}/${id}`)
                .then(res => res.json())
                .then(data => setHero(data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <View style={tw`flex-1 justify-center items-center`}><ActivityIndicator size="large" color="#3b82f6" /></View>;
    if (!hero) return <View style={tw`flex-1 justify-center items-center`}><Text style={tw`text-gray-500 text-lg`}>Hero not found</Text></View>;

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
                <>
                    <Image source={imageUri ? { uri: imageUri } : FallbackImage} style={tw`w-full h-86 rounded-xl mb-4`} resizeMode="cover" onError={() => setImageUri(undefined)} />
                    <Text style={tw`text-3xl font-bold mb-4 text-black`}>{hero.name}</Text>
                </>
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
