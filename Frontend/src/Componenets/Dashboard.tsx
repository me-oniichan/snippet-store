import CodeArea from "./Editor";
import SelectionFile from "./SelectionFile";
import { useAppSelector } from "../Context/storeEvents";

export default function Dashboard() {
  const {selected, snippets} = useAppSelector(state=> state.snippetReducer);
  if(snippets.length ===0) return <h3>Getting data</h3>
  const snippet = snippets[selected];
  return (
    <div className="dashboard-container">
      <SelectionFile />
      {/* <div className="seperator"></div> */}
      <div className="codeview" style={{flexDirection:"column-reverse"}}>
        <div className="description-area">
          <div style={{fontSize: 20, margin: 10, color: "beige"}}>
            Description
          </div>
          <textarea className="text" readOnly={true} value={snippet.description}></textarea>
        </div>
        <CodeArea readOnly={true} language={snippet.language} height="60vh">
            {snippet.code}
        </CodeArea>
      </div>
    </div>
  );
}