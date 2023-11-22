import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
    },
    reducers: {
        addContact: (state, action) => {
            state.contacts = [...state.contacts, action.payload];
        },
        
        deleteContact: (state, action) => {
            state.contacts = action.payload;
        },
    },
});

export const { deleteContact, addContact } = contactSlice.actions;

const persistConfig = {
  key: 'contactsList',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
