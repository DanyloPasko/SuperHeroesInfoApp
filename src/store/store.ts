import { configureStore } from "@reduxjs/toolkit";
import favoriteHeroesReducer from "./slices/favoriteHeroesSlice";

export const store = configureStore({
    reducer: {
        heroes: favoriteHeroesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
