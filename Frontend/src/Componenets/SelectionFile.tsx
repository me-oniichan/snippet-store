import { useAppSelector } from "../Context/storeEvents";
import SnippetCard from "./SnippetCard";

export default function(){
    const {selected, snippets} = useAppSelector(state => state.snippetReducer);
    if (!snippets) return <h3>Loading</h3>
    return(
        <div className="list-snippets">
            {snippets.map((snippet, index)=><SnippetCard title={snippet.title} language={snippet.language} seleced={selected == index}/>)} 
        </div>
    )
}