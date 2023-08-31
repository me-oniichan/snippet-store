import { deleteSnippet } from "../Context/Middlewares";
import { removeSnippet, updateSelected } from "../Context/snippetContext";
import { useAppDispatch } from "../Context/storeEvents";
import {AiFillDelete, AiFillEdit} from "react-icons/ai"

interface cardProp {
  language: string;
  title: string;
  seleced: boolean;
  id : number;
}

export default function (props: cardProp) {
    const dispatch = useAppDispatch();
  return (
    <div
      className="snippet-card"
      style={props.seleced ? { borderColor: "var(--glow)" } : {}}
      onClick={()=> dispatch(updateSelected(props.id))}
    >
      <div className="info">
        <div className="title">{props.title}</div>
        <div className="lang">{props.language}</div>
      </div>
      <div className="options">
        <AiFillDelete color="crimson"
          onClick={()=> dispatch(deleteSnippet(props.id))} 
        />
        <AiFillEdit color="var(--fg-secondary)"/>
      </div>
    </div>
  );
}
