import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface snippetState{
    id : string,
    title: string,
    description : string,
    // TODO: update later for lazy loading
    code : string,
    language : string,
    forked_from : string,
}

interface snippetList{
    selected: number,
    snippets: snippetState[],
}

const initialState : snippetList= {
    selected : 0,
    snippets : [],
}

export const snipetSlice = createSlice({
    name: "snippets",
    initialState,

    reducers: {
        updateSelected: (state, action : PayloadAction<number>)=>{
            state.selected = action.payload
        },

        loadSnippets: (state, action: PayloadAction<snippetState[]>)=>{
            console.log(action.payload)
            state.snippets = action.payload
        },

        addSnippet: (state, action: PayloadAction<snippetState>)=>{
            state.snippets = [...state.snippets, action.payload]
        },

        removeSnippet: (state, action: PayloadAction<number>)=>{
            state.snippets = state.snippets.filter((_, idx)=> idx!=action.payload)
            if (state.snippets.length === state.selected){
                state.selected--;
            }
        },
        updateSnippet: (state, action: PayloadAction<{index: number, snippet: snippetState}>)=>{
            state.snippets[action.payload.index]= action.payload.snippet
        }
    }
})

export const {
    updateSelected,
    updateSnippet,
    addSnippet,
    removeSnippet,
    loadSnippets
} = snipetSlice.actions

export default snipetSlice.reducer