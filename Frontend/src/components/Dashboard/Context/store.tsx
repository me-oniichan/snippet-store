import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import snippetReducer from './snippetReducer';
import miscReducer from './miscReducer';

const store = configureStore({
    reducer: {
        userReducer,
        snippetReducer,
        miscReducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;