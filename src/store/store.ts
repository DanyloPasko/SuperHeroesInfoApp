import { configureStore } from "@reduxjs/toolkit";
import favoriteHeroesReducer from "./slices/favoriteHeroesSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    heroes: favoriteHeroesReducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["heroes"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
        getDefault({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
