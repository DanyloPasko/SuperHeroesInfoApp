import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Hero = {
    id: string;
    name: string;
    image: { url: string };
    powerstats?: {
        combat?: string;
        durability?: string;
        intelligence?: string;
        power?: string;
        speed?: string;
        strength?: string;
    };
};

type FavoriteHeroesState = {
    items: Hero[];
};

const initialState: FavoriteHeroesState = {
    items: [],
};

export const favoriteHeroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        addHero: (state, action: PayloadAction<Hero>) => {
            const exists = state.items.some(h => h.id === action.payload.id);
            if (!exists) state.items.push(action.payload);
        },
        removeHero: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(h => h.id !== action.payload);
        }
    }
});

export const { addHero, removeHero } = favoriteHeroesSlice.actions;
export default favoriteHeroesSlice.reducer;
