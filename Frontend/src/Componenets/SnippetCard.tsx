interface snippetData{
    children : string;
}

export default function SnippetCard(props : snippetData){
    return(
        <div className="snippet-card">
            <div className="snippet-header">
                Title
            </div>
            <div className="snippet-content">
                {props.children}
            </div> 

            <div className="snippet-footer">
                <span>edit</span>
                <span>delete</span>
            </div>
        </div>
    )
}