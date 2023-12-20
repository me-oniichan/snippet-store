import axios, { AxiosResponse } from "axios"
import { DispatchState, RootState } from "./Store";
import { removeSnippet } from "./snippetContext";


// redux thunk middlewares

export function deleteSnippet(id: number){
    return async (dispatch: DispatchState, getState: ()=> RootState) =>{
        await axios({
            method: "delete",
            url: "http://127.0.0.1:8000/delete_snippet",
            data: {
                id : getState().snippetReducer.snippets[id].id  
            }
        }).then((res : AxiosResponse)=>{
            console.log(res);
            if (res.status === 200){
                dispatch(removeSnippet(id))
            }
        })
    }
}
