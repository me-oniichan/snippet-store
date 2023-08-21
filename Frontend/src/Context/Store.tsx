import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userContext'
import snippetReducer from './snippetContext'

const store = configureStore({
    reducer: {
        userReducer,
        snippetReducer,
    }
})


//exporting types to be used
export type RootState = ReturnType<typeof store.getState>
export type DispatchState = typeof store.dispatch

export default store