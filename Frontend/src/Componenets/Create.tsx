import { useRef } from "react"
import { useState } from "react"
import "../assets/css/create.css"
import CodeArea from "./Editor"
import axios, { AxiosResponse } from "axios"

export default function(){
    const editorRef : {current: any} = useRef()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submit = async () =>{
        const data = {
            title,
            description,
            code : editorRef.current.getValue(),
            language : editorRef.current.getModel().getLanguageId()
        } 
        
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/submit_snippet",
            data,
        }).then((res: AxiosResponse)=>{
            if (res.status == 200){
                console.log("done");
            }
        })
    }

    return(
        <div className="dashboard-container">
            <div className="details">
                <div className="property">
                    <label htmlFor="title" className="label">Title</label>
                    <input type="text" name="title" onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    value={title}
                    maxLength={50}/>
                </div>

                <div className="property">
                    <label htmlFor="description" className="label">Description</label>
                    <textarea name="description" style={{width : "100%", height: "60vh"}}
                    onChange={e=>{
                        setDescription(e.target.value)                        
                    }}
                    value={description}
                    maxLength={500}></textarea>
                </div>
                <div className="property">
                    <button className="submit" onClick={submit}>
                        Submit
                    </button>
                </div>
                
            </div>
            {/* <div className="seperator"></div> */}
            <div className="codeview">
                <CodeArea language="plaintext" readOnly={false} children=""  ref={editorRef} height="95vh"/>
            </div>
        </div>
    )
}