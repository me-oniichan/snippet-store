import Snippet from '@/types/Snippet';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initType {
    selectedSnippet: number;
    snippets: Snippet[];
}

// Define the initial state
const initialState= {
    selectedSnippet: -1,
    snippets: [],
} as initType;

// Create the slice
const snippetSlice = createSlice({
    name: 'snippet-slice',
    initialState,
    reducers: {
        setSnippets(state, action: PayloadAction<Snippet[]>) {
            state.snippets = action.payload;
        },
        setSelectedSnippet(state, action: PayloadAction<number>) {
            state.selectedSnippet = action.payload;
        },
        addSnippet(state, action: PayloadAction<Snippet>) {
            state.snippets.push(action.payload);
            state.selectedSnippet = state.snippets.length - 1;
        },
        updateSnippet(state, action: PayloadAction<Snippet>) {
            const index = state.snippets.findIndex((snippet) => snippet.id === action.payload.id);
            state.snippets[index] = action.payload;
        },
        deleteSnippet(state, action: PayloadAction<number>) {
            state.snippets = state.snippets.filter((snippet, idx) => idx !== action.payload);
            if (state.selectedSnippet >= state.snippets.length) {
                state.selectedSnippet = state.snippets.length - 1;
            }
        },
    },
});

// Export the actions and reducer
export const actions = snippetSlice.actions;
export default snippetSlice.reducer;