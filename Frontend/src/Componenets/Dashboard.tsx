import CodeArea from "./Editor";
import SelectionFile from "./SelectionFile";
import { useAppSelector } from "../Context/storeEvents";
import { AiFillEdit } from "react-icons/ai";
import {useEffect, useState } from "react";
import axios from "axios";
import { DispatchState } from "../Context/Store";
import { useAppDispatch } from "../Context/storeEvents";
import { updateUserData } from "../Context/userContext";
import { loadSnippets } from "../Context/snippetContext";

export default function Dashboard() {
  const [readOnly, setReadOnly] = useState(true);
  const [editDesc, setEditDesc] = useState("")
  console.log(readOnly)
  
  const {selected, snippets} = useAppSelector(state=> state.snippetReducer);
  const snippet = snippets[selected];
  
  const toggleReadOnly = () =>{
    if (!readOnly){
      if (confirm("Changes will be reverted")) {
        setReadOnly(true)
        return true;
      }
      return false
    }
    return true
  }

  useEffect(()=>{
    setEditDesc(snippet?.description)
  }, [snippet])

  const dispatch : DispatchState = useAppDispatch();

  useEffect(()=>{
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/get_data`,
      headers : {
        "Content-Type" : "application/json",
      }
    }).then(res=>{
      // console.log(res.data);
      dispatch(updateUserData({
        username : res.data.username,
        displayname : res.data.displayname
      }))
      console.log(res.data);
      
      dispatch(loadSnippets(res.data.snippets))
    })
  }, [])

  if(snippets.length ===0) return <h3>Getting data</h3>
  return (
    <div className="dashboard-container">
      <SelectionFile toggleReadOnly={toggleReadOnly}/>
      {/* <div className="seperator"></div> */}
      <div className="codeview" style={{flexDirection:"column-reverse"}}>
        <div className="description-area">
          <div>
            <div style={{fontSize: 20, margin: 10, color: "beige", display:"inline"}}>
              Description
            </div>
            <AiFillEdit size={25} color="beige" className="icons" style={{
              position : "absolute",
              right: 0,
              margin: "3px 15px 0 0",
            }}
            onClick={()=>{
              if (!readOnly && confirm("Changes will be reverted")) setReadOnly(true)
              else setReadOnly(false)
            }}
          />
          </div>
          <textarea className="text" readOnly={readOnly} value={editDesc}
          onChange={(e)=>setEditDesc(e.target.value)
          }></textarea>
        </div>
        <CodeArea readOnly={readOnly} language={snippet.language} height="60vh">
            {snippet.code}
        </CodeArea>
      </div>
    </div>
  );
}