import { updateSelected } from "../Context/snippetContext";
import { useAppDispatch } from "../Context/storeEvents";

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
      <div className="title">{props.title}</div>
      <div className="lang">{props.language}</div>
    </div>
  );
}
