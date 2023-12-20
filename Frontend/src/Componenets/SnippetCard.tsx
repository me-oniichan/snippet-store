import { SyntheticEvent } from "react";
import { deleteSnippet } from "../Context/Middlewares";
import { updateSelected } from "../Context/snippetContext";
import { useAppDispatch } from "../Context/storeEvents";
import { AiFillDelete } from "react-icons/ai";

interface cardProp {
  language: string;
  title: string;
  seleced: boolean;
  id: number;
  toggle: any;
}

export default function (props: cardProp) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="snippet-card"
      style={props.seleced ? { borderColor: "var(--glow)" } : {}}
      onClick={() => {
        if (props.toggle()) dispatch(updateSelected(props.id));
      }}
    >
      <div className="info">
        <div className="title">{props.title}</div>
        <div className="lang">{props.language}</div>
      </div>
      <AiFillDelete
        color="crimson"
        onClick={(e: SyntheticEvent) => {
          dispatch(deleteSnippet(props.id));
          e.stopPropagation();
        }}
        className="icons"
      />
    </div>
  );
}
