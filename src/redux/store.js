import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { persistStore } from 'redux-persist';
import { persistedContactsReducer } from './contactSlice';


import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
    
    
export const store = configureStore({
    reducer: {
        filter: filterReducer,
        contacts: persistedContactsReducer,

    },
    
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
