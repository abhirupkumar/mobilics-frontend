import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './features/tokenSlice';
import storage from 'redux-persist/lib/storage';
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
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, tokenReducer)
export const store = configureStore({
    reducer: {
        authToken: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})
export const persistor = persistStore(store)