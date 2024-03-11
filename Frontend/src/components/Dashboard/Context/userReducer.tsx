import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState= {
    username : '',
    mode: 'read' as 'read' | 'edit' | 'add',
};

// Step 3: Define the reducers
const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setMode(state, action: PayloadAction<'read' | 'edit' | 'add'>) {
            state.mode = action.payload;
        }
    },
});

// Step 4: Export the slice and its actions
export const action = userSlice.actions;
export default userSlice.reducer;