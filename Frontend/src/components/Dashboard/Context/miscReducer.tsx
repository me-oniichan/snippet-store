
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState= {
    mode: 'read' as 'read' | 'edit' | 'add',
};

// Step 3: Define the reducers
const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<'read' | 'edit' | 'add'>) {
            state.mode = action.payload;
        }
    },
});

// Step 4: Export the slice and its actions
export const action = userSlice.actions;
export default userSlice.reducer;