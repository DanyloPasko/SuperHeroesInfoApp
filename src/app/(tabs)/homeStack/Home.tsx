import { useState, useCallback, useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    RefreshControl,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Hero } from "../../../store/slices/favoriteHeroesSlice";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import SuperHeroCard from "../../../components/SuperHeroCard";
import { API_KEY } from "../../../utils/constans";
import HeroFilter, { HeroFilterKey } from "../../../components/HeroFilter";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Hero[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [sortKey, setSortKey] = useState<HeroFilterKey>("default");

    const handleSortChange = useCallback((key: HeroFilterKey) => {
        setSortKey(key);
    }, []);

    const searchHeroes = useCallback(
        (isRefreshing = false) => {
            if (!query.trim()) return;

            if (isRefreshing) {
                setRefreshing(true);
            } else {
                setRefreshing(false);
                setLoading(true);
            }
            setError(null);
            setSortKey("default");

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
                .finally(() => {
                    setRefreshing(false);
                    setLoading(false);
                });
        },
        [query]
    );

    const onRefresh = useCallback(() => {
        searchHeroes(true);
    }, [searchHeroes]);

    const clearSearch = useCallback(() => {
        setQuery("");
        setResults([]);
        setError(null);
        setLoading(false);
        setRefreshing(false);
        setSortKey("default");
    }, []);

    const sortedResults = useMemo(() => {
        if (sortKey === "default" || results.length === 0) {
            return results;
        }

        return [...results].sort((a, b) => {
            const key = sortKey as keyof NonNullable<typeof a.powerstats>;

            const getPowerStatValue = (hero: Hero, statKey: typeof key): number => {
                const value = hero.powerstats?.[statKey];
                const num = parseInt(value as string, 10);
                return isNaN(num) ? 0 : num;
            };

            const x = getPowerStatValue(a, key);
            const y = getPowerStatValue(b, key);

            return y - x;
        });
    }, [results, sortKey]);

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
                            onPress={clearSearch}
                            style={tw`p-2`}
                        >
                            <Ionicons name="close-circle" size={18} color="#9ca3af" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {results.length > 0 && !loading && (
                <HeroFilter selected={sortKey} onChange={handleSortChange} />
            )}

            <View style={tw`px-4 mt-3`}>
                {loading && !refreshing && (
                    <View style={tw`flex-row items-center`}>
                        <ActivityIndicator />
                        <Text style={tw`ml-2 text-gray-700`}>Searching...</Text>
                    </View>
                )}
                {!loading && !refreshing && error && <Text style={tw`text-red-500`}>{error}</Text>}
                {!loading && !refreshing && !error && results.length === 0 && query.length > 0 && (
                    <Text style={tw`text-gray-600`}>No heroes found.</Text>
                )}
            </View>

            <FlatList
                data={sortedResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SuperHeroCard hero={item} />}
                contentContainerStyle={tw`pt-3 pb-6`}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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