
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState= {
    mode: null as 'read' | 'edit' | 'add' | null,
    loading: false,
    
};

// Step 3: Define the reducers
const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<'read' | 'edit' | 'add'>) {
            state.mode = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

// Step 4: Export the slice and its actions
export const actions = userSlice.actions;
export default userSlice.reducer;