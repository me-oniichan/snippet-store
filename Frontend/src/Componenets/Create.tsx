// import { useRef } from "react"
import { useState } from "react"
import "../assets/css/create.css"
import CodeArea from "./Editor"

export default function(){
    // const editorRef = useRef()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async (code: string, language: string) =>{
        const data= {
            code,
            language,
            description,
            title
        }

        console.log(data);
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

                <div className="property" style={{height: "100%"}}>
                    <label htmlFor="description" className="label">Description</label>
                    <textarea name="description" style={{width : "90%", height: "100%"}}
                    onChange={e=>{
                        setDescription(e.target.value)                        
                    }}
                    value={description}
                    maxLength={500}></textarea>
                </div>
            </div>
            <div className="seperator"></div>
            <div className="codeview">
                <CodeArea language="plaintext" readOnly={false} children="" callback={onSubmit} />
            </div>
        </div>
    )
}