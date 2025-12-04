import { useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { Hero } from "../../../store/slices/favoriteHeroesSlice";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import SuperHeroCard from "../../../components/SuperHeroCard";
import { API_KEY } from "../../../utils/constans";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Hero[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchHeroes = () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        fetch(`https://www.superheroapi.com/api/${API_KEY}/search/${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.response === "success" && Array.isArray(data.results)) {
                    setResults(data.results);
                } else {
                    setResults([]);
                    setError(data.error || "No results");
                }
            })
            .catch((err) => {
                setResults([]);
                setError(err.message || "Request failed");
            })
            .finally(() => setLoading(false));
    };

    return (
        <View style={tw`flex-1 bg-gray-100 pt-8`}>
            <View style={tw`px-4`}>
                <View style={tw`flex-row items-center bg-white rounded-full px-3 py-2 shadow`}>
                    <Ionicons name="search" size={18} color="#6b7280" />
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search hero by name"
                        returnKeyType="search"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            searchHeroes();
                        }}
                        style={tw`ml-3 flex-1 text-base`}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                setQuery("");
                                setResults([]);
                                setError(null);
                            }}
                            style={tw`p-2`}
                        >
                            <Ionicons name="close-circle" size={18} color="#9ca3af" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={tw`px-4 mt-3`}>
                {loading && (
                    <View style={tw`flex-row items-center`}>
                        <ActivityIndicator />
                        <Text style={tw`ml-2 text-gray-700`}>Searching...</Text>
                    </View>
                )}
                {!loading && error && <Text style={tw`text-red-500`}>{error}</Text>}
                {!loading && !error && results.length === 0 && query.length > 0 && (
                    <Text style={tw`text-gray-600`}>No heroes found.</Text>
                )}
            </View>

            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SuperHeroCard hero={item} />}
                contentContainerStyle={tw`pt-3 pb-6`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !loading && query.length === 0 ? (
                        <View style={tw`items-center mt-8`}>
                            <Text style={tw`text-gray-500`}>Start typing to search for heroes</Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
