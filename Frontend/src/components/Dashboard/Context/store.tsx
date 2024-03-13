import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import snippetReducer from './snippetReducer';
import miscReducer from './miscReducer';
import editReducer from './editReducer';

const store = configureStore({
    reducer: {
        userReducer,
        snippetReducer,
        miscReducer,
        editReducer        
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;