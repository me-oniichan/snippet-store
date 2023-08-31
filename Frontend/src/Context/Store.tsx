import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import userReducer from './userContext'
import snippetReducer from './snippetContext'
import thunk from 'redux-thunk'
import { deleteSnippet } from './Middlewares'

const store = configureStore({
    reducer: {
        userReducer,
        snippetReducer,
    },
    enhancers: [applyMiddleware(thunk)],
    middleware : defautMiddleware=>defautMiddleware({
         thunk : {
            extraArgument: deleteSnippet
         }
    })
},)


//exporting types to be used
export type RootState = ReturnType<typeof store.getState>
export type DispatchState = typeof store.dispatch

export default store