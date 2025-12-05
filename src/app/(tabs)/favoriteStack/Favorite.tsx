import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FlatList, Text, View } from "react-native";
import tw from "twrnc";
import SuperHeroCard from "../../../components/SuperHeroCard";
import HeroFilter, { HeroFilterKey } from "../../../components/HeroFilter";
import { useState, useMemo, useCallback } from "react";
import { Hero } from "../../../store/slices/favoriteHeroesSlice";

export default function Favorites() {
    const favorites = useSelector((s: RootState) => s.heroes.items);

    const [sortKey, setSortKey] = useState<HeroFilterKey>("strength");

    const handleSortChange = useCallback((key: HeroFilterKey) => {
        setSortKey(key);
    }, []);

    const sortedFavorites = useMemo(() => {
        if (sortKey === "default" || favorites.length === 0) {
            return favorites;
        }

        return [...favorites].sort((a, b) => {
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
    }, [favorites, sortKey]);

    return (
        <View style={tw`flex-1 bg-gray-100 pt-4`}>
            {favorites.length > 0 && (
                <HeroFilter selected={sortKey} onChange={handleSortChange} />
            )}
            <FlatList
                data={sortedFavorites}
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