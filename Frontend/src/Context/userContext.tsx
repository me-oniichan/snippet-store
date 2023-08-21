import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState{
    username : string,
    displayname : string,
}


export const userSlice = createSlice({
    name: "userdata",
    initialState : {
        username : "username",
        displayname : "displayname",
    },
    reducers: {
        updateUserData : (state, action: PayloadAction<userState>)=>{
            state.username = action.payload.username,
            state.displayname = action.payload.displayname
        }
    }
})


export const {updateUserData} = userSlice.actions

export default userSlice.reducer