import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { carsReducer } from './cars/slice.js';
import { filterReducer } from './filters/slice.js';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import createTransform from 'redux-persist/es/createTransform';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['favoritesCars'],
};

const removePageTransform = createTransform(
    (inboundState, key) => {
        const { page, ...rest } = inboundState;
        return rest;
    },
    (outboundState, key) => {
        return { ...outboundState, page: 1 };
    },
    { whitelist: ['filters'] }
);  

const filtersPersistConfig = {
    key: 'filters',
    storage: sessionStorage,
    transforms: [removePageTransform],
};

const persistedCarsReducer = persistReducer(persistConfig, carsReducer);
const persistedFilterReducer = persistReducer(filtersPersistConfig, filterReducer);

export const store = configureStore({
    reducer: {
        cars: persistedCarsReducer,
        filters: persistedFilterReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
});

export const persistor = persistStore(store);