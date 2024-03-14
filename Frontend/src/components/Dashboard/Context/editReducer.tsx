import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Snippet from "@/types/Snippet"

const initialState: Snippet = {
    title: "",
    created_date: "",
    language: "plaintext",
    pk: -1,
    prefix: "",
    code: "",
    description: ""
} as Snippet;

const editSlice = createSlice({
    name: "edit-reducer",
    initialState,
    reducers: {
        loadSnippet(state, action: PayloadAction<Snippet>) {
            state.pk = action.payload.pk
            state.title = action.payload.title
            state.language = action.payload.language
            state.prefix = action.payload.prefix
            state.code = action.payload.code
            state.description = action.payload.description
        },
        updateTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        updateLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload
        },
        updatePrefix(state, action: PayloadAction<string>) {
            state.prefix = action.payload
        },
        updateCode(state, action: PayloadAction<string | undefined>) {
            state.code = action.payload
        },
        updateDesc(state, accent: PayloadAction<string>) {
            state.description = accent.payload
        },
        resetSnippet(state) {
            state.title = ""
            state.language = "plaintext"
            state.prefix = ""
            state.code = ""
            state.description = ""
            state.pk=-1
        }
    }
})

export const actions = editSlice.actions
export default editSlice.reducer