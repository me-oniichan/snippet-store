import SnippetCard from "./SnippetCard";

export default function Dashboard(){
    return(
        <div className="dashboard-container">
            <div className="greeting">
                Welcome user
            </div>

            <div className="snippet-list">
                <SnippetCard/>
                <SnippetCard/>
                <SnippetCard/>
            </div>
        </div>
    )
}