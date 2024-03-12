import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState= {
    username : '',
};

// Step 3: Define the reducers
const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string>) {
            state.username = action.payload;
        }
    },
});

// Step 4: Export the slice and its actions
export const actions = userSlice.actions;
export default userSlice.reducer;