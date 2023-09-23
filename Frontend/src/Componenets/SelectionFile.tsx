import { useAppSelector } from "../Context/storeEvents";
import SnippetCard from "./SnippetCard";


export default function ({toggleReadOnly} : any) {
  const { selected, snippets } = useAppSelector(
    (state) => state.snippetReducer
  );

  if (!snippets) return <h3>Loading</h3>;
  return (
    <div className="list-snippets" onClickCapture={()=>{
      
    }}>
      {snippets.map((snippet, index) => (
        <SnippetCard
          title={snippet.title}
          language={snippet.language}
          key={index}
          id={index}
          seleced={selected == index}
          toggle={toggleReadOnly}
        />
      ))}
    </div>
  );
}
