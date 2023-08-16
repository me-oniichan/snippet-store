import SnippetCard from "./SnippetCard";

export default function(){
    return(
        <div className="list-snippets">
            <SnippetCard title="Title" language="RS" seleced={true}/>

            <SnippetCard title="Another title" language="PY" seleced={false}/>
            
            <SnippetCard title="So called title" language="C" seleced={false}/>
            
        </div>
    )
}